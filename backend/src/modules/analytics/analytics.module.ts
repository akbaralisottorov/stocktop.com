import { Module } from '@nestjs/common';
import { IndicatorsService } from './services/indicators.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  providers: [IndicatorsService],
  controllers: [AnalyticsController],
  exports: [IndicatorsService],
})
export class AnalyticsModule {}
