import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Stock } from '../../types/stock';
import { ScoreDisplay } from './ScoreDisplay';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Building2 } from 'lucide-react';

interface StockCardProps {
  stock: Stock;
  onClick?: () => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onClick }) => {
  // Safe access to nested optional properties
  const price = stock.latestPrice?.close ?? 0;
  const open = stock.latestPrice?.open ?? price;
  
  // Calculate change based on Open vs Close (simplified for display)
  const change = price - open;
  const changePercent = open !== 0 ? (change / open) * 100 : 0;
  const isPositive = change >= 0;

  const scoreValue = stock.score?.score ?? 0;

  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 cursor-pointer"
    >
      <div onClick={onClick} className="h-full">
        <CardContent className="p-5 flex flex-col h-full justify-between">
          
          {/* Header: Symbol & Name */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight">{stock.symbol}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {stock.exchange}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1" title={stock.companyName}>
                {stock.companyName}
              </p>
            </div>
            
            {/* Score Display */}
            <div className="flex-shrink-0">
              <ScoreDisplay score={scoreValue} size={48} strokeWidth={4} showLabel={false} />
            </div>
          </div>

          {/* Body: Price & Details */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">
                ${price.toFixed(2)}
              </p>
              <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {isPositive ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                <span>{Math.abs(change).toFixed(2)}</span>
                <span className="ml-1">({Math.abs(changePercent).toFixed(2)}%)</span>
              </div>
            </div>

            {/* Mini Chart Icon / Sector */}
            <div className="flex flex-col items-end gap-1">
               {stock.sector && (
                 <div className="flex items-center text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                   <Building2 className="mr-1 h-3 w-3" />
                   {stock.sector}
                 </div>
               )}
            </div>
          </div>
          
          {/* Gradient overlay for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
        </CardContent>
      </div>
    </Card>
  );
};