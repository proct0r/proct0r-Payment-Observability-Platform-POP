import {getDatabase}
from "./database.js";


import {
transactionVolumeNaira,
successRate,
transactionsPerSecond,
responseCodeCounter,
channelTransactions,
networkTransactions
}
from "./metrics.js";


import {
paymentMetricsQuery
}
from "./queries.js";

export async function collectPaymentMetrics(){
const pool=getDatabase();
if(!pool){
return;
}

const [rows]=
await pool.query(
paymentMetricsQuery
);

let total=0;
let approved=0;
let volume=0;



rows.forEach(row=>{


total += Number(row.total_transactions);
approved += Number(row.approved_transactions);
volume += Number(row.total_volume);



responseCodeCounter
.labels(row.response_code)
.inc(
Number(row.total_transactions)
);



channelTransactions
.labels(row.channel)
.inc(
Number(row.total_transactions)
);



networkTransactions
.labels(row.network)
.inc(
Number(row.total_transactions)
);
});

transactionVolumeNaira.set(volume);

successRate.set(
    total > 0
    ?
    Number(((approved / total) * 100).toFixed(2))
    :
    0
);

transactionsPerSecond.set(
total / 60
);
}