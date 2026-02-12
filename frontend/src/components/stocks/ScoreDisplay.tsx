import React from 'react';

interface ScoreDisplayProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  size = 60, 
  strokeWidth = 6,
  showLabel = true 
}) => {
  // Normalize score between 0 and 100
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalizedScore / 100) * circumference;

  // Determine color based on score
  const getColor = (val: number) => {
    if (val >= 80) return 'text-emerald-500';
    if (val >= 60) return 'text-blue-500';
    if (val >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const colorClass = getColor(normalizedScore);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background Circle */}
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            className="text-secondary"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          {/* Progress Circle */}
          <circle
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        {/* Score Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${colorClass}`}>
            {normalizedScore}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="mt-1 text-xs font-medium text-muted-foreground">
          Score
        </span>
      )}
    </div>
  );
};