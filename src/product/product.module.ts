import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { ProductController } from './product.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ProductController],
  providers: [PrismaService],
})
export class ProductModule {}
