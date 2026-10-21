"use client";
import React,{useEffect,useState,useRef} from "react";
import {ArrowUp} from "lucide-react";
import extras from "./content/extras.json";
const external={target:"_blank",rel:"noopener noreferrer"};
export function Header({inner=false}){
 const [open,setOpen]=useState(false),[active,setActive]=useState(''),[mobile,setMobile]=useState(false);
 const toggle=useRef(null);
 useEffect(()=>{const query=window.matchMedia('(max-width:900px)');const sync=()=>{setMobile(query.matches);if(!query.matches)setOpen(false);};sync();query.addEventListener('change',sync);return()=>query.removeEventListener('change',sync);},[]);
 useEffect(()=>{const escape=e=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus();}};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[open]);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main > section[id]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
 return <header className="site-header"><div className="header-inner wrap">
  <a className="brand" href={inner?"/":"#top"} title="Back to home"><span className="monogram" aria-hidden="true">n<span>.</span></span><span>Nirmal Chandrasiri</span></a>
  <nav id="main-navigation" aria-label="Main navigation" className={open?'open':''} inert={mobile&&!open}>{[['About','about'],['Journey','journey'],['Blog','blog'],['Credentials','credentials']].map(([label,id])=><a href={inner?(id==='blog'?'/blog':'/#'+id):'#'+id} key={id} aria-current={inner&&id==='blog'?'page':active===id?'location':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
  <div className="header-actions"><a className="header-connect" href={inner?"/#contact":"#contact"} onClick={()=>setOpen(false)}>Let’s Connect</a><button ref={toggle} className="icon-button menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(value=>!value)}><span className="menu-glyph" aria-hidden="true"><span/><span/><span/></span></button></div>
 </div><div className="page-progress"/></header>;
}

export function Footer(){return <footer className="site-footer wrap"><a className="monogram" href="#top" aria-label="n. Back to top">n<span>.</span></a><div className="footer-center"><div className="social-links">{extras.socials.map(s=><a key={s.label} href={s.url} {...(s.url.startsWith('#')?{}:external)} aria-label={s.label} title={s.label}><img src={s.icon} alt="" width="18" height="18"/></a>)}</div><p>© 2026 Nirmal Chandrasiri. All rights reserved.</p></div><a className="back-top" href="#top" aria-label="Back to top"><ArrowUp size={17}/></a></footer>}
