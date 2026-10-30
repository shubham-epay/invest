'use client';
import { useEffect, useState } from 'react';
type ServiceLinks = {signIn:string|null;register:string|null;demo:string|null;webTerminal:string|null};
const emptyLinks:ServiceLinks = {signIn:null,register:null,demo:null,webTerminal:null};
function isServiceLinks(value:unknown):value is ServiceLinks {
 if (!value || typeof value!=='object') return false;
 const fields=value as Record<string,unknown>;
 return Object.keys(emptyLinks).every(key=>fields[key]===null || (typeof fields[key]==='string' && fields[key].startsWith('https://')));
}
export function useServiceLinks() {
 const [links,setLinks] = useState(emptyLinks);
 useEffect(()=>{let active=true;fetch('/service-links.json').then(r=>r.ok?r.json():null).then(data=>{if(active&&isServiceLinks(data))setLinks(data);}).catch(()=>{});return()=>{active=false;};},[]);
 return links;
}
