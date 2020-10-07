//Import required classes and libraries
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Question for number of team members
const numberOfTeamMembers = [{
    name: 'number',
    type: 'input',
    message: `Please, enter number of team members including manager: `
}]
//Questioin for Employee Role
const employee_role = [{
    name: 'role',
    type: 'list',
    choices: ['Manager', 'Engineer', 'Intern'],
    message: `Please, enter employee's role: `
}

]
//Questions to be asked to the user
const questions = [
    {
        name: 'name',
        type: 'input',
        message: `Please, enter employee's name: `
    },
    {
        name: 'id',
        type: 'input',
        message: `Please, enter employee's ID: `
    },
    {
        name: 'email',
        type: 'input',
        message: `Please, enter employee's e-mail: `
    },
    {

        type: 'input', //message and name will be added depending on user input for the employee role

    }

]
//Main Function
async function init() {
    console.log(`\n You will be asked about teams details, note that there should be at least 1 manager per team and any number of Engineers and/or interns\n`);
    try {
        let number = 0
        // Will loop if the user failed to enter a number above 2
        while (parseInt(number) < 2 || isNaN(parseInt(number))) {
            number = (await prompt(numberOfTeamMembers)).number
        }
        const employees = []
        let manager_check = false; //check if the user adds managers or not
        while (employees.length < number) { //Loop for the number of teams members
            console.log(`\n Please, Enter the details for Employee ${employees.length + 1}`);
            const role = (await prompt(employee_role)).role //Ask about role to decide what questions to ask and what classes to call to create new object.
            let employee;
            switch (role) {
                case 'Manager':
                    questions[3].message = 'Please, enter office number :'
                    questions[3].name = 'officeNumber'
                    manager_check = true
                    employee = await prompt(questions)
                    const manager = new Manager(employee.name, employee.id, employee.email, employee.officeNumber)
                    employees.push(manager) //push object to employee's array
                    break;
                case 'Engineer':
                    questions[3].message = 'Please, enter Github username :'
                    questions[3].name = 'github'
                    employee = await prompt(questions)
                    employees.push(new Engineer(employee.name, employee.id, employee.email, employee.github))
                    break;

                default:
                    questions[3].message = 'Please, enter school name:'
                    questions[3].name = 'school'
                    employee = await prompt(questions)
                    employees.push(new Intern(employee.name, employee.id, employee.email, employee.school))
                    break;
            }
        }
        if (manager_check) {
            html_string = render(employees) //pass the employess array to render the html String
            fs.writeFile(outputPath, html_string, (err) => { // write file to specified location
                if (err) {
                    console.log(err);
                } else {
                    console.log("Team Roster has been created successfully, Check output folder to view it");
                }
            })
        } else { // will skip creating html document if no managers' details were entered
            console.log("Team should have at least 1 manager , Please try again");
        }
    }
    catch (err) {
        console.error(err)
    }
}
init()

