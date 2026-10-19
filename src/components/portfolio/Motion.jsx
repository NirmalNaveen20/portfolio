import React, {useEffect,useRef} from 'react';
import TopicIcon from './TopicIcon.jsx';

export function useScrollMotion(paused){
 useEffect(()=>{
  const root=document.documentElement;let frame=0;
  const paint=()=>{frame=0;root.style.setProperty('--page-progress',String(scrollY/Math.max(1,root.scrollHeight-innerHeight)));root.style.setProperty('--hero-drift',paused?'0px':`${Math.min(scrollY,innerHeight)*.12}px`);};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  paint();addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
  return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);};
 },[paused]);
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.06,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('[data-reveal]').forEach(el=>{if(el.getBoundingClientRect().top>=innerHeight){el.classList.add('will-reveal');observer.observe(el);}});
  return()=>observer.disconnect();
 },[]);
}

export {default as HeroLight} from './HeroWaves.jsx';

const topics=[
 {label:'Cloud Operations',icon:'cloud'},
 {label:'Observability',icon:'observability'},
 {label:'Cloud Infrastructure',icon:'infrastructure'},
 {label:'SaaS Operations',icon:'saas'},
 {label:'Agentic AI',icon:'ai'},
 {label:'Maintenance & Ongoing Support',icon:'maintenance'},
 {label:'Motion & Interaction Design',icon:'interaction'},
 {label:'Performance Optimization',icon:'performance'}
];

// One continuous line. The second copy closes the loop and is hidden from screen readers.
export function OperationsMotion(){
 const section=useRef(null);
 useEffect(()=>{
  const el=section.current;let visible=false;
  const sync=()=>el.classList.toggle('in-view',visible&&!document.hidden);
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});observer.observe(el);
  const resize=new ResizeObserver(([entry])=>el.style.setProperty('--marquee-duration',`${Math.max(38,entry.target.getBoundingClientRect().width/42)}s`));resize.observe(el.querySelector('.operations-set'));
  document.addEventListener('visibilitychange',sync);
  return()=>{observer.disconnect();resize.disconnect();document.removeEventListener('visibilitychange',sync);};
 },[]);
 return <div className="operations-section" ref={section}><div className="operations-window"><div className="operations-track">{[0,1].map(copy=><ul className="operations-set" key={copy} aria-label={copy===0?'Cloud and technology interests':undefined} aria-hidden={copy===1?true:undefined}>{topics.map(({label,icon})=><li className="operations-topic" key={label}><TopicIcon type={icon}/><span>{label}</span><span className="operations-divider" aria-hidden="true">·</span></li>)}</ul>)}</div></div></div>;
}
