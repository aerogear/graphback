/**
 * Configuration for global values for graphback
 */
export interface GraphbackCRUDGeneratorConfig {
  //Generate create method
  create?: boolean;
  //Generate update method
  update?: boolean;
  // Generate delete method
  delete?: boolean;
  //Generate findOne method
  findOne?: boolean;
  //Generate find method
  find?: boolean;
  //Generate subscription for create operation
  subCreate?: boolean;
  //Generate subscription for update operation
  subUpdate?: boolean;
  //Generate subscription for delete operation
  subDelete?: boolean;
}
