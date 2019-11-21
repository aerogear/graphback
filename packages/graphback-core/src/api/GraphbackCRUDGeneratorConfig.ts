/**
 * Generator config
 */
export interface GraphbackCRUDGeneratorConfig {
    create?: boolean;
    update?: boolean;
    //tslint:disable-next-line
    delete?: boolean;
    find?: boolean;
    findAll?: boolean;
    subCreate?: boolean;
    subUpdate?: boolean;
    subDelete?: boolean;
    disableGen?: boolean;
}
