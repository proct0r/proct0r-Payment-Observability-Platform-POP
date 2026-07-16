import express from "express";
import dotenv from "dotenv";
import client from "prom-client";

import logger from "./logger.js";


dotenv.config();


const app = express();

const PORT =
process.env.PORT || 9400;



app.get("/health",(req,res)=>{

    res.json({

        status:"UP",

        service:
        "Payment Observability Exporter"

    });

});



app.get("/metrics",async(req,res)=>{

    res.set(
        "Content-Type",
        client.register.contentType
    );


    res.end(
        await client.register.metrics()
    );

});



app.listen(PORT,()=>{


    logger.info(

        `Payment exporter running on port ${PORT}`

    );


});