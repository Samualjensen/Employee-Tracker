-- drop and create new database --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- use new database --
USE employee_db;

-- create new table --
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL
);

-- create new table --
CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    -- FOREIGN KEY(department_id) REFERENCES department(id)
    PRIMARY KEY(id)
);

-- create new table --
CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    -- FOREIGN KEY (roles_id) REFERENCES roles(id),
    manager_id INT,
    -- FOREIGN KEY (manager_id) REFERENCES employee(id)
    PRIMARY KEY(id)
);
