/* Replace with your SQL commands */
CREATE TABLE users (
id SERIAL PRIMARY KEY,
firstName VARCHAR(255) NOT NULL,
lastName VARCHAR(255) NOT NULL,
username varchar(255) UNIQUE NOT NULL,
password varchar(255) NOT NULL
);