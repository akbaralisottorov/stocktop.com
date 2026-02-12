import { Injectable } from '@nestjs/common';

@Injectable()
export class FundamentalScoreCalculator {
  calculate(financials: any): number {
    let score = 0;

    if (!financials) return 0;

    // ROE (max 15 points)
    if (financials.roe > 0.15) score += 15;
    else if (financials.roe > 0.10) score += 10;

    // Debt to Equity (max 15 points)
    if (financials.debtToEquity < 0.5) score += 15;
    else if (financials.debtToEquity < 1.0) score += 10;

    // EPS (max 10 points)
    if (financials.eps > 0) score += 10;

    return Math.min(score, 40);
  }
}
