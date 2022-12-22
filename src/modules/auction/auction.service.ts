import { forwardRef, Inject, Logger, NotFoundException } from '@nestjs/common';
import { Auction, Product } from '@prisma/client';
import { BlockchainService } from 'src/modules/blockchain/blockchain.service';
import { PrismaService } from 'src/prisma.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { randomUUID } from 'node:crypto';
import { ProductService } from '../product/product.service';

export class AuctionService {
  protected logger = new Logger(this.constructor.name);

  constructor(
    @Inject(forwardRef(() => BlockchainService))
    private readonly blockchainService: BlockchainService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    private readonly prisma: PrismaService,
  ) {}

  getAuctions() {
    return this.prisma.auction.findMany();
  }

  async initializeAuction(dto: CreateAuctionDto): Promise<Auction> {
    try {
      const product = await this.getProductById(dto.productId);

      await this.blockchainService.initializeAuction(
        product.tokenId,
        dto.initialPrice,
      );
      return this.prisma.auction.create({
        data: {
          id: randomUUID(),
          isListed: true,
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(
        `Could not initialize Auction ${error.message}`,
        error.stack,
      );
    }
  }

  async getAuctionById(id: string): Promise<Auction> {
    const auction = await this.prisma.auction.findUnique({
      where: {
        id,
      },
    });
    if (!auction) {
      throw new NotFoundException();
    }
    return auction;
  }

  async deleteAuction(id: string) {
    await this.prisma.auction.delete({
      where: {
        id,
      },
    });
  }

  async getProductById(productId: string): Promise<Product> {
    return await this.productService.getProductsById(productId);
  }

  async getProductByAuctionId(auctionId: string): Promise<Product> {
    const auction = await this.getAuctionById(auctionId);
    return await this.productService.getProductsById(auction.productId);
  }

  async getAuctionOnChain(auctionId: string): Promise<any> {
    const productToken = await this.getProductByAuctionId(auctionId);
    return await this.blockchainService.getAuctionOnChain(productToken.tokenId);
  }
}
