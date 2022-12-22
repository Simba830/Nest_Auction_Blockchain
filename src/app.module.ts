import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductModule } from './modules/product/product.module';
import { AuctionModule } from './modules/auction/auction.module';
import { BidModule } from './modules/bid/bid.module';
import { ConfigModule } from '@nestjs/config';
import { BlockchainModule } from './modules/blockchain/blockchain.module';

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
