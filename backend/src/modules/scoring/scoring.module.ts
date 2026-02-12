import { Module } from '@nestjs/common';
import { ScoringService } from './scoring.service';
import { ScoringController } from './scoring.controller';
import { TechnicalScoreCalculator } from './calculators/technical-score.calculator';
import { FundamentalScoreCalculator } from './calculators/fundamental-score.calculator';
import { GrowthRiskCalculator } from './calculators/growth-risk.calculator';

@Module({
  providers: [
    ScoringService,
    TechnicalScoreCalculator,
    FundamentalScoreCalculator,
    GrowthRiskCalculator,
  ],
  controllers: [ScoringController],
  exports: [ScoringService],
})
export class ScoringModule {}
