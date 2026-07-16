import client from "prom-client";


client.collectDefaultMetrics();


export const transactionVolume = new client.Counter({

    name:
    "payment_transaction_volume_total",

    help:
    "Total payment transaction volume"

});


export const successfulTransactions = new client.Counter({

    name:
    "payment_successful_transactions_total",

    help:
    "Total successful transactions"

});


export const failedTransactions = new client.Counter({

    name:
    "payment_failed_transactions_total",

    help:
    "Total failed transactions"

});