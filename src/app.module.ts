import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from './blockchain/blockchain.module';

@Module({
  imports: [
    ProductModule,
    AuctionModule,
    BidModule,
    ConfigModule.forRoot(),
    BlockchainModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
