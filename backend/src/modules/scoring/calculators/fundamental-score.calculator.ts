import { Injectable } from '@nestjs/common';
import { IScoreCalculator, ScoreResult } from '../interfaces/score-calculator.interface';

export interface FundamentalInput {
  peRatio?: number | null;
  pbRatio?: number | null;
  roe?: number | null;
  debtToEquity?: number | null;
  netProfitMargin?: number | null;
  revenueGrowth?: number | null;
  epsGrowth?: number | null;
}

@Injectable()
export class FundamentalScoreCalculator implements IScoreCalculator<FundamentalInput> {
  calculate(data: FundamentalInput): ScoreResult {
    let score = 0;
    const details: Record<string, string | number> = {};
    let metricsCount = 0;

    // 1. P/E Ratio (Price to Earnings) - Max 20 points
    // Lower is generally better for value, but < 0 is bad
    if (data.peRatio !== undefined && data.peRatio !== null) {
      metricsCount++;
      let points = 0;
      if (data.peRatio > 0 && data.peRatio < 15) points = 20;
      else if (data.peRatio >= 15 && data.peRatio < 25) points = 15;
      else if (data.peRatio >= 25 && data.peRatio < 40) points = 10;
      else if (data.peRatio >= 40) points = 5;
      
      score += points;
      details['peScore'] = points;
    }

    // 2. ROE (Return on Equity) - Max 20 points
    // Higher is better
    if (data.roe !== undefined && data.roe !== null) {
      metricsCount++;
      let points = 0;
      if (data.roe > 0.20) points = 20; // > 20%
      else if (data.roe > 0.15) points = 15; // > 15%
      else if (data.roe > 0.10) points = 10; // > 10%
      else if (data.roe > 0.05) points = 5;
      
      score += points;
      details['roeScore'] = points;
    }

    // 3. Debt to Equity - Max 20 points
    // Lower is better
    if (data.debtToEquity !== undefined && data.debtToEquity !== null) {
      metricsCount++;
      let points = 0;
      if (data.debtToEquity < 0.5) points = 20;
      else if (data.debtToEquity < 1.0) points = 15;
      else if (data.debtToEquity < 2.0) points = 10;
      else points = 0;

      score += points;
      details['debtScore'] = points;
    }

    // 4. Net Profit Margin - Max 20 points
    if (data.netProfitMargin !== undefined && data.netProfitMargin !== null) {
      metricsCount++;
      let points = 0;
      if (data.netProfitMargin > 0.20) points = 20;
      else if (data.netProfitMargin > 0.10) points = 15;
      else if (data.netProfitMargin > 0.05) points = 10;
      else if (data.netProfitMargin > 0) points = 5;

      score += points;
      details['marginScore'] = points;
    }

    // 5. Revenue/EPS Growth - Max 20 points
    const growth = data.revenueGrowth ?? data.epsGrowth;
    if (growth !== undefined && growth !== null) {
      metricsCount++;
      let points = 0;
      if (growth > 0.20) points = 20;
      else if (growth > 0.10) points = 15;
      else if (growth > 0.05) points = 10;
      else if (growth > 0) points = 5;

      score += points;
      details['growthScore'] = points;
    }

    // Normalize score if data is missing
    // We expect 5 categories worth 20 points each = 100 max.
    // If we only have 3 metrics, the max raw score is 60.
    // We scale it back to 100.
    const maxPossibleScore = metricsCount * 20;
    const finalScore = maxPossibleScore > 0 
      ? Math.round((score / maxPossibleScore) * 100) 
      : 50; // Neutral if no data

    return {
      score: finalScore,
      details: {
        ...details,
        metricsEvaluated: metricsCount
      }
    };
  }
}