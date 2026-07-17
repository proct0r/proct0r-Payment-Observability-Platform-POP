import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool;

export async function connectDatabase() {

    pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10
    });

    console.log("Simulator connected to MySQL");
}

export function getPool() {
    return pool;
}