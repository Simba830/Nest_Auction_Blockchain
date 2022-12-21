import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { AuctionController } from './auction.controller';

@Module({
  controllers: [AuctionController],
  providers: [PrismaService],
})
export class AuctionModule {}
