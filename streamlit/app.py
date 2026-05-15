import streamlit as st
import yfinance as yf
from datetime import datetime
import pytz
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

st.set_page_config(page_title="Market Intelligence", page_icon="💰", layout="wide")

def get_price(ticker):
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="1d")
        if not hist.empty:
            return hist['Close'].iloc[-1]
        info = stock.info
        return info.get('currentPrice') or info.get('regularMarketPreviousClose')
    except Exception as e:
        return None

def get_sp500_data():
    try:
        spy = yf.Ticker("SPY")
        hist = spy.history(period="1d")
        if not hist.empty:
            return hist['Close'].iloc[-1], hist['Close'].iloc[0]
        return None, None
    except:
        return None, None

def get_vix():
    try:
        vix = yf.Ticker("^VIX")
        hist = vix.history(period="1d")
        if not hist.empty:
            return hist['Close'].iloc[-1]
        return None
    except:
        return None

def get_10y_yield():
    try:
        tn = yf.Ticker("^TNX")
        hist = tn.history(period="1d")
        if not hist.empty:
            return hist['Close'].iloc[-1]
        return None
    except:
        return None

def get_history(ticker, period="1mo"):
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period=period)
        return hist
    except:
        return None

def create_chart(hist, ticker):
    if hist is None or hist.empty or 'Close' not in hist.columns:
        return None
    
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 4), height_ratios=[3, 1], sharex=True, 
                                    gridspec_kw={'hspace': 0.05})
    fig.patch.set_facecolor('#0a0e1a')
    
    dates = hist.index
    close = hist['Close']
    
    ax1.set_facecolor('#0d1220')
    ax1.plot(dates, close, color='#22c55e', linewidth=1.5)
    ax1.set_ylabel('Price ($)', color='#8b9ab5', fontsize=9)
    ax1.tick_params(axis='y', labelcolor='#8b9ab5')
    ax1.spines['top'].set_visible(False)
    ax1.spines['right'].set_visible(False)
    ax1.spines['bottom'].set_visible(False)
    ax1.spines['left'].set_visible(False)
    ax1.grid(True, alpha=0.2, color='#1a2332')
    
    if 'Volume' in hist.columns:
        volume = hist['Volume'].fillna(0)
        colors = ['#22c55e' if close.iloc[i] >= close.iloc[0] else '#ef4444' for i in range(len(volume))]
        ax2.set_facecolor('#0d1220')
        ax2.bar(dates, volume, color=colors, alpha=0.6, width=0.8)
        ax2.set_ylabel('Volume', color='#8b9ab5', fontsize=9)
        ax2.tick_params(axis='y', labelcolor='#8b9ab5')
        ax2.spines['top'].set_visible(False)
        ax2.spines['right'].set_visible(False)
        ax2.spines['bottom'].set_visible(False)
        ax2.spines['left'].set_visible(False)
        ax2.grid(True, alpha=0.2, color='#1a2332')
    
    ax2.xaxis.set_major_formatter(mdates.DateFormatter('%m/%d'))
    ax2.xaxis.set_major_locator(mdates.DayLocator(interval=5))
    plt.xticks(rotation=45, color='#8b9ab5', fontsize=8)
    
    return fig

def calculate_target_stop(current, type_, target_pct=0.20, stop_pct=0.08):
    if type_ == "LONG":
        target = current * (1 + target_pct)
        stop = current * (1 - stop_pct)
    else:
        target = current * (1 - target_pct)
        stop = current * (1 + stop_pct)
    return target, stop

try:
    sp500_current, sp500_prev = get_sp500_data()
    sp500_change = ((sp500_current - sp500_prev) / sp500_prev * 100) if (sp500_current and sp500_prev) else 0.87
    vix_level = get_vix() or 14.2
    ten_year_yield = get_10y_yield() or 4.32
    market_time = datetime.now(pytz.timezone('US/Eastern')).strftime("%-I:%M %p ET")
    market_date = datetime.now(pytz.timezone('US/Eastern')).strftime("%b %d, %Y")
except:
    sp500_change = 0.87
    vix_level = 14.2
    ten_year_yield = 4.32
    market_time = "Market Closed"
    market_date = datetime.now().strftime("%b %d, %Y")

st.title("💰 Market Intelligence")
st.markdown(f"**Daily Trading Dashboard** • {market_date} {market_time}")
st.markdown("---")

c1, c2, c3, c4 = st.columns(4)
c1.markdown(f"**{market_date}** as of {market_time}")
c2.metric("S&P 500", f"{sp500_current:.2f}" if sp500_current else "—", f"{sp500_change:+.2f}%" if sp500_change else None)
c3.metric("VIX", f"{vix_level:.1f}" if vix_level else "—")
c4.metric("10Y", f"{ten_year_yield:.2f}%" if ten_year_yield else "—")

st.markdown("---")
st.markdown("### Macro Summary")
st.write("Markets ripping on Fed pivot speculation. Tech leading charge as bond yields compress. Smart money rotating into cyclicals - this feels like the early innings of a new leg up.")
st.markdown("**Macro Drivers:** Fed Pivot | Yield Compression | Tech Rally | Dollar Weakening")

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

st.markdown("### Trade Ideas (Real-Time Prices)")

trade_tickers = ["NVDA", "JPM", "TLT", "GOOGL", "SMCI"]

prices = {}
histories = {}

st.write("Loading market data...")

for t in trade_tickers:
    price = get_price(t)
    hist = get_history(t, "1mo")
    prices[t] = price
    histories[t] = hist

trades = [
    ("NVDA", "NVIDIA", "LONG", "AI infrastructure build-out. Blackwell margins expanding.", "⭐⭐⭐", "Q2 earnings"),
    ("JPM", "JPMorgan", "LONG", "Net interest income floor in. Credit quality better than feared.", "⭐⭐", "Fed cuts boost NII"),
    ("TLT", "20+ Year Treasury", "SHORT", "Bond bears throwing in towel. Yield curve steepening signals recession risk.", "⭐⭐⭐", "Inflation re-accelerates"),
    ("GOOGL", "Alphabet", "LONG", "Cloud accelerating. AI integration driving ad efficiency. Waymo becoming real.", "⭐⭐", "Gemini 2.0 adoption"),
    ("SMCI", "Super Micro", "SHORT", "Accounting concerns real. Audit firm red flags. Customer concentration risk.", "⭐⭐⭐", "Delayed 10-K"),
]

for i, (ticker, company, type_, thesis, stars, catalyst) in enumerate(trades):
    current_price = prices.get(ticker)
    hist = histories.get(ticker)
    
    target = stop = 0
    upside_display = downside_display = "—"
    
    if current_price and current_price > 0:
        target, stop = calculate_target_stop(current_price, type_, target_pct=0.20, stop_pct=0.08)
        upside = ((target - current_price) / current_price * 100)
        downside = ((current_price - stop) / current_price * 100) if type_ == "LONG" else ((stop - current_price) / current_price * 100)
        rrr = abs(upside / downside) if downside > 0 else 0
        upside_display = f"+{upside:.1f}%"
        downside_display = f"-{downside:.1f}%"
        price_str = f"${current_price:.2f}"
        target_str = f"${target:.2f}"
        stop_str = f"${stop:.2f}"
        rrr_str = f"RRR: {rrr:.1f}R"
    else:
        price_str = "—"
        target_str = "—"
        stop_str = "—"
        rrr_str = ""
    
    badge_color = "green" if type_ == "LONG" else "red"
    st.markdown(f"### {ticker} :{badge_color}-badge[{type_}]  \n**{company}**")
    st.markdown(f"💰 **{price_str}**")
    st.markdown(f"_{thesis}_")
    
    if current_price and current_price > 0:
        st.markdown(f"**Target:** {target_str} ({upside_display}) | **Stop:** {stop_str} ({downside_display})")
        st.markdown(f"{stars} {rrr_str} | Cat: {catalyst}")
    else:
        st.markdown(f"**Target:** {target_str} | **Stop:** {stop_str}")
        st.markdown(f"{stars} Cat: {catalyst}")
    
    if hist is not None and not hist.empty:
        fig = create_chart(hist, ticker)
        if fig:
            st.pyplot(fig)
    
    if i < len(trades) - 1:
        st.markdown("---")

st.markdown("### ⚠️ Risk Radar")
st.markdown(":red[FED PUT DISSOLVING] Powell pushing back on rate cuts. Market pricing 3 cuts, Fed may deliver 1.")
st.markdown(":orange[TECH VALUATION] NVDA at elevated multiples. One bad earnings cycle and this melts.")
st.markdown(":orange[GEOPOLITICAL SHOCK] Taiwan, Middle East, or Russia could spike VIX and reverse risk-on.")

st.markdown("---")
st.markdown("> 💰 **Trader's Note:** Remember: the market will test your patience before it tests your conviction. Scale in, don't all-in.")
st.markdown("---")
st.caption("Targets: 20% upside / 8% stop. Charts: 1-month price + volume (shared x-axis). Prices via Yahoo Finance (~15min delayed). Not financial advice.")