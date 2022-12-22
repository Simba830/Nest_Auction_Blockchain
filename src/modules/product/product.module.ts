import { forwardRef, Module } from '@nestjs/common';
import { BlockchainModule } from 'src/modules/blockchain/blockchain.module';
import { PrismaService } from 'src/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [forwardRef(() => BlockchainModule)],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
