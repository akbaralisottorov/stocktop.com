import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class IndicatorsService {
  constructor(private prisma: PrismaService) {}

  async calculateRSI(symbol: string, period: number = 14) {
    const prices = await this.prisma.price.findMany({
      where: { symbol },
      orderBy: { date: 'desc' },
      take: period + 1,
    });

    if (prices.length < period + 1) return null;

    let gains = 0;
    let losses = 0;

    for (let i = 0; i < period; i++) {
      const difference = prices[i].close - prices[i + 1].close;
      if (difference >= 0) {
        gains += difference;
      } else {
        losses -= difference;
      }
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  async calculateSMA(symbol: string, period: number) {
    const prices = await this.prisma.price.findMany({
      where: { symbol },
      orderBy: { date: 'desc' },
      take: period,
    });

    if (prices.length < period) return null;

    const sum = prices.reduce((acc, price) => acc + price.close, 0);
    return sum / period;
  }

  async calculateMACD(symbol: string) {
    // Simplified MACD for demonstration
    const ema12 = await this.calculateSMA(symbol, 12);
    const ema26 = await this.calculateSMA(symbol, 26);

    if (!ema12 || !ema26) return null;

    const macd = ema12 - ema26;
    // Signal line would normally be EMA9 of MACD
    return { macd, signal: macd * 0.9, histogram: macd * 0.1 };
  }
}
