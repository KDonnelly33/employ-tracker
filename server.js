// imports express and mysql2
const inquirer = require("inquirer");
// imports port and connection to database
const db = require("./connection")
const  {initquestions, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateRoleQuestions, viewEmpByDeptQuestions, deleteDepartmentQuestions, deleteItemQuestions, deleteEmployeeQuestions, deleteRoleQuestions} =require("./question")




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


// // initializes program
init();

