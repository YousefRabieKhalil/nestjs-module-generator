# NestJS Module Generator

A command-line tool for generating NestJS modules and related files with ease.

## Features

- Generate complete NestJS modules with a single command
- Creates controllers, services, DTOs, entities, and more
- Uses Handlebars templates for flexible and customizable file generation
- Interactive command-line interface for easy module creation

## Installation

1. Clone the repository:
   `git clone https://github.com/yourusername/nestjs-module-generator.git`
2. Navigate to the project directory:
   `cd nestjs-module-generator`
3. Install dependencies:
    `npm install`
4. Link the package globally (optional):
    `npm link`


## Usage

To generate a new module, run:
`nestjs-module-generator`

Or if you haven't linked the package globally:

`node index.js`


Follow the prompts to specify your module name and options.

## Generated File Structure

The tool generates the following file structure for each module:

```
└── libs/common/src/
    └── entities/
        └── [module-name].entity.ts
    └── modules/database/schema/
        └── [module-name].schema.ts
    └── enums/[module-name]/
        ├── [module-name]-permission.enum.ts
        └── [module-name]-topics.enum.ts
    └── interfaces/[module-name]/
        ├── [module-name]-repository.interface.ts
        └── [module-name]-service.interface.ts
    └── dtos/[module-name]/
        ├── create-[module-name].dto.ts
        ├── update-[module-name].dto.ts
        └── get-all-[module-names].dto.ts
└── apps/core/src/modules/[module-name]/
    └──[module-name].module.ts
    ├── repositories/
    │   └── [module-name].repository.ts
    ├── services/
    │   └── [module-name].service.ts
    └── controllers/
        └── [module-name].controller.ts
└── apps/gateway/src/modules/[module-name]/
    ├── [module-name].module.ts
    ├── services/
    │   └── [module-name].service.ts
    └── controllers/
        └── [module-name].controller.ts
```

## Customization

You can customize the generated files by modifying the Handlebars templates in the `templates/` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.
