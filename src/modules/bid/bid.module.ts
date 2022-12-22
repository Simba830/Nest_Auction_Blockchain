import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuctionService } from '../auction/auction.service';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { ProductService } from '../product/product.service';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

@Module({
  imports: [forwardRef(() => BlockchainModule)],
  controllers: [BidController],
  providers: [PrismaService, BidService, AuctionService, ProductService],
})
export class BidModule {}
