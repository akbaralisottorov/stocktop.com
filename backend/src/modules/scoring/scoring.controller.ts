import { Controller, Get, Param, Post } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('scoring')
@Controller('scores')
export class ScoringController {
  constructor(private scoringService: ScoringService) {}

  @Get('rankings')
  @ApiOperation({ summary: 'Get top stock rankings' })
  async getRankings() {
    return this.scoringService.getRankings();
  }

  @Get(':symbol')
  @ApiOperation({ summary: 'Get score for a specific stock' })
  async getScore(@Param('symbol') symbol: string) {
    return this.scoringService.getScore(symbol);
  }

  @Post(':symbol/calculate')
  @ApiOperation({ summary: 'Trigger score calculation for a stock' })
  async calculateScore(@Param('symbol') symbol: string) {
    return this.scoringService.calculateAndSaveScore(symbol);
  }
}
