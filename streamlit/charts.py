"""Chart creation utilities."""

import matplotlib.pyplot as plt
import matplotlib.dates as mdates


def create_price_volume_chart(hist, ticker: str):
    """Create a price and volume chart with shared x-axis."""
    if hist is None or hist.empty or 'Close' not in hist.columns:
        return None

    fig, (ax_price, ax_volume) = plt.subplots(2, 1, figsize=(10, 4), height_ratios=[3, 1], sharex=True, gridspec_kw={'hspace': 0.05})
    fig.patch.set_facecolor('#0a0e1a')

    dates = hist.index
    close = hist['Close']

    # Price chart
    ax_price.set_facecolor('#0d1220')
    ax_price.plot(dates, close, color='#22c55e', linewidth=1.5)
    ax_price.set_ylabel('Price ($)', color='#8b9ab5', fontsize=9)
    ax_price.tick_params(axis='y', labelcolor='#8b9ab5')
    for spine in ax_price.spines.values():
        spine.set_visible(False)
    ax_price.grid(True, alpha=0.2, color='#1a2332')

    # Volume chart
    if 'Volume' in hist.columns:
        volume = hist['Volume'].fillna(0)
        colors = ['#22c55e' if i == 0 or close.iloc[i] >= close.iloc[i-1] else '#ef4444' for i in range(len(volume))]
        ax_volume.set_facecolor('#0d1220')
        ax_volume.bar(dates, volume, color=colors, alpha=0.6, width=0.8)
        ax_volume.set_ylabel('Volume', color='#8b9ab5', fontsize=9)
        ax_volume.tick_params(axis='y', labelcolor='#8b9ab5')
        for spine in ax_volume.spines.values():
            spine.set_visible(False)
        ax_volume.grid(True, alpha=0.2, color='#1a2332')

    ax_volume.xaxis.set_major_formatter(mdates.DateFormatter('%m/%d'))
    ax_volume.xaxis.set_major_locator(mdates.DayLocator(interval=5))
    plt.xticks(rotation=45, color='#8b9ab5', fontsize=8)

    return fig