const fs = require("fs");
const inquirer = require("inquirer");
const axious = require("axios");

let githubUsername;
let email;

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
                const API = axious.get(`https://api.github.com/users/${githubUsername}`)
                .then(function (response) {
                    console.log(response);
                    email = response.data.email;
                }).catch(function (error) {
                    console.log("error");
                });
            }
            getUser();
            
        });
}

function inquireProject(){
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of your project?",
                name: "projectName",
            },
        ])
        .then(answers => {
            const projectName = answers.projectName;
            console.log(projectName);
            const readmeCode = `
# Project Title

DESCRIPTION TEXT HERE

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

* **NAME HERE** - (github url here)

github image

github email`;

        fs.writeFile("README.md", readmeCode, function(err){
            if(err){
                throw err;
            }
            console.log("successfully created README");
        });
    });
}

inquireGitHub();