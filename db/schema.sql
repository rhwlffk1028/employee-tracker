-- Drops the existing database
DROP DATABASE IF EXISTS employeeTracker_db;
-- Then, creates the database called 'employeeTracker_db'
CREATE DATABASE employeeTracker_db;

-- Initializes the database
USE employeeTracker_db;

-- Department table consists of id and department name
CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Role table consists of id, role title, role salary, and corresponding department id
CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Employee table consists of id, first name, last name, corresponding role id, and corresponding manager id
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);