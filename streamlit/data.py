"""Trade ideas data definitions."""

from dataclasses import dataclass


@dataclass
class Trade:
    """Trade idea representation."""
    ticker: str
    company: str
    type_: str  # LONG or SHORT
    thesis: str
    stars: str
    catalyst: str


TRADE_IDEAS = [
    Trade("NVDA", "NVIDIA", "LONG", "AI infrastructure build-out. Blackwell margins expanding.", "⭐⭐⭐", "Q2 earnings"),
    Trade("JPM", "JPMorgan", "LONG", "Net interest income floor in. Credit quality better than feared.", "⭐⭐", "Fed cuts boost NII"),
    Trade("TLT", "20+ Year Treasury", "SHORT", "Bond bears throwing in towel. Yield curve steepening signals recession risk.", "⭐⭐⭐", "Inflation re-accelerates"),
    Trade("GOOGL", "Alphabet", "LONG", "Cloud accelerating. AI integration driving ad efficiency. Waymo becoming real.", "⭐⭐", "Gemini 2.0 adoption"),
    Trade("SMCI", "Super Micro", "SHORT", "Accounting concerns real. Audit firm red flags. Customer concentration risk.", "⭐⭐⭐", "Delayed 10-K"),
]


def determine_direction(hist, lookback: int = 20) -> str:
    """Return 'LONG' or 'SHORT' based on recent price trend."""
    if hist is None or len(hist) < 2:
        return 'LONG'
    recent = hist['Close'].iloc[-1]
    prior = hist['Close'].iloc[-min(lookback, len(hist))]
    return 'LONG' if recent >= prior else 'SHORT'


def calculate_target_stop(current: float, type_: str, target_pct: float = 0.20, stop_pct: float = 0.08) -> tuple[float, float]:
    """Calculate target and stop prices based on current price."""
    if type_ == "LONG":
        return current * (1 + target_pct), current * (1 - stop_pct)
    return current * (1 - target_pct), current * (1 + stop_pct)