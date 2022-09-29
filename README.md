# OLX clone API

## Description

OLX clone API created with Nest.Js, MySql, and S3 for image storing 

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer)).
- [x] Sign in and sign up via email.
- [x] User activation via email.
- [x] File upload via Amazon S3 Bucket ([aws-sdk](https://www.npmjs.com/package/aws-sdk)).
- [x] Swagger documentation.

## Quick run

```bash
git clone --depth 1 https://github.com/BohdanSereda/OLX-Clone-Api.git my-app
cd my-app/
cp .env.example .env
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Documentation
- http://localhost:3000/api/docs#/