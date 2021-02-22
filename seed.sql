USE employees_DB;

----- DEPARTMENT SEEDS -----
INSERT INTO department (id, name)
VALUES (1, "Engineering");

INSERT INTO department (id, name)
VALUES (2, "Sales");

INSERT INTO department (id, name)
VALUES (3, "Finance");

INSERT INTO department (id, name)
VALUES (4, "Support");

INSERT INTO department (id, name)
VALUES (5, "Legal");


----- ROLE SEEDS -----
-- LEAD ROLES
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Lead Engineer", 130000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Sales Lead", 140000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Financial Lead", 135000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Support Lead", 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Legal Lead", 150000, 5);

-- ALL OTHER ROLES
INSERT INTO role (id, title, salary, department_id)
VALUES (6, "Engineer I", 95000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Engineer II", 97000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Sales Analyst I", 81000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "Sales Associate", 71000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (10, "Financial Analyst I", 75000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (11, "Financial Analyst II", 85000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (12, "Software Support I", 55000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (13, "Software Support II", 65000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (14, "Law Clerk", 50000, 5);


----- EMPLOYEE SEEDS -----
-- LEAD EMPLOYEES
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(1, "Count", "Ravioli", 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(2, "Cowabunga", "Peppermill", 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(3, "Tommy", "Coconuts", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(4, "Greg", "Mindpretzel", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(5, "Ditcher", "Dumas", 5, null);

-- ALL OTHER EMPLOYEES
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(6, "Doreen", "Hammer", 6, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(7, "Holden", "Afart", 7, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(8, "Luigi", "Brothers", 8, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(9, "Judy", "Prosciutto", 9, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(10, "Dusty", "Chiggins", 10, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(11, "Major", "Morty", 11, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(12, "Tammy", "Turlet", 12, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(13, "Mark", "Juggins", 13, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES(14, "Amy", "Rockfeller", 14, 5);