CREATE TABLE transactions
(

id INT IDENTITY PRIMARY KEY,

transaction_date DATETIME DEFAULT GETDATE(),

amount DECIMAL(18,2),

response_code VARCHAR(10),

decline_type VARCHAR(20)

);



INSERT INTO transactions
(amount,response_code,decline_type)

VALUES

(5000,'00',NULL),

(10000,'00',NULL),

(2000,'51','CUSTOMER'),

(7000,'96','SYSTEM');