[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/9b581afa2baf44e1b31b6971d3676623)](https://www.codacy.com/gh/bsovs/ecse437/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bsovs/ecse437&amp;utm_campaign=Badge_Grade)


# Features

- unit and integration tests to test the features of the code
- husky git hooks to run static analysis before code is even committed, reducing errors before they are run in the cloud
- eslint code format linting (static analysis) for code quality, and common javascript errors
- github workflows to run CI/CD on push, pull-request, and merge on main

## NPM scripts

- `npm run build`: Build the services as a Docker container for production
- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run integration`: Run integration tests
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose

# About this Project
## moleculer-demo
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

### Usage
Start the project with `npm run dev` command. 
After starting, open the http://localhost:3000/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

In the terminal, try the following commands:
- `nodes` - List all connected nodes.
- `actions` - List all registered service actions.
- `call greeter.hello` - Call the `greeter.hello` action.
- `call greeter.welcome --name John` - Call the `greeter.welcome` action with the `name` parameter.
- `call products.list` - List the products (call the `products.list` action).

### Services
- **api**: API Gateway services
- **greeter**: Sample service with `hello` and `welcome` actions.
- **products**: Sample DB service. To use with MongoDB, set `MONGO_URI` environment variables and install MongoDB adapter with `npm i moleculer-db-adapter-mongo`.
- **db.mixin**: Database access mixin for services. Based on [moleculer-db](https://github.com/moleculerjs/moleculer-db#readme)
