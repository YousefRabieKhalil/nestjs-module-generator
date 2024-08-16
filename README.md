
# JavaScript CLI Project

This project is a command-line interface (CLI) tool built with JavaScript. It provides functionality for generating various components and modules in a structured format, primarily used in a NestJS environment.

## Features

- **CLI Tool:** A command-line interface for generating different modules and components.
- **Template Generation:** Utilizes Handlebars templates to generate files such as controllers, services, DTOs, and more.
- **NestJS Focused:** Designed to work seamlessly with NestJS projects, following best practices and patterns.

## Project Structure

```
├── bin/
│   └── nestjs-module-generator.js  # Entry point for the CLI tool
├── templates/
│   ├── controller.hbs              # Template for generating a controller
│   ├── create-dto.hbs              # Template for generating a Create DTO
│   ├── entity.hbs                  # Template for generating an entity
│   ├── gateway-controller.hbs      # Template for generating a Gateway controller
│   ├── gateway-module.hbs          # Template for generating a Gateway module
│   ├── gateway-service.hbs         # Template for generating a Gateway service
│   ├── getAll-dto.hbs              # Template for generating a GetAll DTO
│   ├── module.hbs                  # Template for generating a module
│   ├── permission-enum.hbs         # Template for generating a permission enum
│   ├── repository.hbs              # Template for generating a repository
│   ├── repository-interface.hbs    # Template for generating a repository interface
│   ├── schema.hbs                  # Template for generating a schema
│   ├── service.hbs                 # Template for generating a service
│   ├── service-interface.hbs       # Template for generating a service interface
│   ├── topics-enum.hbs             # Template for generating a topics enum
│   └── update-dto.hbs              # Template for generating an Update DTO
├── cli.js                          # CLI implementation script
├── index.js                        # Main entry point of the application
├── package.json                    # Node.js dependencies and scripts
└── README.md                       # Project documentation
```

## Installation

1. Clone the repository:
   ```sh
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```sh
   cd cli_project
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

To use the CLI tool to generate a module or component:

```sh
node cli.js <command> <options>
```

For example, to generate a new controller:
```sh
node cli.js generate controller MyController
```

## Available Commands

- `generate`: Generate a new module, controller, service, etc.
    - **Options**:
        - `controller <name>`: Generates a new controller using the specified name.
        - `service <name>`: Generates a new service using the specified name.
        - `module <name>`: Generates a new module using the specified name.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
