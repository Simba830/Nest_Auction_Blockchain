import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('blockchain/product')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductsById(id);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  async createProduct(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productService.createAuctionProduct(dto);
  }
}
