/* Replace with your SQL commands */
create type status as enum ('active','complete');
CREATE TABLE orders(
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
status status
);