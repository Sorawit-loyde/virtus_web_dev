const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const setupDatabase = async () => {
    try {
        console.log('--- Starting Database Setup ---');

        // 1. Create Categories Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id VARCHAR(50) PRIMARY KEY,
                en_title VARCHAR(255) NOT NULL,
                th_title VARCHAR(255) NOT NULL,
                image_url TEXT
            );
        `);
        console.log('✅ Categories table ready');

        // 2. Create Products Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                category_id VARCHAR(50) REFERENCES categories(id) ON DELETE CASCADE,
                en_name VARCHAR(255) NOT NULL,
                th_name VARCHAR(255) NOT NULL,
                spec TEXT
            );
        `);

        // 3. Ensure image_url column exists in products (Migration)
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                               WHERE table_name='products' AND column_name='image_url') THEN
                    ALTER TABLE products ADD COLUMN image_url TEXT;
                END IF;
            END $$;
        `);
        console.log('✅ Products table and image_url column ready');

        console.log('--- Database Setup Completed Successfully ---');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error setting up database:', err);
        process.exit(1);
    }
};

setupDatabase();
