module.exports = {
  concurrency: 1,
  files: ["!examples", "!dist"],
  extensions: ["ts"],
  require: ["ts-node/register"],
  environmentVariables: { TS_NODE_FILES: "true" }
};
