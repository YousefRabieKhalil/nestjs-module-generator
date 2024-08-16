const {program} = require('commander');
const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const inquirer = require('inquirer');

console.log('NestJS Module Generator CLI');

program
    .option('-n, --name <name>', 'Module name (in kebab-case, e.g., membership-plan)')
    .option('-p, --path <name>', 'Path')
    .parse(process.argv);

console.log('Options:', program.opts());
const options = program.opts();


function toKebabCase(str) {
    return str.toLowerCase();
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function toPascalCase(str) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

async function promptForModuleName() {
    console.log(`Please provide the name of your module. For example, if you want to create a module for users, you can name it 'user'.`)
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'moduleName',
            message: 'What is the name of your module?',
            validate: input => input.length > 0 || 'Module name is required'
        }
    ]);
    return answers.moduleName;
}

async function generateModule() {
    const moduleNameKebab = options.name || await promptForModuleName();
    const moduleNameCamel = toCamelCase(moduleNameKebab);
    const moduleNamePascal = toPascalCase(moduleNameKebab);
    const moduleNamePlural = `${moduleNameKebab}s`;
    const pathDir = options.path || process.cwd();

    console.log(`Creating module ${moduleNameKebab}...`)
    // Define your file structure
    const fileStructure = [
        {
            path: `${pathDir}/libs/common/src/entities/${moduleNameKebab}.entity.ts`,
            template: 'entity.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/modules/database/schema/${moduleNameKebab}.schema.ts`,
            template: 'schema.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/enums/${moduleNameKebab}/${moduleNameKebab}-permission.enum.ts`,
            template: 'permission-enum.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/enums/${moduleNameKebab}/${moduleNameKebab}-topics.enum.ts`,
            template: 'topics-enum.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/interfaces/${moduleNameKebab}/${moduleNameKebab}-repository.interface.ts`,
            template: 'repository-interface.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/interfaces/${moduleNameKebab}/${moduleNameKebab}-service.interface.ts`,
            template: 'service-interface.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/dtos/${moduleNameKebab}/create-${moduleNameKebab}.dto.ts`,
            template: 'create-dto.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/dtos/${moduleNameKebab}/update-${moduleNameKebab}.dto.ts`,
            template: 'update-dto.hbs'
        },
        {
            path: `${pathDir}/libs/common/src/dtos/${moduleNameKebab}/get-all-${moduleNamePlural}.dto.ts`,
            template: 'getAll-dto.hbs'
        },
        {
            path: `${pathDir}/apps/core/src/modules/${moduleNameKebab}/${moduleNameKebab}.module.ts`,
            template: 'module.hbs'
        },
        {
            path: `${pathDir}/apps/core/src/modules/${moduleNameKebab}/repositories/${moduleNameKebab}.repository.ts`,
            template: 'repository.hbs'
        },
        {
            path: `${pathDir}/apps/core/src/modules/${moduleNameKebab}/services/${moduleNameKebab}.service.ts`,
            template: 'service.hbs'
        },
        {
            path: `${pathDir}/apps/core/src/modules/${moduleNameKebab}/controllers/${moduleNameKebab}.controller.ts`,
            template: 'controller.hbs'
        },
        {
            path: `${pathDir}/apps/gateway/src/modules/${moduleNameKebab}/controllers/${moduleNameKebab}.controller.ts`,
            template: 'gateway-controller.hbs'
        },
        {
            path: `${pathDir}/apps/gateway/src/modules/${moduleNameKebab}/services/${moduleNameKebab}.service.ts`,
            template: 'gateway-service.hbs'
        },
        {
            path: `${pathDir}/apps/gateway/src/modules/${moduleNameKebab}/${moduleNameKebab}.module.ts`,
            template: 'gateway-module.hbs'
        },
    ];

    // Function to render template
    function renderTemplate(templateName, data) {
        const templateContent = fs.readFileSync(path.join(__dirname, 'templates', templateName), 'utf8');
        const template = Handlebars.compile(templateContent);
        return template(data);
    }

    // Create files
    for (const file of fileStructure) {
        const content = renderTemplate(file.template, {
            moduleNameKebab,
            moduleNameCamel,
            moduleNamePascal,
            moduleNamePlural
        });
        await fs.outputFile(file.path, content);
        console.log(`Created ${file.path}`);
    }

    console.log(`Module ${moduleNameKebab} created successfully!`);
}

generateModule().catch(console.error);
