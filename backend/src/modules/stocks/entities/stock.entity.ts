import { ApiProperty } from '@nestjs/swagger';
import { Stock } from '@prisma/client';

export class StockEntity implements Stock {
  @ApiProperty({ example: 'AAPL', description: 'The unique stock ticker symbol' })
  symbol: string;

  @ApiProperty({ example: 'Apple Inc.', description: 'Full company name' })
  companyName: string;

  @ApiProperty({ example: 'NASDAQ', description: 'Stock exchange name' })
  exchange: string;

  @ApiProperty({ required: false, example: 'Technology', nullable: true })
  sector: string | null;

  @ApiProperty({ required: false, example: 'Consumer Electronics', nullable: true })
  industry: string | null;

  @ApiProperty({ required: false, example: 'https://www.apple.com', nullable: true })
  website: string | null;

  @ApiProperty({ required: false, description: 'Company description', nullable: true })
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}