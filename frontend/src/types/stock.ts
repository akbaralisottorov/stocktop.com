// Matching the StockEntity from backend
export interface Stock {
  symbol: string;
  companyName: string;
  exchange: string;
  sector?: string | null;
  industry?: string | null;
  website?: string | null;
  description?: string | null;
  createdAt: string; // Dates are strings in JSON responses
  updatedAt: string;

  // Relations (optional as they might not always be included)
  priceHistory?: Price[];
  latestPrice?: Price; // Calculated or fetched separately
  score?: Score;
  recommendations?: Recommendation[];
}

export interface Price {
  id: number;
  stockId: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number; // BigInt on backend is often serialized to number or string
  date: string;
}

export interface Score {
  id: number;
  stockId: string;
  score: number; // Total aggregated score (0-100)
  details: ScoreDetails;
  createdAt: string;
  date: string;
}

export interface ScoreDetails {
  // Can include fundamental and technical breakdowns
  peScore?: number;
  roeScore?: number;
  debtScore?: number;
  rsiScore?: number;
  macdScore?: number;
  trendStatus?: string;
  [key: string]: any;
}

export enum RecommendationAction {
  BUY = 'BUY',
  SELL = 'SELL',
  HOLD = 'HOLD',
  STRONG_BUY = 'STRONG_BUY',
  STRONG_SELL = 'STRONG_SELL'
}

export interface Recommendation {
  id: number;
  stockId: string;
  action: RecommendationAction;
  targetPrice?: number;
  confidence: number; // 0-100
  reasoning?: string;
  horizon: '1M' | '3M' | '6M' | '12M';
  createdAt: string;
}

// DTO for creating a stock (frontend usage)
export interface CreateStockDto {
  symbol: string;
  companyName: string;
  exchange: string;
  sector?: string;
  industry?: string;
  website?: string;
  description?: string;
}
