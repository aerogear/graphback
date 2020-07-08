import { GraphbackContext, metadataMap, FieldTransform, NoDataError } from '@graphback/core';
import { ConflictStateMap } from "../util";

const {fieldNames} = metadataMap;
/**
 * API for conflict detection and resolution engine
 */
export interface ConflictEngine {
  /**
   * checkForConflicts
   * @param serverState document in DB
   * @param clientState document received from client
   * @returns ConflictStateMap if there is a conflict, undefined if not
   */
  checkForConflicts(serverState: any, clientState: any): ConflictStateMap | undefined 

  /**
   * checkForConflicts
   * @param conflict ConflictStateMap received from checkForConflicts
   * @returns resolved document or undefined if conflict cannot be resolved
   */
  resolveConflicts?(conflict: ConflictStateMap): any

  /**
   * updateState
   * @param document document to be updated
   * @returns document with updated state
   */
  updateState(document: any): any
}

/**
 * d
 */
export abstract class CustomConflictEngine implements ConflictEngine {
  protected conflictFieldName: string = undefined;

  public checkForConflicts(serverState: any, clientState: any): ConflictStateMap {
    if (serverState[this.conflictFieldName] !== undefined && clientState[this.conflictFieldName].toString() !== serverState[fieldNames.updatedAt].toString()) {
      return { serverState, clientState };
    }

    return undefined;
  }

  abstract updateState(document: any): any;
  
}

/**
 * TimestampConflictEngine
 * Simple placeholder conflict engine that
 * throws on conflict
 */
export class TimestampConflictEngine extends CustomConflictEngine {
  protected conflictFieldName: string = fieldNames.updatedAt;

  public updateState(_: any) {
    return {};
  }
}

/**
 * For detecting conflicts using DeltaTable
 */
export class DeltaConflictEngine extends TimestampConflictEngine {
  public checkForConflicts(serverDelta: any, clientSets: any): ConflictStateMap {
    
    if (super.checkForConflicts(serverDelta, clientSets) === undefined) {
      return undefined;
    }
    
    const ignoreFields = ["updatedAt", "id", "_id", "_deleted"]
    const nonNullKeys = Object.keys(serverDelta).filter((key: string) => {

      return (!ignoreFields.includes(key)) && serverDelta[key] !== undefined
    })

    const clientKeys = Object.keys(clientSets).filter((key: string) => {

      return !ignoreFields.includes(key)
    })

    // If client is setting a field that has already changed
    if (nonNullKeys.some((key: string) => {
      return clientSets[key] !== undefined
    }) || clientKeys.length === 0
    ) {
      // There is a conflict
      return { serverState: serverDelta, clientState: clientSets };
    }

    return undefined;
  }
}