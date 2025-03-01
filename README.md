# Cypress-Cucumber E2E Test Automation Framework for Parabank

## 🧪 Introduction

This is a Cypress with Cucumber E2E test automation framework for [Parabank](https://parabank.parasoft.com/) application covering both UI and API test scenarios

Integrated with:

- [x] https://github.com/badeball/cypress-cucumber-preprocessor
- [x] https://github.com/bahmutov/cypress-esbuild-preprocessor
- [x] https://www.npmjs.com/package/multiple-cucumber-html-reporter
- [x] https://github.com/cucumber/json-formatter

(+ bundlers: https://github.com/badeball/cypress-cucumber-preprocessor/tree/master/examples)

## 💻 Prerequisites

The following software are required:

- Node JS
- [JSON Formatter](https://github.com/cucumber/json-formatter)

## 🚀 Getting Started

Install project dependencies with `npm install`

## ⛹️‍♂️ Test Execution

- Run test in headless mode: `./run_tests.sh`
- Run with Cypress spec runner: `npm run cypress:runner`

## 📂 Reporting

- A HTML report is automatically generated after executing `./run_tests.sh`


=============================

Cypress Cucumber 
----------------
Command - 
$ npm install @badeball/cypress-cucumber-preprocessor


Update package.json with StepDefinition
 "stepDefinitions": [
      "cypress/e2e/[filepath]/**/*.{js,ts}",
      "cypress/e2e/[filepath].{js,ts}",
      "cypress/support/step_definitions/*.{js,ts}"
  ],

Feature
-------
- .feature 
    Scenarios, Sceanrio outline, example, Feature, Given, when, then, and
    Background, <parameterization>
- Gherkin language


StepDefinition
--------------
- .js
- It will contain the implemented step which has been defined in the feature file


If we need to run via Cloud - 

npx cypress run --record --key dd096e32-74ac-4bb9-b1f9-7b68166f6e04



Installation and Setup for Cucumber
1. Install - $ npm install @badeball/cypress-cucumber-preprocessor
2. Install - npm i -D cypress @bahmutov/cypress-esbuild-preprocessor esbuild
3. Modify cypress.config.js - 


