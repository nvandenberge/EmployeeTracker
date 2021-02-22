const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require("util");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "P@ssw0rdP@ssw0rd",
  database: "employees_DB",
});

db.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee's Role",
          "Exit",
        ],
      },
    ])
    .then(function (response) {
      switch (response.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDept();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Remove Department":
          removeDepartment();
          break;
        case "Remove Role":
          removeRole();
        case "Exit":
          console.log("Closing Employee Tracker...")
          db.end();
        default:
          console.log("Have a nice day!");
      }
    });
};