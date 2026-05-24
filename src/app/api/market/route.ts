import { NextResponse } from 'next/server';

const SENTIMENTS = ['RISK-ON', 'RISK-OFF', 'NEUTRAL'] as const;
const SEVERITIES = ['high', 'medium', 'low'] as const;

const SECTORS = [
  { ticker: 'XLK', name: 'Tech' },
  { ticker: 'XLV', name: 'Health' },
  { ticker: 'XLF', name: 'Financials' },
  { ticker: 'XLE', name: 'Energy' },
  { ticker: 'XLC', name: 'Comm' },
  { ticker: 'XLY', name: 'Consumer' },
  { ticker: 'XLP', name: 'Staples' },
  { ticker: 'XLRE', name: 'Real Estate' },
  { ticker: 'XLB', name: 'Materials' },
  { ticker: 'XLI', name: 'Industrials' },
  { ticker: 'XLU', name: 'Utilities' },
];

const SECTOR_COMMENTS: Record<string, string[]> = {
  Tech: ['AI momentum accelerating', 'Chip demand strong', 'Cloud spending rebounding', 'AI winners continue', 'Software margin expansion'],
  Health: ['Defensive inflow steady', 'Biotech M&A picking up', 'Drug pricing headwind fading', 'Demographic tailwind intact'],
  Financials: ['NIM stabilizing', 'Trading revenue up', 'Loan growth modest', 'Buybacks supporting', 'Capital return story'],
  Energy: ['Oil supply glut', 'OPEC+ discipline wavering', 'Clean energy transition', 'Crude demand soft'],
  Comm: ['Telecom pricing stable', 'Ad market recovering', 'Streaming margins improve'],
  Consumer: ['Consumer resilient', 'Spending shifting to services', 'Retail inventory clean', 'Wage growth supporting'],
  Staples: ['Trading defensive premium', 'Volume growth flat', 'Private label gaining share'],
  'Real Estate': ['Rate sensitivity high', 'Office distress still looming', 'Industrial demand firm', 'Housing supply tight'],
  Materials: ['Copper demand from AI', 'Steel tariffs reshaping', 'Commodity prices mixed', 'Infrastructure spending boost'],
  Industrials: ['Defense spending cycle', 'Reshoring trend continues', 'Backlog conversion strong', 'MRO demand steady'],
  Utilities: ['AI data center power demand', 'Renewable capex heavy', 'Rate headwind persists', 'Regulatory uncertainty'],
};

const NARRATIVES = [
  'Markets rallying on Fed pivot expectations. Tech leading as bond yields compress. Smart money rotating into cyclicals.',
  'Risk-on continues as recession fears fade. Earnings season beating lowered expectations. VIX grinding lower.',
  'Inflation data coming in softer than expected. Market pricing in rate cuts by September. Dollar weakening supporting EM.',
  'Bond market sending mixed signals. Yield curve steepening but credit spreads tight. Market searching for direction.',
  'AI infrastructure buildout driving capex cycle. Semis and industrials benefiting. Defense spending supporting industrials.',
];

const MACRO_DRIVERS_LIST = [
  'Fed Pivot', 'AI Capex Cycle', 'Yield Compression', 'Dollar Weakening',
  'Recession Fading', 'Earnings Growth', 'Nvidia Earnings', 'Housing Recovery',
  'Labor Market Softening', 'Consumer Spending', 'China Stimulus', 'Geopolitical Risk',
];

const TRADE_IDEAS_BASE = [
  {
    ticker: 'NVDA', companyName: 'NVIDIA', type: 'LONG' as const,
    thesis: 'Blackwell demand surging. Every hyperscaler expanding AI capacity. Strong pricing power.',
    catalysts: ['Q2 earnings', 'GTC conference', 'Product launch cycle'],
  },
  {
    ticker: 'JPM', companyName: 'JPMorgan', type: 'LONG' as const,
    thesis: 'NII floor in place. Investment banking fees recovering. Credit quality better than feared.',
    catalysts: ['Fed cuts boost NII', 'IB revenue recovery', 'Share buybacks'],
  },
  {
    ticker: 'TLT', companyName: '20+ Year Treasury', type: 'SHORT' as const,
    thesis: 'Bond bear rally running its course. Yield curve steepening. Supply overhang remains.',
    catalysts: ['Inflation re-accelerates', 'Treasury auction', 'Fed hawkish surprise'],
  },
  {
    ticker: 'GOOGL', companyName: 'Alphabet', type: 'LONG' as const,
    thesis: 'Cloud accelerating on GenAI. Search share stable. Waymo becoming real business.',
    catalysts: ['Gemini 2.0 adoption', 'Cloud revenue acceleration', 'Waymo expansion'],
  },
  {
    ticker: 'SMCI', companyName: 'Super Micro', type: 'SHORT' as const,
    thesis: 'Accounting concerns persist. Customer concentration risk. Margin pressure from competition.',
    catalysts: ['Delayed 10-K', 'Audit report', 'Margin guidance'],
  },
];

const RISK_ITEMS = [
  { title: 'Fed Put Dissolving', description: 'Powell pushing back on rate cuts. Market vs Fed disconnect growing.' },
  { title: 'Tech Valuation', description: 'Mag 7 trading at elevated multiples. Earnings miss could trigger sharp de-rating.' },
  { title: 'Nvidia Earnings', description: 'Largest market cap stock needs perfect print. Any miss will ripple through semis.' },
  { title: 'Geopolitical Shock', description: 'Taiwan strait tensions, Middle East escalation, Russia-Ukraine stalemate.' },
  { title: 'Consumer Weakening', description: 'Delinquencies rising in auto and credit cards. Subprime stress signals.' },
  { title: 'Equity Concentration', description: 'Top 10 stocks at 35% of S&P 500. Passive flow risk if breadth improves.' },
];

const TRADER_NOTES = [
  'Scale in, don\'t all-in. The market will test your patience before it tests your conviction.',
  'When everyone is positioned the same way, the reversal hits the hardest. Stay flexible.',
  'The trend is your friend until the bend at the end. Respect momentum but manage risk.',
  'In a bull market, every dip is a buying opportunity. Until one isn\'t. Keep stops tight.',
  'Volatility is not risk. Risk is permanent loss of capital. Embrace vol, avoid drawdowns.',
];

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(value: number, base: number, range: number): number {
  const v = base + (Math.random() - 0.5) * range * 2;
  return Math.round(v * 100) / 100;
}

function pickComment(sectorName: string): string {
  const comments = SECTOR_COMMENTS[sectorName] || ['No comment'];
  return pick(comments);
}

type Sentiment = typeof SENTIMENTS[number];
type Bias = 'BULLISH' | 'BEARISH' | 'NEUTRAL';
type Trend = 'up' | 'down' | 'flat';
type Conviction = 'HIGH' | 'MEDIUM';
type Severity = typeof SEVERITIES[number];

interface SectorData {
  ticker: string;
  name: string;
  change: number;
  trend: Trend;
  bias: Bias;
  comment: string;
}

interface TradeIdeaData {
  ticker: string;
  companyName: string;
  type: 'LONG' | 'SHORT';
  thesis: string;
  entryZone: string;
  target: string;
  stop: string;
  conviction: Conviction;
  catalyst: string;
}

interface RiskData {
  title: string;
  description: string;
  severity: Severity;
}

interface MarketResponse {
  date: string;
  time: string;
  sentiment: Sentiment;
  sp500Change: number;
  vixLevel: number;
  tenYearYield: number;
  macroNarrative: string;
  macroDrivers: string[];
  sectors: SectorData[];
  trades: TradeIdeaData[];
  risks: RiskData[];
  traderNote: string;
}

export async function GET() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
    timeZone: 'America/New_York',
  });

  const sp500Base = 0.87;
  const vixBase = 14.2;
  const yieldBase = 4.32;

  const sentiment: Sentiment = pick(SENTIMENTS);
  const sp500Change = clamp(Math.random() * 2 - 0.5, sp500Base, 0.4);
  const vixLevel = clamp(Math.random() + 1, vixBase, 1.5);
  const tenYearYield = clamp(Math.random() - 0.1, yieldBase, 0.15);
  const macroNarrative = pick(NARRATIVES);
  const macroDriverCount = 3 + Math.floor(Math.random() * 2);
  const shuffledDrivers = [...MACRO_DRIVERS_LIST].sort(() => Math.random() - 0.5);
  const macroDrivers = shuffledDrivers.slice(0, macroDriverCount);
  const traderNote = pick(TRADER_NOTES);

  const sectors: SectorData[] = SECTORS.map(s => {
    const change = clamp(Math.random() * 2 - 0.3, 0, 1.5);
    const trend: Trend = change > 0.3 ? 'up' : change < -0.3 ? 'down' : 'flat';
    const bias: Bias = change > 0.7 ? 'BULLISH' : change < -0.5 ? 'BEARISH' : 'NEUTRAL';
    return {
      ...s,
      change,
      trend,
      bias,
      comment: pickComment(s.name),
    };
  });

  const trades: TradeIdeaData[] = TRADE_IDEAS_BASE.map(t => {
    const conviction: Conviction = Math.random() > 0.5 ? 'HIGH' : 'MEDIUM';
    const entryMin = 50 + Math.random() * 500;
    const range = entryMin * 0.05;
    const entryZone = `$${entryMin.toFixed(0)}-${(entryMin + range).toFixed(0)}`;
    const target = `$${(entryMin * (1 + 0.15 + Math.random() * 0.1)).toFixed(0)}`;
    const stop = `$${(entryMin * (1 - 0.1 - Math.random() * 0.05)).toFixed(0)}`;
    return {
      ticker: t.ticker,
      companyName: t.companyName,
      type: t.type,
      thesis: t.thesis,
      entryZone: t.type === 'SHORT' ? entryZone : (Math.random() > 0.5 ? 'Market' : entryZone),
      target,
      stop,
      conviction,
      catalyst: pick(t.catalysts),
    };
  });

  const riskCount = 3 + Math.floor(Math.random() * 2);
  const shuffledRisks = [...RISK_ITEMS].sort(() => Math.random() - 0.5);
  const risks: RiskData[] = shuffledRisks.slice(0, riskCount).map(r => {
    const severity: Severity = pick(SEVERITIES);
    return { ...r, severity };
  });

  const response: MarketResponse = {
    date: dateStr,
    time: timeStr,
    sentiment,
    sp500Change,
    vixLevel,
    tenYearYield,
    macroNarrative,
    macroDrivers,
    sectors,
    trades,
    risks,
    traderNote,
  };

  return NextResponse.json(response);
}
