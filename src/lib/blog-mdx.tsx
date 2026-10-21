/* eslint-disable @next/next/no-img-element */
import {Children,isValidElement,type ReactNode,type ReactElement} from 'react';
import type {MDXComponents} from 'mdx/types';
import CodeSnippet from '@/components/blog/CodeSnippet';
export type Heading = {id:string;title:string;depth:number};
type Node = {type:string;value?:string;depth?:number;children?:Node[];data?:{hProperties?:Record<string,unknown>}};
const textOf = (node:Node):string => node.type==='text'||node.type==='inlineCode' ? node.value||'' : (node.children||[]).map(textOf).join('');
export function articleHeadings(headings:Heading[],title:string) {
  return function plugin() {
    return (tree:Node) => {
      const first=tree.children?.[0];
      if(first?.type==='heading'&&first.depth===1&&textOf(first).trim()===title.trim())tree.children?.shift();
      const seen=new Set<string>();
      const walk=(node:Node)=>{
        if(node.type==='heading'){
          if(node.depth===1)node.depth=2;
          const label=textOf(node);
          const base=label.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-')||'section';
          let id=base,count=1;while(seen.has(id))id=`${base}-${count++}`;seen.add(id);
          node.data={...node.data,hProperties:{...node.data?.hProperties,id}};
          if((node.depth||2)<=3)headings.push({id,title:label,depth:node.depth||2});
        }
        node.children?.forEach(walk);
      };
      walk(tree);
    };
  };
}
function plainText(children:ReactNode):string {
  return Children.toArray(children).map(child=>typeof child==='string'||typeof child==='number'?String(child):isValidElement<{children?:ReactNode}>(child)?plainText(child.props.children):'').join('');
}
export const blogComponents:MDXComponents = {
  pre: ({children})=>{
    const code=Children.toArray(children).find(isValidElement) as ReactElement<{className?:string;children?:ReactNode}>|undefined;
    const language=code?.props.className?.match(/language-([\w-]+)/)?.[1]||'text';
    return <CodeSnippet text={plainText(code?.props.children||children).replace(/\n$/,'')} language={language}>{children}</CodeSnippet>;
  },
  table: ({children,...props})=><div className="journal-table" role="region" aria-label="Article comparison table" tabIndex={0}><table {...props}>{children}</table></div>,
  img: props=><img {...props} alt={props.alt||''} loading="lazy"/>,
  a: ({href='',children,...props})=>{
    const local=href.replace(/^https?:\/\/(www\.)?nirmalchandrasiri\.com(?=\/|$)/,'')||'/';
    const external=/^https?:\/\//.test(local);
    return <a {...props} href={local} {...(external?{target:'_blank',rel:'noopener noreferrer'}:{})}>{children}</a>;
  },
};
