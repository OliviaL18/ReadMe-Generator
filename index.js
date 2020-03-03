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
                    name = response.data.name;
                    email = response.data.email;
                    url = response.data.url;
                    imgURL = response.data.avatar_url;
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
                                message: "Write a description of your project",
                                name: "projectDescription",
                            },
                        ])
                        .then(answers => {
                            const projectName = answers.projectName;
                            const projectDescription = answers.projectDescription;
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

What things you need to install the software and how to install them.

>Give examples

Installation steps:

>Step 1

>Step 2

>etc.

## Usage

Provide directions on how to deploy application on a live system.

Describe the functionality of the application and its use case.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License.

## Contributing

Add directions for how users can offer contributions, process for submitting pull requests, etc.

When contributing to this repository, please first contact the owner of the respository to discuss the change you wish to make.

## Tests

Add instructions here to explain how to run tests for the system.

## Contact

### ${githubUsername}

* **${name}** - ${url}

Email: ${email}

![User Image](${imgURL})

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