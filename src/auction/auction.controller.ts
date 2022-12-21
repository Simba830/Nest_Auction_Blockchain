import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateAuctionDto } from './dto/create-auction.dto';

@Controller('auction')
export class AuctionController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getReturn() {
    return 'Ok cauction';
  }

  @Get(':id')
  getAuction(@Param() params): any {
    return this.prisma.auction.findFirst(params.id);
  }

  @Post()
  createProduct(@Body() dto: CreateAuctionDto) {
    console.log(dto);

    return this.prisma.auction.create({
      data: {
        id: randomUUID(),
        ...dto,
      },
    });
  }
}
