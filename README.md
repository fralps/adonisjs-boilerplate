# adonisjs-boilerplate

[![CI](https://github.com/fralps/adonisjs-boilerplate/actions/workflows/pipeline.yml/badge.svg?event=push)](https://github.com/fralps/adonisjs-boilerplate/actions/workflows/pipeline.yml)

## Tech stack

![TypeScript](https://img.shields.io/badge/Typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white) ![AdonisJS](https://img.shields.io/badge/AdonisJS_6-%23220052.svg?style=flat&logo=adonisjs&logoColor=white) ![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flate&logo=node.js&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white)  
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white) ![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=flat&logo=dependabot&logoColor=white)

## Requirements

- Node >= 20
- pnpm
- postgresql

## Development

- **(ℹ️ only for first setup)** Create manually your DB via psql or TablePlus
- Open psql console: `psql postgres`
- Create DB: `CREATE DATABASE db_name;`
- Grant privileges to your DB: `GRANT ALL PRIVILEGES ON DATABASE db_name TO your_user;`
- Run `./scripts/reset-db` to setup database and seed
- Run `./scripts/dev` to start development server

## Testing

- **(ℹ️ only for first setup)** Create manually your DB via psql or TablePlus
- Open psql console: `psql postgres`
- Create DB: `CREATE DATABASE db_name;`
- Grant privileges to your DB: `GRANT ALL PRIVILEGES ON DATABASE db_name TO your_user;`
- Run `./scripts/test` to start test suites

## Tools

- ESLint
- Prettier
