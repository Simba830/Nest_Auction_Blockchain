import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateBidDto } from './dto/create-bid.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getReturn() {
    return 'Bid controller ok';
  }

  // @Get(':id')
  // getAuction(@Param() params): any {
  //   return this.prisma.auction.findFirst(params.id);
  // }

  @Post()
  createBid(@Body() dto: CreateBidDto) {
    console.log(dto);

    return this.prisma.bid.create({
      data: {
        id: randomUUID(),
        ...dto,
      },
    });
  }
}
