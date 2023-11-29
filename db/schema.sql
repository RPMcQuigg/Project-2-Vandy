-- Change db name
DROP DATABASE IF EXISTS gig_work_db;
CREATE DATABASE gig_work_db;

USE gig_work_db;

CREATE TABLE workdays(
    log_date DATE NOT NULL PRIMARY KEY,
    revenue DECIMAL,
    expenses DECIMAL,
    driving_hours INT,
    miles INT,
    rain BOOLEAN,
    temp INT
);
