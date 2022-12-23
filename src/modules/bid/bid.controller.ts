import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BidService } from './bid.service';

@Controller('bid')
@ApiTags('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Get(':id')
  getAuction(@Param('id') id: string): any {
    return this.bidService.getBidById(id);
  }

  @Post()
  @ApiBody({ type: CreateBidDto })
  async createBid(@Body() dto: CreateBidDto) {
    return await this.bidService.createBid(dto);
  }
}
