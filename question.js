const {getEmpRole, getEmployees, getDepartments} = require("./helperQueries")
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
  
  // Get employee roles

 module.exports = {initquestions, addEmployeeQuestions, addRoleQuestions, addDepartmentQuestions, updateRoleQuestions, viewEmpByDeptQuestions, deleteDepartmentQuestions, deleteItemQuestions, deleteEmployeeQuestions, deleteRoleQuestions}