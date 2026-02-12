import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Stock } from '../../types/stock';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Trash2 } from 'lucide-react';

interface WatchListProps {
  stocks: Stock[];
}

export const WatchList: React.FC<WatchListProps> = ({ stocks }) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Watchlist</CardTitle>
        <button className="text-muted-foreground hover:text-foreground">
          <MoreHorizontal size={20} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stocks.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              No stocks in watchlist
            </div>
          ) : (
            stocks.map((stock) => {
              const price = stock.latestPrice?.close ?? 0;
              const open = stock.latestPrice?.open ?? price;
              const change = price - open;
              const changePercent = open !== 0 ? (change / open) * 100 : 0;
              const isPositive = change >= 0;

              return (
                <div key={stock.symbol} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-3">
                    <div className={`w-1 h-10 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <div>
                      <p className="font-bold">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1 max-w-[100px]">
                        {stock.companyName}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {/* Mini Sparkline could go here */}
                    
                    <div className="text-right">
                      <p className="font-mono font-medium">${price.toFixed(2)}</p>
                      <p className={`text-xs flex items-center justify-end ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
                      </p>
                    </div>

                    <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};