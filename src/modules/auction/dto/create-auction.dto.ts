import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsUUID } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty()
  @IsUUID()
  productId: string;

  @ApiProperty({ example: '0.001' })
  @IsNumberString()
  initialPrice: string;
}
