import client from "prom-client";


export const paymentSuccessRatePercentage =
new client.Gauge({
    name:
    "payment_success_rate_percentage",

    help:
    "Percentage of successful payment transactions"
});


export const paymentTransactionsPerSecond =
new client.Gauge({
    name:
    "payment_transactions_per_second",

    help:
    "Payment transactions processed per second"
});


export const paymentTransactionVolumeNaira =
new client.Gauge({
    name:
    "payment_transaction_volume_naira",

    help:
    "Total payment transaction volume in Naira"
});


export const paymentSwitchUptimePercentage =
new client.Gauge({
    name:
    "payment_switch_uptime_percentage",

    help:
    "Payment switch availability percentage"
});


export const paymentResponseCodeTotal =
new client.Gauge({
    name:
    "payment_response_code_total",

    help:
    "Payment transactions grouped by response code",

    labelNames:[
        "response_code"
    ]
});


export const paymentChannelTransactions =
new client.Gauge({
    name:
    "payment_channel_transactions",

    help:
    "Payment transactions grouped by channel",

    labelNames:[
        "channel"
    ]
});


export const paymentNetworkTransactions =
new client.Gauge({
    name:
    "payment_network_transactions",

    help:
    "Payment transactions grouped by network",

    labelNames:[
        "network"
    ]
});