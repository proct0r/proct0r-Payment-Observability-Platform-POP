import {getDatabase} from "./database.js";

import {
    transactionSummaryQuery
}
from "./queries.js";


import {
    transactionVolume,
    approvedTransactions,
    customerDeclines,
    systemDeclines
}
from "./metrics.js";


import logger from "./logger.js";



export async function collectPaymentMetrics(){


    try{


        const pool =
        getDatabase();


        if(!pool){

            logger.warn(
                "Database connection unavailable"
            );

            return;

        }

                const [rows] = await pool.query(transactionSummaryQuery);

                const data = rows[0];


        transactionVolume.inc(
            Number(data.total_transactions)
        );


        approvedTransactions.inc(
            Number(data.approved_transactions)
        );


        customerDeclines.inc(
            Number(data.customer_declines)
        );


        systemDeclines.inc(
            Number(data.system_declines)
        );


        logger.info(
            "Payment metrics updated"
        );


    }
    catch(error){


        logger.error(
            "Metric collection failed",
            error
        );


    }


}