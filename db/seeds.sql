-- department --
INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Marketing"),
       ("IT"),
       ("Finance"),
       ("Operations");

-- role --
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Manager", 80000, 1),
       ("Marketing Manager", 90000, 2),
       ("Engineering Manager", 250000, 3),
       ("Software Engineer", 150000, 3),
       ("Finance Manager", 120000, 4),
       ("Operations Manager", 75000, 5);
       
-- employee --
INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Mike", "James", 1, 3),
       ("James", "Johnson", 2, 4),
       ("Hildalgo", "Donald", 3, null),
       ("Jeff", "Jones", 4, 2),
       ("Mary", "Hemsworth", 4, 3),
       ("Samantha", "Goggins", 5, null),
       ("Catherine", "Stevens", 6, 7);

