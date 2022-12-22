import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuctionService } from './auction.service';

@Controller('auction')
@ApiTags('auctions')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Get()
  getReturn() {
    return this.auctionService.getAuctions();
  }

  @Get(':id')
  getAuction(@Param('id') id: string): any {
    return this.auctionService.getAuctionById(id);
  }

  @Get('blockchain/:id')
  getAuctionOnChain(@Param('id') id: string): any {
    return this.auctionService.getAuctionOnChain(id);
  }

  @Post('initialize')
  @ApiBody({ type: CreateAuctionDto })
  async initializeAuction(@Body() dto: CreateAuctionDto) {
    console.log(dto);

    return await this.auctionService.initializeAuction(dto);
  }

  @Delete(':id')
  async deleteAuction(@Param('id') id: string) {
    return await this.auctionService.deleteAuction(id);
  }
}
