import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class PriceFetcherService {
  private readonly logger = new Logger(PriceFetcherService.name);
  private readonly alphaVantageKey: string;
  private readonly fmpKey: string;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.alphaVantageKey = this.configService.get<string>('ALPHA_VANTAGE_KEY');
    this.fmpKey = this.configService.get<string>('FMP_API_KEY');
  }

  async fetchDailyPrice(symbol: string) {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.alphaVantageKey}`;
      const response = await axios.get(url);
      const data = response.data['Time Series (Daily)'];

      if (!data) {
        this.logger.warn(`No price data found for ${symbol}`);
        return;
      }

      const latestDate = Object.keys(data)[0];
      const priceData = data[latestDate];

      await this.prisma.price.upsert({
        where: {
          symbol_date: {
            symbol,
            date: new Date(latestDate).toISOString(),
          },
        },
        update: {
          open: parseFloat(priceData['1. open']),
          high: parseFloat(priceData['2. high']),
          low: parseFloat(priceData['3. low']),
          close: parseFloat(priceData['4. close']),
          volume: BigInt(priceData['5. volume']),
        },
        create: {
          symbol,
          date: new Date(latestDate).toISOString(),
          open: parseFloat(priceData['1. open']),
          high: parseFloat(priceData['2. high']),
          low: parseFloat(priceData['3. low']),
          close: parseFloat(priceData['4. close']),
          volume: BigInt(priceData['5. volume']),
        },
      });

      this.logger.log(`Updated price for ${symbol} for ${latestDate}`);
    } catch (error) {
      this.logger.error(`Error fetching price for ${symbol}: ${error.message}`);
    }
  }

  async fetchFinancials(symbol: string) {
    try {
      const url = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=4&apikey=${this.fmpKey}`;
      const response = await axios.get(url);
      const data = response.data;

      if (!Array.isArray(data) || data.length === 0) {
        this.logger.warn(`No financial data found for ${symbol}`);
        return;
      }

      for (const item of data) {
        await this.prisma.financial.upsert({
          where: {
            symbol_date_period: {
              symbol,
              date: new Date(item.date).toISOString(),
              period: item.period,
            }
          },
          update: {
            revenue: item.revenue,
            netIncome: item.netIncome,
            eps: item.eps,
          },
          create: {
            symbol,
            date: new Date(item.date).toISOString(),
            period: item.period,
            revenue: item.revenue,
            netIncome: item.netIncome,
            eps: item.eps,
          }
        });
      }
      this.logger.log(`Updated financials for ${symbol}`);
    } catch (error) {
      this.logger.error(`Error fetching financials for ${symbol}: ${error.message}`);
    }
  }
}
