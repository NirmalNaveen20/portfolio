'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {Check,Copy} from 'lucide-react';
export default function CodeSnippet({children,text,language}: {children:ReactNode;text:string;language:string}) {
  const [status,setStatus]=useState('');
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  async function copy() {
    try {await navigator.clipboard.writeText(text);setStatus('Copied');}
    catch {setStatus('Select and copy the code manually.');}
    if(timer.current)clearTimeout(timer.current);
    timer.current=setTimeout(()=>setStatus(''),2500);
  }
  return <div className="journal-code"><div className="journal-code-bar"><span>{language}</span><button type="button" onClick={copy} aria-label={`Copy ${language} code`}>{status==='Copied'?<Check size={14}/>:<Copy size={14}/>} {status==='Copied'?'Copied':'Copy'}</button><span className="sr-only" role="status">{status}</span></div><pre tabIndex={0} aria-label={`${language} code example`}>{children}</pre></div>;
}
