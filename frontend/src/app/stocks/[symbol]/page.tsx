import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { PriceChart } from '../../../components/charts/PriceChart';
import { ScoreRadar } from '../../../components/charts/ScoreRadar';
import { ScoreDisplay } from '../../../components/stocks/ScoreDisplay';
import { Stock, Price, RecommendationAction } from '../../../types/stock';
import { ArrowLeft, ExternalLink, Calendar, Building2, TrendingUp, DollarSign, Activity } from 'lucide-react';

// Mock function to fetch single stock data
// In reality, this would be an API call: await apiClient.get(`/stocks/${symbol}`)
async function getStockDetail(symbol: string): Promise<Stock | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return realistic mock data
  const now = new Date();
  const priceHistory: Price[] = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(now.getDate() - (29 - i));
      const base = 150 + Math.random() * 20;
      return {
          id: i,
          stockId: symbol,
          open: base,
          close: base + (Math.random() * 5 - 2.5),
          high: base + 5,
          low: base - 5,
          volume: 1000000 + Math.random() * 500000,
          date: date.toISOString().split('T')[0] // format YYYY-MM-DD
      };
  });

  return {
    symbol: symbol.toUpperCase(),
    companyName: `${symbol.toUpperCase()} Technologies Inc.`,
    exchange: 'NASDAQ',
    sector: 'Technology',
    industry: 'Semiconductors',
    website: `https://www.google.com/search?q=${symbol}`,
    description: "A leading technology company specializing in high-performance computing and graphics visualization solutions.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    latestPrice: priceHistory[priceHistory.length - 1],
    priceHistory: priceHistory,
    score: {
      id: 1,
      stockId: symbol,
      score: 87,
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
      details: {
        peScore: 65,
        roeScore: 90,
        debtScore: 70,
        rsiScore: 45, // Neutral/Good
        macdScore: 80, // Strong momentum
        growthScore: 95
      }
    },
    recommendations: [
        {
            id: 1,
            stockId: symbol,
            action: RecommendationAction.BUY,
            confidence: 85,
            horizon: '3M',
            targetPrice: priceHistory[priceHistory.length - 1].close * 1.15,
            createdAt: new Date().toISOString()
        }
    ]
  };
}

export default async function StockDetailPage({ params }: { params: { symbol: string } }) {
  const stock = await getStockDetail(params.symbol);

  if (!stock) {
    return <div className="p-8 text-center">Stock not found</div>;
  }

  // Prepare data for PriceChart
  const chartData = stock.priceHistory?.map(p => ({
      date: p.date,
      value: p.close
  })) || [];

  const currentPrice = stock.latestPrice?.close || 0;
  const previousClose = stock.priceHistory?.[stock.priceHistory.length - 2]?.close || currentPrice;
  const change = currentPrice - previousClose;
  const changePercent = (change / previousClose) * 100;
  const isPositive = change >= 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Navigation / Breadcrumb simulation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer w-fit">
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
        <div>
           <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">{stock.symbol}</h1>
              <span className="bg-secondary px-2.5 py-1 rounded text-xs font-semibold text-muted-foreground">
                {stock.exchange}
              </span>
           </div>
           <h2 className="text-xl text-muted-foreground mt-1">{stock.companyName}</h2>
           
           <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              {stock.sector && (
                  <div className="flex items-center gap-1">
                      <Building2 size={14} />
                      {stock.sector}
                  </div>
              )}
              {stock.website && (
                  <a href={stock.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      <ExternalLink size={14} />
                      Website
                  </a>
              )}
           </div>
        </div>

        <div className="flex items-end gap-6">
            <div className="text-right">
                <p className="text-sm text-muted-foreground font-medium mb-1">Current Price</p>
                <div className="text-4xl font-mono font-bold">
                    ${currentPrice.toFixed(2)}
                </div>
                <div className={`flex items-center justify-end font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isPositive ? '+' : ''}{change.toFixed(2)} ({changePercent.toFixed(2)}%)
                </div>
            </div>
            {/* Main Score Badge */}
            <div className="hidden md:block">
                 <ScoreDisplay score={stock.score?.score || 0} size={80} strokeWidth={6} />
            </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Price Chart (Takes up 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Price History (30 Days)</span>
                        <div className="flex gap-2">
                             {['1W', '1M', '3M', '1Y'].map(range => (
                                 <button key={range} className={`px-3 py-1 text-xs font-medium rounded ${range === '1M' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                                     {range}
                                 </button>
                             ))}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <PriceChart data={chartData} color={isPositive ? "#10b981" : "#f43f5e"} />
                </CardContent>
            </Card>

            {/* Description Card */}
            <Card>
                <CardHeader><CardTitle>About {stock.symbol}</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                        {stock.description}
                    </p>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Analytics & Radar (Takes up 1 col) */}
        <div className="space-y-6">
            
            {/* Score Breakdown Radar */}
            <Card>
                <CardHeader>
                    <CardTitle>Score Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center -mt-4">
                        {stock.score?.details && <ScoreRadar details={stock.score.details} />}
                    </div>
                    <div className="text-center mt-2">
                         <p className="text-sm font-medium">Total Score</p>
                         <p className={`text-3xl font-bold ${stock.score?.score && stock.score.score >= 70 ? 'text-emerald-500' : 'text-yellow-500'}`}>
                             {stock.score?.score}/100
                         </p>
                    </div>
                </CardContent>
            </Card>

            {/* Key Statistics Table */}
            <Card>
                <CardHeader><CardTitle>Key Statistics</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign size={14}/> Market Cap</span>
                            <span className="font-medium">1.2T</span> 
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-sm text-muted-foreground flex items-center gap-2"><Activity size={14}/> Volume</span>
                            <span className="font-medium">{(stock.latestPrice?.volume || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-sm text-muted-foreground flex items-center gap-2"><TrendingUp size={14}/> P/E Ratio</span>
                            <span className="font-medium">{stock.score?.details?.peScore ? '24.5' : 'N/A'}</span>
                        </div>
                         <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar size={14}/> 52W High</span>
                            <span className="font-medium">${(currentPrice * 1.2).toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* Recommendation Badge (if available) */}
             {stock.recommendations && stock.recommendations.length > 0 && (
                 <Card className="bg-gradient-to-br from-secondary to-background border-primary/20">
                     <CardContent className="p-6">
                         <div className="flex items-center justify-between mb-2">
                             <span className="text-sm font-semibold text-muted-foreground">Analyst Consensus</span>
                             <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded uppercase">
                                 {stock.recommendations[0].action.replace('_', ' ')}
                             </span>
                         </div>
                         <div className="flex items-baseline gap-2">
                             <span className="text-2xl font-bold text-foreground">
                                 ${stock.recommendations[0].targetPrice?.toFixed(2)}
                             </span>
                             <span className="text-xs text-muted-foreground">Target (3M)</span>
                         </div>
                         <div className="mt-2 w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                             <div 
                                className="bg-emerald-500 h-full rounded-full" 
                                style={{ width: `${stock.recommendations[0].confidence}%` }} 
                             />
                         </div>
                         <p className="text-xs text-right mt-1 text-muted-foreground">
                             {stock.recommendations[0].confidence}% Confidence
                         </p>
                     </CardContent>
                 </Card>
             )}
        </div>
      </div>
    </div>
  );
}