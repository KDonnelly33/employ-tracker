const mysql = require("mysql2");

module.exports = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "Pacosucks88",
      database: "employee_db",
    },
    console.log(`Connected to the employee_db database.`)
  );