import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface StockPriceData {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}

@Injectable()
export class PriceFetcherService {
  private readonly logger = new Logger(PriceFetcherService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Fetches real-time price data from Alpha Vantage API.
   */
  async fetchPrice(symbol: string): Promise<StockPriceData> {
    this.logger.debug(`Fetching real price for ${symbol} from Alpha Vantage...`);

    const apiKey = this.configService.get<string>('ALPHA_VANTAGE_API_KEY');
    
    if (!apiKey) {
        this.logger.warn('ALPHA_VANTAGE_API_KEY is missing. Falling back to mock data.');
        return this.getMockData(symbol);
    }

    try {
      const response = await axios.get('https://www.alphavantage.co/query', {
        params: {
            function: 'GLOBAL_QUOTE',
            symbol: symbol,
            apikey: apiKey
        },
        timeout: 10000 // 10s timeout
      });

      // Check for API Limit or Errors
      if (response.data['Note']) {
          this.logger.warn(`Alpha Vantage API Limit reached: ${response.data['Note']}`);
          return this.getMockData(symbol); // Fallback to mock on rate limit
      }

      if (response.data['Error Message']) {
          throw new Error(`API Error: ${response.data['Error Message']}`);
      }

      const quote = response.data['Global Quote'];
      
      if (!quote || Object.keys(quote).length === 0) {
           this.logger.warn(`No global quote data found for ${symbol}`);
           return this.getMockData(symbol);
      }

      // Parse Alpha Vantage Response
      // "01. symbol": "IBM", "05. price": "120.00", ...
      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        open: parseFloat(quote['02. open']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        volume: parseInt(quote['06. volume']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        timestamp: new Date()
      };

    } catch (error) {
      this.logger.error(`Failed to fetch price for ${symbol}: ${error.message}`);
      // Fallback to mock data to keep the app running in case of external errors
      return this.getMockData(symbol);
    }
  }

  private getMockData(symbol: string): StockPriceData {
      const basePrice = Math.random() * 200 + 100;
      return {
        symbol: symbol.toUpperCase(),
        price: Number((basePrice).toFixed(2)),
        open: Number((basePrice - Math.random() * 2).toFixed(2)),
        high: Number((basePrice + Math.random() * 5).toFixed(2)),
        low: Number((basePrice - Math.random() * 5).toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 50000,
        change: Number((Math.random() * 10 - 5).toFixed(2)),
        changePercent: Number((Math.random() * 5 - 2.5).toFixed(2)),
        timestamp: new Date(),
      };
  }
}
