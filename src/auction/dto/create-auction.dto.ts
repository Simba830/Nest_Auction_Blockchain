import { IsUUID } from 'class-validator';

export class CreateAuctionDto {
  @IsUUID()
  productId: string;
}
