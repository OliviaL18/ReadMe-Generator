const fs = require("fs");
const inquirer = require("inquirer");
const axious = require("axios");

let githubUsername;
let name;
let email;
let url;

function inquireGitHub() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is your GitHub Username?",
                name: "github",
            },
        ])
        .then(answers => {
            githubUsername = answers.github;
            function getUser() {
                axious.get(`https://api.github.com/users/${githubUsername}`)
                .then(function (response) {
                    console.log(response);
                    name = response.data.name;
                        console.log(`NAME: ${name}`);
                    email = response.data.email;
                        console.log(`EMAIL: ${email}`);
                    url = response.data.url;
                        console.log(`URL: ${url}`);
                }).catch(function (error) {
                    console.log("error");
                });
                function inquireProject(){
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                message: "What is the name of your project?",
                                name: "projectName",
                            },
                            {
                                type: 'input',
                                message: "Write a description of oyur project",
                                name: "projectDescription",
                            },
                        ])
                        .then(answers => {
                            const projectName = answers.projectName;
                            const projectDescription = answers.projectDescription;
                            console.log(projectName);
                            const readmeCode = `
# ${projectName}

${projectDescription}

## Table of Contents

*Installation

*Usage

*License

*Contributers

*Tests

*Questions 

## Installation

What things you need to install the software and how to install them

>Give examples

Steps to get it going

>step

>step

## Usage

something here about using 

## License

This project is licensed under the MIT License (put something better here)

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Tests

How to run tests for this system?

## Contact

* **${name}** - ${url}

GitHub Username: ${githubUsername}
Email: ${email}
`;
                
                        fs.writeFile("README.md", readmeCode, function(err){
                            if(err){
                                throw err;
                            }
                            console.log("successfully created README");
                        });
                    });
                }
                inquireProject();
            }
            getUser();
            
        });
}

inquireGitHub();