const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const setupDatabase = async () => {
    try {
        console.log('--- Starting Database Setup (Clean Schema) ---');

        // 1. Create Categories Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id VARCHAR(50) PRIMARY KEY,
                en_title VARCHAR(255) NOT NULL,
                th_title VARCHAR(255) NOT NULL,
                sort_order INTEGER DEFAULT 0,
                image_url TEXT
            );
        `);
        console.log('✅ Categories table ready: id, en_title, th_title, sort_order, image_url');

        // 2. Create Products Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
                en_name VARCHAR(255) NOT NULL,
                th_name VARCHAR(255) NOT NULL,
                sort_order INTEGER DEFAULT 0,
                image_url TEXT,
                pdf_url TEXT
            );
        `);

        // Migration check for products and sort_order
        await pool.query(`
            DO $$ 
            BEGIN 
                -- Normal Columns
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='image_url') THEN
                    ALTER TABLE products ADD COLUMN image_url TEXT;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='pdf_url') THEN
                    ALTER TABLE products ADD COLUMN pdf_url TEXT;
                END IF;
                -- Sort Order Columns
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='categories' AND column_name='sort_order') THEN
                    ALTER TABLE categories ADD COLUMN sort_order INTEGER DEFAULT 0;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='products' AND column_name='sort_order') THEN
                    ALTER TABLE products ADD COLUMN sort_order INTEGER DEFAULT 0;
                END IF;
            END $$;
        `);
        console.log('✅ Products table ready: id, category_id, en_name, th_name, sort_order, image_url, pdf_url');

        // 3. Create Catalogues Table
        // Catalogues is always dropped and recreated in this script's current logic, 
        // but let's make it consistent.
        await pool.query('DROP TABLE IF EXISTS catalogues;');
        await pool.query(`
            CREATE TABLE catalogues (
                id SERIAL PRIMARY KEY,
                en_title VARCHAR(255) NOT NULL,
                th_title VARCHAR(255) NOT NULL,
                pdf_url TEXT NOT NULL,
                sort_order INTEGER DEFAULT 0
            );
        `);
        console.log('✅ Catalogues table ready: id, en_title, th_title, pdf_url, sort_order');

        console.log('--- Database Setup Completed Successfully ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error setting up database:', err);
        process.exit(1);
    }
};

setupDatabase();
