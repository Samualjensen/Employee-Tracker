-- drop and create new database --
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- use new database --
USE company_db;

-- create new table --
CREATE TABLE department (
    id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- create new table --
CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

-- create new table --
CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id)
);
