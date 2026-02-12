import { Module } from '@nestjs/common';
import { PriceFetcherService } from './services/price-fetcher.service';
import { PriceUpdateJob } from './jobs/price-update.job';

@Module({
  providers: [PriceFetcherService, PriceUpdateJob],
  exports: [PriceFetcherService],
})
export class DataPipelineModule {}
