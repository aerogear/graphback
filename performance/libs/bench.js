#!/usr/bin/env node
"use strict";
const { performance } = require("perf_hooks");
const { fork, spawn, execSync } = require("child_process");
const ora = require("ora");
const path = require("path");
const { fire } = require("./autocannon");
const waitOn = require("wait-on");
const psTree = require("ps-tree");
const waitOnOpts = {
  resources: ["http-get://localhost:29128/.well-known/apollo/server-health"],
  interval: 100, // poll interval in ms, default 250ms
  timeout: 60000 // timeout in ms, default Infinity
};

const doBench = async (opts, handler) => {
  const spinner = ora(`Started ${handler}`).start();
  const stats = {};
  const forked = fork(path.join(__dirname, "..", "benchmarks", handler));

  try {
    spinner.color = "magenta";
    spinner.text = `Warming ${handler}`;

    const before = performance.now();

    await waitOn(waitOnOpts);

    const startupTime = (performance.now() - before) / 1000;

    stats["startupTime"] = startupTime;

    const results = execSync(`ps -o rss,%cpu,%mem -p ${forked.pid}`)
      .toString()
      .split("\n")[1]
      .trim()
      .split(/\s+/);

    stats["rss"] = parseInt(results[0], 10) / 1000;
    stats["cpuPercentage"] = parseInt(results[1], 10) / 100;
    stats["memoryPercentage"] = parseFloat(results[2], 10);

    await fire(opts, handler, false, stats);
    await fire(opts, handler, false, stats);
  } catch (error) {
    psTree(forked.pid, function (err, children) {
      spawn(
        "kill",
        ["-9"].concat(
          children.map(function (p) {
            return p.PID;
          })
        )
      );
    });
    return console.log(error);
  } finally {
    spinner.color = "yellow";
    spinner.text = `Working ${handler}`;
  }

  try {
    await fire(opts, handler, true, stats);
    psTree(forked.pid, function (err, children) {
      spawn(
        "kill",
        ["-9"].concat(
          children.map(function (p) {
            return p.PID;
          })
        )
      );
    });
    forked.kill("SIGINT");
    spinner.text = `Results saved for ${handler}`;
    spinner.succeed();
    return true;
  } catch (error) {
    psTree(forked.pid, function (err, children) {
      spawn(
        "kill",
        ["-9"].concat(
          children.map(function (p) {
            return p.PID;
          })
        )
      );
    });
    return console.log(error);
  }
};

let index = 0;
const start = async (opts, list) => {
  if (list.length === index) {
    console.log("done");
    return true;
  }

  try {
    await doBench(opts, list[index]);
    index += 1;
    return start(opts, list);
  } catch (error) {
    return console.log(error);
  }
};

module.exports = start;
