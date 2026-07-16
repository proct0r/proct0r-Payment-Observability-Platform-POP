import sql from "mssql";
import dotenv from "dotenv";
import logger from "./logger.js";


dotenv.config();


const config = {

    server: process.env.DB_HOST,

    port: Number(process.env.DB_PORT),

    database: process.env.DB_NAME,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    options:{
        encrypt:false,
        trustServerCertificate:true
    }

};


let pool;


export async function connectDatabase(){

    try{

        pool = await sql.connect(config);

        logger.info("Database connection established");

        return pool;

    }
    catch(error){

        logger.error(
            "Database connection failed",
            error
        );

        throw error;

    }

}


export function getDatabase(){

    return pool;

}