import { forwardRef, Inject, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { randomUUID } from 'node:crypto';

export class ProductService {
  constructor(
    @Inject(forwardRef(() => BlockchainService))
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
  ) {}

  getProducts() {
    return this.prisma.product.findMany();
  }

  async createAuctionProduct(dto: CreateProductDto): Promise<Product> {
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
  }

  async getProductsById(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }
}
