import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MarketIndex } from '../../types'; // Using the generic type or we can define local

// If types.ts is deprecated, we define it here for now
interface MarketIndexProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketOverviewProps {
  indices: MarketIndexProps[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ indices }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {indices.map((index) => {
        const isPositive = index.change >= 0;
        return (
          <Card key={index.name} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-rose-500" />
                )}
              </div>
              <div className="flex flex-col mt-2">
                <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
                <div className="flex items-center text-xs mt-1">
                  <span className={`font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isPositive ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                  <span className="text-muted-foreground ml-2">from yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};