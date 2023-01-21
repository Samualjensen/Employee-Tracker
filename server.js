// node modules and requirements 
const mysql = require('mysql2');
const inquirer = require('inquirer');
const console = require('console.table');

// port and express variable
const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);



// listen to port 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});

