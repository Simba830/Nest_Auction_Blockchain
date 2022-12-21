import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { AuctionModule } from './auction/auction.module';
import { BidModule } from './bid/bid.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductModule, AuctionModule, BidModule, ConfigModule.forRoot()],
  providers: [PrismaService],
})
export class AppModule {}
