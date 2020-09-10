"use strict";

const fs = require("fs");
const path = require("path");

const { promisify } = require("util");
const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);
const writeFile = promisify(fs.writeFile);

const autocannon = require("autocannon");
const compare = require("autocannon-compare");
const { version } = require('../package.json');
const { createAuthor1 } = require("./create-author1-data");
const resultsDirectory = path.join(process.cwd(), "results");

const body = JSON.stringify({
  query: `query {
      findAuthor1s {
        items {
          id,
          name,
          md5,
          company,
          books {
            id,
            name,
            numPages
          }
        }
      }
}`,
});

const run = (opts = {}) =>
  new Promise((resolve, reject) => {
    autocannon(
      {
        ...opts,
        url: "http://localhost:29128/graphql",
        method: "POST",
        body,
        headers: {
          "content-type": "application/json",
        },
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });

const writeResult = async (handler, result) => {
  try {
    await access(resultsDirectory);
  } catch (e) {
    await mkdir(resultsDirectory);
  }

  result.server = `${version}-${handler}`;
  const dest = path.join(resultsDirectory, `${result.server}.json`);
  return writeFile(dest, JSON.stringify(result));
};

module.exports.fire = async (opts, handler, save, result) => {
  await createAuthor1();
  const throuputLatency = await run(opts);
  return save
    ? writeResult(handler, {
        ...result,
        ...throuputLatency,
      })
    : null;
};

module.exports.compare = (a, b) => {
  const resA = require(`${resultsDirectory}/${a}.json`);
  const resB = require(`${resultsDirectory}/${b}.json`);
  const comp = compare(resA, resB);
  if (comp.equal) {
    return true;
  } else if (comp.aWins) {
    return {
      diff: comp.requests.difference,
      fastest: a,
      slowest: b,
      fastestAverage: resA.requests.average,
      slowestAverage: resB.requests.average,
    };
  }
  return {
    diff: compare(resB, resA).requests.difference,
    fastest: b,
    slowest: a,
    fastestAverage: resB.requests.average,
    slowestAverage: resA.requests.average,
  };
};
