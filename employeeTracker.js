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

// Converts the query function to a promise
// Needs to be decalred after db connection is established
const queryAsync = util.promisify(db.query).bind(db);

const getResults = async (query) => {
  const results = await queryAsync(query);
  return results;
};

const getRoles = async () => {
  let query = "SELECT title FROM role";
  const roles = await queryAsync(query);
  return roles.map((role) => role.title);
};

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

const viewAllEmployees = async () => {
  let query = `SELECT e.id, e.first_name AS 'First Name', e.last_name AS 'Last Name', 
  role.title, department.name AS department, role.salary, concat(m.first_name, ' ' ,  m.last_name) AS manager 
  FROM employee e 
  LEFT JOIN employee m 
  ON e.manager_id = m.id 
  INNER JOIN role 
  ON e.role_id = role.id 
  INNER JOIN department ON role.department_id = department.id 
  ORDER BY ID ASC;`;
  const allEmployees = await getResults(query);
  console.log("\n");
  console.table(allEmployees);
  mainMenu();
};

const viewAllRoles = async () => {
  let query = "SELECT id, title AS Title from role";
  const allRoles = await getResults(query);
  console.log("\n");
  console.table(allRoles);
  mainMenu();
};
