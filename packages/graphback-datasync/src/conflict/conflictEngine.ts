import { GraphbackContext, metadataMap, FieldTransform } from '@graphback/core';
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
   * Supplies the updated At
   * @param document document to be updated
   * @returns document with updated state
   */
  updateState?(): FieldTransform[]
}

/**
 * TimestampConflictEngine
 * Simple placeholder conflict engine that
 * throws on conflict
 */
export class TimestampConflictEngine implements ConflictEngine {
  protected conflictFieldName: string = fieldNames.updatedAt;
  
  public checkForConflicts(serverState: any, clientState: any): ConflictStateMap {
    if (serverState[this.conflictFieldName] !== undefined && clientState[this.conflictFieldName].toString() !== serverState[fieldNames.updatedAt].toString()) {
      return { serverState, clientState };
    }

    return undefined;
  }
}