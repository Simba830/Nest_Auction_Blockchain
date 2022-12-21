import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBidDto {
  @ApiProperty()
  @IsUUID()
  auctionId: string;

  @ApiProperty()
  @IsNotEmpty()
  bidder: string;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  value: number;
}
