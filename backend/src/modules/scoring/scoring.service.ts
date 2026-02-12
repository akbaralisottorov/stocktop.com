import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TechnicalScoreCalculator } from './calculators/technical-score.calculator';
import { FundamentalScoreCalculator } from './calculators/fundamental-score.calculator';
import { GrowthRiskCalculator } from './calculators/growth-risk.calculator';

@Injectable()
export class ScoringService {
  constructor(
    private prisma: PrismaService,
    private technicalCalculator: TechnicalScoreCalculator,
    private fundamentalCalculator: FundamentalScoreCalculator,
    private growthRiskCalculator: GrowthRiskCalculator,
  ) {}

  async calculateAndSaveScore(symbol: string) {
    // In a real app, we'd fetch all necessary data from DB
    // For now, let's assume we have it or use mock values if missing

    // Fetch latest indicators
    const indicators = await this.prisma.indicator.findFirst({
      where: { symbol },
      orderBy: { date: 'desc' },
    });

    // Fetch latest financials
    const financials = await this.prisma.financial.findFirst({
      where: { symbol },
      orderBy: { date: 'desc' },
    });

    // Fetch latest price
    const price = await this.prisma.price.findFirst({
      where: { symbol },
      orderBy: { date: 'desc' },
    });

    if (!price) return null;

    const technicalScore = this.technicalCalculator.calculate(
      indicators?.rsi || 50,
      { macd: indicators?.macd || 0, signal: indicators?.macdSignal || 0, histogram: indicators?.macdHist || 0 },
      indicators?.sma50 || price.close,
      indicators?.sma200 || price.close,
      price.close
    );

    const fundamentalScore = this.fundamentalCalculator.calculate(financials);

    // Simplified growth calculation
    const growthScore = this.growthRiskCalculator.calculateGrowth(0.15); // Mock 15% growth
    const riskScore = this.growthRiskCalculator.calculateRisk(financials?.debtToEquity || 1, 0.2);

    const totalScore = technicalScore + fundamentalScore + growthScore + riskScore;

    return this.prisma.score.upsert({
      where: {
        symbol_date: {
          symbol,
          date: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
        }
      },
      update: {
        totalScore,
        technicalScore,
        fundamentalScore,
        growthScore,
        riskScore,
      },
      create: {
        symbol,
        date: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
        totalScore,
        technicalScore,
        fundamentalScore,
        growthScore,
        riskScore,
      }
    });
  }

  async getScore(symbol: string) {
    return this.prisma.score.findFirst({
      where: { symbol },
      orderBy: { date: 'desc' },
    });
  }

  async getRankings() {
    return this.prisma.score.findMany({
      orderBy: { totalScore: 'desc' },
      take: 20,
      include: {
        stock: true,
      }
    });
  }
}
