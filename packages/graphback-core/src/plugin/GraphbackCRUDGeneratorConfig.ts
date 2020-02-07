/**
 * Configuration for global values for graphback 
 */
export interface GraphbackCRUDGeneratorConfig {
    // Generate create method
    create?: boolean;
    // Generate update method
    update?: boolean;
    //tslint:disable-next-line
    delete?: boolean;
    // Generate find method
    find?: boolean;
    // Generate findAll method
    findAll?: boolean;
    // Generate subscription for create operation
    subCreate?: boolean;
    // Generate subscription for update operation
    subUpdate?: boolean;
    // Generate subscription for delete operation
    subDelete?: boolean;
}
