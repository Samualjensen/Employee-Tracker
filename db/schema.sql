-- drop and create new database --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- use new database --
USE employee_db;

-- create new table --
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- create new table --
CREATE TABLE role (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id)
    REFRENCES department(id),
    PRIMARY KEY(id)
);

-- create new table --
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL
    FOREIGN KEY (role_id)
    REFRENCES role(id),
    manager_id INT
    FOREIGN KEY (manager_id)
    REFRENCES role(id),
    PRIMARY KEY(id)
);
