// imports express and mysql2
const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
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
    host: "localhost",
    user: "root",
    password: "Pacosucks88",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);
// Home questions
const initquestions = [
  {
    type: "list",
    name: "home",
    message: "What would you like to do?",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "Add an employee",
      "Add a department",
      "Add a role",
      "Update an employee role",
      "View total budget of a department",
      "View Employee's by department",
      "Delete and employee, role, or department",
      "View all employees by manager",
    ],
  },
];
// Add employee questions
const addEmployeeQuestions = async () => [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?",
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?",
  },
  {
    type: "list",
    name: "role_id",
    message: "What is the employee's role?",
    choices: await getEmpRole(),
  },
  {
    type: "list",
    name: "manager_id",
    message: "Who is the employee's manager?",
    choices: await getEmployees(),
  },
];
// Add role questions
const addRoleQuestions = async () => [
  {
    type: "input",
    name: "title",
    message: "What is the name of the role you would like to add?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of the role you would like to add?",
  },
  {
    type: "list",
    name: "department_id",
    message: "What is the department of the role you would like to add?",
    choices: await getDepartments(),
  },
];
// add department questions
const addDepartmentQuestions = [
  {
    type: "input",
    name: "department_name",
    message: "What is the name of the department you would like to add?",
  },
];
// update employee role questions
const updateRoleQuestions = async () => [
  {
    type: "list",
    name: "employee_id",
    message: "Which employee's role would you like to update?",
    choices: await getEmployees(),
  },
  {
    type: "list",
    name: "role_id",
    message: "What is the employee's new role?",
    choices: await getEmpRole(),
  },
];
const viewEmpByDeptQuestions = async () => [
  {
    type: "list",
    name: "department_id",
    message: "Which department would you like to view?",
    choices: await getDepartments(),
  },
];
// delete employee, role, or department questions
const deleteItemQuestions = [
  {
    type: "list",
    name: "delete",
    message: "What would you like to delete?",
    choices: ["Employee", "Role", "Department"],
  },
];
// delete employee, role, or department questions
const deleteEmployeeQuestions = async () => [
  {
    type: "list",
    name: "employee_id",
    message: "Which employee would you like to delete?",
    choices: await getEmployees(),
  },
];
// delete employee, role, or department questions
const deleteRoleQuestions = async () => [
  {
    type: "list",
    name: "role_id",
    message: "Which role would you like to delete?",
    choices: await getEmpRole(),
  },
];
// delete employee, role, or department questions
const deleteDepartmentQuestions = async () => [
  {
    type: "list",
    name: "department_id",
    message: "Which department would you like to delete?",
    choices: await getDepartments(),
  },
];
const viewEmpByManQuestions = async () => [
  {
    type: "list",
    name: "manager_id",
    message: "Which manager would you like to view?",
    choices: await getEmployees(),
  },
];
// Get employee roles
const getEmpRole = async () => {
  const [rows, fields] = await db
    .promise()
    .query(`SELECT title AS name, id AS value FROM role`);
  return rows;
};
// get employees for manager role
const getEmployees = async () => {
  const [rows, fields] = await db
    .promise()
    .query(
      `SELECT CONCAT(first_name, " ", last_name) AS name, id AS value FROM employee`
    );
  return rows;
};
// get departments for role
const getDepartments = async () => {
  const [rows, fields] = await db
    .promise()
    .query(`SELECT department_name AS name, id AS value FROM department`);
  return rows;
};

// function to initialize program
function init() {
  inquirer.prompt(initquestions).then((response) => {
    //   if else statements for user input to call function for each choice
    if (response.home === "View all employees") {
      viewEmployees();
    } else if (response.home === "View all departments") {
      viewDepartments();
    } else if (response.home === "View all roles") {
      viewRoles();
    } else if (response.home === "Add an employee") {
      addEmployee();
    } else if (response.home === "Add a role") {
      addRole();
    } else if (response.home === "Add a department") {
      addDepartment();
    } else if (response.home === "Update an employee role") {
      updateRole();
    } else if (response.home === "View total budget of a department") {
      viewBudget();
    } else if (response.home === "View Employee's by department") {
      viewEmpByDept();
    } else if (response.home === "Delete and employee, role, or department") {
      deleteItem();
    } else if (response.home === "View all employees by manager") {
      viewEmpByMan();
    }
    
  });
}
// function fot view all employees
function viewEmployees() {
  const sql = `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS employee, role.title, department.department_name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;
  db.query(sql, (err, rows) => {
    console.table(rows);
    init();
  });
}
// function for view all departments
function viewDepartments() {
  const sql = `SELECT id AS value, department_name AS name FROM department`;
  db.query(sql, (err, rows) => {
    console.table(rows);
    init();
  });
}
// function for view all roles
function viewRoles() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    console.table(rows);
    init();
  });
}
// function for add employee
async function addEmployee() {
  inquirer.prompt(await addEmployeeQuestions()).then((response) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [
      response.first_name,
      response.last_name,
      response.role_id,
      response.manager_id,
    ];
    db.query(sql, params, (err, result) => {
      console.log("Employee added!");
      init();
    });
  });
}
//  function for add role
async function addRole() {
  inquirer.prompt(await addRoleQuestions()).then((response) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [response.title, response.salary, response.department_id];
    db.query(sql, params, (err, result) => {
      console.log("Role added!");
      init();
    });
  });
}
// function for add department
function addDepartment() {
  inquirer.prompt(addDepartmentQuestions).then((response) => {
    const sql = `INSERT INTO department (department_name) VALUES (?)`;
    const params = [response.department_name];
    db.query(sql, params, (err, result) => {
      console.log("Department added!");
      init();
    });
  });
}
// function for update employee role
async function updateRole() {
  inquirer.prompt(await updateRoleQuestions()).then((response) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [response.role_id, response.employee_id];
    db.query(sql, params, (err, result) => {
      console.log("Employee role updated!");
      init();
    });
  });
}
// function for view budget
function viewBudget() {
  const sql = `SELECT department.department_name AS department, SUM(role.salary) AS budget FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id GROUP BY department.department_name`;
  db.query(sql, (err, rows) => {
    console.table(rows);
    init();
  });
}
// function to view employees by department
async function viewEmpByDept() {
  inquirer.prompt(await viewEmpByDeptQuestions()).then((response) => {
    const sql = `Select CONCAT(employee.first_name, " ", employee.last_name) AS employee, role.title, department.department_name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?`;
    const params = [response.department_id];
    db.query(sql, params, (err, rows) => {
      console.table(rows);
      init();
    });
  });
}
//fuction to delete employee, role, or department
async function deleteItem() {
  inquirer.prompt(deleteItemQuestions).then((response) => {
    if (response.delete === "Employee") {
      deleteEmployee();
    } else if (response.delete === "Role") {
      deleteRole();
    } else if (response.delete === "Department") {
      deleteDepartment();
    }
  });
}
// function to delete employee
async function deleteEmployee() {
  inquirer.prompt(await deleteEmployeeQuestions()).then((response) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = [response.employee_id];
    db.query(sql, params, (err, result) => {
      console.log("Employee deleted!");
      init();
    });
  });
}
// function to delete role
async function deleteRole() {
  inquirer.prompt(await deleteRoleQuestions()).then((response) => {
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [response.role_id];
    db.query(sql, params, (err, result) => {
      console.log("Role deleted!");
      init();
    });
  });
}
// function to delete department
async function deleteDepartment() {
  inquirer.prompt(await deleteDepartmentQuestions()).then((response) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [response.department_id];
    db.query(sql, params, (err, result) => {
      console.log("Department deleted!");
      init();
    });
  });
}
// function to view employees by manager
async function viewEmpByMan() {
  inquirer.prompt(await viewEmpByManQuestions()).then((response) => {
    const sql = `Select CONCAT(employee.first_name, " ", employee.last_name) AS employee, role.title, department.department_name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id WHERE manager.id = ?`;
    const params = [response.manager_id];
    db.query(sql, params, (err, rows) => {
      console.table(rows);
      init();
    });
  });
}

// // initializes program
init();
app.use((req, res) => {
  res.status(404).end();
});
// listens for server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
