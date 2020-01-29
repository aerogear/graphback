import { TestxServer } from "./TestxServer";
import { Server } from "http";
import express, { json } from "express";
import { isTestxApiMethod } from "./TestxApi";
import getPort from "get-port";
import cors from "cors";
import { Express } from "express-serve-static-core";

type UnknownFunction = (...args: unknown[]) => unknown;

export class TestxController {
  protected readonly testxServer: TestxServer;
  protected readonly expressApp: Express;
  protected controllerServer?: Server;
  protected controllerPort?: number;

  constructor(testxServer: TestxServer) {
    const app = express();
    app.use(json());
    app.use(cors());

    app.post("/", (req, res) => {
      if (req.body === undefined) {
        res.status(500).send("Error: body is undefined");
        return;
      }

      if (req.body.name === undefined) {
        res.status(500).send("Error: no method name passed");
        return;
      }

      const name = req.body.name;
      if (!isTestxApiMethod(testxServer, name)) {
        res.status(500).send(`Error: ${name} is not a TestxApi method`);
        return;
      }

      // cast method to unknown
      const method = testxServer[name].bind(testxServer) as UnknownFunction;

      // execute the api method
      const result = method(...(req.body.args || []));

      // cast to promise no matter what it is
      Promise.resolve(result).then(
        r => {
          res.json(r);
        },
        e => {
          console.error(e);
          res.status(500).send(`Unknown Error: ${e}`);
        }
      );
    });

    this.testxServer = testxServer;
    this.expressApp = app;
  }

  public async start(port?: number): Promise<void> {
    if (port === undefined) {
      port = await getPort();
    }

    if (
      this.controllerServer === undefined ||
      !this.controllerServer.listening
    ) {
      this.controllerServer = this.expressApp.listen(port);
      this.controllerPort = port;
    }
  }

  public async close(): Promise<void> {
    // close the testx server
    await this.testxServer.close();

    // close the director server
    await new Promise((resolve, reject) => {
      if (this.controllerServer) {
        this.controllerServer.close(e => {
          if (e === undefined) {
            resolve();
          } else {
            reject(e);
          }
        });
      }
    });
  }

  public async httpUrl(): Promise<string> {
    if (this.controllerPort === undefined) {
      throw new Error(
        `use bootstrap() or start() in order to initialize the server`
      );
    }

    return Promise.resolve(`http://localhost:${this.controllerPort}`);
  }
}
