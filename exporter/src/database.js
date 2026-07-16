import mysql from "mysql2/promise";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

let pool;

export async function connectDatabase() {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10
        });

        await pool.query("SELECT 1");

        logger.info("Connected to MySQL");

        return pool;
    } catch (error) {
        logger.error("Database connection failed", error);
        throw error;
    }
}

export function getDatabase() {
    return pool;
}