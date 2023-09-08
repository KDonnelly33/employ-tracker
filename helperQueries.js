const db= require('./connection')// Home questions

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

  module.exports = {getEmpRole, getEmployees, getDepartments}