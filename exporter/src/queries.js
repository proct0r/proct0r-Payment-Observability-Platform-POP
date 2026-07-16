export const transactionSummaryQuery = `

SELECT

    COUNT(*) AS total_transactions,

    SUM(
        CASE 
            WHEN response_code = '00'
            THEN 1
            ELSE 0
        END
    ) AS approved_transactions,


    SUM(
        CASE 
            WHEN response_code <> '00'
            AND decline_type = 'CUSTOMER'
            THEN 1
            ELSE 0
        END
    ) AS customer_declines,


    SUM(
        CASE 
            WHEN response_code <> '00'
            AND decline_type = 'SYSTEM'
            THEN 1
            ELSE 0
        END
    ) AS system_declines


FROM transactions

WHERE transaction_date >= CURDATE()

`;