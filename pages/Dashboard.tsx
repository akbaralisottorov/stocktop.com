import React from 'react';
import { MarketOverview } from '../components/dashboard/MarketOverview';
import { TopStocks } from '../components/dashboard/TopStocks';
import { PriceChart } from '../components/charts/PriceChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { mockIndices, mockTopStocks, mockChartData } from '../services/mockData';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: Just now</span>
        </div>
      </div>

      <MarketOverview indices={mockIndices} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Market Trend (SPY)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <PriceChart data={mockChartData} color="#3b82f6" />
          </CardContent>
        </Card>
        
        <TopStocks stocks={mockTopStocks} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
           <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
           <CardContent>
             <p className="text-sm text-muted-foreground">
               Market sentiment is leaning bullish on Tech sector driven by AI advancements.
               <br/><br/>
               <span className="text-emerald-500 font-semibold">Recommendation:</span> Consider increasing exposure to semiconductor stocks.
             </p>
           </CardContent>
        </Card>
        <Card>
           <CardHeader><CardTitle>Portfolio Health</CardTitle></CardHeader>
           <CardContent>
             <div className="flex items-center justify-center h-[100px]">
                <div className="text-center">
                    <span className="text-4xl font-bold text-emerald-500">A</span>
                    <p className="text-sm text-muted-foreground">Risk Score: Low</p>
                </div>
             </div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader><CardTitle>Upcoming Earnings</CardTitle></CardHeader>
           <CardContent>
             <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span>MSFT</span> <span className="text-muted-foreground">Jan 24</span></li>
                <li className="flex justify-between"><span>TSLA</span> <span className="text-muted-foreground">Jan 25</span></li>
                <li className="flex justify-between"><span>AAPL</span> <span className="text-muted-foreground">Feb 01</span></li>
             </ul>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};