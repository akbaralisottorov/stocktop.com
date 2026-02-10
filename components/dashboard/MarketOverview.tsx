import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MarketIndex } from '../../types';

interface MarketOverviewProps {
  indices: MarketIndex[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ indices }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {indices.map((index) => (
        <Card key={index.name}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">{index.name}</p>
              {index.change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-rose-500" />
              )}
            </div>
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold">{index.value.toLocaleString()}</div>
              <div className={`text-xs font-medium ${index.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {index.change > 0 ? '+' : ''}{index.changePercent}%
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};