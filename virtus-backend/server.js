const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Virtus Backend API',
            version: '1.0.0',
            description: 'API documentation for Virtus Backend'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server'
            }
        ]
    },
    apis: ['./server.js'] // Scan server.js for JSDoc comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

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

// Swagger UI Route - MUST be before API routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

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

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images (jpg, jpeg, png, gif) and PDF files are allowed!'));
        }
    }
});

// Upload Endpoint
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: No file uploaded
 */
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

// PostgreSQL Connection Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Routes

// --- Category Routes ---
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of all categories
 */
app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY sort_order ASC, id ASC');
        const categories = result.rows.map(row => ({
            id: row.id,
            enTitle: row.en_title,
            thTitle: row.th_title,
            imageUrl: row.image_url,
            sortOrder: row.sort_order
        }));
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               enTitle:
 *                 type: string
 *               thTitle:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */
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

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enTitle:
 *                 type: string
 *               thTitle:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
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

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
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
/**
 * @swagger
 * /api/products/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products and category information
 *       404:
 *         description: Category not found
 */
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

        const productsResult = await pool.query('SELECT * FROM products WHERE category_id = $1 ORDER BY sort_order ASC, id ASC', [categoryId]);
        const products = productsResult.rows.map(row => ({
            id: row.id,
            categoryId: row.category_id,
            enName: row.en_name,
            thName: row.th_name,
            imageUrl: row.image_url,
            pdfUrl: row.pdf_url,
            sortOrder: row.sort_order
        }));

        res.json({ category, products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               enName:
 *                 type: string
 *               thName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               pdfUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enName:
 *                 type: string
 *               thName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               pdfUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { enName, thName, imageUrl, pdfUrl } = req.body;
    try {
        const result = await pool.query(
            'UPDATE products SET en_name = $1, th_name = $2, image_url = $3, pdf_url = $4 WHERE id = $5 RETURNING *',
            [enName, thName, imageUrl, pdfUrl, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
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
/**
 * @swagger
 * /api/catalogues:
 *   get:
 *     summary: Get all catalogues
 *     tags:
 *       - Catalogues
 *     responses:
 *       200:
 *         description: List of all catalogues
 */
app.get('/api/catalogues', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM catalogues ORDER BY sort_order ASC, id DESC');
        const catalogues = result.rows.map(row => ({
            id: row.id,
            enTitle: row.en_title,
            thTitle: row.th_title,
            pdfUrl: row.pdf_url,
            sortOrder: row.sort_order
        }));
        res.json(catalogues);
    } catch (err) {
        console.error('Error fetching catalogues:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @swagger
 * /api/catalogues:
 *   post:
 *     summary: Create a new catalogue
 *     tags:
 *       - Catalogues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enTitle:
 *                 type: string
 *               thTitle:
 *                 type: string
 *               pdfUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catalogue created successfully
 */
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

/**
 * @swagger
 * /api/catalogues/{id}:
 *   put:
 *     summary: Update a catalogue
 *     tags:
 *       - Catalogues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enTitle:
 *                 type: string
 *               thTitle:
 *                 type: string
 *               pdfUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catalogue updated successfully
 */
app.put('/api/catalogues/:id', async (req, res) => {
    const { id } = req.params;
    const { enTitle, thTitle, pdfUrl } = req.body;
    try {
        const result = await pool.query(
            'UPDATE catalogues SET en_title = $1, th_title = $2, pdf_url = $3 WHERE id = $4 RETURNING *',
            [enTitle, thTitle, pdfUrl, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating catalogue:', err);
        res.status(500).json({ error: 'Failed to update catalogue' });
    }
});

/**
 * @swagger
 * /api/catalogues/{id}:
 *   delete:
 *     summary: Delete a catalogue
 *     tags:
 *       - Catalogues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catalogue deleted successfully
 */
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

// --- Reorder Route ---
/**
 * @swagger
 * /api/reorder:
 *   post:
 *     summary: Reorder items in a collection
 *     tags:
 *       - Reorder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [categories, products, catalogues]
 *               order:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid reorder data
 */
app.post('/api/reorder', async (req, res) => {
    const { type, order } = req.body; // type: 'categories', 'products', 'catalogues'; order: [id1, id2, ...]

    if (!['categories', 'products', 'catalogues'].includes(type) || !Array.isArray(order)) {
        return res.status(400).json({ error: 'Invalid reorder data' });
    }

    try {
        // Use a transaction for bulk update
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            for (let i = 0; i < order.length; i++) {
                // Ensure id type matches (categories uses VARCHAR, others use SERIAL/INT)
                // Use i * 10 or just i as the order
                await client.query(`UPDATE ${type} SET sort_order = $1 WHERE id = $2`, [i, order[i]]);
            }
            await client.query('COMMIT');
            res.json({ message: 'Order updated successfully' });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Reorder error:', err);
        res.status(500).json({ error: 'Failed to set new order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
