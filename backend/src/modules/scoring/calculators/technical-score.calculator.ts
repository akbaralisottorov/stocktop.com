import { Injectable } from '@nestjs/common';

@Injectable()
export class TechnicalScoreCalculator {
  calculate(rsi: number, macd: any, sma50: number, sma200: number, currentPrice: number): number {
    let score = 0;

    // RSI (max 10 points)
    if (rsi >= 40 && rsi <= 60) score += 10;
    else if (rsi > 30 && rsi < 70) score += 7;
    else if (rsi <= 30) score += 5; // Oversold

    // MACD (max 10 points)
    if (macd && macd.histogram > 0) score += 10;

    // Moving Averages (max 10 points)
    if (currentPrice > sma50) score += 5;
    if (sma50 > sma200) score += 5;

    return Math.min(score, 30);
  }
}
