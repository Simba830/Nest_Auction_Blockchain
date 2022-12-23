import {
  BadRequestException,
  forwardRef,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Auction, Bid, Product } from '@prisma/client';
import { BlockchainService } from 'src/modules/blockchain/blockchain.service';
import { PrismaService } from 'src/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { randomUUID } from 'node:crypto';
import { AuctionService } from '../auction/auction.service';

export class BidService {
  protected logger = new Logger(this.constructor.name);

  constructor(
    @Inject(forwardRef(() => BlockchainService))
    private readonly blockchainService: BlockchainService,
    @Inject(forwardRef(() => AuctionService))
    private readonly auctionService: AuctionService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * @description request bid creation on blockchain and persists the data on DB
   * @param CreateBidDto
   * @returns {Bid}
   * @emits BadRequestException
   */
  async createBid(dto: CreateBidDto): Promise<Bid> {
    try {
      const tokenId = (
        await this.auctionService.getProductByAuctionId(dto.auctionId)
      ).tokenId;
      this.logger.log('Creating Bid on blockchain for TokenId', tokenId);
      await this.blockchainService.bid(tokenId, dto.value, dto.bidder);

      return this.prisma.bid.create({
        data: {
          id: randomUUID(),
          ...dto,
        },
      });
    } catch (error) {
      this.logger.error(`Could not create Bid ${error.message}`, error.stack);
      throw new BadRequestException(
        'Auction is finalized or bid value is bellow',
      );
    }
  }

  async getBidById(id: string): Promise<Bid> {
    const bid = await this.prisma.bid.findUnique({
      where: {
        id,
      },
    });
    if (!bid) {
      throw new NotFoundException();
    }
    return bid;
  }
}
