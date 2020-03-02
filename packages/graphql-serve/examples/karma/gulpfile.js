const { TestxServer, TestxController } = require("./link");
const { Server, LOG_INFO } = require("karma");

const karmaConfig = {
  basePath: "",
  frameworks: ["mocha", "chai"],
  files: ["test/**/*.test.js"],
  preprocessors: { "test/**/*.test.js": ["webpack"] },
  webpack: {
    mode: "development"
  },
  reporters: ["mocha"],
  port: 9876,
  colors: true,
  logLevel: LOG_INFO,
  autoWatch: false,
  browsers: ["ChromeHeadless"],
  singleRun: true,
  concurrency: Infinity
};

async function test() {
  // create the TestxServer and the TestxController
  const server = new TestxServer({
    schema: `
      type Item {
        id: ID!
        title: String!
      }`
  });
  const controller = new TestxController(server);
  await controller.start();
  const testxUrl = await controller.httpUrl();

  // promisify Karma tests
  await new Promise((resolve, reject) => {
    // Initialize Karma
    const karma = new Server(
      {
        ...karmaConfig,
        // Pass the TestxController url to the tests
        // __karma__.config.args[0]
        client: { args: [testxUrl] }
      },
      exitCode => {
        if (exitCode === 0) {
          resolve();
        } else {
          reject(new Error(`karma tests failed with code: ${exitCode}`));
        }
      }
    );

    // Start Karma tests
    karma.start();
  });

  await controller.close();
}

exports.test = test;
