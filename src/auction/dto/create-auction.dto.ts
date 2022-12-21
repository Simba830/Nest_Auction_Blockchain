import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty()
  @IsUUID()
  productId: string;
}
