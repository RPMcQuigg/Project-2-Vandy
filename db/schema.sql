-- Change db name
DROP DATABASE IF EXISTS gig_work_db;
CREATE DATABASE gig_work_db;

USE gig_work_db;

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE workdays(
    log_date DATE NOT NULL PRIMARY KEY,
    revenue DECIMAL,
    expenses DECIMAL,
    driving_hours INT,
    miles INT,
    rain BOOLEAN,
    temp INT
);
