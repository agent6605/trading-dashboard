import streamlit as st

st.set_page_config(page_title="Market Intelligence", page_icon="💰", layout="wide")

st.title("💰 Market Intelligence")
st.markdown("**Daily Trading Dashboard** • May 14, 2026")
st.markdown("---")

st.metric("S&P 500", "+0.87%", "0.87%")
st.metric("VIX", "14.2", "-1.2")
st.metric("10Y Yield", "4.32%", "0.05%")

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

st.markdown("### Trade Ideas")

trades = [
    ("NVDA", "NVIDIA", "LONG", "AI infrastructure build-out accelerating. Blackwell margins expanding.", "Market", "$145", "$118", "⭐⭐⭐", "Q2 earnings"),
    ("JPM", "JPMorgan", "LONG", "Net interest income floor is in. Credit quality better than feared.", "$215-220", "$250", "$195", "⭐⭐", "Fed cuts"),
    ("TLT", "20+ Year Treasury", "SHORT", "Bond bears throwing in the towel. Yield curve steepening.", "Market", "$92", "$105", "⭐⭐⭐", "Inflation"),
    ("GOOGL", "Alphabet", "LONG", "Cloud accelerating, AI integration driving ad efficiency.", "$175-180", "$210", "$155", "⭐⭐", "Gemini 2.0"),
    ("SMCI", "Super Micro", "SHORT", "Accounting concerns are real. Audit firm red flags.", "$550-580", "$400", "$650", "⭐⭐⭐", "Delayed 10-K"),
]

cols = st.columns(3)
for i, (ticker, company, type_, thesis, entry, target, stop, stars, catalyst) in enumerate(trades):
    with cols[i % 3]:
        badge_color = "green" if type_ == "LONG" else "red"
        st.markdown(f"**{ticker}** :{badge_color}-badge[{type_}]  \n{company}  \n\n{thesis}  \n\n**Entry:** {entry} | **Target:** {target} | **Stop:** {stop}  \n{stars} Cat: {catalyst}")

st.markdown("### ⚠️ Risk Radar")
st.markdown(":red[FED PUT DISSOLVING] Powell pushing back on rate cuts. Market pricing 3 cuts, Fed may deliver 1.")
st.markdown(":orange[TECH VALUATION] NVDA at 60x forward earnings. One bad earnings cycle and this melts.")
st.markdown(":orange[GEOPOLITICAL SHOCK] Taiwan, Middle East, or Russia could spike VIX and reverse risk-on.")

st.markdown("---")
st.markdown("> 💰 **Trader's Note:** Remember: the market will test your patience before it tests your conviction. Scale in, don't all-in.")
st.markdown("---")
st.caption("For informational purposes only. Not financial advice.")