const { TestxServer, TestxController } = require("../../dist/src");

// this is a workaround for a glup issue
// https://github.com/microsoft/azure-pipelines-tasks/issues/9852

exports.TestxController = TestxController;
exports.TestxServer = TestxServer;
