const {program} = require('commander');
const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const inquirer = require('inquirer');


program
    .version('1.0.0')
    .description('NestJS Module Generator')
    .option('-n, --name <name>', 'Module name')
    .parse(process.argv);

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

    // Define your file structure
    const fileStructure = [
        {
            path: `./libs/common/src/entities/${moduleNameKebab}.entity.ts`,
            template: 'entity.hbs'
        },
        {
            path: `./libs/common/src/modules/database/schema/${moduleNameKebab}.schema.ts`,
            template: 'schema.hbs'
        },
        {
            path: `./libs/common/src/enums/${moduleNameKebab}/${moduleNameKebab}-permission.enum.ts`,
            template: 'permission-enum.hbs'
        },
        {
            path: `./libs/common/src/enums/${moduleNameKebab}/${moduleNameKebab}-topics.enum.ts`,
            template: 'topics-enum.hbs'
        },
        {
            path: `./libs/common/src/interfaces/${moduleNameKebab}/${moduleNameKebab}-repository.interface.ts`,
            template: 'repository-interface.hbs'
        },
        {
            path: `./libs/common/src/interfaces/${moduleNameKebab}/${moduleNameKebab}-service.interface.ts`,
            template: 'service-interface.hbs'
        },
        {
            path: `./libs/common/src/dtos/${moduleNameKebab}/create-${moduleNameKebab}.dto.ts`,
            template: 'create-dto.hbs'
        },
        {
            path: `./libs/common/src/dtos/${moduleNameKebab}/update-${moduleNameKebab}.dto.ts`,
            template: 'update-dto.hbs'
        },
        {
            path: `./libs/common/src/dtos/${moduleNameKebab}/get-all-${moduleNamePlural}.dto.ts`,
            template: 'getAll-dto.hbs'
        },
        {
            path: `./apps/core/src/modules/${moduleNameKebab}/${moduleNameKebab}.module.ts`,
            template: 'module.hbs'
        },
        {
            path: `./apps/core/src/modules/${moduleNameKebab}/repositories/${moduleNameKebab}.repository.ts`,
            template: 'repository.hbs'
        },
        {
            path: `./apps/core/src/modules/${moduleNameKebab}/services/${moduleNameKebab}.service.ts`,
            template: 'service.hbs'
        },
        {
            path: `./apps/core/src/modules/${moduleNameKebab}/controllers/${moduleNameKebab}.controller.ts`,
            template: 'controller.hbs'
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
