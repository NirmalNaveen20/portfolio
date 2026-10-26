export const formatDate = (date: string) => new Intl.DateTimeFormat('en', {day:'numeric', month:'short', year:'numeric', timeZone:'UTC'}).format(new Date(date));
export function tagLabel(tag: string) {
  const labels: Record<string,string> = {devops:'DevOps', iac:'IaC', aws:'AWS', yaml:'YAML', ai:'AI', sre:'SRE', rag:'RAG', datadog:'Datadog'};
  return labels[tag] || tag.replace(/\b\w/g, letter => letter.toUpperCase());
}
export function postVisual(tags: string[]) {
  const tool = ['datadog','kubernetes','terraform','linux'].find(tool => tags.includes(tool));
  return tool ? `/assets/blog/${tool}.webp` : null;
}
