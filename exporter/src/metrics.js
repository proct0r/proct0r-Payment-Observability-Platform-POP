import client from "prom-client";
client.collectDefaultMetrics();

export const transactionVolume = new client.Counter({
    name:
    "payment_transaction_volume_total",
    help:
    "Total payment transaction volume processed"
});

export const approvedTransactions = new client.Counter({
    name:
    "payment_approved_transactions_total",
    help:
    "Total approved payment transactions"
});

export const customerDeclines = new client.Counter({
    name:
    "payment_customer_declines_total",
    help:
    "Transactions declined due to customer related reasons"
});

export const systemDeclines = new client.Counter({
    name:
    "payment_system_declines_total",
    help:
    "Transactions declined due to system failures"
});

export const exporterHealth = new client.Gauge({
    name:
    "payment_exporter_health",
    help:
    "Exporter availability status"
});

exporterHealth.set(1);