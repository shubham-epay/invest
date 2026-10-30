'use client';

import { ArrowUpRight, Download, Globe2, Monitor, Smartphone } from 'lucide-react';
import type { ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import './platform-access.css';

const downloads = {
  windows: 'https://download.terminal.free/cdn/web/metaquotes.ltd/mt5/mt5setup.exe',
  mac: 'https://download.terminal.free/cdn/web/metaquotes.ltd/mt5/MetaTrader5.pkg.zip',
  ios: 'https://apps.apple.com/us/app/metatrader-5/id413251709',
  android: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5',
};

function DownloadLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="platform-download" href={href} target="_blank" rel="noopener noreferrer"><Download size={18} aria-hidden="true"/><span>{children}</span><ArrowUpRight size={17} aria-hidden="true"/></a>;
}

function ConnectionSteps({ mobile = false }: { mobile?: boolean }) {
  return <ol className="platform-connection-steps">
    <li><span>01</span><div><h3>Install MetaTrader 5.</h3><p>Choose the official download for your device and complete the installation.</p></div></li>
    <li><span>02</span><div><h3>Connect your account.</h3><p>{mobile ? 'Add an existing account and find the server assigned to you.' : 'Open File → Login to Trade Account and select the server assigned to you.'}</p></div></li>
    <li><span>03</span><div><h3>Use your trading details.</h3><p>Enter your account number and trading password. Your website sign-in details may be different.</p></div></li>
  </ol>;
}

export function PlatformAccess({ webTerminal }: { webTerminal?: string | null } = {}) {
  return <section className="platform-access" aria-labelledby="platform-access-title">
    <div className="platform-access-heading"><div><p className="eyebrow"><span/> YOUR PLATFORM, READY</p><h2 id="platform-access-title">Choose your screen.<br/>Connect your account.</h2></div><p>Install MetaTrader 5, then connect with the login and server details provided for your trading account.</p></div>
    <Tabs defaultValue="desktop" className="platform-access-tabs">
      <TabsList className="platform-access-tabbar" aria-label="MetaTrader 5 device">
        <TabsTrigger value="desktop"><Monitor size={18} aria-hidden="true"/>Desktop</TabsTrigger>
        <TabsTrigger value="mobile"><Smartphone size={18} aria-hidden="true"/>Mobile</TabsTrigger>
        <TabsTrigger value="web"><Globe2 size={18} aria-hidden="true"/>Web</TabsTrigger>
      </TabsList>
      <TabsContent value="desktop"><div className="platform-access-panel"><div className="platform-install"><span className="platform-type"><Monitor size={22} aria-hidden="true"/>METATRADER 5 / DESKTOP</span><h3>Your full<br/>trading workspace.</h3><p>Charts, analysis and account controls on Windows or macOS.</p><div className="platform-downloads"><DownloadLink href={downloads.windows}>Download for Windows</DownloadLink><DownloadLink href={downloads.mac}>Download for macOS</DownloadLink></div><a className="platform-guide-link" href="https://www.metatrader5.com/en/download" target="_blank" rel="noopener noreferrer">Official downloads and installation information <ArrowUpRight size={16} aria-hidden="true"/></a></div><ConnectionSteps/></div></TabsContent>
      <TabsContent value="mobile"><div className="platform-access-panel"><div className="platform-install"><span className="platform-type"><Smartphone size={22} aria-hidden="true"/>METATRADER 5 / MOBILE</span><h3>A market view.<br/>On the move.</h3><p>Download MetaTrader 5 for your iPhone, iPad or Android device.</p><div className="platform-downloads"><DownloadLink href={downloads.ios}>Download on the App Store</DownloadLink><DownloadLink href={downloads.android}>Get it on Google Play</DownloadLink></div><a className="platform-guide-link" href="https://www.metatrader5.com/en/mobile-trading" target="_blank" rel="noopener noreferrer">Explore MetaTrader 5 mobile <ArrowUpRight size={16} aria-hidden="true"/></a></div><ConnectionSteps mobile/></div></TabsContent>
      <TabsContent value="web"><div className="platform-access-panel"><div className="platform-install"><span className="platform-type"><Globe2 size={22} aria-hidden="true"/>METATRADER 5 / WEB</span><h3>Your browser.<br/>Your account.</h3><p>Web access uses a trading terminal linked to your account’s server.</p><a className="platform-download" href={webTerminal || '/contact?topic=platform'} target={webTerminal ? '_blank' : undefined} rel={webTerminal ? 'noopener noreferrer' : undefined}><span>{webTerminal ? 'Open web terminal' : 'Request web access details'}</span><ArrowUpRight size={18} aria-hidden="true"/></a><a className="platform-guide-link" href="https://www.metatrader5.com/en/trading-platform/web-trading" target="_blank" rel="noopener noreferrer">About MetaTrader 5 web trading <ArrowUpRight size={16} aria-hidden="true"/></a></div><div className="platform-web-details"><span className="platform-web-icon"><Globe2 size={40} strokeWidth={1.2} aria-hidden="true"/></span><h3>Get the right connection.</h3><p>Use the web terminal address provided with your trading account. If you need the correct link or server name, contact our support team.</p><a className="text-link" href="mailto:support@invest.to?subject=MetaTrader%205%20web%20access">support@invest.to <ArrowUpRight size={17} aria-hidden="true"/></a></div></div></TabsContent>
    </Tabs>
    <div className="platform-account-help"><div><h3>Need your server details?</h3><p>Tell us which device you use and the connection issue. Keep your password private.</p></div><a className="text-link" href="/contact?topic=platform">Contact platform support <ArrowUpRight size={18} aria-hidden="true"/></a></div>
  </section>;
}
