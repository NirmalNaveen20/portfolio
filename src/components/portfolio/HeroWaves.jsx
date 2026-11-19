import React, { useEffect, useRef } from 'react';

export default function HeroLight() {
 const backgroundRef = useRef(null);

 useEffect(() => {
  const background = backgroundRef.current;
  let visible = false;
  const sync = () => {
   background.dataset.active = String(visible && !document.hidden);
  };
  const observer = new IntersectionObserver(([entry]) => {
   visible = entry.isIntersecting;
   sync();
  });
  observer.observe(background);
  document.addEventListener('visibilitychange', sync);
  return () => {
   observer.disconnect();
   document.removeEventListener('visibilitychange', sync);
  };
 }, []);

 return (
  <div className="hero-color-wash" ref={backgroundRef} aria-hidden="true">
   <span className="hero-wash-blue" />
   <span className="hero-wash-slate" />
   <span className="hero-wash-pearl" />
  </div>
 );
}
