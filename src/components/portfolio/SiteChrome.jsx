"use client";
import React,{useEffect,useState,useRef} from "react";

import {useTheme} from '@/hooks/useTheme';
import {usePathname} from 'next/navigation';
import {Activity, ArrowUp, Bot, Cloud, Layers, Moon, Network, Sun, Workflow} from "lucide-react";
import extras from "./content/extras.json";
const external={target:"_blank",rel:"noopener noreferrer"};
const navigation = [
 {label:'About', section:'about'},
 {label:'Services', section:'services'},
 {label:'Experience', section:'journey', page:'/work'},
 {label:'Blog', section:'blog', page:'/blog'},
 {label:'Credentials', section:'credentials'},
];
const footerTopics = [
 {label:'Agentic AI', Icon:Bot},
 {label:'SaaS', Icon:Layers},
 {label:'Cloud', Icon:Cloud},
 {label:'SRE', Icon:Activity},
 {label:'Architecture', Icon:Network},
 {label:'Automation', Icon:Workflow},
];
export function Header({inner=false}){
 const pathname=usePathname();
 const [open,setOpen]=useState(false),[active,setActive]=useState(''),[mobile,setMobile]=useState(false);
 const toggle=useRef(null);
 const [theme,setTheme]=useTheme();
 const themeAction=theme==="dark"?"Switch to light mode":"Switch to dark mode";
 const [compact,setCompact]=useState(false);
 useEffect(()=>{
  const sync=()=>setCompact(window.scrollY>100);
  sync();
  window.addEventListener('scroll',sync,{passive:true});
  return ()=>window.removeEventListener('scroll',sync);
 },[]);
 const collapsed=compact&&!open;
 useEffect(()=>{const query=window.matchMedia('(max-width:900px)');const sync=()=>{setMobile(query.matches);if(!query.matches)setOpen(false);};sync();query.addEventListener('change',sync);return()=>query.removeEventListener('change',sync);},[]);
 useEffect(()=>{const escape=e=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus();}};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[open]);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main > section[id]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
 return <header className={`site-header ${collapsed?"compact-header":""} ${open?"menu-open":""}`}><div className="header-inner wrap">
  <a className="brand" href={inner?"/":"#top"} title="Back to home"><img className="nav-avatar" src="/assets/nirmal-professional-avatar.webp" width="36" height="36" alt=""/><span>Nirmal Chandrasiri</span></a>
  <nav id="main-navigation" aria-label="Main navigation" className={open?'open':''} inert={collapsed||(mobile&&!open)}>
   {navigation.map(({label, section, page})=>{
    const href=inner ? (page ?? `/#${section}`) : `#${section}`;
    const current=inner ? (pathname===href ? 'page' : undefined) : (active===section ? 'location' : undefined);
    return <a href={href} key={section} aria-current={current} onClick={()=>setOpen(false)}>{label}</a>;
   })}
  </nav>
  <div className="header-actions">
   <button type="button" className="theme-switch" aria-label={themeAction} title={themeAction}
    onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
    {theme==='dark'?<Sun size={17} aria-hidden="true"/>:<Moon size={17} aria-hidden="true"/>}
   </button>
   <a className="header-connect" href={inner?"/#contact":"#contact"} onClick={()=>setOpen(false)}>Let’s Connect</a><button ref={toggle} className={`icon-button menu-toggle ${compact?"compact-toggle":""}`} aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(value=>!value)}><span className="menu-dots" aria-hidden="true"><i/><i/><i/></span><span className="menu-glyph" aria-hidden="true"><span/><span/><span/></span></button></div>
 </div><div className="page-progress"/></header>;
}

export function Footer() {
 const bandRef=useRef(null);
 useEffect(()=>{
  const band=bandRef.current;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  function paint(){
   frame=0;
   const distance=window.innerHeight-band.getBoundingClientRect().top;
   // The footer can only travel as far as the bottom of the document.
   const available=Math.max(1,Math.min(window.innerHeight,document.documentElement.scrollHeight-window.scrollY-band.getBoundingClientRect().top));
   const progress=Math.max(0,Math.min(1,distance/available));
   band.style.setProperty('--stripe-scale',String(0.58+progress*0.62));
  }
  function schedule(){
   if(!frame) frame=requestAnimationFrame(paint);
  }
  function stop(){
   window.removeEventListener('scroll',schedule);
   window.removeEventListener('resize',schedule);
   cancelAnimationFrame(frame);
   frame=0;
  }
  let visible=false;
  function sync(){
   stop();
   if(visible && !motion.matches){
    schedule();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
   }
  }
  const observer=new IntersectionObserver(([entry])=>{
   visible=entry.isIntersecting;
   band.dataset.footerVisible=String(visible);
   sync();
  });
  observer.observe(band);
  motion.addEventListener('change',sync);
  return ()=>{
   stop();
   observer.disconnect();
   motion.removeEventListener('change',sync);
  };
 },[]);

 return <footer ref={bandRef} id="engineering-focus" className="closing experience-divider">
  <div className="footer-band"><div className="wrap">
   <div className="footer-profile">
    <p>Technology that makes knowledge more accessible and ideas easier to act on.</p>
    <ul className="footer-topics" aria-label="Technology interests" role="list">
     {footerTopics.map(({label, Icon}, index) => (
      <li key={label} style={{'--topic-order':index}}>
       <Icon size={16} strokeWidth={1.65} aria-hidden="true" focusable="false"/>
       {label}
      </li>
     ))}
    </ul>
   </div>
  <div className="closing-socials profile-socials">{extras.socials.map(s=><a key={s.label} href={s.url} {...external} aria-label={s.label}><img src={s.icon} alt=""/></a>)}</div>
  <div className="closing-bottom">
   <small>© 2026 Nirmal Chandrasiri. All rights reserved.</small>
   <a className="footer-top" href="#top" aria-label="Back to top" title="Back to top">
    <ArrowUp size={17} strokeWidth={1.5} aria-hidden="true"/>
   </a>
  </div>
 </div></div></footer>;
}
