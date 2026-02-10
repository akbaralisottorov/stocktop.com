import { Stock, MarketIndex, ChartDataPoint } from '../types';

export const mockIndices: MarketIndex[] = [
  { name: 'S&P 500', value: 4783.45, change: 23.4, changePercent: 0.54 },
  { name: 'Nasdaq', value: 16453.22, change: -45.1, changePercent: -0.21 },
  { name: 'Dow Jones', value: 37654.12, change: 112.5, changePercent: 0.32 },
  { name: 'Russell 2000', value: 1987.34, change: 12.1, changePercent: 0.61 },
];

export const mockTopStocks: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 543.20, change: 12.45, changePercent: 2.34, marketCap: '1.2T', volume: '45M', sector: 'Technology', score: 94 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 145.30, change: 5.60, changePercent: 4.12, marketCap: '234B', volume: '67M', sector: 'Technology', score: 88 },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 245.60, change: -3.40, changePercent: -1.34, marketCap: '780B', volume: '102M', sector: 'Automotive', score: 72 },
  { symbol: 'PLTR', name: 'Palantir Technologies', price: 16.50, change: 0.45, changePercent: 2.80, marketCap: '35B', volume: '23M', sector: 'Technology', score: 81 },
  { symbol: 'AAPL', name: 'Apple Inc', price: 185.40, change: 1.20, changePercent: 0.65, marketCap: '2.9T', volume: '54M', sector: 'Technology', score: 85 },
];

export const mockChartData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: `Jan ${i + 1}`,
  value: 450 + Math.random() * 100 - 50,
}));