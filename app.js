const db = require('./db/connection');
const inquirer = require("inquirer");


function runApp() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select:',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add an employee role', 'update employee', 'exit'],
            name: 'task'
        },

    ])
        .then(function(response){
            switch(response.task){
                case "view all departments":
                    viewDepartment();
                    break;
                case "view all roles":
                    viewRoles();
                    break;
                case "view all employees":
                    viewEmployees();
                    break;
                case "add a department":
                    addDepartment();
                    break;
                
                case "add an employee role":
                    addRole();
                    break;

                case "update employee":
                    updateEmployee();
                    break;

                case "exit":
                    db.end();
                    break;
            }
        })
    }

    function viewEmployees(){
        db.query(`SELECT * FROM employees`,(err,res)=>{
            if(err) throw err;
            console.table(res)
            runApp();
        })
    }

function viewDepartment() {
    db.query(`SELECT * FROM departments`, (err, res) => {
        if (err) throw err;
        console.table(res)
        runApp();
    })
}

function viewRoles() {
    db.query(`SELECT * FROM roles`, (err, res) => {
        if (err) throw err;
        console.table(res)
        runApp();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "addDept",
            message: "What is the name of the new department?"
        }
    ]).then(function (answer) {
        db.query(
            "INSERT INTO departments SET ?", {
            name: answer.addDept
        },
            function (err, res) {
                if (err) throw err;
                console.log(" Department Added!");
                runApp();
            }
        );
    });
}

function addRole(){
    db.query(`SELECT * FROM departments`,(err,res) =>{
        if(err) throw err;
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "what role would you want to add?"
            },
            {
                name: 'salary',
                type: "input",
                message: "what salary do this position have?"
            },
            {
                name: "departmentId",
                type: "list",
                message: "select a department for this role",
                choices: res.map(dept =>dept.name)

            }       
        ]).then(response =>{
            const selectedDepartment = res.find(dept => dept.name === response.departmentId)
            db.query(`INSERT INTO roles SET ?`, {
                title: response.title,
                salary: response.salary,
                department_id: selectedDepartment.id
            }, (err,res) =>{
                if(err) throw err;
                console.log("new role added");
                runApp();
            })
        })
    })

    function updateEmployee() {
        db.query("SELECT * FROM employees", function (err, results) {
            if (err) throw err;
            inquirer
                .prompt([{
                    name: `employeeUpdate`,
                    type: `list`,
                    message: `Choose the employee whose role you would like to update.`,
                    choices: results.map(item => item.first_name)
                },
                ])
                .then((answer) => {
                    const updateEmployee = (answer.employeeUpdate)
                    db.query("SELECT * FROM role", function (err, results) {
                        if (err) throw err;
                        inquirer
                            .prompt([
                                {
                                    name: `role_id`,
                                    type: `list`,
                                    message: `Select the new role of the employee.`,
                                    choices: results.map(item => item.title)
                                },
                            ])
                            .then((answer) => {
                                const roleChosen = results.find(item => item.title === answer.role_id)
                                db.query(
                                    "UPDATE employee SET ? WHERE first_name = " + "'" + updateEmployee + "'", {
                                    role_id: "" + roleChosen.id + "",
                                },
                                    function (err) {
                                        if (err) throw err;
                                        console.log("Successfully updated " + updateEmployee + "'s role to " + answer.role_id + "!");
                                        runApp();
                                    }
                                )
                            })
                    })
                })
        })
    }



}

module.exports = runApp;