"use client";
import React,{useEffect,useState,useRef} from 'react';
import {ArrowUpRight,ArrowDown,ArrowUp,Download,Menu,X,Plus,Minus} from 'lucide-react';
import {profile,career,skills} from './content/portfolio.js';
import extras from './content/extras.json';
import {HeroLight,OperationsMotion,useScrollMotion} from './Motion.jsx';
import ToolCard from './ToolCard.jsx';
import CredentialCard from './CredentialCard.jsx';
import ContactForm from './ContactForm.jsx';
const external={target:'_blank',rel:'noopener noreferrer'};
function CVLink({className='button'}){return profile.resume?<a className={className} href={profile.resume} {...external}>Download CV <Download size={15}/></a>:<button type="button" className={`${className} cv-unavailable`} disabled title="CV link will be added soon">Download CV <Download size={15}/></button>}
function Tags({items}){return <div className="tags">{items.map(item=><span key={item}>{item}</span>)}</div>}

function Header(){
 const [open,setOpen]=useState(false),[active,setActive]=useState('');
 const toggle=useRef(null);
 useEffect(()=>{const escape=e=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus();}};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[open]);
 useEffect(()=>{const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main > section[id]').forEach(el=>observer.observe(el));return()=>observer.disconnect();},[]);
 return <header className="site-header"><div className="header-inner wrap">
  <a className="brand" href="#top" title="Back to top"><span className="monogram" aria-hidden="true">n<span>.</span></span><span>Nirmal Chandrasiri</span></a>
  <nav id="main-navigation" aria-label="Main navigation" className={open?'open':''}>{[['About','about'],['Journey','journey'],['Blog','blog'],['Credentials','credentials']].map(([label,id])=><a href={'#'+id} key={id} aria-current={active===id?'location':undefined} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
  <div className="header-actions"><a className="header-connect" href="#contact" onClick={()=>setOpen(false)}>Let’s Connect</a><button ref={toggle} className="icon-button menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div>
 </div><div className="page-progress"/></header>;
}

function Hero(){return <section className="hero" id="top">
 <HeroLight/>
 <div className="hero-copy wrap"><h1>Hello there.<br/><span>I’m Nirmal.</span></h1><p className="hero-description">I work with cloud infrastructure, automation, and observability to keep systems reliable and services running.</p><div className="hero-actions"><a className="button primary" href="#contact">Get in touch <ArrowUpRight size={16}/></a><CVLink/></div><a className="scroll-cue" href="#about"><ArrowDown size={14}/> More about me</a></div>
 </section>}

function About(){return <section className="about section wrap" id="about">
 <figure className="about-image" data-reveal><img src={profile.portrait} alt="Nirmal Chandrasiri" width="837" height="912" loading="lazy"/></figure>
 <div className="about-copy" data-reveal><h2>About me</h2>{profile.bio.map(p=><p key={p}>{p}</p>)}<CVLink className="text-link"/></div>
 </section>}

function Journey(){const [expanded,setExpanded]=useState(0);return <section className="journey section wrap" id="journey">
 <div className="section-heading" data-reveal><h2>Journey</h2><span className="section-note">Experience</span></div>
 <div className="timeline">{career.map((job,i)=><article className={'career-row '+(expanded===i?'expanded':'')} key={job.company} data-reveal style={{'--reveal-delay':`${i*55}ms`}}>
  <div className="career-header"><a className={'company-logo company-'+job.company.toLowerCase().replaceAll(' ','-')} href={job.url} {...external} aria-label={`${job.company} website`}><img src={job.logo} alt="" width="64" height="64" loading="lazy"/></a><div className="career-identity"><div className="career-company"><a href={job.url} {...external}>{job.company}</a>{job.current&&<span className="current-tag">Current</span>}</div><span className="career-role">{job.role}</span></div><span className="career-period">{job.period}</span><button className="career-toggle icon-button" aria-label={`${expanded===i?'Hide':'Show'} ${job.company} details`} aria-expanded={expanded===i} aria-controls={`career-${i}`} onClick={()=>setExpanded(expanded===i?null:i)}>{expanded===i?<Minus size={18}/>:<Plus size={18}/>}</button></div>
  <div id={`career-${i}`} hidden={expanded!==i} className="career-details">{job.employer&&<p className="employer">{job.employer}</p>}{job.team&&<h3 className="career-team">— {job.team} —</h3>}<ul>{job.responsibilities.map(r=><li key={r}>{r}</li>)}</ul><Tags items={job.technologies}/></div>
 </article>)}</div>
 </section>}

function Education(){return <section className="education-section section wrap" id="education"><div className="section-heading" data-reveal><h2>Education</h2></div><div className="education-record" data-reveal><a className="education-icon" href={profile.education.url} {...external} aria-label="SLIIT website"><img src="/assets/companies/sliit-original.png" alt="SLIIT" width="72" height="90" loading="lazy"/></a><div><h3><a href={profile.education.url} {...external}>{profile.education.school}</a></h3><p>{profile.education.degree}</p></div><span className="education-date">{profile.education.date}</span></div></section>}

function Skills(){return <section className="skills section wrap" id="skills"><div className="section-heading" data-reveal><h2>Favorite tools</h2><span className="section-note">Cloud, automation & observability</span></div><div className="tools-grid">{skills.map((skill,i)=><ToolCard skill={skill} index={i} key={skill.name}/>)}</div></section>}

function Credentials(){return <section className="credentials section wrap" id="credentials"><div className="section-heading" data-reveal><div><p className="kicker">KNOWLEDGE CREDENTIALS</p><h2>Certifications</h2></div></div><div className="credential-grid">{extras.credentials.map((credential,i)=><CredentialCard credential={credential} index={i} key={credential.title}/>)}</div></section>}

function Blog(){const logos=['datadog','kubernetes','terraform','linux'];return <section className="blog section wrap" id="blog"><div className="section-heading" data-reveal><h2>Blog</h2></div><div className="blog-grid">{extras.blog.articles.map((article,i)=><a className="blog-card" key={article.url} href={article.url} data-reveal style={{'--reveal-delay':`${i%2*70}ms`}}><div className={'blog-visual blog-visual-'+logos[i]} aria-hidden="true"><div className="blog-grid-pattern"/><img src={skills.find(skill=>skill.name.toLowerCase()===logos[i]).logo} alt="" width="72" height="72" loading="lazy"/><span>{article.tags[0]}</span><ArrowUpRight size={21}/></div><div className="blog-meta"><span>{article.date}</span><span>{article.tags[1]}</span></div><h3>{article.title}</h3><p>{article.summary}</p></a>)}</div></section>}

function Contact(){return <section className="contact section wrap" id="contact"><div className="contact-inner" data-reveal><div className="contact-intro"><p className="kicker">CONTACT</p><h2>Let’s connect.</h2><p>Have an opportunity, a project, or a question? Send me a message.</p></div><ContactForm/></div></section>}

function Footer(){return <footer className="site-footer wrap"><a className="monogram" href="#top" aria-label="n. Back to top">n<span>.</span></a><div className="footer-center"><div className="social-links">{extras.socials.map(s=><a key={s.label} href={s.url} {...(s.url.startsWith('#')?{}:external)} aria-label={s.label} title={s.label}><img src={s.icon} alt="" width="18" height="18"/></a>)}</div><p>© 2026 Nirmal Chandrasiri. All rights reserved.</p></div><a className="back-top" href="#top" aria-label="Back to top"><ArrowUp size={17}/></a></footer>}

export default function Portfolio(){const [reduced,setReduced]=useState(false);useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);useEffect(()=>{document.documentElement.dataset.motion=reduced?'paused':'running';return()=>{delete document.documentElement.dataset.motion;};},[reduced]);useScrollMotion(reduced);return <div className="portfolio-page"><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main"><Hero/><About/><Journey/><Education/><Skills/><Credentials/><Blog/><OperationsMotion/><Contact/></main><Footer/></div>}
