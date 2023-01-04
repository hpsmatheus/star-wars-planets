## Star Wars Planets

Tech Stack: [Node.js](https://nodejs.org/en/docs/), [Typescript](https://www.typescriptlang.org/docs/), [Nest.js](https://docs.nestjs.com/), [SQLite](https://www.sqlite.org/docs.html)

## Requirements

- Node v16.13.2 or higher

## Run Application Locally

```bash
$ git clone
```

```bash
$ npm install
```

```bash
-> create a .env file on project root and copy the content from .env.example
```

```bash
$ npm run start:dev
```

## API Docs

[Swagger] http://localhost:300/api-docs

## Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Linter and formatting

```bash
# find problems
$ npm run lint

# find and fix problems automatically
$ npm run lint:fix

# format code
$ npm run format
```

## Folder Structure

The API design follows the basic Nest.js structure with modules, controllers and services. Clients are used to interact with external APIs. Nest.js interceptors are used to monitor the request flow, catch errors and log operations. Nest.js validation pipes are used to validate input to API endpoints and guards are used to guarantee authentication to endpoints the require it.

This project was created from a [boilerplate](https://github.com/hpsmatheus/nestjs-boilerplate), made by the same author: [hpsmatheus](https://github.com/hpsmatheus). The boilerplate contains error handling & logging structure, input validation structure, swagger config, linting config, pre-commit actions, basic test mocks and project configurations in general.

```
> src
  > core                            (files that are used all over the API)
     > error                        (files to do the error handling and format API errors)
     > request-interceptor          (Nest.js interceptor to catch errors and do API logging)
     > api-validation.pipe.ts       (Nest.js pipe to validate DTOs)
     > auth.guard.ts                (Nest.js guard to authenticate requests)
     > swagger-response.ts          (abstraction to add and reuse swagger responses)


  > modules                         (the modules of the application separated by domain, ex.: planet)


  > typings                         (contains all the API typings)

  > test
    > integration      (integration tests mocking db and external APIs)
    > mocks            (mocks used all over the tests)
    > unit             (unit tests)



```

## Improvements

- Increase test coverage. The idea was to present different types of test that could be done in this context, but not all the scenarios are covered yet.

- The api key was pushed to github repo just for the sake of easing the evaluator process. In a real project, this key would not be pushed but stored in a safe place (a vault, for example) with limited access.

## Technical decisions

- I decided to use another boilerplate that I had because it was more lean and already had some structured resources (mentioned above) that would fit this project.

- Also decided to use TypeORM instead of Prisma because Prisma has some limitations related to coupled typings that I haven't had much experience on how to solve this issue. So for the sake of speed I choose TypeORM because is the one I'm more familiar with.
