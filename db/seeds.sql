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
VALUES ("Jadyn", "Reese", 1),
       ("Gideon", "Gregory", 2),
       ("Genesis", "Jen", 3),
       ("Arden", "Aimee", 4),
       ("Paul", "Davie", 5),
       ("Lissa", "Sylvia", 6),
       ("Jannine", "Kianna", 7),
       ("Marshall", "Douglas", 8);

-- add manager id to employee data --
UPDATE employee
SET manager_id = 1 WHERE id = 2;
UPDATE employee
SET manager_id = 3  WHERE id = 4;
UPDATE employee
SET manager_id = 5  WHERE id = 6;
UPDATE employee
SET manager_id = 7  WHERE id = 8;