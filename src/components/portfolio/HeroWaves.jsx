import React,{useEffect,useRef} from 'react';

const vertex=`attribute vec2 position;void main(){gl_Position=vec4(position,0.,1.);}`;
// Original light-field shader: soft blue ridges, broad fluid bends and restrained grain.
const fragment=`precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
 vec2 uv=gl_FragCoord.xy/resolution;
 float aspect=resolution.x/resolution.y;
 vec2 p=(uv-.5)*vec2(aspect,1.);
 vec2 mouse=(pointer-.5)*vec2(aspect,1.);
 vec2 delta=p-mouse;
 float influence=exp(-dot(delta,delta)*2.3);
 p+=delta*influence*.19+mouse*.09;
 float t=time*.12;
 p+=vec2(sin(p.y*3.+t)*.13,cos(p.x*2.3-t)*.16);
 float a=p.x*3.5+p.y*2.4+sin(p.y*3.3-p.x*.9+t)*1.05+t*.36;
 float b=p.x*2.1-p.y*3.8+sin(p.x*2.7+p.y+t*.8)*.9-t*.24;
 float ridgeA=abs(sin(a)),ridgeB=abs(sin(b));
 float broad=exp(-ridgeA*7.)*.3+exp(-ridgeB*8.)*.23;
 float fine=exp(-ridgeA*38.)*.55+exp(-ridgeB*42.)*.38;
 float brightness=(broad+fine)*(.72+.28*sin(p.x*2.-p.y*3.+t));
 vec3 color=vec3(.002,.009,.018)+vec3(.012,.29,.64)*brightness;
 float grain=hash(gl_FragCoord.xy);
 color*=.86+grain*.28;
 color+=vec3(.006,.025,.043)*(grain-.5);
 // Keep the greeting legible; let the waves shine in the surrounding space.
 float center=exp(-dot((uv-.5)*vec2(2.8,2.),(uv-.5)*vec2(2.8,2.))*2.5);
 color*=1.-center*.48;
 color*=smoothstep(0.,.14,uv.y)*(.65+.35*smoothstep(0.,.15,1.-uv.y));
 gl_FragColor=vec4(color,1.);
}`;

export default function HeroWaves(){
 const canvasRef=useRef(null);
 useEffect(()=>{
  const canvas=canvasRef.current,hero=canvas.closest('.hero');
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,powerPreference:'low-power'});
  if(!gl)return; // CSS retains a blue glow if graphics acceleration is unavailable.
  const shaders=[],program=gl.createProgram();
  for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){
   const shader=gl.createShader(type);shaders.push(shader);gl.shaderSource(shader,source);gl.compileShader(shader);
   if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);return;}
   gl.attachShader(program,shader);
  }
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);return;}
  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
  gl.useProgram(program);const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const size=gl.getUniformLocation(program,'resolution'),cursor=gl.getUniformLocation(program,'pointer'),clock=gl.getUniformLocation(program,'time');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),fine=matchMedia('(hover: hover) and (pointer: fine)');
  let frame=0,visible=true,lost=false,last=0,elapsed=0,x=.5,y=.5,targetX=.5,targetY=.5;
  const draw=()=>{if(lost)return;gl.uniform2f(size,canvas.width,canvas.height);gl.uniform2f(cursor,x,y);gl.uniform1f(clock,elapsed);gl.drawArrays(gl.TRIANGLES,0,6);canvas.dataset.rendered='true';};
  const animate=now=>{
   frame=0;
   if(now-last>=32){const dt=Math.min((now-last)/1000,.05);last=now;elapsed+=dt;x+=(targetX-x)*.09;y+=(targetY-y)*.09;draw();}
   frame=requestAnimationFrame(animate);
  };
  const sync=()=>{cancelAnimationFrame(frame);frame=0;const run=visible&&!document.hidden&&!reduced.matches&&fine.matches&&!lost;canvas.dataset.running=String(run);if(run){last=performance.now();frame=requestAnimationFrame(animate);}else if(!lost)draw();};
  const resize=()=>{const r=hero.getBoundingClientRect(),scale=Math.min(devicePixelRatio||1,1.5,1600/r.width,1100/r.height);canvas.width=Math.round(r.width*scale);canvas.height=Math.round(r.height*scale);gl.viewport(0,0,canvas.width,canvas.height);draw();};
  const move=e=>{if(reduced.matches||!fine.matches)return;const r=hero.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width;targetY=1-(e.clientY-r.top)/r.height;};
  const leave=()=>{targetX=.5;targetY=.5;};
  const onLost=e=>{e.preventDefault();lost=true;cancelAnimationFrame(frame);canvas.dataset.running='false';canvas.dataset.rendered='false';};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});observer.observe(hero);
  const resizer=new ResizeObserver(resize);resizer.observe(hero);
  hero.addEventListener('pointermove',move,{passive:true});hero.addEventListener('pointerleave',leave);
  document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);fine.addEventListener('change',sync);canvas.addEventListener('webglcontextlost',onLost);
  resize();sync();
  return()=>{cancelAnimationFrame(frame);observer.disconnect();resizer.disconnect();hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);fine.removeEventListener('change',sync);canvas.removeEventListener('webglcontextlost',onLost);gl.deleteBuffer(buffer);gl.deleteProgram(program);shaders.forEach(s=>gl.deleteShader(s));};
 },[]);
 return <div className="hero-waves" aria-hidden="true"><canvas ref={canvasRef}/></div>;
}
