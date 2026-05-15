'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Sector {
  ticker: string;
  name: string;
  change: number;
  trend: 'up' | 'down' | 'flat';
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  comment: string;
}

interface SectorHeatmapProps {
  sectors: Sector[];
}

export default function SectorHeatmap({ sectors }: SectorHeatmapProps) {
  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'BULLISH':
        return 'text-green-400 bg-green-500/10';
      case 'BEARISH':
        return 'text-red-400 bg-red-500/10';
      default:
        return 'text-[#8b9ab5] bg-[#1a2332]';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-400" />;
      default:
        return <Minus className="w-3 h-3 text-[#8b9ab5]" />;
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400';
    if (change < 0) return 'text-red-400';
    return 'text-[#8b9ab5]';
  };

  return (
    <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-lg p-5 mb-6">
      <h2 className="text-[#8b9ab5] text-xs font-bold uppercase tracking-wider mb-4">
        Sector Heatmap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {sectors.map((sector) => (
          <div
            key={sector.ticker}
            className="bg-[#0d1220] border border-[#1a2332] rounded-md p-3 hover:border-[#2a3342] transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[#e0e6ed] font-bold text-sm">{sector.ticker}</span>
                {getTrendIcon(sector.trend)}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${getBiasColor(sector.bias)}`}>
                {sector.bias}
              </span>
            </div>
            <div className="text-[#8b9ab5] text-xs mb-1">{sector.name}</div>
            <div className={`font-mono text-sm ${getChangeColor(sector.change)}`}>
              {sector.change > 0 ? '+' : ''}
              {sector.change.toFixed(2)}%
            </div>
            <div className="text-[#6b7280] text-xs mt-1 line-clamp-1">{sector.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}