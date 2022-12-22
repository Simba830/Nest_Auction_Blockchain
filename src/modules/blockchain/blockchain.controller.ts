import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';

@Controller('blockchain')
@ApiTags('bids')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  /**
   * @description: Could be a PATCH but in this case we request blockchain to a uint256 data without id
   */
  // @Post('/initial-price')
  // @ApiBody({ type: CreateAuctionDto })
  // async initializeAuction(@Body() dto: CreateAuctionDto) {
  //   console.log(dto);

  //   return await this.auctionService.initializeAuction(dto);
  // }
}
