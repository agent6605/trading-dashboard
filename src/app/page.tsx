'use client';

import MarketHeader from '@/components/MarketHeader';
import MacroSummary from '@/components/MacroSummary';
import SectorHeatmap from '@/components/SectorHeatmap';
import TradeIdeas from '@/components/TradeIdeas';
import RiskRadar from '@/components/RiskRadar';
import TraderNote from '@/components/TraderNote';
import {
  marketData,
  macroData,
  sectorData,
  tradeIdeasData,
  riskData,
  traderNote,
} from '@/data/marketData';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050810] text-[#e0e6ed] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#e0e6ed] mb-2">
            <span className="text-amber-400">$</span> Market Intelligence
          </h1>
          <p className="text-[#8b9ab5] text-sm">
            Daily trading dashboard • {marketData.date}
          </p>
        </header>

        <MarketHeader
          date={marketData.date}
          time={marketData.time}
          sentiment={marketData.sentiment}
          sp500Change={marketData.sp500Change}
          vixLevel={marketData.vixLevel}
          tenYearYield={marketData.tenYearYield}
        />

        <MacroSummary
          narrative={macroData.narrative}
          macroDrivers={macroData.macroDrivers}
        />

        <SectorHeatmap sectors={sectorData} />

        <TradeIdeas trades={tradeIdeasData} />

        <RiskRadar risks={riskData} />

        <TraderNote note={traderNote} />

        <footer className="mt-8 pt-6 border-t border-[#1a2332]">
          <p className="text-[#6b7280] text-xs text-center">
            For informational purposes only. Not financial advice.
          </p>
        </footer>
      </div>
    </div>
  );
}