import React from 'react';
import useCardHover from './useCardHover';

export default function ToolCard({skill,index}){
 const {card,canvas}=useCardHover(index);
 return <article ref={card} className={'tool-card '+(skill.name==='ServiceNow'?'tool-servicenow':'')} data-reveal style={{'--reveal-delay':`${index%7*35}ms`}}><canvas ref={canvas} className="tool-particles" aria-hidden="true"/><span className="tool-edge" aria-hidden="true"/><img src={skill.logo} alt="" loading="lazy" width="40" height="40"/><h3>{skill.name}</h3></article>;
}
