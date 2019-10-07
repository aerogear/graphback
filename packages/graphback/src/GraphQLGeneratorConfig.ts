/**
 * Schema and resolver generator config
 */
export interface GraphQLGeneratorConfig {
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
