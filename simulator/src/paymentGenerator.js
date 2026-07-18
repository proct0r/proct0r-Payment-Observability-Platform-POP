import { faker } from "@faker-js/faker";
import { getPool } from "./database.js";

import { generateTransaction } from "../src/paymentGenerator.js";

test("payment transaction should generate transaction object", async () => {

    const transaction = await generateTransaction();

    expect(transaction).toHaveProperty("amount");
    expect(transaction).toHaveProperty("channel");
    expect(transaction).toHaveProperty("network");

});

const channels = [
    "ATM",
    "POS",
    "WEB",
    "MOBILE"
];

const networks = [
    "VISA",
    "MASTERCARD",
    "VERVE"
];

const responseCodes = [
    "00",
    "05",
    "51",
    "54",
    "91",
    "96"
];

export async function generateTransaction() {

    const pool = getPool();

    const amount = faker.number.int({
        min: 500,
        max: 250000
    });

    const channel =
        faker.helpers.arrayElement(channels);

    const network =
        faker.helpers.arrayElement(networks);

    const responseCode =
        faker.helpers.arrayElement(responseCodes);

    const status =
        responseCode === "00"
            ? "SUCCESS"
            : "FAILED";

    const processingTime =
        faker.number.int({
            min: 20,
            max: 3000
        });

    await pool.query(
        `
        INSERT INTO payment_transactions
        (
            amount,
            channel,
            network,
            response_code,
            transaction_status,
            processing_time_ms
        )
        VALUES
        (?, ?, ?, ?, ?, ?)
        `,
        [
            amount,
            channel,
            network,
            responseCode,
            status,
            processingTime
        ]
    );

    console.log(
        `${channel} | ${network} | ₦${amount} | ${responseCode}`
    );
}