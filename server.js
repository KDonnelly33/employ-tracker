// imports express and mysql2
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// imports port and connection to database
const PORT = process.env.PORT || 3001;
// initializes express app
const app = express();
// imports middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// connects to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Pacosucks88',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
const initquestions = [
    {
        type: 'list',
        name: 'home',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add an employee', 'Add a department', 'Add a role', 'Update an employee role', 'Exit'],
    },
];
const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: 'What is the employee\'s first name?',
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'What is the employee\'s last name?',
    },
    {
        type: 'list',
        name: 'role_id',
        message: 'What is the employee\'s role?',
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
    },
    {
        type: 'list',
        name: 'manager_id',
        message: 'Who is the employee\'s manager?',
        choices: ['Kevin Donnelly', 'Mike Smith', 'Tom Joneson', 'Joe Duck']
    },
];
const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'department_name',
        message: 'What is the name of the department you would like to add?',
    },
];
     
        
// function to initialize program
function init() {
    inquirer.prompt(initquestions)
        .then((response) => {
            console.log(response);
  
            if (response.home === 'View all employees') {
                viewEmployees();
           
            } else if (response.home === 'View all departments') {
                viewDepartments();
          

            } else if (response.home === 'View all roles') {
                viewRoles();
            }
             else if (response.home === 'Add an employee') {
                addEmployee();
            }})}
        //     } else if (response.home === 'Add a department') {
        //         addDepartment();
        //     } else if (response.home === 'Add a role') {
        //         addRole();
        //     } else if (response.home === 'Update an employee role') {
        //         updateRole();
        //     } else if (response.home === 'Exit') {
        //         console.log('Goodbye!');
        //         process.exit();
//             }
//         });
// }
// // function to view all employees
function viewEmployees() {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        console.table(rows);
        init();
    });
    }
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
        console.table(rows);
        init();
    });
    }

function viewRoles() {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }   
        console.table(rows);
        init();
    })}
function addEmployee() {
    inquirer.prompt(addEmployeeQuestions)
        .then((response) => {
            console.log(response);
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            const params = [response.first_name, response.last_name, response.role_id, response.manager_id];
            db.query(sql, params, (err, result) => {
        
                console.log('Employee added!');
                init();
            })
        })
    }
function addDepartment() {
    inquirer.prompt(addDepartmentQuestions)

init();
app.use((req, res) => {
    res.status(404).end();
  });
  // listens for server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


