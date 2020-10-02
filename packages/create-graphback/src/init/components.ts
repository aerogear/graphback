import { accessSync, mkdirSync } from 'fs';
import chalk from 'chalk';
import * as figlet from 'figlet';
import { prompt as ask } from 'inquirer';
import { logError, logInfo } from '../utils';
import { allTemplates, extractTemplate } from './starterTemplates';
import { Template } from './templateMetadata';

/**
 * Check if directory exists
 * @param path path of the directory
 * @param name name of the project folder
 */
function checkDirectory(path: string, name: string): void {
  try {
    accessSync(path);
    logError(
      `A folder with name ${name} exists. Remove it or try another name.`
    );
    process.exit(0);
  } catch (error) {
    return;
  }
}

/**
 * choose a template from available templates
 */
async function chooseTemplate(filter: string = ''): Promise<Template> {
  const regex = new RegExp(`.*${filter}.*`, 'i');
  const displayedTemplates = allTemplates.filter((template: Template) =>
    regex.test(`${chalk.green(template.name)} ${template.description}`)
  );
  if (!displayedTemplates.length) {
    logInfo(`create-graphback could not find templates matching the given filter: "${filter}".
You can either change the given filter or not pass the option to display the full list.`);
    process.exit(0);
  }

  logInfo(`${chalk.cyan('create-graphback')} can create your app from following templates:
  ${displayedTemplates
    .map((template: Template) => {
      return `\n${chalk.green(template.name)}: \n${template.description}`;
    })
    .join('\n')}
  `);
  const { templateName } = await ask([
    {
      type: 'list',
      name: 'templateName',
      message: 'Choose a template to bootstrap',
      choices: displayedTemplates.map((t: Template) => t.name)
    }
  ]);

  return displayedTemplates.find((t: Template) => t.name === templateName);
}

/**
 * check if template name is valid or not
 * @param templateName name of the template provided
 */
function checkTemplateName(templateName: string): void {
  const availableTemplates = allTemplates.map((t: Template) => t.name);
  if (availableTemplates.includes(templateName)) {
    return;
  }
  logError(
    "Template with given name doesn't exist. Give one of available ones or simply choose by not providing a template name"
  );
  process.exit(0);
}

/**
 * assign template details from the given input or choice
 * @param templateName name of the template provided(if any)
 */
async function assignTemplate(
  templateName: string,
  filter: string
): Promise<Template> {
  let template;
  if (templateName) {
    checkTemplateName(templateName);
    template = allTemplates.find((t: Template) => t.name === templateName);
  } else {
    template = await chooseTemplate(filter);
  }

  return template;
}

function postSetupMessage(name: string): string {
  return `
GraphQL server successfully bootstrapped :rocket:

Next Steps:
1. Change directory into project folder - ${chalk.cyan(`cd ${name}`)}
2. Follow template README.md to start server
`;
}

/**
 * Build template from user provided url
 */
function buildTemplateFromGithub(templateUrl: string) {
  const url = templateUrl.split('#');

  return {
    name: 'Users Github template',
    description: 'User provided template',
    repos: [
      {
        uri: url[0],
        branch: url[1] || 'master',
        path: '/'
      }
    ]
  };
}

/**
 * init command handler
 * @param name name of project folder
 * @param templateName name of the template provided(if any)
 * @param templateUrl github url to the template
 */
export async function init(
  name: string,
  templateName?: string,
  templateUrl?: string,
  filter?: string
) {
  logInfo(
    chalk.yellow(figlet.textSync('Graphback', { horizontalLayout: 'full' }))
  );
  const path: string = `${process.cwd()}/${name}`;
  checkDirectory(path, name);
  let template: Template;
  if (templateUrl) {
    template = buildTemplateFromGithub(templateUrl);
  } else {
    template = await assignTemplate(templateName, filter);
  }
  mkdirSync(path);
  logInfo(`
Bootstraping graphql server :dizzy: :sparkles:`);
  await extractTemplate(template, name);
  process.chdir(name);
  logInfo(postSetupMessage(name));
}
