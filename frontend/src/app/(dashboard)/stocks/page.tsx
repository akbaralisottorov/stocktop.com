'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowUpRight, ArrowDownRight, TrendingUp, Info } from 'lucide-react';
import axios from 'axios';

export default function StocksPage() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
        const response = await axios.get(`${apiUrl}/stocks`);
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Market Assets</h1>
          <p className="text-slate-400">Real-time analysis and scoring for your watchlist</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/20 font-semibold text-sm">
            <span>Add Asset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-900/50 border border-slate-800 rounded-3xl animate-pulse" />
          ))
        ) : (
          stocks.map((stock: any) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))
        )}
      </div>
    </div>
  );
}

function StockCard({ stock }) {
  const score = stock.score?.[0]?.totalScore || 0;

  const getScoreVariant = (s) => {
    if (s >= 80) return { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', label: 'Strong Buy' };
    if (s >= 65) return { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: 'Buy' };
    if (s >= 50) return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', label: 'Hold' };
    return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', label: 'Avoid' };
  };

  const variant = getScoreVariant(score);

  return (
    <Link href={`/stocks/${stock.symbol}`}>
      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:bg-slate-800/40 hover:border-slate-700 transition-all duration-300 group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <TrendingUp className="w-24 h-24 -mr-8 -mt-8" />
        </div>

        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stock.exchange}</span>
            <h3 className="text-2xl font-black mt-1 group-hover:text-blue-400 transition-colors">{stock.symbol}</h3>
            <p className="text-slate-400 text-sm truncate w-32">{stock.companyName}</p>
          </div>
          <div className={`flex flex-col items-end`}>
            <div className={`text-3xl font-black ${variant.color}`}>
              {score}
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase">Score</span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">Sector</span>
            <div className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg">
              {stock.sector}
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${variant.bg} ${variant.color} ${variant.border}`}>
            {variant.label}
          </div>
        </div>
      </div>
    </Link>
  );
}
