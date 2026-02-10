import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Stock } from '../../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TopStocksProps {
  stocks: Stock[];
}

export const TopStocks: React.FC<TopStocksProps> = ({ stocks }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Movers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stocks.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <span className="font-bold text-xs">{stock.symbol.substring(0, 2)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">{stock.symbol}</p>
                  <p className="text-sm text-muted-foreground">{stock.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="text-right">
                    <p className="text-sm font-medium leading-none">${stock.price}</p>
                    <p className={`flex items-center text-sm ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stock.change >= 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                        {Math.abs(stock.changePercent)}%
                    </p>
                 </div>
                 <div className={`flex h-8 w-8 items-center justify-center rounded-full ${stock.score && stock.score > 80 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-secondary text-muted-foreground'}`}>
                    <span className="text-xs font-bold">{stock.score}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};