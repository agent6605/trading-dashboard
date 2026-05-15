export const marketData = {
  date: 'May 14, 2026',
  time: '10:45 AM ET',
  sentiment: 'RISK-ON' as const,
  sp500Change: 0.87,
  vixLevel: 14.2,
  tenYearYield: 4.32,
};

export const macroData = {
  narrative:
    'Markets ripping on Fed pivot speculation. Tech leading charge as bond yields compress. Smart money rotating into cyclicals - this feels like the early innings of a new leg up. But watch for gamma squeeze if VIX drops below 13.',
  macroDrivers: ['Fed Pivot', 'Yield Compression', 'Tech Rally', 'Dollar Weakening'],
};

export const sectorData = [
  { ticker: 'XLK', name: 'Tech', change: 1.42, trend: 'up' as const, bias: 'BULLISH' as const, comment: 'AI winners continues' },
  { ticker: 'XLV', name: 'Health', change: 0.65, trend: 'up' as const, bias: 'NEUTRAL' as const, comment: 'Defensive rotation' },
  { ticker: 'XLF', name: 'Financials', change: 1.18, trend: 'up' as const, bias: 'BULLISH' as const, comment: 'Net interest margin play' },
  { ticker: 'XLE', name: 'Energy', change: -0.82, trend: 'down' as const, bias: 'BEARISH' as const, comment: 'Oil weakness persists' },
  { ticker: 'XLC', name: 'Comm', change: 0.34, trend: 'up' as const, bias: 'NEUTRAL' as const, comment: 'Telecom stabilizing' },
  { ticker: 'XLY', name: 'Consumer', change: 0.91, trend: 'up' as const, bias: 'BULLISH' as const, comment: 'Consumer holding up' },
  { ticker: 'XLP', name: 'Staples', change: 0.12, trend: 'flat' as const, bias: 'NEUTRAL' as const, comment: 'Bond proxy unwinding' },
  { ticker: 'XLRE', name: 'Real Estate', change: 0.56, trend: 'up' as const, bias: 'NEUTRAL' as const, comment: 'Rates help but...' },
  { ticker: 'XLB', name: 'Materials', change: 0.45, trend: 'up' as const, bias: 'NEUTRAL' as const, comment: 'Industrial metals firm' },
  { ticker: 'XLI', name: 'Industrials', change: 0.78, trend: 'up' as const, bias: 'BULLISH' as const, comment: 'Infrastructure play' },
  { ticker: 'XLU', name: 'Utilities', change: -0.34, trend: 'down' as const, bias: 'BEARISH' as const, comment: 'Rate pain continues' },
];

export const tradeIdeasData = [
  {
    ticker: 'NVDA',
    companyName: 'NVIDIA',
    type: 'LONG' as const,
    thesis: 'AI infrastructure build-out accelerating. Blackwell margins expanding. Every hyperscaler is fighting to deploy more GPUs. This is the shovel in the AI gold rush.',
    entryZone: 'Market',
    target: '$145',
    stop: '$118',
    conviction: 'HIGH' as const,
    catalyst: 'Q2 earnings',
  },
  {
    ticker: 'JPM',
    companyName: 'JPMorgan',
    type: 'LONG' as const,
    thesis: 'Net interest income floor is in. Credit quality better than feared. Trading revenue normalizing. At 11x earnings, this is cheap for the quality.',
    entryZone: '$215-220',
    target: '$250',
    stop: '$195',
    conviction: 'MEDIUM' as const,
    catalyst: 'Fed cuts boost NII',
  },
  {
    ticker: 'TLT',
    companyName: '20+ Year Treasury',
    type: 'SHORT' as const,
    thesis: 'Bond bears throwing in the towel. Yield curve steepening signals recession risk being priced out. Duration risk is a trap. Take profits on long bonds.',
    entryZone: 'Market',
    target: '$92',
    stop: '$105',
    conviction: 'HIGH' as const,
    catalyst: 'Inflation re-accelerates',
  },
  {
    ticker: 'GOOGL',
    companyName: 'Alphabet',
    type: 'LONG' as const,
    thesis: 'Cloud accelerating, AI integration driving ad efficiency. Waymo becoming real. Trading at discount to meta despite better growth. Institutional slowly accumulating.',
    entryZone: '$175-180',
    target: '$210',
    stop: '$155',
    conviction: 'MEDIUM' as const,
    catalyst: 'Gemini 2.0 adoption',
  },
  {
    ticker: 'SMCI',
    companyName: 'Super Micro',
    type: 'SHORT' as const,
    thesis: 'Accounting concerns are real. Audit firm red flags. Customer concentration risk. This is a liquidity story - buyer beware. Management credibility destroyed.',
    entryZone: '$550-580',
    target: '$400',
    stop: '$650',
    conviction: 'HIGH' as const,
    catalyst: 'Delayed 10-K',
  },
];

export const riskData = [
  {
    title: 'Fed Put Dissolving',
    description: 'Powell pushing back on rate cut expectations. Market pricing 3 cuts, Fed may only deliver 1.',
    severity: 'high' as const,
  },
  {
    title: 'Tech Valuation',
    description: 'NVDA at 60x forward earnings. Mag 7 avg 35x. One bad earnings cycle and this melts.',
    severity: 'medium' as const,
  },
  {
    title: 'Geopolitical Shock',
    description: 'Taiwan, Middle East, or Russia could spike VIX and reverse risk-on fast.',
    severity: 'medium' as const,
  },
];

export const traderNote =
  'Remember: the market will test your patience before it tests your conviction. Scale in, don\'t all-in. The桌面上最难的事 is doing nothing when everyone else is making noise.';