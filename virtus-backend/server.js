const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// PostgreSQL Connection Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Test DB Connection
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    release();
});

// Routes

// Get all categories from Database
app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY id ASC');
        const categories = result.rows.map(row => ({
            id: row.id,
            enTitle: row.en_title,
            thTitle: row.th_title,
            imageUrl: row.image_url
        }));
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get products by category from Database
app.get('/api/products/:categoryId', async (req, res) => {
    const { categoryId } = req.params;
    try {
        const categoryResult = await pool.query('SELECT * FROM categories WHERE id = $1', [categoryId]);
        if (categoryResult.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const category = {
            id: categoryResult.rows[0].id,
            enTitle: categoryResult.rows[0].en_title,
            thTitle: categoryResult.rows[0].th_title,
            imageUrl: categoryResult.rows[0].image_url
        };

        const productsResult = await pool.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);
        const products = productsResult.rows.map(row => ({
            id: row.id,
            categoryId: row.category_id,
            enName: row.en_name,
            thName: row.th_name,
            spec: row.spec,
            imageUrl: row.image_url
        }));

        res.json({ category, products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        db: 'PostgreSQL',
        timestamp: new Date()
    });
});

// --- Admin Specific Routes ---

// Add Category
app.post('/api/categories', async (req, res) => {
    const { id, enTitle, thTitle, imageUrl } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO categories (id, en_title, th_title, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, enTitle, thTitle, imageUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).json({ error: 'Failed to add category' });
    }
});

// Update Category
app.put('/api/categories/:id', async (req, res) => {
    const { id } = req.params;
    const { enTitle, thTitle, imageUrl } = req.body;
    try {
        const result = await pool.query(
            'UPDATE categories SET en_title = $1, th_title = $2, image_url = $3 WHERE id = $4 RETURNING *',
            [enTitle, thTitle, imageUrl, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// Delete Category
app.delete('/api/categories/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE category_id = $1', [id]);
        await pool.query('DELETE FROM categories WHERE id = $1', [id]);
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

// Add Product
app.post('/api/products', async (req, res) => {
    const { categoryId, enName, thName, spec, imageUrl } = req.body;
    console.log('Attempting to add product:', { categoryId, enName, thName, spec, imageUrl });
    try {
        const result = await pool.query(
            'INSERT INTO products (category_id, en_name, th_name, spec, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [categoryId, enName, thName, spec, imageUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('DATABASE ERROR adding product:', err.message);
        res.status(500).json({ error: 'Failed to add product', detail: err.message });
    }
});

// Delete Product
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
