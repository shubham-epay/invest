import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:{default:'Invest.to — Global markets. Your perspective.',template:'%s | Invest.to'},description:'Forex and CFD trading with Invest.to from Eptra Prime Ltd. Explore global markets, compare accounts and build your market perspective.',robots:{index:true,follow:true},icons:{icon:'/brand/invest-icon-32.png',apple:'/brand/invest-icon-192.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
