import axios from "axios";
import { TestxApi } from "./TestxApi";
import { DatabaseSchema, DatabaseImportData } from "./Database";

export class TestxDirector implements TestxApi {
  protected readonly endpoint: string;

  constructor(url: string) {
    this.endpoint = url;
  }

  protected async call<T>(
    name: keyof TestxApi,
    ...args: unknown[]
  ): Promise<T> {
    try {
      const response = await axios.post<T>(this.endpoint, { name, args });
      return response.data;
    } catch (e) {
      throw new Error(`Call Failed: ${e.response.data}`);
    }
  }

  public async start(): Promise<void> {
    return await this.call("start");
  }

  public async stop(): Promise<void> {
    return await this.call("stop");
  }

  public async close(): Promise<void> {
    return await this.call("close");
  }

  public async cleanDatabase(): Promise<void> {
    return await this.call("cleanDatabase");
  }

  public async httpUrl(): Promise<string> {
    return await this.call("httpUrl");
  }

  public async wsUrl(): Promise<string> {
    return await this.call("wsUrl");
  }

  public async getGraphQlSchema(): Promise<string> {
    return await this.call("getGraphQlSchema");
  }

  public async getDatabaseSchema(): Promise<DatabaseSchema> {
    return await this.call("getDatabaseSchema");
  }

  public async setData(data: DatabaseImportData): Promise<void> {
    return await this.call("setData", data);
  }

  public async bootstrap(): Promise<void> {
    return await this.call("bootstrap");
  }

  public async getQueries(): Promise<{ [name: string]: string }> {
    return await this.call("getQueries");
  }

  public async getMutations(): Promise<{ [name: string]: string }> {
    return await this.call("getMutations");
  }

  public async getSubscriptions(): Promise<{ [name: string]: string }> {
    return await this.call("getSubscriptions");
  }
}
