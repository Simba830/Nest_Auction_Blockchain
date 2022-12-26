import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class UpdateMaxBidNumberDto {
  @ApiProperty({ example: '3' })
  @IsNumber()
  @IsNotEmpty()
  maxBidNumber: number;
}

export class UpdateListPriceDto {
  @ApiProperty({ example: '0.0001' })
  @IsNumberString()
  @IsNotEmpty()
  listPrice: string;
}
