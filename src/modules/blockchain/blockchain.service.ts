import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BigNumber, ethers } from 'ethers';
import { isGeneratorFunction } from 'util/types';
import { abi } from './Auction.json';

@Injectable()
export class BlockchainService {
  protected logger = new Logger(this.constructor.name);

  constructor(private readonly configService: ConfigService) {}

  contractAddress = this.configService.get<string>('AUCTION_CONTRACT');
  adminWallet = this.configService.get<string>('ADMIN_WALLET');
  providerApi = this.configService.get<string>('PROVIDER_API');
  providerNetwork = this.configService.get<string>('PROVIDER_NETWORK');
  listTokenPrice = this.configService.get<string>('LIST_TOKEN_PRICE');

  contractABI = abi;
  provider = new ethers.providers.AlchemyProvider(
    this.providerNetwork,
    this.providerApi,
  );

  /**
   * @description mounts the signer object related to admin wallet of contract and auctions
   */
  private getAdminCredentials(): ethers.Wallet {
    const wallet = new ethers.Wallet(this.adminWallet);
    const signer = wallet.connect(this.provider);
    return signer;
  }

  /**
   * @description mounts the signer object related to admin wallet of contract and auctions
   */
  private getAuctionContractInstance(): ethers.Contract {
    const signer = this.getAdminCredentials();
    return new ethers.Contract(this.contractAddress, this.contractABI, signer);
  }

  /**
   * @description calls the Auction contract to create productAuction Struct and to mint a NFT
   */
  async createAuctionProductBlockchain(
    name: string,
    seller: string,
  ): Promise<number> {
    try {
      const auctionContract = this.getAuctionContractInstance();

      let tokenId = await auctionContract.getCurrentTokenId();
      tokenId++;

      this.logger.log('creating product on blockchain for tokenId: ', tokenId);
      await auctionContract.createProductToken(name, seller);

      return tokenId;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async initializeAuction(tokenId: number, initialPrice: string): Promise<any> {
    try {
      const auctionContract = this.getAuctionContractInstance();
      const listingPrice = await auctionContract.getListPrice();

      this.logger.log('initializing auction for tokenId: ', tokenId);
      const auction = await auctionContract.initializeAuction(
        tokenId,
        ethers.utils.parseEther(initialPrice),
        {
          value: listingPrice,
        },
      );

      return auction;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async bid(
    tokenId: number,
    bidPrice: string,
    bidderAddress: string,
  ): Promise<any> {
    try {
      const auctionContract = this.getAuctionContractInstance();

      this.logger.log('transacting a bid for tokenId: ', tokenId);
      const auction = await auctionContract.bid(
        tokenId,
        ethers.utils.parseEther(bidPrice),
        bidderAddress,
      );

      return auction;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAuctionOnChain(tokenId: number): Promise<any> {
    const auctionContract = this.getAuctionContractInstance();
    this.logger.log(
      'Requesting Auction data from blockchain for tokenId: ',
      tokenId,
    );
    const auction = await auctionContract.getAuction(tokenId);
    this.logger.log('Auction requested: ', auction);
    return auction;
  }
}
