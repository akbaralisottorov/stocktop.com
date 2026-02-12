import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PriceFetcherService } from '../services/price-fetcher.service';

export const PRICE_UPDATE_QUEUE = 'price-updates';
export const UPDATE_STOCK_JOB = 'update-stock-price';

interface PriceUpdateJobData {
  symbol: string;
}

@Processor(PRICE_UPDATE_QUEUE)
export class PriceUpdateJob extends WorkerHost {
  private readonly logger = new Logger(PriceUpdateJob.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly priceFetcher: PriceFetcherService,
  ) {
    super();
  }

  async process(job: Job<PriceUpdateJobData, any, string>): Promise<any> {
    const { symbol } = job.data;
    this.logger.log(`Processing price update for stock: ${symbol}`);

    try {
      // 1. Fetch latest data from external source
      const marketData = await this.priceFetcher.fetchPrice(symbol);

      // 2. Transaction to update current Stock info and insert historical Price record
      await this.prisma.$transaction(async (tx) => {
        // Update the main Stock entity with latest info
        await tx.stock.update({
          where: { symbol },
          data: {
            updatedAt: new Date(),
            // Assuming we might store current price on the Stock model for quick access
            // If Stock model doesn't have price fields, this part can be omitted
          },
        });

        // Insert into Price history table
        await tx.price.create({
          data: {
            stockId: symbol,
            open: marketData.open,
            high: marketData.high,
            low: marketData.low,
            close: marketData.price, // Using current price as close for real-time snapshots
            volume: BigInt(marketData.volume), // Using BigInt for volume
            date: marketData.timestamp,
          },
        });
      });

      this.logger.log(`Successfully updated price for ${symbol}: $${marketData.price}`);
      return { success: true, price: marketData.price };

    } catch (error) {
      this.logger.error(`Failed to update price for ${symbol}`, error.stack);
      throw error; // Let BullMQ handle retries
    }
  }
}