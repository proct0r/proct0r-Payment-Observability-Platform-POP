import express from "express";
import dotenv from "dotenv";
import client from "prom-client";

import "./metrics.js";
import logger from "./logger.js";

import {connectDatabase}
from "./database.js";

import {
collectPaymentMetrics
}
from "./collector.js";


dotenv.config();


const app = express();

const PORT = process.env.PORT || 9400;


app.get("/health",(req,res)=>{
    res.json({
        status:"UP",
        service:"Payment Observability Exporter"
    });
});


app.get("/metrics", async(req,res)=>{

    try{

        res.setHeader(
            "Content-Type",
            client.register.contentType
        );


        const metrics =
        await client.register.metrics();


        res.send(metrics);


    }catch(error){

        logger.error(
            "Metrics generation failed",
            error
        );

        res.status(500)
        .send(error.message);
    }

});


await connectDatabase();


setInterval(
    collectPaymentMetrics,
    60000
);


app.listen(PORT,()=>{

    logger.info(
        `Payment exporter running on port ${PORT}`
    );

});