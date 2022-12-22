import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEthereumAddress,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  tokenId?: number;

  @ApiProperty({ example: '0x802829b9AB85f2D2c3B8310beA0a8edfe3eeFf6D' })
  @IsNotEmpty()
  @IsEthereumAddress()
  seller: string;
}
