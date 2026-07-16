export const paymentMetricsQuery = `

SELECT
COUNT(*) total_transactions,
SUM(amount) total_volume,

SUM(
CASE
WHEN response_code='00'
THEN 1
ELSE 0
END
) approved_transactions,
response_code,
channel,
network
FROM transactions
GROUP BY
response_code,
channel,
network;

`;