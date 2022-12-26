import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service';
import {
  UpdateListPriceDto,
  UpdateMaxBidNumberDto,
} from './dto/config.blockchain.dto';

@Controller('blockchain')
@ApiTags('config-params')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  /**
   * @description: Update maximum bid number on blockchain
   */
  @Get('/max-bid-number')
  async getMaxBidNumber() {
    return await this.blockchainService.getMaxBidNumber();
  }
  /**
   * @description: Update maximum bid number on blockchain
   */
  @Post('/max-bid-number')
  @ApiBody({ type: UpdateMaxBidNumberDto })
  async updateMaxBidNumber(@Body() dto: UpdateMaxBidNumberDto) {
    return await this.blockchainService.updateMaxBidNumber(dto);
  }

  /**
   * @description: Update maximum bid number on blockchain
   */
  @Get('/list-price')
  async getListPrice() {
    return await this.blockchainService.getListPrice();
  }

  /**
   * @description: Update maximum bid number on blockchain
   */
  @Post('/list-price')
  @ApiBody({ type: UpdateListPriceDto })
  async updateListPrice(@Body() dto: UpdateListPriceDto) {
    console.log(dto);

    return await this.blockchainService.updateListPrice(dto);
  }
}
