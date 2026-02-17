const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    exposedHeaders: ['Content-Range', 'Accept-Ranges', 'Content-Length']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads', {
    setHeaders: (res, path) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        res.set('Accept-Ranges', 'bytes');
    }
}));

// Multer Configuration
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
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// PostgreSQL Connection Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Routes

// --- Category Routes ---
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

// --- Product Routes ---
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
            imageUrl: row.image_url,
            pdfUrl: row.pdf_url
        }));

        res.json({ category, products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/products', async (req, res) => {
    const { categoryId, enName, thName, imageUrl, pdfUrl } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO products (category_id, en_name, th_name, image_url, pdf_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [categoryId, enName, thName, imageUrl, pdfUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Failed to add product' });
    }
});

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

// --- Catalogue Routes ---
app.get('/api/catalogues', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM catalogues ORDER BY id DESC');
        const catalogues = result.rows.map(row => ({
            id: row.id,
            enTitle: row.en_title,
            thTitle: row.th_title,
            pdfUrl: row.pdf_url
        }));
        res.json(catalogues);
    } catch (err) {
        console.error('Error fetching catalogues:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/catalogues', async (req, res) => {
    const { enTitle, thTitle, pdfUrl } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO catalogues (en_title, th_title, pdf_url) VALUES ($1, $2, $3) RETURNING *',
            [enTitle, thTitle, pdfUrl]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding catalogue:', err);
        res.status(500).json({ error: 'Failed to add catalogue' });
    }
});

app.delete('/api/catalogues/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM catalogues WHERE id = $1', [id]);
        res.json({ message: 'Catalogue deleted successfully' });
    } catch (err) {
        console.error('Error deleting catalogue:', err);
        res.status(500).json({ error: 'Failed to delete catalogue' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
