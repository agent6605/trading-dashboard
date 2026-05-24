'use client';

import { useEffect, useState, useCallback, startTransition } from 'react';
import MarketHeader from '@/components/MarketHeader';
import MacroSummary from '@/components/MacroSummary';
import SectorHeatmap from '@/components/SectorHeatmap';
import TradeIdeas from '@/components/TradeIdeas';
import RiskRadar from '@/components/RiskRadar';
import TraderNote from '@/components/TraderNote';
import {
  marketData as fallbackMarket,
  macroData as fallbackMacro,
  sectorData as fallbackSectors,
  tradeIdeasData as fallbackTrades,
  riskData as fallbackRisks,
  traderNote as fallbackNote,
} from '@/data/marketData';

interface ApiData {
  date: string;
  time: string;
  sentiment: 'RISK-ON' | 'RISK-OFF' | 'NEUTRAL';
  sp500Change: number;
  vixLevel: number;
  tenYearYield: number;
  macroNarrative: string;
  macroDrivers: string[];
  sectors: {
    ticker: string;
    name: string;
    change: number;
    trend: 'up' | 'down' | 'flat';
    bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    comment: string;
  }[];
  trades: {
    ticker: string;
    companyName: string;
    type: 'LONG' | 'SHORT';
    thesis: string;
    entryZone: string;
    target: string;
    stop: string;
    conviction: 'HIGH' | 'MEDIUM';
    catalyst: string;
  }[];
  risks: { title: string; description: string; severity: 'high' | 'medium' | 'low' }[];
  traderNote: string;
}

export default function Home() {
  const [data, setData] = useState<ApiData | null>(null);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/market');
      if (!res.ok) throw new Error('Failed to fetch');
      const json: ApiData = await res.json();
      startTransition(() => { setData(json); });
      startTransition(() => { setError(false); });
    } catch {
      startTransition(() => { setError(true); });
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const market = data ?? fallbackMarket;
  const macro = data
    ? { narrative: data.macroNarrative, macroDrivers: data.macroDrivers }
    : fallbackMacro;
  const sectors = data?.sectors ?? fallbackSectors;
  const trades = data?.trades ?? fallbackTrades;
  const risks = data?.risks ?? fallbackRisks;
  const note = data?.traderNote ?? fallbackNote;
  const showStale = !data && error;

  return (
    <div className="min-h-screen bg-[#050810] text-[#e0e6ed] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#e0e6ed] mb-2">
                <span className="text-amber-400">$</span> Market Intelligence
              </h1>
              <p className="text-[#8b9ab5] text-sm">
                Daily trading dashboard &bull; {market.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {showStale && (
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                  stale data
                </span>
              )}
              {!data && !error ? (
                <span className="text-xs text-[#8b9ab5] animate-pulse">loading...</span>
              ) : (
                <button
                  onClick={fetchData}
                  className="text-xs text-[#8b9ab5] hover:text-[#e0e6ed] transition-colors"
                >
                  refresh
                </button>
              )}
            </div>
          </div>
        </header>

        <MarketHeader
          date={market.date}
          time={market.time}
          sentiment={market.sentiment}
          sp500Change={market.sp500Change}
          vixLevel={market.vixLevel}
          tenYearYield={market.tenYearYield}
        />

        <MacroSummary
          narrative={macro.narrative}
          macroDrivers={macro.macroDrivers}
        />

        <SectorHeatmap sectors={sectors} />

        <TradeIdeas trades={trades} />

        <RiskRadar risks={risks} />

        <TraderNote note={note} />

        <footer className="mt-8 pt-6 border-t border-[#1a2332]">
          <p className="text-[#6b7280] text-xs text-center">
            Auto-refreshes every 60s &bull; For informational purposes only. Not financial advice.
          </p>
        </footer>
      </div>
    </div>
  );
}
