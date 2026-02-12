import { Injectable } from '@nestjs/common';
import { IScoreCalculator, ScoreResult } from '../interfaces/score-calculator.interface';

export interface TechnicalInput {
  currentPrice: number;
  rsi14?: number | null;
  macdHistogram?: number | null; // MACD Line - Signal Line
  sma50?: number | null;
  sma200?: number | null;
  volume?: number | null;
  averageVolume?: number | null;
}

@Injectable()
export class TechnicalScoreCalculator implements IScoreCalculator<TechnicalInput> {
  calculate(data: TechnicalInput): ScoreResult {
    let score = 0;
    let maxPoints = 0;
    const details: Record<string, string | number> = {};

    // 1. RSI (Relative Strength Index) - 25 points
    // Logic: Oversold (<30) is a BUY signal (high score), Overbought (>70) is a SELL (low score)
    // However, for a general "Bullishness" score:
    // 40-60 is neutral. > 50 is bullish trend, but > 70 is risk of reversal.
    // Let's implement a "Momentum/Strength" score.
    if (data.rsi14 !== undefined && data.rsi14 !== null) {
      maxPoints += 25;
      let points = 0;
      if (data.rsi14 >= 40 && data.rsi14 <= 70) points = 25; // Healthy trend
      else if (data.rsi14 > 70) points = 15; // Strong but overbought
      else if (data.rsi14 < 30) points = 10; // Weak/Oversold (could be reversal opportunity, but technically weak)
      else points = 15;
      
      score += points;
      details['rsiScore'] = points;
    }

    // 2. Moving Average Trend (Price vs SMA200) - 25 points
    if (data.sma200 !== undefined && data.sma200 !== null) {
      maxPoints += 25;
      let points = 0;
      if (data.currentPrice > data.sma200) {
        points = 25; // Bullish long-term trend
        details['trendStatus'] = 'Bullish (>SMA200)';
      } else {
        points = 0; // Bearish
        details['trendStatus'] = 'Bearish (<SMA200)';
      }
      score += points;
      details['sma200Score'] = points;
    }

    // 3. Golden Cross / Alignment (SMA50 vs SMA200) - 25 points
    if (data.sma50 && data.sma200) {
      maxPoints += 25;
      let points = 0;
      if (data.sma50 > data.sma200) {
        points = 25; // Golden Cross / Strong Uptrend
        details['crossStatus'] = 'Golden/Bullish';
      } else {
        points = 5; // Death Cross / Downtrend
        details['crossStatus'] = 'Death/Bearish';
      }
      score += points;
      details['maCrossScore'] = points;
    }

    // 4. MACD Momentum - 25 points
    if (data.macdHistogram !== undefined && data.macdHistogram !== null) {
      maxPoints += 25;
      let points = 0;
      if (data.macdHistogram > 0) {
        points = 25; // Positive momentum
        details['momentum'] = 'Positive';
      } else {
        points = 5; // Negative momentum
        details['momentum'] = 'Negative';
      }
      score += points;
      details['macdScore'] = points;
    }

    // Calculate Final Scaled Score
    const finalScore = maxPoints > 0 
      ? Math.round((score / maxPoints) * 100) 
      : 50;

    return {
      score: finalScore,
      details: {
        ...details,
        maxPointsPossible: maxPoints
      }
    };
  }
}