const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const util = require("util");

// Validate the response is not empty
const inputValidation = (input) =>
  !input ? "Please provide a response" : true;
// Validate the response contains letters only
const letterValidation = (input) =>
  !/^[A-Za-z_ ]+$/gi.test(input)
    ? "Please enter a valid name (letters only)"
    : true;

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

const getResults = async (query, values = []) => {
  try {
  const results = await queryAsync(query, values);
  return results;
  }
  catch {
    console.log("Yikes, something went wrong!")
    db.end();
  }
};

const getEmployeeNames = async () => {
  let query = "SELECT id, first_name, last_name FROM employee;";
  const allEmployees = await queryAsync(query);
  return allEmployees.map((employee) => ({
    value: employee.id,
    name: `${employee.first_name} ${employee.last_name}`,
  }));
};

const getRoles = async () => {
  let query = "SELECT id, title FROM role";
  const roles = await queryAsync(query);
  return roles.map((role) => ({ value: role.id, name: role.title }));
};

const getDepartments = async () => {
  let query = "SELECT id, name FROM department";
  const depts = await queryAsync(query);
  return depts.map((dept) => ({ value: dept.id, name: dept.name }));
};

const getManagers = async () => {
  let query = "SELECT * FROM employee WHERE manager_id IS NULL";
  const managers = await queryAsync(query);
  return managers.map((manager) => ({
    value: manager.id,
    name: `${manager.first_name} ${manager.last_name}`,
  }));
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
          viewAllDepts();
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
        case "Update Employee's Role":
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
          console.log("Closing Employee Tracker...");
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

const viewAllDepts = async () => {
  let query = "SELECT id, name AS Name from department";
  const allDepts = await getResults(query);
  console.log("\n");
  console.table(allDepts);
  mainMenu();
};

const addEmployee = async () => {
  const roles = await getRoles();
  const managers = await getManagers();
  inquirer
    .prompt([
      {
        type: "name",
        name: "empFirstName",
        message: "New Employee's First Name: ",
        validate: letterValidation,
      },
      {
        type: "name",
        name: "empLastName",
        message: "New Employee's Last Name: ",
        validate: letterValidation,
      },
      {
        type: "list",
        name: "empRole",
        message: "New Employee's Role: ",
        choices: [...roles],
      },
      {
        type: "list",
        name: "empManager",
        message: "New Employee's Manager: ",
        choices: [...managers],
      },
    ])
    .then((response) => {
      let query =
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      getResults(query, [
        response.empFirstName,
        response.empLastName,
        response.empRole,
        response.empManager,
      ]);
      console.log(
        `${response.empFirstName} ${response.empLastName} has been added to Employees!`
      );
      mainMenu();
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "deptName",
      message: "New Department Name: ",
      validate: inputValidation,
    })
    .then((response) => {
      let query = "INSERT INTO department (name) VALUES (?)";
      getResults(query, [response.deptName]);
      console.log(`${response.deptName} has been added to Departments`);
      mainMenu();
    });
};

const addRole = async () => {
  const depts = await getDepartments();
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Title for new role? ",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Salary for new role? ",
      },
      {
        type: "list",
        name: "roleDept",
        message: "Which department does this new role belong in? ",
        choices: [...depts],
      },
    ])
    .then((response) => {
      let query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      getResults(query, [
        response.roleTitle,
        response.roleSalary,
        response.roleDept,
      ]);
      console.log(`${response.roleTitle} has been added to Roles`);
      mainMenu();
    });
};

const updateEmployeeRole = async () => {
  const employeeNames = await getEmployeeNames();
  const roles = await getRoles();
  inquirer
    .prompt([
      {
        type: "list",
        name: "empID",
        message: "Select an Employee to Update Role: ",
        choices: [...employeeNames],
      },
      {
        type: "list",
        name: "roleID",
        message: "Select Their New Role?",
        choices: [...roles],
      },
    ])
    .then(async (response) => {
      console.log("\n");
      // let nameQuery = `SELECT first_name, last_name FROM employee WHERE employee.id=${response.empID}`
      // let employeeName = await getResults(nameQuery);
      let query = "UPDATE employee SET role_id=? WHERE employee.id=?";
      getResults(query, [response.roleID, response.empID]);
      console.log(`Employee's Role has been updated!`);
      mainMenu();
    });
};
