"""Main Streamlit application for Market Intelligence Dashboard."""

import streamlit as st
from datetime import datetime
import pytz

from utils import get_price, get_market_indicators, get_stock_history
from data import TRADE_IDEAS, calculate_target_stop, determine_direction
from charts import create_price_volume_chart

st.set_page_config(page_title="Market Intelligence", page_icon="💰", layout="wide")


def render_market_header():
    """Render the market indicators header."""
    indicators = get_market_indicators()
    market_time = datetime.now(pytz.timezone('US/Eastern')).strftime("%-I:%M %p ET")
    market_date = datetime.now(pytz.timezone('US/Eastern')).strftime("%b %d, %Y")

    c1, c2, c3, c4 = st.columns(4)
    c1.markdown(f"**{market_date}** as of {market_time}")
    c2.metric("S&P 500", f"{indicators['sp500_current']:.2f}" if indicators['sp500_current'] else "—", f"{indicators['sp500_change']:+.2f}%")
    c3.metric("VIX", f"{indicators['vix']:.1f}" if indicators['vix'] else "—")
    c4.metric("10Y", f"{indicators['ten_year']:.2f}%" if indicators['ten_year'] else "—")


def render_macro_summary():
    """Render the macro summary section."""
    st.markdown("### Macro Summary")
    st.write("Markets ripping on Fed pivot speculation. Tech leading charge as bond yields compress. Smart money rotating into cyclicals - this feels like the early innings of a new leg up.")
    st.markdown("**Macro Drivers:** Fed Pivot | Yield Compression | Tech Rally | Dollar Weakening")


def render_sector_heatmap():
    """Render the sector heatmap."""
    st.markdown("### Sector Heatmap")

    sectors = [
        ("XLK", "Tech", "+1.42%", "↑", "BULLISH"),
        ("XLV", "Health", "+0.65%", "↑", "NEUTRAL"),
        ("XLF", "Financials", "+1.18%", "↑", "BULLISH"),
        ("XLE", "Energy", "-0.82%", "↓", "BEARISH"),
        ("XLC", "Comm", "+0.34%", "↑", "NEUTRAL"),
        ("XLY", "Consumer", "+0.91%", "↑", "BULLISH"),
        ("XLP", "Staples", "+0.12%", "→", "NEUTRAL"),
        ("XLRE", "Real Estate", "+0.56%", "↑", "NEUTRAL"),
        ("XLB", "Materials", "+0.45%", "↑", "NEUTRAL"),
        ("XLI", "Industrials", "+0.78%", "↑", "BULLISH"),
        ("XLU", "Utilities", "-0.34%", "↓", "BEARISH"),
    ]

    cols = st.columns(4)
    for i, (ticker, name, change, trend, bias) in enumerate(sectors):
        with cols[i % 4]:
            color = "green" if change.startswith("+") else "red"
            st.markdown(f"**{ticker}** {trend}  \n{name}  \n:{color}[{change}]  \n{bias}")


def render_trade_card(trade, current_price):
    """Render a single trade idea card."""
    badge_color = "green" if trade.type_ == "LONG" else "red"

    if current_price and current_price > 0:
        target, stop = calculate_target_stop(current_price, trade.type_)
        upside = ((target - current_price) / current_price * 100)
        downside = ((current_price - stop) / current_price * 100) if trade.type_ == "LONG" else ((stop - current_price) / current_price * 100)
        rrr = abs(upside / downside) if downside > 0 else 0
        upside_display = f"+{upside:.1f}%"
        downside_display = f"-{downside:.1f}%"
        price_str = f"${current_price:.2f}"
        target_str = f"${target:.2f}"
        stop_str = f"${stop:.2f}"
        rrr_str = f"RRR: {rrr:.1f}R"
    else:
        price_str = target_str = stop_str = "—"
        upside_display = downside_display = "—"
        rrr_str = ""

    st.markdown(f"### {trade.ticker} :{badge_color}-badge[{trade.type_}]  \n**{trade.company}**")
    st.markdown(f"💰 **{price_str}**")
    st.markdown(f"_{trade.thesis}_")

    if current_price and current_price > 0:
        st.markdown(f"**Target:** {target_str} ({upside_display}) | **Stop:** {stop_str} ({downside_display})")
        st.markdown(f"{trade.stars} {rrr_str} | Cat: {trade.catalyst}")
    else:
        st.markdown(f"**Target:** {target_str} | **Stop:** {stop_str}")
        st.markdown(f"{trade.stars} Cat: {trade.catalyst}")


def render_risk_radar():
    """Render the risk radar section."""
    st.markdown("### ⚠️ Risk Radar")
    st.markdown(":red[FED PUT DISSOLVING] Powell pushing back on rate cuts. Market pricing 3 cuts, Fed may deliver 1.")
    st.markdown(":orange[TECH VALUATION] NVDA at elevated multiples. One bad earnings cycle and this melts.")
    st.markdown(":orange[GEOPOLITICAL SHOCK] Taiwan, Middle East, or Russia could spike VIX and reverse risk-on.")


# Main app execution
st.title("💰 Market Intelligence")
market_date = datetime.now(pytz.timezone('US/Eastern')).strftime("%b %d, %Y")
st.markdown(f"**Daily Trading Dashboard** • {market_date}")
st.markdown("---")

render_market_header()
st.markdown("---")
render_macro_summary()
st.markdown("---")
render_sector_heatmap()
st.markdown("---")
st.markdown("### Trade Ideas (Real-Time Prices)")

st.write("Loading market data...")
trade_tickers = [t.ticker for t in TRADE_IDEAS]

prices = {}
histories = {}
for t in trade_tickers:
    prices[t] = get_price(t)
    histories[t] = get_stock_history(t, "1mo")

for i in range(0, len(TRADE_IDEAS), 2):
    row_trades = TRADE_IDEAS[i:i+2]
    cols = st.columns(2)
    for j, trade in enumerate(row_trades):
        dir_ = determine_direction(histories.get(trade.ticker))
        trade.type_ = dir_
        with cols[j]:
            render_trade_card(trade, prices.get(trade.ticker))
            hist = histories.get(trade.ticker)
            if hist is not None and not hist.empty:
                fig = create_price_volume_chart(hist, trade.ticker)
                if fig:
                    st.pyplot(fig)

render_risk_radar()
st.markdown("---")
st.markdown("> 💰 **Trader's Note:** Remember: the market will test your patience before it tests your conviction. Scale in, don't all-in.")
st.markdown("---")
st.caption("Targets: 20% upside / 8% stop. Charts: 1-month price + volume (shared x-axis). Prices via Yahoo Finance (~15min delayed). Not financial advice.")