import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class CreateBidDto {
  @ApiProperty()
  @IsUUID()
  auctionId: string;

  @ApiProperty()
  @IsNotEmpty()
  bidder: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  value: string;
}
