-- department --
INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("IT"),
       ("Finance"),
       ("Operations");

SELECT * FROM department;

-- role --
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 80000, 1),
       ("Marketing Manager", 90000, 2),
       ("Engineering Manager", 250000, 3),
       ("Software Engineer", 150000, 3),
       ("Finance Manager", 120000, 4),
       ("Operations Manager", 75000, 5);

SELECT * FROM role;
       
-- employee --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "James", 1, null),
       ("James", "Johnson", 2, null),
       ("Hildalgo", "Donald", 3, null),
       ("Jeff", "Jones", 4, 3),
       ("Mary", "Hemsworth", 4, 3),
       ("Samantha", "Goggins", 5, null),
       ("Catherine", "Stevens", 6, null);

SELECT * FROM employee;