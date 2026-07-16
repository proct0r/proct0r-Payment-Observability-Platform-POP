import client from "prom-client";


client.collectDefaultMetrics();



export const transactionVolumeNaira =
new client.Gauge({
    name:
    "payment_transaction_volume_naira",
    help:
    "Total payment transaction amount processed in NGN"
});



export const transactionsPerSecond =
new client.Gauge({
    name:
    "payment_transactions_per_second",
    help:
    "Current payment transaction throughput"
});



export const successRate =
new client.Gauge({
    name:
    "payment_success_rate_percentage",
    help:
    "Percentage of successful transactions"
});



export const responseCodeCounter =
new client.Counter({
    name:
    "payment_response_code_total",
    help:
    "Transactions grouped by ISO8583 response code",
    labelNames:[
        "response_code"
    ]
});



export const channelTransactions =
new client.Counter({
    name:
    "payment_channel_transactions",
    help:
    "Transactions grouped by channel",
    labelNames:[
        "channel"
    ]
})

export const networkTransactions =
new client.Counter({
    name:
    "payment_network_transactions",
    help:
    "Transactions grouped by network",
    labelNames:[
        "network"
    ]
});


export const switchUptime =
new client.Gauge({
    name:
    "payment_switch_uptime_percentage",
    help:
    "Payment switch availability percentage"
});


export const exporterHealth =
new client.Gauge({
    name:
    "payment_exporter_health",
    help:
    "Exporter service health"
});


exporterHealth.set(1);

switchUptime.set(99.99);