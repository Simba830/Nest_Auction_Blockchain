import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { abi } from './Auction.json';

@Injectable()
export class BlockchainService {
  protected logger = new Logger(this.constructor.name);

  constructor(private readonly configService: ConfigService) {}

  contractAddress = this.configService.get<string>('AUCTION_CONTRACT');
  adminWallet = this.configService.get<string>('ADMIN_WALLET');
  providerApi = this.configService.get<string>('PROVIDER_API');
  providerNetwork = this.configService.get<string>('PROVIDER_NETWORK');
  contractABI = abi;

  async createAuctionProductBlockchain(
    name: string,
    seller: string,
  ): Promise<number> {
    try {
      const provider = new ethers.providers.AlchemyProvider(
        this.providerNetwork,
        this.providerApi,
      );
      const wallet = new ethers.Wallet(this.adminWallet);
      const signer = wallet.connect(provider);
      const auction = new ethers.Contract(
        this.contractAddress,
        this.contractABI,
        signer,
      );

      this.logger.log('creating product on blockchain..');
      await auction.createProductToken(name, seller);

      let tokenId = await auction.getCurrentTokenId();
      tokenId++;
      return tokenId;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
