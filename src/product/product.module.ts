import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import { PrismaService } from 'src/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [ConfigModule, forwardRef(() => BlockchainModule)],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
