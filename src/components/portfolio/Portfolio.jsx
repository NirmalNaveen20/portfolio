"use client";
import React,{useEffect,useState} from 'react';
import {ArrowUpRight,Download} from 'lucide-react';
import {profile,career,skills} from './content/portfolio.js';
import extras from './content/extras.json';
import {HeroLight,OperationsMotion,useScrollMotion} from './Motion.jsx';
import Services from './Services';
import ToolCard from './ToolCard.jsx';
import CredentialCard from './CredentialCard.jsx';
import {Header,Footer} from './SiteChrome.jsx';
import BlogCard from '@/components/blog/BlogCard';
import ContactForm from './ContactForm.jsx';
const external={target:'_blank',rel:'noopener noreferrer'};


function Hero() {
 return (
  <section id="top" className="paper intro-panel live-intro">
   <HeroLight/>
   <div className="intro-layout wrap">
    <div className="intro-type">
     <p className="role-line">{profile.role}</p>
     <h1 aria-label="Hello! I’m Nirmal"><span className="hero-line"><b>Hello!</b></span><span className="hero-line"><b>I’m Nirmal</b></span></h1>
     <p className="intro-summary">Focused on reliable systems and simpler operations. Combining hands-on cloud experience with automation, observability, and a growing interest&nbsp;in&nbsp;AI.</p>

    </div>
    <div className="portrait-stage">
     <figure className="studio-card"><img src="/assets/nirmal-studio.webp" alt={profile.name} width="880" height="1100" fetchPriority="high"/></figure>
     <div className="portrait-code-rail" aria-hidden="true">
      {['</>', '{ }', '>_', '[ ]', '01'].map((symbol, index) => <span key={symbol} style={{'--symbol-index': index}}>{symbol}</span>)}
     </div>
    </div>
   </div>
  </section>
 );
}

function About() {
 return (
  <section id="about" className="paper biography">
   <div className="wrap bio-layout">
    <h2>About me</h2>
    <div className="bio-story">{profile.bio.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>
   </div>
  </section>
 );
}

function Journey(){const [expanded,setExpanded]=useState(null);return <section className="journey section wrap live-history" id="journey">
 <div className="section-heading" data-reveal><h2>Journey</h2><span className="section-note">Experience</span></div>
 <div className="timeline">{career.map((job,i)=><article className={'career-row '+(expanded===i?'expanded':'')} key={job.company} data-reveal style={{'--reveal-delay':`${i*55}ms`}}>
  <div className="journey-summary">
   <a className={'company-logo company-'+job.company.toLowerCase().replaceAll(' ','-')} href={job.url} {...external} aria-label={job.company}>
    <img src={job.logo} alt="" width="50" height="50" loading="lazy"/>
   </a>
   <div className="career-identity">
    <h3 className="role-heading"><button className="journey-trigger" type="button" aria-expanded={expanded===i} aria-controls={`career-${i}`} onClick={()=>setExpanded(expanded===i?null:i)}>{job.role}</button></h3>
    <a className="employer-name" href={job.url} {...external}>{job.company}</a>
   </div>
   <span className="career-period">{job.period}</span>
   <span className="journey-plus" aria-hidden="true"/>
  </div>
  <div id={`career-${i}`} className="career-panel" aria-hidden={expanded!==i} inert={expanded!==i}>
   <div className="career-panel-inner"><div className="career-details"><p>{job.description}</p></div></div>
  </div>
 </article>)}</div>
 <div className="work-links">
  <a className="journey-linkedin" href={profile.linkedin} {...external}>
   <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M4 2h2v2H4zm3 0h2v2H7zm3 0h3v3h-3zm1 4h2v2h-2zm0 3h2v2h-2zM8 5h2v2H8zM6 7h2v2H6zM4 9h2v2H4zm-2 2h2v2H2z"/>
   </svg>
   <span>Connect on LinkedIn</span>
  </a>
  <a role="link" aria-disabled="true"><Download size={16} aria-hidden="true"/>Download CV</a>
 </div>
 </section>}

function Education(){return <section className="education-section section wrap" id="education"><div className="section-heading" data-reveal><h2>Education</h2></div><div className="education-record" data-reveal><a className="education-icon" href={profile.education.url} {...external} aria-label="SLIIT website"><img src="/assets/companies/sliit-original.png" alt="SLIIT" width="72" height="90" loading="lazy"/></a><div><h3>{profile.education.degree}</h3><p><a href={profile.education.url} {...external}>{profile.education.school}</a></p></div><span className="education-date">{profile.education.date}</span></div></section>}

function Skills(){return <section className="skills section wrap" id="skills"><div className="section-heading" data-reveal><h2>Favorite tools</h2><span className="section-note">Cloud, automation & observability</span></div><div className="tools-grid">{skills.map((skill,i)=><ToolCard skill={skill} index={i} key={skill.name}/>)}</div></section>}

function Credentials(){return <section className="credentials section wrap" id="credentials"><div className="section-heading" data-reveal><div><p className="kicker">KNOWLEDGE CREDENTIALS</p><h2>Certifications</h2></div></div><div className="credential-grid">{extras.credentials.map((credential,i)=><CredentialCard credential={credential} index={i} key={credential.title}/>)}</div></section>}

function Blog({posts}){
 const [page,setPage]=useState(1);
 const pageSize=4,pageCount=Math.ceil(posts.length/pageSize);
 const visiblePosts=posts.slice((page-1)*pageSize,page*pageSize);
 function changePage(next){if(next===page)return;setPage(next);document.getElementById('blog')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
 return <section className="blog section wrap paper-journal" id="blog"><div className="section-heading"><h2>Blog</h2><a className="browse-articles" href="/blog">Browse articles <ArrowUpRight size={16}/></a></div><div className="journal-grid" id="home-blog-posts">{visiblePosts.map(post=><BlogCard key={post.slug} post={post}/>)}</div>{pageCount>1&&<nav className="blog-pagination" aria-label="Blog pages"><p aria-live="polite">Showing <strong>{(page-1)*pageSize+1}–{Math.min(page*pageSize,posts.length)}</strong> of <strong>{posts.length}</strong> articles</p><div className="blog-page-numbers">{Array.from({length:pageCount},(_,i)=>i+1).map(number=><button key={number} type="button" className="blog-page-number" aria-label={`Page ${number}`} aria-current={page===number?'page':undefined} aria-controls="home-blog-posts" onClick={()=>changePage(number)}>{number}</button>)}</div></nav>}</section>
}

function Contact(){return <section className="contact section wrap" id="contact"><div className="contact-inner" data-reveal><div className="contact-intro"><p className="kicker">CONTACT</p><h2 className="contact-headline" aria-label="Let’s build incredible work together.">
   <span aria-hidden="true">Let’s <span className="contact-verbs">
    {['build','create','design'].map(verb => <span key={verb}>{verb}</span>)}
   </span></span>
   <span aria-hidden="true">incredible work together.</span>
  </h2><p>Have an opportunity, a project, or a question? Send me a message.</p></div><ContactForm/></div></section>}


/** @param {{posts: import("@/lib/blog").Post[]}} props */
export default function Portfolio({posts}){const [reduced,setReduced]=useState(false);useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setReduced(media.matches);setReduced(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change);},[]);useEffect(()=>{document.documentElement.dataset.motion=reduced?'paused':'running';return()=>{delete document.documentElement.dataset.motion;};},[reduced]);useScrollMotion(reduced);return <div className="portfolio-page"><a href="#main" className="skip-link">Skip to content</a><Header/><main id="main"><Hero/><About/><Services/><Journey/><Education/><Skills/><Credentials/><Blog posts={posts}/><OperationsMotion/><Contact/></main><Footer/></div>}
