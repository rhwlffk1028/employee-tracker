// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { opening } = require('./utils/ascii');

// Connecting to the database
const db = mysql.createConnection(
    {
        hose: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'employeeTracker_db'
    }
);

// Function for viewing all departments
const viewAllDepartments = () => {
    db.query(`SELECT * FROM department;`, (err, results) => {
        if (err) throw err;
        console.log("Here is the list of departments in this company.")
        console.table(results);
        questions();
    });
}

// Function for viewing all roles 
const viewAllRoles = () => {
    db.query(
        `SELECT role.id, title, department.name AS department, salary 
        FROM role 
        JOIN department ON role.department_id = department.id
        ORDER BY role.id ASC;`, (err, data) => {
        if (err) throw err;
        console.log("Here is the list of all roles in this company.");
        console.table(data);
        questions();
    });
};

// Function for viewing all employees
const viewAllEmployees = () => {
    db.query(
        `SELECT e.id, e.first_name, e.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(employee.first_name, ' ', employee.last_name) as manager
        FROM employee e
        JOIN role ON role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee ON e.manager_id = employee.id;`, (err, data) => {
        if (err) throw err;
        console.log("Here is the list of all employees.")
        console.table(data);
        questions()
    })
}

// Function for adding a new employee
const addEmployee = () => {
    db.query(`SELECT * FROM role;`, (err, data) => {
        if (err) throw err;
        const roleTable = data.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })
        db.query(`SELECT * FROM employee;`, (err, data) => {
            if (err) throw err;
            const employeeTable = data.map(employee => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }
            })
            employeeTable.unshift({ name: "None", value: null });
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the employee\`s first name?',
                        name: 'firstName'
                    },
                    {
                        type: 'input',
                        message: 'What is the employee\`s last name?',
                        name: 'lastName'
                    },
                    {
                        type: 'list',
                        message: 'What is the employee\`s role?',
                        name: 'chooseRole',
                        choices: roleTable
                    },
                    {
                        type: 'list',
                        message: 'Who is the employee\'s manager?',
                        name: 'chooseManager',
                        choices: employeeTable
                    }
                ])
                .then(answer => {
                    const firstName = answer.firstName;
                    const lastName = answer.lastName;
                    const employeeRole = answer.chooseRole;
                    const employeeManager = answer.chooseManager;
                    db.query(
                        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES ("${firstName}", "${lastName}", "${employeeRole}", "${employeeManager}");`, err => {
                        if (err) throw err;
                        console.log("New employee has been added to the database.")
                    });
                    questions();
                })
        })
    })
}

// Function for adding a new role
const addRole = () => {
    db.query(`SELECT * FROM department;`, (err, data) => {
        if (err) throw err;
        const departmentTable = data.map(element => {
            return {
                name: element.name,
                value: element.id
            }
        })
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role?',
                    name: 'roleName'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'roleSalary',
                    validate: roleSalaryInput => {
                        if (isNaN(roleSalaryInput)) {
                            return "Please enter a number";
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'list',
                    message: 'Which department does the role belong to?',
                    name: 'roleDept',
                    choices: departmentTable
                }
            ])
            .then(answer => {
                const title = answer.roleName;
                const salary = answer.roleSalary;
                const department = answer.roleDept;
                db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department}");`, err => {
                    if (err) throw err;
                    console.log("New role has been added to the database.")
                })
                questions();
            })
    })
}

// Function for updating employee's role
const updateEmployeeRole = () => {
    db.query(`SELECT * FROM role;`, (err, data) => {
        if (err) throw err;
        const roleTable = data.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })
        db.query(`SELECT * FROM employee`, (err, data) => {
            if (err) throw err;
            const employeeTable = data.map(employee => {
                return {
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }
            })
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Which employee's role do you want to update?",
                        name: "updateWho",
                        choices: employeeTable
                    },
                    {
                        type: "list",
                        message: "Which role do you want to assign the selected employee?",
                        name: "updateRole",
                        choices: roleTable
                    }
                ])
                .then (answer => {
                    const roleID = answer.updateRole;
                    const employeeID = answer.updateWho;
                    db.query(
                        `UPDATE employee
                        SET role_id = ${roleID}
                        WHERE id = ${employeeID};`, err => {
                            if(err) throw err;
                            console.log("The employee's role has been updated!")
                        }
                    )
                    questions();
                })
        })
    })
}

// Function to exit the application
const quit = () => {
    console.log("Bye");
    db.end();
}

// Prompts function
const questions = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'View All Roles',
                    'View All Departments',
                    'Add Employee',
                    'Add Role',
                    'Update Employee Role',
                    'Quit'
                ]
            }
        ])
        .then(answer => {
            switch (answer.choices) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Quit":
                    quit();
                    break;
            }
        })
};

// Initialize function
const init = () => {
    // prints the opening ascii logo
    console.log(opening);
    // starts the prompts
    questions();
}

// Start the application
init();