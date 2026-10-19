import React,{useEffect,useRef} from 'react';

// Each canvas runs only while its card is hovered. Pointer positions are local;
// no document-wide cursor listeners or continuous background canvas loops.
export default function ToolCard({skill,index}){
 const card=useRef(null),canvas=useRef(null);
 useEffect(()=>{
  const el=card.current,screen=canvas.current,ctx=screen.getContext('2d');
  if(!ctx)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,active=false,width=0,height=0,point={x:0,y:0};
  const resize=()=>{width=el.clientWidth;height=el.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);screen.width=Math.round(width*dpr);screen.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);};
  const draw=time=>{
   ctx.clearRect(0,0,width,height);
   const phase=time*.001;
   for(let y=5;y<height;y+=6)for(let x=5;x<width;x+=6){
    const hash=Math.sin(x*12.9898+y*78.233+index)*43758.5453;
    const seed=hash-Math.floor(hash),distance=Math.hypot(x-point.x,y-point.y);
    const near=Math.max(0,1-distance/150),wave=(Math.sin(x*.055-y*.035+phase*2.3)+1)/2;
    const blue=seed>.72;
    ctx.fillStyle=blue?`rgba(0,153,255,${.12+wave*.38+near*.25})`:`rgba(175,191,205,${.08+seed*.2+near*.15})`;
    ctx.fillRect(x,y,1.2,seed>.965?2.8:1.2);
   }
   // Fine moving traces follow grid lanes near the pointer.
   for(let n=0;n<4;n++){
    const x=(point.x+Math.sin(n*1.7)*70+width)%width;
    const y=Math.round((point.y+(n-1.5)*30)/6)*6+5;
    const start=(x+phase*(18+n*4))%width;
    const gradient=ctx.createLinearGradient(start-18,0,start+2,0);
    gradient.addColorStop(0,'#0099ff00');gradient.addColorStop(1,'#7acaff');
    ctx.fillStyle=gradient;ctx.fillRect(start-18,y,20,1);
   }
   if(active&&!reduced.matches&&!document.hidden)frame=requestAnimationFrame(draw);
  };
  const stop=()=>{active=false;cancelAnimationFrame(frame);frame=0;el.classList.remove('tool-active');ctx.clearRect(0,0,width,height);};
  const move=e=>{const rect=el.getBoundingClientRect();point={x:e.clientX-rect.left,y:e.clientY-rect.top};el.style.setProperty('--pointer-angle',`${Math.atan2(point.y-height/2,point.x-width/2)*180/Math.PI+90}deg`);};
  const start=e=>{if(e.pointerType==='touch'||reduced.matches)return;resize();move(e);active=true;el.classList.add('tool-active');cancelAnimationFrame(frame);frame=requestAnimationFrame(draw);};
  const visibility=()=>{if(document.hidden)stop();};
  const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)stop();});observer.observe(el);
  el.addEventListener('pointerenter',start);el.addEventListener('pointermove',move);el.addEventListener('pointerleave',stop);el.addEventListener('pointercancel',stop);
  reduced.addEventListener('change',stop);document.addEventListener('visibilitychange',visibility);
  return()=>{stop();observer.disconnect();el.removeEventListener('pointerenter',start);el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',stop);el.removeEventListener('pointercancel',stop);reduced.removeEventListener('change',stop);document.removeEventListener('visibilitychange',visibility);};
 },[index]);
 return <article ref={card} className={'tool-card '+(skill.name==='ServiceNow'?'tool-servicenow':'')} data-reveal style={{'--reveal-delay':`${index%7*35}ms`}}><canvas ref={canvas} className="tool-particles" aria-hidden="true"/><span className="tool-edge" aria-hidden="true"/><img src={skill.logo} alt="" loading="lazy" width="40" height="40"/><h3>{skill.name}</h3></article>;
}
