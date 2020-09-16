#!/usr/bin/env node
"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const Table = require("cli-table");
const { join } = require("path");
const { readdirSync, readFileSync } = require("fs");
const { compare } = require("./libs/autocannon");
const commander = require("commander");

commander
  .option("-t, --table", "table")
  .option("-c --commandlineMdTable", "Print a table for use in MarkDown")
  .parse(process.argv);

const resultsPath = join(process.cwd(), "results");
let choices = readdirSync(resultsPath)
  .filter((file) => file.match(/(.+)\.json$/))
  .sort()
  .map((choice) => choice.replace(".json", ""));

const bold = (writeBold, str) => (writeBold ? chalk.bold(str) : str);

if (!choices.length) {
  console.log(chalk.red("Benchmark to gather some results to compare."));
} else if (commander.table && !commander.percentage) {
  const tableSeparatorChars = commander.commandlineMdTable
    ? {
        top: "",
        "top-left": "",
        "top-mid": "",
        "top-right": "",
        bottom: "",
        "bottom-left": "",
        "bottom-mid": "",
        "bottom-right": "",
        mid: "",
        "left-mid": "",
        "mid-mid": "",
        "right-mid": "",
        left: "|",
        right: "|",
        middle: "|",
      }
    : {};
  const table = new Table({
    chars: tableSeparatorChars,
    head: [
      "Server",
      "Requests/s",
      "Latency",
      "Throughput/Mb",
      "Startup time (s)",
      "Resident Set Size (MB)",
      "CPU Percentage",
    ],
  });
  if (commander.commandlineMdTable) {
    table.push([":--", "--:", ":-:", "--:", "--:"]);
  }

  let data = [];
  choices.forEach((file) => {
    let content = readFileSync(`${resultsPath}/${file}.json`);
    data.push(JSON.parse(content.toString()));
  });
  data.sort((a, b) => {
    return parseFloat(b.requests.p99_999) - parseFloat(a.requests.p99_999);
  });

  data.forEach((data, i) => {
    if (i === 0) {
      console.log(
        `duration: ${data.duration}s\nconnections: ${data.connections}\npipelining: ${data.pipelining}`
      );
      console.log("");
    }

    const beBold = data.server.indexOf("graphback") > -1;
    table.push([
      bold( beBold, chalk.blue(data.server)),
      bold(beBold, data.requests.p99_999.toFixed(1)),
      bold(beBold, data.latency.p99_999.toFixed(2)),
      bold(beBold, (data.throughput.p99_999 / 1024 / 1024).toFixed(2)),
      bold(beBold, data.startupTime.toFixed(2)),
      bold(beBold, data.rss.toFixed(2)),
      bold(beBold, data.cpuPercentage),
    ]);
  });

  console.log(table.toString());
} else {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What's your first pick?",
        choices,
      },
    ])
    .then((firstChoice) => {
      choices = choices.filter((choice) => choice !== firstChoice.choice);
      inquirer
        .prompt([
          {
            type: "list",
            name: "choice",
            message: "What's your second one?",
            choices,
          },
        ])
        .then((secondChoice) => {
          const [a, b] = [firstChoice.choice, secondChoice.choice];
          const result = compare(a, b);
          if (result === true) {
            console.log(chalk.green.bold(`${a} and ${b} both are fast!`));
          } else {
            const fastest = chalk.bold.yellow(result.fastest);
            const fastestAverage = chalk.green(result.fastestAverage);
            const slowest = chalk.bold.yellow(result.slowest);
            const slowestAverage = chalk.green(result.slowestAverage);
            const diff = chalk.bold.green(result.diff);

            console.log(`
 ${chalk.blue("Both are awesome but")} ${fastest} ${chalk.blue(
              "is"
            )} ${diff} ${chalk.blue("faster than")} ${slowest}
 • ${fastest} ${chalk.blue("request average is")} ${fastestAverage}
 • ${slowest} ${chalk.blue("request average is")} ${slowestAverage}`);
          }
        });
    });
}
