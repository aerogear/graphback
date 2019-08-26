"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config = tslib_1.__importStar(require("../../config.json"));
/**
 * config class
 */
class Config {
  constructor() {
      this.port = process.env.PORT || 4000;
      this.db = config.dbConfig;
  }
}
exports.default = new Config();
