'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MarketHeaderProps {
  date: string;
  time: string;
  sentiment: 'RISK-ON' | 'RISK-OFF' | 'NEUTRAL';
  sp500Change: number;
  vixLevel: number;
  tenYearYield: number;
}

export default function MarketHeader({
  date,
  time,
  sentiment,
  sp500Change,
  vixLevel,
  tenYearYield,
}: MarketHeaderProps) {
  const getSentimentColor = (sent: string) => {
    switch (sent) {
      case 'RISK-ON':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'RISK-OFF':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4" />;
    if (value < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-amber-400';
  };

  return (
    <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <span className="text-[#8b9ab5] font-mono text-sm">
            {date} as of {time}
          </span>
          <span
            className={`px-3 py-1 rounded-md text-xs font-bold border ${getSentimentColor(
              sentiment
            )}`}
          >
            {sentiment}
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[#8b9ab5] text-sm">S&P 500</span>
            <span className={`font-mono font-bold ${getTrendColor(sp500Change)}`}>
              {getTrendIcon(sp500Change)}
            </span>
            <span className={`font-mono ${getTrendColor(sp500Change)}`}>
              {sp500Change > 0 ? '+' : ''}
              {sp500Change.toFixed(2)}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8b9ab5] text-sm">VIX</span>
            <span
              className={`font-mono font-bold ${
                vixLevel > 20
                  ? 'text-red-400'
                  : vixLevel > 15
                  ? 'text-amber-400'
                  : 'text-green-400'
              }`}
            >
              {vixLevel.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#8b9ab5] text-sm">10Y</span>
            <span className="font-mono text-[#e0e6ed]">{tenYearYield.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}