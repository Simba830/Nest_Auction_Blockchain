import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateProductDto } from './dto/create-product.dto';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { abi } from './Auction.json';

@Controller('product')
export class ProductController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  contractAddress = this.configService.get<string>('AUCTION_CONTRACT');
  adminWallet = this.configService.get<string>('ADMIN_WALLET');
  providerApi = this.configService.get<string>('PROVIDER_API');
  providerNetwork = this.configService.get<string>('PROVIDER_NETWORK');
  contractABI = abi;

  @Get()
  getProducts() {
    return this.prisma.product.findMany();
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    console.log(dto);

    dto.tokenId = await this.mintNFT(dto);

    console.log('Dto nao setado');
    return this.prisma.product.create({
      data: {
        id: randomUUID(),
        ...dto,
      },
    });
  }

  async mintNFT(dto: CreateProductDto): Promise<any> {
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

      console.log('creating product on blockchain..');
      await auction.createProductToken(dto.name, dto.seller);

      let tokenId = await auction.getCurrentTokenId();
      console.log('Token de cara: ', tokenId);
      tokenId++;
      return tokenId;
    } catch (error) {
      console.log(error);
    }
  }
}
