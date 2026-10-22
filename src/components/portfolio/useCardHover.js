import {useEffect,useRef} from 'react';

// Hover on desktop; viewport-driven motion on touch screens.
export default function useCardHover(index){
 const card=useRef(null),canvas=useRef(null);
 useEffect(()=>{
  const el=card.current,screen=canvas.current,ctx=screen.getContext('2d');
  if(!ctx)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const touch=matchMedia('(hover: none), (pointer: coarse)');
  let frame=0,active=false,visible=false,hovered=false,focused=false,width=0,height=0,lastPaint=0,dots=[],point={x:0,y:0};
  const resize=()=>{
   width=el.clientWidth;height=el.clientHeight;
   const dpr=Math.min(devicePixelRatio||1,touch.matches?1.5:2);
   screen.width=Math.round(width*dpr);screen.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
   dots=[];
   const spacing=touch.matches?9:6;
   for(let y=5;y<height;y+=spacing)for(let x=5;x<width;x+=spacing){const hash=Math.sin(x*12.9898+y*78.233+index)*43758.5453;dots.push({x,y,seed:hash-Math.floor(hash)});}
  };
  const draw=time=>{
   if(!active)return;
   frame=requestAnimationFrame(draw);
   if(touch.matches&&time-lastPaint<1000/24)return;
   lastPaint=time;ctx.clearRect(0,0,width,height);
   const phase=time*.001;
   if(touch.matches)point={x:width*(.5+.22*Math.sin(phase*.35+index)),y:height*(.5+.2*Math.cos(phase*.3+index))};
   for(const {x,y,seed} of dots){
    const near=Math.max(0,1-Math.hypot(x-point.x,y-point.y)/150);
    const wave=(Math.sin(x*.055-y*.035+phase*(touch.matches?.85:2.3)+index)+1)/2;
    ctx.fillStyle=seed>.72?`rgba(0,153,255,${.12+wave*.38+near*.25})`:`rgba(175,191,205,${.08+seed*.2+near*.15})`;
    ctx.fillRect(x,y,1.2,seed>.965?2.8:1.2);
   }
  };
  const stop=()=>{active=false;cancelAnimationFrame(frame);frame=0;el.classList.remove('tool-active','touch-motion');ctx.clearRect(0,0,width,height);};
  const sync=()=>{
   if(reduced.matches||document.hidden||!visible||!(touch.matches||hovered||focused)){stop();return;}
   el.classList.toggle('touch-motion',touch.matches);
   if(active)return;
   resize();active=true;el.classList.add('tool-active');frame=requestAnimationFrame(draw);
  };
  const move=e=>{if(touch.matches||e.pointerType==='touch')return;const rect=el.getBoundingClientRect();point={x:e.clientX-rect.left,y:e.clientY-rect.top};el.style.setProperty('--pointer-angle',`${Math.atan2(point.y-height/2,point.x-width/2)*180/Math.PI+90}deg`);};
  const enter=e=>{if(e.pointerType==='touch')return;hovered=true;move(e);sync();};
  const leave=()=>{hovered=false;sync();};
  const focus=()=>{focused=true;point={x:width/2,y:height/2};sync();};
  const blur=()=>{focused=false;sync();};
  const preference=()=>{resize();el.style.removeProperty('--pointer-angle');sync();};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting&&entry.intersectionRatio>=.35;sync();},{threshold:[0,.35],rootMargin:'-70px 0px -30px 0px'});observer.observe(el);
  const sizeObserver=new ResizeObserver(resize);sizeObserver.observe(el);
  el.addEventListener('pointerenter',enter);el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);el.addEventListener('pointercancel',leave);el.addEventListener('focusin',focus);el.addEventListener('focusout',blur);
  reduced.addEventListener('change',preference);touch.addEventListener('change',preference);document.addEventListener('visibilitychange',sync);
  return()=>{stop();observer.disconnect();sizeObserver.disconnect();el.removeEventListener('pointerenter',enter);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);el.removeEventListener('pointercancel',leave);el.removeEventListener('focusin',focus);el.removeEventListener('focusout',blur);reduced.removeEventListener('change',preference);touch.removeEventListener('change',preference);document.removeEventListener('visibilitychange',sync);};
 },[index]);
 return {card,canvas};
}
