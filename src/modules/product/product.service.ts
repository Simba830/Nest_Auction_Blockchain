import {
  BadRequestException,
  forwardRef,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { BlockchainService } from 'src/modules/blockchain/blockchain.service';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { randomUUID } from 'node:crypto';

export class ProductService {
  protected logger = new Logger(this.constructor.name);

  constructor(
    @Inject(forwardRef(() => BlockchainService))
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
  ) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  /**
   * @description request Product creation on blockchain and persists the data on DB
   * @param CreateProductDto
   * @returns {Product}
   * @emits BadRequestException
   */
  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      dto.tokenId = await this.blockchainService.createAuctionProductBlockchain(
        dto.name,
        dto.seller,
      );
      return this.prisma.product.create({
        data: {
          id: randomUUID(),
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(
        'Could not mint NFT product token ${error.message}',
        error.stack,
      );
      throw new BadRequestException(
        'Product could not be crated or minted. Check data request',
      );
    }
  }

  async getProductsById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: { Auction: true },
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
