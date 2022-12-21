import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuctionController } from './auction.controller';

@Module({
  controllers: [AuctionController],
  providers: [PrismaService],
})
export class AuctionModule {}
