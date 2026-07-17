import dotenv from "dotenv";

import { connectDatabase }
from "./database.js";

import { generateTransaction }
from "./paymentGenerator.js";

dotenv.config();

await connectDatabase();

console.log(
    "Payment Traffic Simulator Started"
);

setInterval(async () => {

    await generateTransaction();

}, 2000);