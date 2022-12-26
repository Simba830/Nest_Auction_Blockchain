<p align="center">
  <img src="https://assets-global.website-files.com/60118ca1c2eab61d24bcf151/6329c748f1e3f02c29c9a2a8_BP%20-%20NA%2BSM%20-%201R%20-%20Full%20(2).png" width="400" alt="Auction Logo" /></a>
</p>

# Auction Blockchain - Backend API

This is a backend [Nest](https://github.com/nestjs/nest) project using Prisma ORM to database migrations

This project is part of [Auction Contracts](https://github.com/ronylucca/auction-contracts) and it is a backend API that uses Alchemy node services to integrate a blockchain smart contract(Auction)
This was developed mainly to improve some skills like typescript, to interact with Prisma and of course face blockchain integrations

API's are documented using **Swagger**. Default location http://localhost:3000/api

The **ADMIN_WALLET** key is the same as used to deploy the Auction smart contract

`I've generated a new wallet and set it on env.example file to facilitate the tests. This wallet was used to deploy an Auction smart contract as well. They are good to run and test, so migrate db and test thought Swagger.`

## Installation

```bash
$ npm install
```

### Then to sync your database with Prisma migrations type:

```
npx prisma migrate dev
```

### Running the app

```bash
# watch mode
$ npm run start:dev

```

### These are the full cycle steps to test an Auction

1. **[POST] /product :** to create a Product instance by contract persisting a Product on db. The contract also will mint a AUCT token for the administration address set on .env

2. **[POST] /auction/initialize :** actually initialize an Auction. Persists it on DB and update the struct on blockchain setting it to Bid.

3. **[GET] /auction/blockchain/{id} :** retrieves the Auction object struct content from blockchain using the Auction Id saved on DB. This one contains :

`tokenId, sellerAddress, bidderAddress, lastBid, bidPosition, isListed`

4. **[POST] /bid :** create a Bid instance on DB to represents this action. When an auction reaches up to a specific number of bids the contract evaluate the bestBid and transfer the NFT Token from Administration Address to the Bidder winner address. Also, a ListPrice amount of 0.0001 ether is transferred to the seller. This amount is payed on initialize an auction.

### Some endpoints to set business rules on smart contract

1. **[POST] /blockchain/max-bid-number:** used to update maximum number of bid for an auction. Default is 10. Only for tests I recommend to updated it to 3

2. **[GET] /blockchain/max-bid-number :** retrieves the actual bid number from blockchain

3. **[POST] /blockchain/list-price :** updates the listing price used on initializing an Auction.
   Default id 0.0001 ether
4. **[GET] /blockchain/list-price :** retrieves actual listPrice from blockchain
