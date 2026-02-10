export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  sector: string;
  score?: number; // Technical/Fundamental score
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export enum ScoreType {
  TECHNICAL = 'Technical',
  FUNDAMENTAL = 'Fundamental',
  GROWTH = 'Growth',
  RISK = 'Risk'
}

export interface Recommendation {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  targetPrice: number;
  confidence: number;
}