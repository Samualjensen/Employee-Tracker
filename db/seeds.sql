-- department table -- 
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

-- role table --
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000 , 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

-- employee table --
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
       ("Max", "Power", 2),
       ("Pam", "Arnold", 3),
       ("Mike", "Mitchell", 4),
       ("Nick", "Wiger", 5),
       ("Jim", "Johnson", 6),
       ("Sue", "Bird", 7),
       ("Jessica", "Jones", 8);