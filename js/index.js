const fs = require("fs");
const inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type: 'input',
            message: "What is your GitHub Username?",
            name: "github",
        },
    ])
    .then(answers => {
        const githubUsername = answers.github;
        const getUser = async (user) => {
            const API = await fetch(`https://api.github.com/users/${user}`)
            const userData = await API.json();
            return { userData }
        }
        const showData = () => {
            getUser(githubUsername).then((results) => {
                console.log(results);
            })
        };
        showData();
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