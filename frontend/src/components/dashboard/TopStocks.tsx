import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Stock } from '../../types/stock';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ScoreDisplay } from '../stocks/ScoreDisplay';

interface TopStocksProps {
  stocks: Stock[];
  title?: string;
}

export const TopStocks: React.FC<TopStocksProps> = ({ stocks, title = "Top Movers" }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 divide-y divide-border">
          {stocks.map((stock) => {
             const price = stock.latestPrice?.close ?? 0;
             const open = stock.latestPrice?.open ?? price;
             const change = price - open;
             const changePercent = open !== 0 ? (change / open) * 100 : 0;
             const isPositive = change >= 0;
             const score = stock.score?.score ?? 0;

            return (
              <div key={stock.symbol} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 hover:bg-secondary/20 px-2 rounded-md transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary font-bold text-sm text-foreground">
                    {stock.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-none">{stock.symbol}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-[120px]">{stock.companyName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                   <div className="text-right min-w-[80px]">
                      <p className="text-sm font-medium leading-none">${price.toFixed(2)}</p>
                      <p className={`flex items-center justify-end text-xs mt-1 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {isPositive ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                          {Math.abs(changePercent).toFixed(2)}%
                      </p>
                   </div>
                   
                   <div className="hidden sm:block">
                      <ScoreDisplay score={score} size={40} strokeWidth={3} showLabel={false} />
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};