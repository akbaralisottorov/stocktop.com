'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

const mockData = [
  { name: 'AAPL', score: 85, color: '#22c55e' },
  { name: 'MSFT', score: 78, color: '#3b82f6' },
  { name: 'NVDA', score: 92, color: '#22c55e' },
  { name: 'TSLA', score: 55, color: '#eab308' },
  { name: 'AMD', score: 68, color: '#3b82f6' },
  { name: 'PLTR', score: 74, color: '#3b82f6' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black mb-2 tracking-tight text-white">Market Intelligence</h1>
          <p className="text-slate-400 font-medium">Overview of your active portfolios and market sentiment</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Market Status</p>
          <div className="flex items-center text-green-500 font-bold">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            OPEN
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Activity className="text-blue-500" />}
          label="Tracked Stocks"
          value="24"
          change="+3"
          desc="New assets added this week"
        />
        <StatCard
          icon={<TrendingUp className="text-green-500" />}
          label="Top Performer"
          value="NVDA"
          change="+4.2%"
          desc="AI Sector Leader"
        />
        <StatCard
          icon={<DollarSign className="text-blue-500" />}
          label="Portfolio Value"
          value="$12,450"
          change="+1.2%"
          trend="up"
          desc="Net worth across all brokers"
        />
        <StatCard
          icon={<Zap className="text-yellow-500" />}
          label="Alpha Signals"
          value="12"
          change="High"
          desc="Strong buy recommendations"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-white tracking-tight flex items-center">
              <BarChart className="w-5 h-5 mr-3 text-blue-500" />
              Stock Score Index
            </h3>
            <select className="bg-slate-800 border-none rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-0">
              <option>Top 10</option>
              <option>Watchlist</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '12px' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                  {mockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl flex flex-col shadow-2xl">
          <h3 className="text-xl font-black text-white mb-8 tracking-tight flex items-center">
            <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
            Sector Sentiment
          </h3>
          <div className="space-y-6 flex-1">
            <SentimentItem label="Technology" value={82} color="bg-blue-500" />
            <SentimentItem label="Energy" value={45} color="bg-yellow-500" />
            <SentimentItem label="Healthcare" value={65} color="bg-green-500" />
            <SentimentItem label="Financial" value={30} color="bg-red-500" />
            <SentimentItem label="Consumer" value={55} color="bg-purple-500" />
          </div>
          <button className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-bold transition-all duration-200 uppercase tracking-widest">
            Detailed Analysis
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, trend = 'up', desc }) {
  return (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl hover:border-slate-700 transition-all duration-300 shadow-xl group">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-800 rounded-2xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div className={`flex items-center text-[10px] font-black px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
        <h4 className="text-3xl font-black text-white tracking-tighter">{value}</h4>
        <p className="text-[10px] text-slate-500 font-semibold mt-2">{desc}</p>
      </div>
    </div>
  );
}

function SentimentItem({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
        <span className="text-slate-400">{label}</span>
        <span className="text-white">{value}%</span>
      </div>
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
