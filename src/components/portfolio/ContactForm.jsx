import React,{useEffect,useRef,useState} from 'react';
import {ArrowUpRight,Check,LoaderCircle,Send} from 'lucide-react';
import {profile} from './content/portfolio.js';
import {contactConfig} from './content/contact.js';
import {countries} from './content/countries.js';

const projectTypes=['Website Design','Website Redesign','Operations Support','Cloud Infrastructure','Observability & Monitoring','Automation & Agentic AI','Other'];
const pageCounts=['1 page','2–5 pages','6–10 pages','11+ pages','Not sure yet','Not applicable'];
const budgets=['$150–$500','$500–$1,000','$1,000–$2,000','$2,000–$3,000'];

const endpoint='https://api.web3forms.com/submit';
const captchaSiteKey='50b2fe65-b00b-4b9e-ad62-3ba471098be2'; // Web3Forms' documented free-plan site key.
let captchaLoader;
function loadCaptcha(){
 if(captchaLoader)return captchaLoader;
 captchaLoader=new Promise((resolve,reject)=>{
  const script=document.createElement('script');
  const fail=()=>{clearTimeout(timer);script.remove();captchaLoader=undefined;reject(new Error('Verification unavailable'));};
  const timer=setTimeout(fail,15000);
  window.portfolioCaptchaReady=()=>{clearTimeout(timer);resolve(window.hcaptcha);};
  script.src='https://js.hcaptcha.com/1/api.js?onload=portfolioCaptchaReady&render=explicit&recaptchacompat=off';
  script.async=true;script.defer=true;script.onerror=fail;document.head.appendChild(script);
 });
 return captchaLoader;
}

function Verification({onToken,resetCount}){
 const box=useRef(null),widget=useRef(null),callback=useRef(onToken);
 const [state,setState]=useState('loading'),[attempt,setAttempt]=useState(0),[size,setSize]=useState(null);
 callback.current=onToken;
 useEffect(()=>{const observer=new ResizeObserver(([entry])=>setSize(entry.contentRect.width<304?'compact':'normal'));observer.observe(box.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{
  if(!size)return;
  let cancelled=false;setState('loading');
  loadCaptcha().then(api=>{
   if(cancelled)return;
   setState('ready');
   widget.current=api.render(box.current,{sitekey:captchaSiteKey,theme:'dark',size,
    callback:token=>callback.current(token),
    'expired-callback':()=>callback.current(''),
    'chalexpired-callback':()=>callback.current(''),
    'error-callback':()=>{callback.current('');setState('error');}
   });
  }).catch(()=>{if(!cancelled)setState('error');});
  return()=>{cancelled=true;callback.current('');if(widget.current!==null){window.hcaptcha?.remove?.(widget.current);widget.current=null;}};
 },[attempt,size]);
 useEffect(()=>{if(widget.current!==null)window.hcaptcha?.reset(widget.current);},[resetCount]);
 const localPreview=location.protocol==='file:'||['localhost','127.0.0.1','[::1]'].includes(location.hostname);
 return <div className="contact-verification">{localPreview&&<p>Message verification requires the hosted website. For this local preview, please use the LinkedIn link.</p>}<div ref={box}/>{state==='loading'&&<p role="status">Loading verification…</p>}{state==='error'&&<p role="alert">Verification couldn’t load. <button type="button" className="inline-link" onClick={()=>setAttempt(n=>n+1)}>Try again</button></p>}</div>;
}

export default function ContactForm({accessKey=contactConfig.accessKey}){
 const configured=Boolean(accessKey.trim()),[status,setStatus]=useState('idle'),[feedback,setFeedback]=useState('');
 const [started,setStarted]=useState(false),[token,setToken]=useState(''),[resetCount,setResetCount]=useState(0);
 const request=useRef(null),locked=useRef(false),mounted=useRef(true),statusBox=useRef(null);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;request.current?.abort();};},[]);
 useEffect(()=>{if(status==='success'||status==='error')statusBox.current?.focus({preventScroll:true});},[status]);
 async function submit(event){
  event.preventDefault();
  if(locked.current||!configured)return;
  const form=event.currentTarget,fields=new FormData(form);
  for(const name of ['name','message']){
   const field=form.elements.namedItem(name);
   field.setCustomValidity(String(fields.get(name)||'').trim()?'':'Please fill in this field.');
  }
  if(!form.reportValidity())return;
  if(fields.get('botcheck')){setStatus('error');setFeedback('Your message could not be sent. Please reload the page and try again.');return;}
  setStarted(true);
  if(!token){setStatus('error');setFeedback('Please complete the verification before sending your message.');return;}
  locked.current=true;setStatus('sending');setFeedback('Sending your message…');
  const controller=new AbortController();request.current=controller;
  const timeout=setTimeout(()=>controller.abort(),20000);
  const payload={access_key:accessKey.trim(),name:String(fields.get('name')).trim(),email:String(fields.get('email')).trim(),country:countries.find(country=>country.code===fields.get('country'))?.name||'',project_type:String(fields.get('project_type')||''),number_of_pages:String(fields.get('number_of_pages')||'Not specified'),budget_range:String(fields.get('budget_range')||'')+' USD',message:String(fields.get('message')).trim(),subject:'New portfolio enquiry',from_name:'Nirmal Chandrasiri · Portfolio','h-captcha-response':token};
  try{
   const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});
   const data=await response.json();
   if(!mounted.current)return;
   if(!response.ok||data.success!==true){
    setStatus('error');setFeedback(response.status===429?'The form is temporarily unavailable. Please try again later or contact me on LinkedIn.':'Your message could not be sent. Please try again, or contact me on LinkedIn.');
   }else{form.reset();setStatus('success');setFeedback('Thanks—your message has been sent. I’ll get back to you.');}
  }catch{
   if(mounted.current){setStatus('error');setFeedback('We couldn’t confirm that your message was sent. Please try again later or contact me on LinkedIn.');}
  }finally{
   clearTimeout(timeout);locked.current=false;request.current=null;
   if(mounted.current){setToken('');setResetCount(n=>n+1);}
  }
 }
 return <form className="contact-form" onSubmit={submit} aria-label="Send Nirmal a message" aria-busy={status==='sending'} onFocusCapture={()=>{if(configured)setStarted(true);}}>
  {!configured&&<p className="contact-notice" role="status">The contact form is being connected. Please <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">use LinkedIn</a> for now.</p>}
  <fieldset disabled={!configured||status==='sending'}><legend className="sr-only">Your contact details and message</legend>
   <div className="contact-field-pair"><div className="contact-field"><label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} onInput={e=>e.currentTarget.setCustomValidity('')}/></div><div className="contact-field"><label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254}/></div></div>
   <div className="contact-field"><label htmlFor="contact-country">Country <span aria-hidden="true">*</span></label><select id="contact-country" name="country" autoComplete="country" required defaultValue=""><option value="" disabled>Select your country</option>{countries.map(country=><option key={country.code} value={country.code}>{country.name}</option>)}</select></div>
   <div className="contact-field-pair">
    <div className="contact-field"><label htmlFor="contact-project">Project type <span aria-hidden="true">*</span></label><select id="contact-project" name="project_type" required defaultValue=""><option value="" disabled>Select a project type</option>{projectTypes.map(type=><option key={type}>{type}</option>)}</select></div>
    <div className="contact-field"><label htmlFor="contact-pages">Number of pages <span className="optional">Optional</span></label><select id="contact-pages" name="number_of_pages" defaultValue=""><option value="">Select if relevant</option>{pageCounts.map(count=><option key={count}>{count}</option>)}</select></div>
   </div>
   <fieldset className="contact-budget"><legend>Budget range <span aria-hidden="true">*</span> <span className="budget-currency">USD</span></legend><div className="contact-budget-options">{budgets.map((budget,index)=><label className="contact-budget-option" key={budget}><input type="radio" name="budget_range" value={budget} required={index===0}/><span>{budget}</span></label>)}</div></fieldset>
   <div className="contact-field"><label htmlFor="contact-message">What do you need help with? <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" placeholder="Tell me a little about it…" rows={5} required minLength={10} maxLength={5000} onInput={e=>e.currentTarget.setCustomValidity('')}/></div>
   <input className="contact-botcheck" type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
   {configured&&started&&<Verification onToken={setToken} resetCount={resetCount}/>}
   <button className="contact-submit" type="submit" disabled={!configured||status==='sending'}>{status==='sending'?<><LoaderCircle className="sending-spinner" size={16}/>Sending…</>:<>Send message <Send size={16}/></>}</button>
  </fieldset>
  <p ref={statusBox} tabIndex={-1} className={'contact-feedback '+status} role={status==='error'?'alert':'status'}>{status==='success'&&<Check size={16} aria-hidden="true"/>}{feedback}{status==='error'&&<a className="inline-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">Contact on LinkedIn <ArrowUpRight size={12}/></a>}</p>
 </form>;
}
