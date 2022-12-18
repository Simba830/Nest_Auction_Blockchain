import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('product')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getProducts() {
    return this.prisma.product.findMany();
  }

  @Post()
  createProduct(@Body() body: any) {
    console.log(body);

    const { name, description, seller } = body;

    return this.prisma.product.create({
      data: {
        id: randomUUID(),
        name,
        description,
        seller,
      },
    });
  }
}
