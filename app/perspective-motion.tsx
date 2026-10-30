'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Search, SlidersHorizontal, Monitor, Smartphone } from 'lucide-react';
import { PlatformPreview } from './home-hero';

export function PerspectiveMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      element.querySelectorAll<HTMLElement>('[data-scene]').forEach(scene => {
        const rect = scene.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight));
        scene.style.setProperty('--progress', preference.matches ? '0' : String(progress));
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); preference.removeEventListener('change', schedule); };
  }, []);
  return <div ref={root} className="perspective-experience">{children}</div>;
}

export function IllustrationChart({ id = 'perspective' }: { id?: string }) {
  return <svg className="perspective-chart" viewBox="0 0 440 180" role="img" aria-label="Illustrative chart, not market prices"><defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#f41118" stopOpacity=".28"/><stop offset="1" stopColor="#f41118" stopOpacity="0"/></linearGradient></defs><path d="M0 151L18 145L31 153L46 130L62 136L80 118L99 130L118 112L132 122L148 86L168 97L180 75L202 89L219 68L237 92L253 82L270 63L283 76L301 49L320 61L337 34L354 48L374 28L391 41L410 19L440 25V180H0Z" fill={`url(#${id})`}/><path d="M0 151L18 145L31 153L46 130L62 136L80 118L99 130L118 112L132 122L148 86L168 97L180 75L202 89L219 68L237 92L253 82L270 63L283 76L301 49L320 61L337 34L354 48L374 28L391 41L410 19L440 25" fill="none" stroke="#f41118" strokeWidth="3" strokeLinejoin="round"/></svg>;
}

export function TradingStage() {
  const stage = useRef<HTMLDivElement>(null);
  const pointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    stage.current?.style.setProperty('--pointer-x', `${((event.clientX - rect.left) / rect.width - .5) * 10}deg`);
    stage.current?.style.setProperty('--pointer-y', `${-((event.clientY - rect.top) / rect.height - .5) * 8}deg`);
  };
  return <div className="perspective-stage" ref={stage} onPointerMove={pointer} onPointerLeave={() => { stage.current?.style.setProperty('--pointer-x','0deg'); stage.current?.style.setProperty('--pointer-y','0deg'); }}>
    <div className="stage-plane stage-watch"><div className="stage-top"><img src="/brand/invest-logo-reversed.svg" alt="Invest.to" width="125" height="30"/><span>Interface concept</span></div><div className="stage-search"><Search size={18}/><span>Find your market</span></div><h3>A world in view.</h3><div className="stage-assets">{[['Au','Gold','Precious metal'],['FX','EUR / USD','Forex'],['IX','Global indices','Indices']].map(([code,name,type]) => <a key={code} href={code==='Au'?'/markets/commodities':code==='FX'?'/markets/forex':'/markets/indices'}><span>{code}</span><div><strong>{name}</strong><small>{type}</small></div><ArrowRight size={16}/></a>)}</div></div>
    <div className="stage-plane stage-chart"><div className="stage-card-title"><span>Gold / US dollar</span><SlidersHorizontal size={17}/></div><h3>See the movement.</h3><IllustrationChart/><div className="stage-chart-footer"><span>Price movement</span><span>Illustration</span></div></div>
    <div className="stage-plane stage-risk"><span className="stage-check"><Check size={20}/></span><div><strong>Perspective before position.</strong><span>Understand your exposure.</span></div></div>
    <span className="stage-caption">Illustrative interface and chart.</span>
  </div>;
}

export function DeviceStage() {
  const [device, setDevice] = useState('desktop');
  return <><div className="device-scene" data-device={device}><div className="perspective-desktop"><div className="desktop-toolbar"><img src="/brand/invest-logo-reversed.svg" alt="Invest.to" width="110" height="26"/><span>Workspace concept</span></div><div className="desktop-body"><aside><span>Market watch</span><strong>Forex</strong><strong>Metals</strong><strong>Indices</strong><strong>Stock CFDs</strong></aside><div><p>Gold / US dollar</p><h3>Your market. In focus.</h3><IllustrationChart id="desktop-chart"/><small>Illustrative price movement</small></div></div></div><div className="perspective-phone"><PlatformPreview compact/></div></div><div className="perspective-device-tabs" role="group" aria-label="Choose a device view"><button aria-pressed={device==='desktop'} onClick={() => setDevice('desktop')}><Monitor size={17}/>Desktop</button><button aria-pressed={device==='mobile'} onClick={() => setDevice('mobile')}><Smartphone size={17}/>Mobile</button></div></>;
}

export function RiskPreview() {
  const [enabled, setEnabled] = useState(true);
  return <div className="perspective-risk-preview"><div className="risk-preview-top"><span>Plan the position</span><span>Learning concept</span></div><h3>Risk controls.<br/>Before the trade.</h3><div className="risk-preview-switch"><span>Stop-loss illustration</span><button role="switch" aria-checked={enabled} aria-label="Show stop-loss illustration" onClick={() => setEnabled(!enabled)}><span/></button></div><div className="risk-preview-chart"><IllustrationChart id="risk-chart"/>{enabled && <div className="risk-stop-line"><span>Planned exit level</span></div>}</div><p aria-live="polite">{enabled?'A stop-loss requests an exit at a chosen level. The execution price may differ.':'Without a stop-loss, the position has no pre-set exit instruction.'}</p><a href="/academy/leverage-and-margin">Understand the limitations <ArrowRight size={16}/></a></div>;
}

export function MarketGlobe() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: true });
    if (!canvas || !gl) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const controller = new AbortController();
    let disposed = false, frame = 0, visible = true, angle = -.45, previous = 0, pointer = 0;
    const shaders: WebGLShader[] = [];
    const shader = (type: number, source: string) => {
      const value = gl.createShader(type)!; gl.shaderSource(value, source); gl.compileShader(value); shaders.push(value); return value;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, shader(gl.VERTEX_SHADER, `attribute vec3 position; attribute float land; uniform float yaw; uniform float aspect; uniform float pixel; varying float bright; varying float kind; void main(){float c=cos(yaw),s=sin(yaw);vec3 p=vec3(position.x*c+position.z*s,position.y,-position.x*s+position.z*c);float t=-.18; p=vec3(p.x,p.y*cos(t)-p.z*sin(t),p.y*sin(t)+p.z*cos(t));float scale=2.7/(3.1-p.z);gl_Position=vec4(p.x*scale/aspect,p.y*scale,0.,1.);gl_PointSize=(land>.5?2.3:1.05)*pixel*scale;bright=smoothstep(-.05,.7,p.z);kind=land;}`));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, `precision mediump float;varying float bright;varying float kind;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;vec3 color=mix(vec3(.48,.40,.43),vec3(.98,.32,.37),kind);color=mix(color,vec3(.96,.87,.89),bright*.7*kind);gl_FragColor=vec4(color,(.06+.94*bright)*(kind>.5?1.:.35));}`));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return; }
    const buffer = gl.createBuffer()!;
    const yaw = gl.getUniformLocation(program,'yaw'), aspect = gl.getUniformLocation(program,'aspect'), pixel = gl.getUniformLocation(program,'pixel');
    let count = 0;
    const render = () => {
      const ratio = Math.min(devicePixelRatio,2), width = canvas.clientWidth, height = canvas.clientHeight;
      if (!width || !height || !count) return;
      if (canvas.width !== width*ratio || canvas.height !== height*ratio) { canvas.width=width*ratio; canvas.height=height*ratio; }
      gl.viewport(0,0,canvas.width,canvas.height); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(program); gl.uniform1f(yaw,angle+pointer); gl.uniform1f(aspect,width/height); gl.uniform1f(pixel,ratio); gl.drawArrays(gl.POINTS,0,count);
    };
    const tick = (time: number) => { frame=0; if(disposed || !visible || document.hidden) return; if(previous) angle += Math.min(time-previous,50)*.000045; previous=time; render(); if(!preference.matches) frame=requestAnimationFrame(tick); };
    const start = () => { cancelAnimationFrame(frame); previous=0; render(); if(visible && !document.hidden && !preference.matches) frame=requestAnimationFrame(tick); };
    const observe = new IntersectionObserver(([entry]) => { visible=entry.isIntersecting; start(); }); observe.observe(canvas);
    const resize = new ResizeObserver(() => render()); resize.observe(canvas);
    const move = (event: PointerEvent) => { if(preference.matches || event.pointerType!=='mouse') return; const rect=canvas.getBoundingClientRect();pointer=((event.clientX-rect.left)/rect.width-.5)*.4;render(); };
    canvas.addEventListener('pointermove',move); document.addEventListener('visibilitychange',start); preference.addEventListener('change',start);
    fetch('/brand/globe-land.json',{signal:controller.signal}).then(response => { if(!response.ok) throw new Error('Globe data unavailable');return response.json(); }).then((data:unknown) => {
      if (!Array.isArray(data) || !data.every(value => typeof value === 'number') || data.length % 3) return;
      const points = data as number[];
      if(disposed) return;
      const vertices:number[]=[];
      for(let i=0;i<points.length;i+=3) vertices.push(points[i],points[i+1],points[i+2],1);
      for(let lat=-75;lat<=75;lat+=15) for(let lon=-180;lon<180;lon+=3){const a=lon*Math.PI/180,b=lat*Math.PI/180;vertices.push(Math.cos(b)*Math.sin(a),Math.sin(b),Math.cos(b)*Math.cos(a),0);}
      for(let lon=-180;lon<180;lon+=30) for(let lat=-87;lat<90;lat+=3){const a=lon*Math.PI/180,b=lat*Math.PI/180;vertices.push(Math.cos(b)*Math.sin(a),Math.sin(b),Math.cos(b)*Math.cos(a),0);}
      count=vertices.length/4;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(program,'position'),land=gl.getAttribLocation(program,'land');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,3,gl.FLOAT,false,16,0);gl.enableVertexAttribArray(land);gl.vertexAttribPointer(land,1,gl.FLOAT,false,16,12);
      gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);setReady(true);start();
    }).catch(() => {});
    return () => {disposed=true;controller.abort();cancelAnimationFrame(frame);observe.disconnect();resize.disconnect();canvas.removeEventListener('pointermove',move);document.removeEventListener('visibilitychange',start);preference.removeEventListener('change',start);gl.deleteBuffer(buffer);shaders.forEach(s => gl.deleteShader(s));gl.deleteProgram(program);};
  }, []);
  return <div className="perspective-globe" aria-label="An animated 3D globe representing global financial markets"><div className="globe-atmosphere"/><canvas ref={ref} aria-hidden="true"/>{!ready && <div className="globe-fallback"><img src="/brand/invest-market-atlas.webp" alt="Global market illustration"/></div>}<div className="globe-annotation"><span/>One world. Many perspectives.</div></div>;
}
