const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

        // Map database naming (snake_case) to frontend naming (camelCase)
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
        // Fetch the category details first
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

        // Fetch products for this category
        const productsResult = await pool.query('SELECT * FROM products WHERE category_id = $1', [categoryId]);

        const products = productsResult.rows.map(row => ({
            id: row.id,
            categoryId: row.category_id,
            enName: row.en_name,
            thName: row.th_name,
            spec: row.spec
        }));

        res.json({
            category: category,
            products: products
        });
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
