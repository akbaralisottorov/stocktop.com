import { Injectable } from '@nestjs/common';

@Injectable()
export class GrowthRiskCalculator {
  calculateGrowth(revenueGrowth: number): number {
    let score = 0;
    if (revenueGrowth > 0.20) score += 20;
    else if (revenueGrowth > 0.10) score += 15;
    else if (revenueGrowth > 0) score += 10;
    return Math.min(score, 20);
  }

  calculateRisk(debtRatio: number, volatility: number): number {
    let score = 10;
    if (debtRatio > 2) score -= 5;
    if (volatility > 0.4) score -= 5;
    return Math.max(score, 0);
  }
}
