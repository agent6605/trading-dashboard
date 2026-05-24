'use client';

import { Star } from 'lucide-react';

interface TradeIdea {
  ticker: string;
  companyName: string;
  type: 'LONG' | 'SHORT';
  thesis: string;
  entryZone: string;
  target: string;
  stop: string;
  conviction: 'HIGH' | 'MEDIUM';
  catalyst: string;
}

interface TradeIdeasProps {
  trades: TradeIdea[];
}

export default function TradeIdeas({ trades }: TradeIdeasProps) {
  return (
    <div className="bg-[#0a0e1a] border border-[#1a2332] rounded-lg p-5 mb-6">
      <h2 className="text-[#8b9ab5] text-xs font-bold uppercase tracking-wider mb-4">
        Trade Ideas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trades.map((trade, index) => (
          <div
            key={index}
            className={`bg-[#0d1220] border rounded-lg p-4 hover:border-[#2a3342] transition-colors ${
              trade.type === 'LONG'
                ? 'border-l-4 border-l-green-500'
                : 'border-l-4 border-l-red-500'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[#e0e6ed] font-bold text-lg">{trade.ticker}</span>
                <span className="text-[#8b9ab5] text-sm ml-2">{trade.companyName}</span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-bold rounded ${
                  trade.type === 'LONG'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {trade.type}
              </span>
            </div>

            <p className="text-[#c0c9d6] text-sm mb-4 leading-relaxed">{trade.thesis}</p>

            <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
              <div>
                <span className="text-[#8b9ab5]">Entry</span>
                <div className="text-[#e0e6ed] font-mono">{trade.entryZone}</div>
              </div>
              <div>
                <span className="text-[#8b9ab5]">Target</span>
                <div className="text-green-400 font-mono">{trade.target}</div>
              </div>
              <div>
                <span className="text-[#8b9ab5]">Stop</span>
                <div className="text-red-400 font-mono">{trade.stop}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {trade.conviction === 'HIGH' && (
                  <>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </>
                )}
                {trade.conviction === 'MEDIUM' && (
                  <>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </>
                )}
              </div>
              <span className="text-[#8b9ab5] text-xs">Cat: {trade.catalyst}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}