import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IndicatorsService } from './services/indicators.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private indicatorsService: IndicatorsService) {}

  @Get(':symbol/indicators')
  @ApiOperation({ summary: 'Get technical indicators for a stock' })
  async getIndicators(@Param('symbol') symbol: string) {
    const rsi = await this.indicatorsService.calculateRSI(symbol);
    const macd = await this.indicatorsService.calculateMACD(symbol);
    const sma50 = await this.indicatorsService.calculateSMA(symbol, 50);
    const sma200 = await this.indicatorsService.calculateSMA(symbol, 200);

    return {
      symbol,
      rsi,
      macd,
      sma50,
      sma200,
    };
  }
}
