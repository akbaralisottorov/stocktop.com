import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PriceFetcherService } from '../services/price-fetcher.service';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PriceUpdateJob {
  private readonly logger = new Logger(PriceUpdateJob.name);

  constructor(
    private prisma: PrismaService,
    private priceFetcher: PriceFetcherService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.log('Starting daily price and financial update job');
    const stocks = await this.prisma.stock.findMany();

    for (const stock of stocks) {
      await this.priceFetcher.fetchDailyPrice(stock.symbol);
      await this.priceFetcher.fetchFinancials(stock.symbol);
      // Wait a bit to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    this.logger.log('Finished daily update job');
  }
}
