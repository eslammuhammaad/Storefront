# Storefront Project

Storefront project is backend project created with nodejs , it's an online store that provide product which make user can add more than product to his orders.
Project provide RESTful API to fetch data from database . The used technologies typescript , PostgresSQL database and jasmine for unit testing.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install all dependencies and devDependencies .

```bash
npm install
```

## Build and Running server

### run on host : 0.0.0.0:3000

To build app

```bash
npm run build
```

To run server

```bash
npm run watch
```

## Database and migrations

Using postgerSQL database running on default user on

#### port : 5432

To creat user run this query

```bash
CREATE USER backend_storefront WITH PASSWORD '0000';
```

Then creating storefront database and storefront_test database for testing by running the below queries.

```bash
CREATE DATABASE storefront ;
CREATE DATABASE storefront_test ;
```

To create Tables and relations.\
run db-migrate up command to create tables

```bash
db-migrate up
```

run db-migrate down to drop Tables and relations

```bash
db-migrate down
```

## Running tests

To run unit test.

```bash
npm run testdb
```

## API Endpoints

### User API

```bash
GET('/users')
GET('/users/:id')
POST('/users')
DELETE('/users')
POST('/users/login')
```

### Order API

```bash
GET ('/orders/:id')
POST('/orders')
POST('/orders/:id/products')
```

### Product API

```bash
GET('/products')
GET('/products/:id')
POST('/products')
DELETE('/products')
```

## Database Schema

### user table

```python
CREATE TABLE users (
id SERIAL PRIMARY KEY,
firstName VARCHAR(255) NOT NULL,
lastName VARCHAR(255) NOT NULL,
username varchar(255) UNIQUE NOT NULL,
password varchar(255) NOT NULL
);

```

### order table

```python

create type status as enum ('active','complete');
CREATE TABLE orders(
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
status status
);

```

### product table

```python

CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price INTEGER NOT NULL
);

```

### order_products table

```python

CREATE TABLE order_products(
id SERIAL PRIMARY KEY,
order_id INTEGER REFERENCES orders(id),
product_id INTEGER REFERENCES products(id),
quantity Integer
);

```
