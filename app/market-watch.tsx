'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, RefreshCw, Expand } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const sourceMarkets = [
  { symbol: 'OANDA:EURUSD', label: 'EUR/USD', name: 'Euro / US dollar', shortName: 'Euro / Dollar', badge: 'FX', href: 'https://www.tradingview.com/symbols/EURUSD/?exchange=OANDA' },
  { symbol: 'OANDA:XAUUSD', label: 'XAU/USD', name: 'Gold / US dollar', shortName: 'Gold', badge: 'Au', href: 'https://www.tradingview.com/symbols/XAUUSD/?exchange=OANDA' },
  { symbol: 'OANDA:XAGUSD', label: 'XAG/USD', name: 'Silver / US dollar', shortName: 'Silver', badge: 'Ag', href: 'https://www.tradingview.com/symbols/XAGUSD/?exchange=OANDA' },
];

function MarketChart({ market }: { market: typeof sourceMarkets[number] }) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    setState('loading');
    let disposed = false;
    let iframe: HTMLIFrameElement | null = null;
    const loaded = () => {
      if (disposed) return;
      clearTimeout(timeout);
      setState('ready');
    };
    const failed = () => { if (!disposed) setState('error'); };
    const onProviderMessage = (event: MessageEvent) => {
      if (!iframe || event.source !== iframe.contentWindow || event.origin !== new URL(iframe.src).origin) return;
      if (event.data?.name === 'tv-widget-no-data') failed();
      if (event.data?.name === 'tv-widget-ready') loaded();
    };
    window.addEventListener('message', onProviderMessage);
    const observer = new MutationObserver(() => {
      const next = element.querySelector('iframe');
      if (next && next !== iframe) {
        iframe?.removeEventListener('load', loaded);
        iframe = next;
        iframe.title = `${market.name} price chart from TradingView`;
        iframe.addEventListener('load', loaded);
      }
    });
    observer.observe(element, { childList: true, subtree: true });

    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onerror = failed;
    script.textContent = JSON.stringify({
      autosize: true,
      symbol: market.symbol,
      interval: '60',
      timezone: 'Etc/UTC',
      theme: 'light',
      backgroundColor: 'rgba(255, 255, 255, 1)',
      gridColor: 'rgba(25, 38, 56, 0.05)',
      style: '1',
      locale: 'en',
      withdateranges: true,
      hide_side_toolbar: false,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: true,
      allow_symbol_change: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
    });
    const timeout = setTimeout(failed, 20000);
    element.replaceChildren(widget, script);
    return () => {
      disposed = true;
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener('message', onProviderMessage);
      iframe?.removeEventListener('load', loaded);
      script.onerror = null;
      element.replaceChildren();
    };
  }, [attempt, market]);

  return <div className="market-watch-display" aria-busy={state === 'loading'}>
    <div className="tradingview-widget-container" ref={host}/>
    {state !== 'ready' && <output className="market-watch-status">
      {state === 'loading' ? <><span className="market-loader" aria-hidden="true"/><strong>Opening {market.label}</strong><span>Connecting to TradingView</span></> : <><strong>Market prices are unavailable</strong><span>Try again or open the chart on TradingView.</span><button type="button" onClick={() => setAttempt(a => a + 1)}><RefreshCw size={16}/>Retry chart</button><a href={market.href} target="_blank" rel="noopener noreferrer">View {market.label} <ArrowUpRight size={14}/></a></>}
    </output>}
  </div>;
}

export function MarketWatch() {
  const [symbol, setSymbol] = useState(sourceMarkets[0].symbol);
  const market = sourceMarkets.find(m => m.symbol === symbol) ?? sourceMarkets[0];
  return <div className="market-workspace">
    <div className="market-workspace-label"><span><span className="workspace-glyph" aria-hidden="true"/> INVEST.TO <span className="workspace-divider">/</span> MARKET DESK</span><span className="market-feed-label">OANDA DATA <span>·</span> USD</span></div>
    <Tabs className="market-tabs" value={symbol} onValueChange={value => setSymbol(String(value))}>
      <div className="market-toolbar"><TabsList className="market-symbol-tabs" aria-label="Choose a market">{sourceMarkets.map(m => <TabsTrigger key={m.symbol} value={m.symbol} className="market-symbol-tab"><span className={'instrument-badge '+m.badge.toLowerCase()} aria-hidden="true">{m.badge}</span><span><strong>{m.label}</strong><small>{m.shortName}</small></span></TabsTrigger>)}</TabsList><a className="market-expand" href={market.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${market.label} on TradingView in a new tab`}><Expand size={15}/><span>Full chart</span></a></div>
      {sourceMarkets.map(m => <TabsContent key={m.symbol} value={m.symbol} className="market-chart-panel"><MarketChart market={m}/></TabsContent>)}
    </Tabs>
    <div className="market-workspace-bottom"><p>Charts by <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer">TradingView <ArrowUpRight size={12}/></a></p><span>FOREX &amp; PRECIOUS METALS</span></div>
    <p className="market-data-note">Indicative OANDA prices via TradingView. Data may be delayed or unavailable. Not Invest.to execution quotes.</p>
  </div>;
}
