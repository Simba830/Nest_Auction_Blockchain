import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsUUID } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({ example: 'd37e48c8-6fb6-4460-b107-373916e988d8' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: '0.001' })
  @IsNumberString()
  initialPrice: string;
}
