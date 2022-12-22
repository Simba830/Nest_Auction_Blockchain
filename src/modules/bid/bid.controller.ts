import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateBidDto } from './dto/create-bid.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BidService } from './bid.service';

@Controller('blockchain')
@ApiTags('bids')
export class BidController {
  constructor(private readonly bidService: BidService) {}

  @Get('bid/:id')
  getAuction(@Param('id') id: string): any {
    return this.bidService.getBidById(id);
  }

  @Post('bid')
  @ApiBody({ type: CreateBidDto })
  async createBid(@Body() dto: CreateBidDto) {
    console.log(dto);

    return await this.bidService.createBid(dto);
  }
}
