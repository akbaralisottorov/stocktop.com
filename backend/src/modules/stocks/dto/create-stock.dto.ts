import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({ example: 'AAPL', description: 'The unique stock ticker symbol' })
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @ApiProperty({ example: 'Apple Inc.', description: 'Full company name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'NASDAQ', description: 'Stock exchange name' })
  @IsString()
  @IsNotEmpty()
  exchange: string;

  @ApiPropertyOptional({ example: 'Technology' })
  @IsString()
  @IsOptional()
  sector?: string;

  @ApiPropertyOptional({ example: 'Consumer Electronics' })
  @IsString()
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional({ example: 'https://www.apple.com' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ description: 'Brief description of the company' })
  @IsString()
  @IsOptional()
  description?: string;
}