/**
 * Generator config
 */
export interface GraphbackGeneratorConfig {
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
