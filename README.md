<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

This is a backend [Nest](https://github.com/nestjs/nest) project using Prisma ORM to database migrations

This project is part of [Auction Contracts](https://github.com/ronylucca/auction-contracts) and it is a backend API that uses Alchemy node services to integrate a blockchain smart contract(Auction)
This was developed mainly to improve some skills like typescript, to interact with Prisma and of course face blockchain integrations

API's are documented using Swagger

The ADMIN_WALLET key is the same as used to deploy the Auction smart contract

I generated a new wallet and set it on env file to facilitate the tests. This wallet was used to deploy an Auction smart contract as well. So they are good to just run, migrate db and test thought Swagger.

## Installation

```bash
$ npm install
```

## Then to sync your database with Prisma migrations type:

```
npx prisma migrate dev
```

## Running the app

```bash
# watch mode
$ npm run start:dev

```
