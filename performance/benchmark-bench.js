#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const bench = require("./libs/bench");
const { choices } = require("./libs/choices");

function select(callback) {
  inquirer
    .prompt([
      {
        type: "checkbox",
        message: "Select packages",
        name: "list",
        choices: [...choices.map((name) => ({ name }))],
        validate: function (answer) {
          if (answer.length < 1) {
            return "You must choose at least one package.";
          }
          return true;
        },
      },
    ])
    .then(function (answers) {
      callback(answers.list);
    });
}

inquirer
  .prompt([
    {
      type: "confirm",
      name: "all",
      message: "Do you want to run all benchmark tests?",
      default: false,
    },
    {
      type: "input",
      name: "connections",
      message: "How many connections do you need?",
      default: 5,
      validate(value) {
        return !Number.isNaN(parseFloat(value)) || "Please enter a number";
      },
      filter: Number,
    },
    {
      type: "input",
      name: "pipelining",
      message: "How many pipelines do you need?",
      default: 1,
      validate(value) {
        return !Number.isNaN(parseFloat(value)) || "Please enter a number";
      },
      filter: Number,
    },
    {
      type: "input",
      name: "duration",
      message: "How long should it take?",
      default: 5,
      validate(value) {
        return !Number.isNaN(parseFloat(value)) || "Please enter a number";
      },
      filter: Number,
    },
  ])
  .then((opts) => {
    if (!opts.all) {
      select((list) => bench(opts, list));
    } else {
      bench(opts, choices);
    }
  });
