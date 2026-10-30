import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPaths, articles, markets } from '../content';
import { SitePage } from '../site-pages';
export function generateStaticParams(){return allPaths.map(p=>({slug:p.split('/')}))}
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}):Promise<Metadata>{const {slug}=await params;const p=slug.join('/');const title=articles.find(x=>p==='academy/'+x.slug)?.title||markets.find(x=>p==='markets/'+x.slug)?.name||({'get-started':'Get started','client-area':'Sign in','sign-in':'Sign in','forgot-password':'Password help','demo-account':'Demo account','funding/deposit':'Deposit guide','funding/withdrawal':'Withdrawal guide','partners/apply':'Partner enquiry','brand':'Brand guide','legal/privacy':'Privacy Policy','legal/risk':'Risk disclosure','legal/terms':'Terms and Conditions'} as Record<string,string>)[p]||p.charAt(0).toUpperCase()+p.slice(1);return {title,description:`Explore ${title.toLowerCase()} at Invest.to. Global markets. Your perspective.`}}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const path=slug.join('/');if(!allPaths.includes(path))notFound();return <SitePage path={path}/>}
