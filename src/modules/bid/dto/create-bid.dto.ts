import { ApiProperty } from '@nestjs/swagger';
import {
  IsEthereumAddress,
  IsNotEmpty,
  IsNumberString,
  IsUUID,
} from 'class-validator';

export class CreateBidDto {
  @ApiProperty({ example: 'd37e48c8-6fb6-4460-b107-373916e988d8' })
  @IsUUID()
  auctionId: string;

  @ApiProperty({ example: '0x802829b9AB85f2D2c3B8310beA0a8edfe3eeFf6D' })
  @IsEthereumAddress()
  @IsNotEmpty()
  bidder: string;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  value: string;
}
