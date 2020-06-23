import * as Agenda from "agenda";
import { Db, MongoClient } from "mongodb";

export interface PruneConfiguration {
  agendaConfig?: Agenda.AgendaConfiguration
  pruneInterval?: string | number
}

export interface TTLMap {
  [modelName: string]: number
}

/**
 * A class for creating prune jobs
 */
export class PruneScheduler {
  public objectDb: Db;
  public pruneInterval: string | number;
  public agenda: Agenda;

  public constructor(config: PruneConfiguration, db: Db) {
    this.agenda = new Agenda(config.agendaConfig);
    if (config.agendaConfig?.db === undefined && config.agendaConfig?.mongo === undefined) {
      this.agenda.mongo(db);
    }
    this.agenda.start().then(() => {

      // Cleanup ensure job stopped running before exiting
      const graceful = async () => {
        await this.agenda.stop();
        process.exit(0);
      }

      process.on('SIGTERM', graceful);
      process.on('SIGINT' , graceful);
    }).catch((e: any) => {
      console.error('Error starting scheduler: ', e);
    })
    this.objectDb = db;
    this.pruneInterval = config.pruneInterval || '1 minute'
  }

  public defineAndStartPruneJob(collectionName: string, TTL: number) {
    const pruneJobName = this.definePruneJob(collectionName, TTL);
    this.startPruneJob(pruneJobName);
  }

  public definePruneJob(collectionName: string, TTL: number): string {
    const pruneJobName = `prune:${collectionName}`;
    const db = this.objectDb
    this.agenda.define(pruneJobName, async (_:any, done: (e: any) => void) => {
      db.collection(collectionName).deleteMany({
        _deleted: true,
        updatedAt: {
          $lte: Date.now() - (TTL * 1000) // TTL is in seconds
        }
      })
        .then(() => {
          done(undefined);
        })
        .catch((e: any) => {
          console.error('Error: Prune job failed: ', e);
          done(e);
        });

    });
  
    return pruneJobName
  }

  public startPruneJob(jobName: string) {
    this.agenda.every(this.pruneInterval, jobName).catch((e: any) => {
      console.error(`Error: Scheduling ${jobName} failed: ${e}`);
    });
  }
}