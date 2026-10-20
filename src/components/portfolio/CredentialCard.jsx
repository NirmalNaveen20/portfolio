import React from 'react';
import {ArrowUpRight} from 'lucide-react';
import useCardHover from './useCardHover';

export default function CredentialCard({credential,index}){
 const {card,canvas}=useCardHover(index);
 return <a ref={card} className="credential-card" href={credential.url} target="_blank" rel="noopener noreferrer" data-reveal style={{'--reveal-delay':`${index%4*60}ms`}}>
  <canvas ref={canvas} className="tool-particles" aria-hidden="true"/>
  <span className="tool-edge" aria-hidden="true"/>
  <div className="credential-art"><img src={credential.image} alt={`${credential.title} badge`} width="600" height="600" loading="lazy"/></div>
  <div><h3>{credential.title}</h3><span className="credential-verify">View credential <ArrowUpRight size={13}/></span></div>
 </a>;
}
