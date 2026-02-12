import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ScoreDetails } from '../../types/stock';

interface ScoreRadarProps {
  details: ScoreDetails;
}

export const ScoreRadar: React.FC<ScoreRadarProps> = ({ details }) => {
  // Transform score details into format required by Recharts
  // We map specific score keys to readable labels
  const data = [
    { subject: 'Valuation (P/E)', A: details.peScore || 50, fullMark: 100 },
    { subject: 'Profitability (ROE)', A: details.roeScore || 50, fullMark: 100 },
    { subject: 'Financial Health', A: details.debtScore || 50, fullMark: 100 },
    { subject: 'Technical (RSI)', A: details.rsiScore || 50, fullMark: 100 },
    { subject: 'Momentum (MACD)', A: details.macdScore || 50, fullMark: 100 },
    { subject: 'Growth', A: details.growthScore || 50, fullMark: 100 },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Stock Score"
            dataKey="A"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="hsl(var(--primary))"
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--popover))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--popover-foreground))'
            }}
            itemStyle={{ color: 'hsl(var(--foreground))' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};