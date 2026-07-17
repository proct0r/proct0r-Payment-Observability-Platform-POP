import client from "prom-client";


const syntheticPaymentTotal = new client.Counter({
    name:
    "synthetic_payment_transaction_total",
    help:
    "Total synthetic payment transactions executed"
});


const syntheticPaymentSuccess = new client.Counter({
    name:
    "synthetic_payment_success_total",
    help:
    "Successful synthetic payment transactions"
});


const syntheticPaymentFailure = new client.Counter({
    name:
    "synthetic_payment_failure_total",
    help:
    "Failed synthetic payment transactions"

});


const syntheticPaymentLatency =
new client.Histogram({
    name: "synthetic_payment_latency_seconds",
    help: "Synthetic payment transaction latency",
    buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5]
});

export function runSyntheticPaymentCheck(){

    const end =
    syntheticPaymentLatency.startTimer();
    syntheticPaymentTotal.inc();

    /*
      Demo simulation.

      Later this can call:
      - Payment API
      - Postilion simulator
      - ISO8583 test endpoint
    */

    const successful =
    Math.random() > 0.05;

    if(successful){
        syntheticPaymentSuccess.inc();

    }
    else{
        syntheticPaymentFailure.inc();

    }
    end();
}

export function startSyntheticMonitor(){

    console.log("Synthetic payment monitor started");

    // Run immediately
    runSyntheticPaymentCheck();

    // Continue every 30 seconds
    setInterval(() => {

        console.log("Running synthetic payment check");

        runSyntheticPaymentCheck();

    }, 30000);

}
