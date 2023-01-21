INSERT INTO department (id, department_name)
VALUES (001, "Human Resources"),
       (002, "Accounting"),
       (003, "Payroll");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "secretary", 40000, 76),
       (002, "accountant", 70000, 89 ),
       (003, "bookkeeper", 50000, 98); 


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "Steve", "Jobs", 65, 23),
       (002, "Nancy", "Johnson", 56, 23),
       (003, "Jeff", "Webster", 78, 23);         