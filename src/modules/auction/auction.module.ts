import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ProductService } from '../product/product.service';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';

@Module({
  imports: [forwardRef(() => BlockchainModule)],
  controllers: [AuctionController],
  providers: [PrismaService, AuctionService, ProductService],
})
export class AuctionModule {}
