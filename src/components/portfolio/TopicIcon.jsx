import React from 'react';

// Small decorative line drawings; only their meaningful details move.
export default function TopicIcon({type}){
 const drawings={
  devops:<><path className="icon-devops-base" d="M12 12C9 8 7 6 5 7C1 8 1 16 5 17C7 18 9 16 12 12C15 8 17 6 19 7C23 8 23 16 19 17C17 18 15 16 12 12Z"/><path className="icon-devops-flow" pathLength="100" d="M12 12C9 8 7 6 5 7C1 8 1 16 5 17C7 18 9 16 12 12C15 8 17 6 19 7C23 8 23 16 19 17C17 18 15 16 12 12Z"/></>,
  observability:<><path className="icon-trace-base" d="M2 13h4l3-8 5 15 3-9h5"/><path className="icon-trace" pathLength="100" d="M2 13h4l3-8 5 15 3-9h5"/></>,
  infrastructure:<><path d="M12 8v5M5 16v-3h14v3"/><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><circle className="icon-packet" cx="12" cy="9" r="1.4" fill="currentColor" stroke="none"/></>,
  saas:<><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M8 8v13"/><circle className="icon-status" cx="5" cy="5.5" r=".8" fill="currentColor" stroke="none"/><path className="icon-panel" d="M12 12h6M12 16h4"/></>,
  ai:<><rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 7V3M1 12v4M23 12v4M9 17h6"/><circle className="icon-thought" cx="12" cy="2" r="1.2"/><g className="icon-eyes"><path d="M8 11v2M16 11v2"/></g></>,
  maintenance:<><g className="icon-wrench"><path d="M14 3a5 5 0 0 0-6 6L2.8 15.7a2.4 2.4 0 0 0 3.5 3.5L13 14a5 5 0 0 0 6-6l-3 3-3-3 3-3Z"/></g><path className="icon-support" d="M19 16v5M16.5 18.5h5"/></>,
  interaction:<><circle className="icon-ripple" cx="8" cy="7" r="4"/><path className="icon-cursor" d="m8 7 11 6-5 1-1 5Z"/></>,
  performance:<><path d="M3 18a10 10 0 1 1 18 0M5 8l2 1M12 3v3M19 8l-2 1"/><path className="icon-needle" d="m12 13 5-5"/><circle cx="12" cy="13" r="1.5"/><path d="M8 21h8"/></>
 };
 return <svg className={'topic-icon topic-icon-'+type} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[type]}</svg>;
}
