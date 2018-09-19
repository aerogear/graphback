import * as handlebars from 'handlebars';
import { Field } from 'graphql-codegen-core';

/**
 * Contains helpers used in all templates
 */
export class HandlebarsHelpers {

  public registerHelpers = () => {
    // tslint:disable-next-line:cyclomatic-complexity no-any
    handlebars.registerHelper('ifCond', function(v1: any, operator: string, v2: any, options: any) {
      switch (operator) {
        case '==':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '===':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '!=':
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case '!==':
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case '<':
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case '<=':
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case '>':
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case '>=':
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case '&&':
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case '||':
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    });

    handlebars.registerHelper('fieldType', function(definedField: Field, options: any) {
      if (!definedField) {
        return '';
      }

      if (definedField.isArray) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }

      //return options.fn(this)
    });
  }
}

