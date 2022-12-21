import { IsDecimal, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBidDto {
  @IsUUID()
  auctionId: string;
  @IsNotEmpty()
  bidder: string;
  @IsDecimal()
  @IsNotEmpty()
  value: number;
}
