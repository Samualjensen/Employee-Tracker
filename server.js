// node modules and requirements 
const mysql = require('mysql2');
const inquirer = require('inquirer');
const console = require('console.table');
// const util = require('util');
// const { query } = require('express');
// const { application } = require('express');

// port and express variable
// const PORT = process.env.PORT || 3001;
// const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to employee_db database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pass0001',
        database: 'employee_db'
    });
// if there is error coonnecting to database log error
db.connect((err) => {
    if (err) {
        console.log(err);
        res.status(500);
        return res.send('Error connecting to database.');
    }
    // if succesful log connected to database
    console.log('Connected to employee_db database.');

    // function to start intial prompt
    startPrompt();
})

db.query = util.promisify(db, query);

function startPrompt() {
    inquirer.prompt({
        name: 'prompt',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all depatments',
            'View all roles',
            'View all employess',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update employee role',
        ]

    }).then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewDepartment();
                break;

            case 'View all roles':
                viewRole();
                break;

            case 'View all Employees':
                viewEmployee();
                break;

            case 'Add a department':
                addDepartment();
                break;

            case 'Add a role':
                addRole();
                break;

            case 'Add an employee':
                addEmployee();
                break;

            case 'Update employee role':
                updateEmployeeRole();
                break;
        }
    })
};

// view all departments 
const viewDepartment = () => {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.log('/n/n')
        console.table(res);
    });
    startPrompt();
};

// view all roles
const viewRole = () => {
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.log('/n/n')
        console.table(res);
    });
    startPrompt();
};

// view all employees
const viewEmployee = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`, (err, res) => {
        if (err) throw err;
        console.log('/n/n');
        console.table(res);
    });
    startPrompt();
};

// add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'Department',
            message: 'What is the name of the new department?'
        },
    ])
        .then((data) => {
            db.query(`INSERT INTO department SET`,
                {
                    name: data.newDepartment,
                },
                function (err) {
                    if (err)
                        throw err;
                });
            console.log('New department added to employee_db database.');
            viewDepartment();
        });
}

db.connect((err) => {
    if (err) throw err;
});

// add a role
const addRole = () => {
    db.query(`SELECT * FROM department`, (err, departments) => {
        if (err) console.log(err);
        departments = departments.map((department) => {
            return{
                name: department.name,
                value: department.id,
            };
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'role',
                message: 'What is the name the new role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message:'What is the salary of this role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department is this new role located at?',
                choices: departments
            },
        ])
        .then((data) => {
            db.query(`INSERT INTO role set`,
            {
                title: data.role,
                salary: data.salary,
                department: department.data
            },
            {
                function (err) {
                    if (err) throw err;
                }
            });
            console.log('New role has been added to employee_db database.')
            viewRole();
        });
    })
};

// add new employee 
const addEmployee = () => {
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) console.log(err);
        roles = roles.map((role) => {
            return {
                name: role.title,
                value: role.id
            };
        });
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of this employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of this employee?'

            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the role of this employee?',
                choices: roles
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Please select manager ID.',
                choices: [1 ,2, 3, 4, 5, 6, 7]
            }
        ])
        .then((data) => {
            console.log(data.role);
            db.query(`INSERT INTO employee SET ?`,
            {
                first_name: data.firstName,
                last_name: data.lastName,
                role_id: data.roleId,
                manager_id: data.managerId
            },
            (err) => {
                if (err) throw err;
                console.log('New employee added to employee_db database.');
                viewEmployee();
            });
        });
    });
}; 

// update employee role
const updateEmployeeRole = () => {
    db.query(`SELECT * FROM employee`, (err, employees) => {
        if (err) console.log(err);
        employees = employees.map((employee) => {
            return{
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            }
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'selectEmployee',
                meessage: 'What employee would you like to update?',
                choices: employees
            },
            {
                type: 'list',
                name: 'selectNewRole',
                message: 'What is the updated role of this employee?',
                choices: roles
            }
        ])
        .then((data) => {
            db.query(`UPDATE employee SET ? WHERE ?`, 
            [
                {
                    role_id: data.selectNewRole,
                },
                {
                    id: data.selectEmployee,
                }
            ],
                function (err) {
                    if (err) throw err;
                }
            );
            console.log('New employee role updated in the employee_db database.');
            viewEmployee();
        });
    });
};

// listen to port
// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT} 🚀`)
// );
