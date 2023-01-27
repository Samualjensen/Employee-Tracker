// node modules and requirements
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

// connect to employee_db database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass0001',
    database: 'employees_db',
});

// if connected to database console.log, if error throw error
db.connect((err) => {
    if (err) throw err
    console.log(`Connected to employee_db database.`);
    startPrompt()
});

// questions array for intial prompt
const questions = [
    {
        type: "list",
        name: "Selection",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Quit"
        ],
    }
]

// start of initial prompt
function startPrompt() {
    inquirer.prompt(questions).then(response => {
        switch (response.Selection) {
            case "View All Departments":
                viewAllDepartments();
                break;

            case "View All Roles":
                viewAllRoles();
                break;

            case "View All Employees":
                viewAllEmployees();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                addRole();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Update Employee Role":
                updateEmployeeRole();
                break

            default:
                quit();
                break;
        }
    });
}

// view all departments
function viewAllDepartments() {
    // query database
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err;
        console.table(data)
        startPrompt();
    })
}

// view all roles
function viewAllRoles() {
    // query database
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`, (err, data) => {
        if (err) throw err;
        console.table(data);
        startPrompt();
    });
}

// view all employees
function viewAllEmployees() {
    // query database
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`, (err, data) => {
        if (err) throw err
        console.table(data)
        startPrompt();
    })
}

// add department
function addDepartment() {
    // query database
    db.query(`SELECT MAX(id) as max_id FROM department`, (err, data) => {
        if (err) throw err;
        const maxId = data[0].max_id;
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the department?"
        }]).then(response => {
            // query database
            db.query(`INSERT INTO department (id, name) VALUES (${maxId + 1}, '${response.name}')`, (err) => {
                if (err) throw err;
                console.log(`The ${response.name}department has been added.`);
                startPrompt();
            });
        });
    });
}

// add role
function addRole() {
    // query database
    db.query(`SELECT id, name FROM department`, (err, data) => {
        if (err) throw err
        console.table(data);
        // query database
        db.query(`SELECT MAX(id) as max_id FROM role`, (err, data) => {
            if (err) throw err
            const nextId = data[0].max_id + 1;
            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the title of the role?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of the role?"
                },
                {
                    type: "input",
                    name: "department_id",
                    message: "What is the ID of the department for the role?"
                }
            ]).then(response => {
                // query database
                db.query(`SELECT * FROM department WHERE id = ${response.department_id}`, (err, data) => {
                    if (err) throw err
                    if (data.length === 0) {
                        console.log("This department does not exist.")
                        return addRole();
                    }
                });
                // query database
                db.query(`INSERT INTO role (id, title, salary, department_id) VALUES (${nextId}, '${response.title}', ${response.salary}, ${response.department_id})`, (err) => {
                    if (err) throw err
                    console.log(`The ${response.title} role has been added with a salary of $${response.salary}.`)
                    startPrompt();
                });
            });
        });
    });
}

// add employee
function addEmployee() {
    // query database
    db.query(`SELECT id, title FROM role`, (err, data) => {
        if (err) throw err
        console.table(data)
        // query database
        db.query(`SELECT MAX(id) as max_id FROM employee`, (err, data) => {
            if (err) throw err
            const nextId = data[0].max_id + 1;
            // query database
            db.query(`SELECT id, concat(first_name,' ',last_name) as name FROM employee`, (err, data) => {
                if (err) throw err
                console.table(data)
                inquirer.prompt([{
                    type: "input",
                    name: "first_name",
                    message: "What is the employee's first name?"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the employee's last name?"
                },
                {
                    type: "input",
                    name: "role_id",
                    message: "What is the employee's role ID?"
                },
                {
                    type: "input",
                    name: "manager_id",
                    message: "What is the employee's manager's ID?"
                }]).then(response => {
                    // query database
                    db.query(`SELECT * FROM role WHERE id = ${response.role_id}`, (err, data) => {
                        if (err) throw err
                        if (data.length === 0) {
                            console.log("Please enter a valid role ID.")
                            return addEmployee();
                        }
                    })
                    if (response.manager_id && response.manager_id.length > 0) {
                        // query database
                        db.query(`SELECT * FROM employee WHERE id = ${response.manager_id}`, (err, data) => {
                            if (err) throw err
                            if (data.length === 0) {
                                console.log("Please enter a valid manager's ID.")
                                return addEmployee();
                            }
                        })
                        // query database
                        db.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${nextId},'${response.first_name}', '${response.last_name}', ${response.role_id}, ${response.manager_id})`, (err, data) => {
                            if (err) throw err
                            console.log("The employee has been added to the database.")
                            startPrompt();
                        })
                    } else {
                        // query database
                        db.query(`INSERT INTO employee (id, first_name, last_name, role_id) VALUES (${nextId},'${response.first_name}', '${response.last_name}', ${response.role_id})`, (err, data) => {
                            if (err) throw err
                            console.log("The employee has been added to the database.")
                            startPrompt();
                        })
                    }
                })
            })
        })
    })
}

// update employee role
function updateEmployeeRole() {
    // query database
    db.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) as name, role.title as current_role FROM employee LEFT JOIN role ON employee.role_id = role.id`, (err, data) => {
        if (err) throw err
        console.table(data)
        inquirer.prompt([{
            type: "input",
            name: "employee_id",
            message: "Enter the ID of the employee you want to update."
        },
        {
            type: "input",
            name: "new_role_id",
            message: "What is the employee's new role ID?"
        },
        {
            type: "input",
            name: "new_manager_id",
            message: "What is the employee's new manager's ID?"
        }]).then(response => {
            // query database
            db.query(`SELECT * FROM role WHERE id = ${response.newRoleId}`, (err, data) => {
                if (err) throw err
                if (data.length === 0) {
                    console.log("Please enter a valid role ID.")
                    return updateEmployeeRole();
                }
            })
            // query database
            db.query(`UPDATE employee SET role_id = ${response.newRoleId}, manager_id = ${response.newManagerId} WHERE id = ${response.employeeId}`, (err, data) => {
                if (err) throw err
                console.log("Employee's role and manager have been updated.")
                startPrompt();
            })
        })
    })
}

// quit application
function quit() {
    db.end(function (err) {
        if (err) throw err;
        console.log('Goodbye.');
        process.exit();
    });
}