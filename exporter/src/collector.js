import pool from "./database.js";

import {
    paymentTransactionVolumeNaira,
    paymentSuccessRatePercentage,
    paymentTransactionsPerSecond,
    paymentResponseCodeTotal,
    paymentChannelTransactions,
    paymentNetworkTransactions
}
from "./metrics.js";


export async function collectPaymentMetrics(){

try {


    // Transaction Volume
    const [volume] =
    await pool.query(`
        SELECT 
        SUM(amount) total_volume
        FROM payment_transactions
    `);


    paymentTransactionVolumeNaira.set(
        Number(volume[0].total_volume || 0)
    );



    // Success Rate
    const [success] =
    await pool.query(`

        SELECT

        SUM(transaction_status='SUCCESS') success_count,

        COUNT(*) total_count

        FROM payment_transactions

    `);


    const total =
    Number(success[0].total_count);


    const successCount =
    Number(success[0].success_count);


    const successRate =
    total > 0
    ?
    (successCount / total) * 100
    :
    0;


    paymentSuccessRatePercentage.set(
        Number(successRate.toFixed(2))
    );



    // TPS
    const [tps] =
    await pool.query(`

        SELECT
        COUNT(*) transactions

        FROM payment_transactions

        WHERE created_at >= NOW() - INTERVAL 1 SECOND

    `);


    paymentTransactionsPerSecond.set(
        Number(tps[0].transactions)
    );



    // Response codes

    const [responses] =
    await pool.query(`

        SELECT

        response_code,

        COUNT(*) total

        FROM payment_transactions

        GROUP BY response_code

    `);


    responses.forEach(row=>{

        paymentResponseCodeTotal
        .labels(row.response_code)
        .set(Number(row.total));

    });



    // Channels

    const [channels] =
    await pool.query(`

        SELECT

        channel,

        COUNT(*) total

        FROM payment_transactions

        GROUP BY channel

    `);


    channels.forEach(row=>{

        paymentChannelTransactions
        .labels(row.channel)
        .set(Number(row.total));

    });



    // Networks

    const [networks] =
    await pool.query(`

        SELECT

        network,

        COUNT(*) total

        FROM payment_transactions

        GROUP BY network

    `);



    networks.forEach(row=>{

        paymentNetworkTransactions
        .labels(row.network)
        .set(Number(row.total));

    });



}
catch(error){

    console.error(
        "Metric collection failed",
        error
    );

}

}