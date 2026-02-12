import React from 'react';
import { MarketOverview } from '../../components/dashboard/MarketOverview';
import { TopStocks } from '../../components/dashboard/TopStocks';
import { WatchList } from '../../components/dashboard/WatchList';
import { StockCard } from '../../components/stocks/StockCard';
import { Stock } from '../../types/stock';

// Mock indices (since we don't have an index API yet)
const mockIndices = [
    { name: 'S&P 500', value: 4783.45, change: 23.4, changePercent: 0.54 },
    { name: 'Nasdaq 100', value: 16453.22, change: -45.1, changePercent: -0.21 },
    { name: 'Dow Jones', value: 37654.12, change: 112.5, changePercent: 0.32 },
    { name: 'Russell 2000', value: 1987.34, change: 12.1, changePercent: 0.61 },
];

async function getDashboardData() {
  const apiUrl = process.env.API_URL_INTERNAL || 'http://localhost:3001';
  
  try {
    // Fetch stocks from the backend
    const res = await fetch(`${apiUrl}/stocks`, { 
        cache: 'no-store', // Disable caching for real-time data
    });

    if (!res.ok) {
        throw new Error('Failed to fetch stocks');
    }

    const stocks: Stock[] = await res.json();
    
    // Check if we have data, if empty, return empty array to handle gracefully
    return { stocks: stocks || [], indices: mockIndices };

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Fallback to empty state or mock if critical failure
    return { stocks: [], indices: mockIndices };
  }
}

export default async function DashboardPage() {
  const { stocks, indices } = await getDashboardData();
  
  // Sort stocks by performance (absolute change percent) for "Top Movers"
  const topMovers = [...stocks].sort((a, b) => {
    // Handle cases where latestPrice might be missing
    const priceA = a.latestPrice?.close ?? 0;
    const openA = a.latestPrice?.open ?? priceA;
    const changePercentA = openA !== 0 ? Math.abs((priceA - openA) / openA) : 0;

    const priceB = b.latestPrice?.close ?? 0;
    const openB = b.latestPrice?.open ?? priceB;
    const changePercentB = openB !== 0 ? Math.abs((priceB - openB) / openB) : 0;

    return changePercentB - changePercentA;
  }).slice(0, 5);

  const watchListStocks = stocks.slice(0, 3);
  const featuredStock = stocks.length > 0 ? stocks[0] : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time overview of market performance and your portfolio.
          </p>
        </div>
        <div className="flex items-center space-x-2">
           <span className="bg-emerald-500/10 text-emerald-500 text-xs font-medium px-2.5 py-0.5 rounded border border-emerald-500/20 animate-pulse">
             Market Open
           </span>
        </div>
      </div>

      {/* Market Overview Cards */}
      <section>
        <MarketOverview indices={indices} />
      </section>

      {/* Main Grid Content */}
      <div className="grid gap-6 md:grid-cols-12 lg:grid-cols-12">
        
        {/* Left Column: Featured Stock & Watchlist */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold tracking-tight">Featured Stock</h3>
            {featuredStock ? (
                <StockCard stock={featuredStock} />
            ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
                    No stocks available.
                </div>
            )}
          </div>
          
          <div className="h-[400px]">
            <WatchList stocks={watchListStocks} />
          </div>
        </div>

        {/* Right Column: Charts (Placeholder) & Top Movers */}
        <div className="md:col-span-7 lg:col-span-8 space-y-6">
          {/* Placeholder for a big chart */}
          <div className="rounded-lg border border-border bg-card p-6 h-[300px] flex items-center justify-center text-muted-foreground bg-gradient-to-b from-card to-secondary/20">
             Main Market Chart Area (SPY / QQQ)
          </div>

          <TopStocks stocks={topMovers} title="Top Market Movers" />
        </div>
      </div>
    </div>
  );
}