import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BidController } from './bid.controller';

@Module({
  controllers: [BidController],
  providers: [PrismaService],
})
export class BidModule {}
