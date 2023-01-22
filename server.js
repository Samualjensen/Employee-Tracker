// node modules and requirements 
const mysql = require('mysql2');
const inquirer = require('inquirer');
const console = require('console.table');
const util = require('util');
const { query } = require('express');
// const { application } = require('express');

// port and express variable
const PORT = process.env.PORT || 3001;
const app = express();

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
        name: 'action',
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
function viewDepartment() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if(err) throw err;
        console.log('/n/n')
        console.table(res);
    });
    startPrompt();
};

// view all roles
function viewRole() {
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.log('/n/n')
        console.table(res);
    });
    startPrompt();
};

// view all employees
function viewEmployee() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`, (err, res) => {
      if (err) throw err;
      console.log('/n/n');
      console.table(res); 
    });
    startPrompt();
};



