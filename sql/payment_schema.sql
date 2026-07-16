CREATE DATABASE payment_demo;
USE payment_demo;
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(18,2),
    response_code VARCHAR(10),
    channel VARCHAR(20),
    network VARCHAR(20)

);

INSERT INTO transactions
(amount,response_code,channel,network)
VALUES
(50000,'00','ATM','VISA'),
(25000,'00','POS','MASTERCARD'),
(12000,'51','ATM','VERVE'),
(8000,'96','WEB','NIBSS'),
(15000,'05','MOBILE','VISA');