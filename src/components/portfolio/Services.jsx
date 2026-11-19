import {ArrowUpRight, Container, Sparkles, Terminal} from 'lucide-react';
import {Fragment} from 'react';

const stackRows = [
  ['AWS', 'Python', 'Claude', 'Terraform', 'Datadog'],
  ['Azure', 'Cursor', 'Kubernetes', 'Google Antigravity', 'Docker'],
];
const logoFiles = {
  Claude: 'claude-color.svg',
  Cursor: 'cursor.svg',
  'Google Antigravity': 'antigravity-color.svg',
};

function StackTicker() {
  return (
    <div className="stack-ticker" role="group" aria-label="Technology stack">
      <div className="stack-window">
        {stackRows.map(row => (
          <div className="stack-track" key={row[0]} style={{animationDuration: `${row.length * 3 * (48 + 14) / 50}s`}}>
            {[0, 1].map(copy => (
              <ul className="stack-group" key={copy} aria-hidden={copy === 1 || undefined}>
                {row.map(name => (
                  <Fragment key={name}>
                    <li className="stack-tile" title={name}>
                      <img src={`/assets/tools/${logoFiles[name] ?? `brand/${name.toLowerCase()}.svg`}`} alt={name} width="25" height="25"/>
                    </li>
                    <li className="stack-spacer" aria-hidden="true"/>
                    <li className="stack-spacer" aria-hidden="true"/>
                  </Fragment>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="services-section section wrap" aria-labelledby="services-title">
      <div className="services-intro">
        <h2 id="services-title"><span>Services that</span> supercharge your SaaS business.</h2>
        <StackTicker/>
      </div>
      <div className="service-widgets">
        <article className="service-widget service-cloud">
          <div className="service-widget-copy">
            <h3>Cloud infrastructure</h3>
            <p>Support Azure and AWS environments, maintain deployments, and troubleshoot the services behind your application.</p>
          </div>
          <img className="service-art" src="/assets/services/cloud.webp" alt="Cloud infrastructure visualized beside a laptop" width="960" height="640" loading="lazy"/>
        </article>
        <article className="service-widget">
          <img className="service-art" src="/assets/services/observability.webp" alt="Glass monitoring panels with time-series charts" width="960" height="640" loading="lazy"/>
          <div className="service-widget-copy">
            <h3>Monitoring & observability</h3>
            <p>Bring metrics, logs, and useful alerts together with Datadog, Prometheus, and Grafana.</p>
          </div>
        </article>
        <article className="service-widget">
          <img className="service-art" src="/assets/services/automation.webp" alt="Connected modules illustrating a deployment workflow" width="960" height="640" loading="lazy"/>
          <div className="service-widget-copy">
            <h3>Infrastructure & automation</h3>
            <p>Provision with Terraform and automate deployments and repeatable tasks with Python and Ansible.</p>
          </div>
        </article>
        <article className="service-widget service-widget-compact">
          <Container className="service-widget-icon" size={24} aria-hidden="true"/>
          <div>
            <h3>Kubernetes operations</h3>
            <p>Support workloads, investigate deployment issues, and keep container environments running.</p>
          </div>
        </article>
        <article className="service-widget service-widget-compact">
          <Sparkles className="service-widget-icon" size={24} aria-hidden="true"/>
          <div>
            <h3>AI-assisted workflows</h3>
            <p>Explore practical ways to speed up coding, investigation, and everyday technical work.</p>
          </div>
        </article>
        <article className="service-widget service-support">
          <Terminal className="service-widget-icon" size={24} aria-hidden="true"/>
          <div><h3>Production support</h3><p>Level 2 and Level 3 troubleshooting, incident investigation, and ongoing operational support.</p></div>
          <a href="#contact" aria-label="Discuss your project">Let’s talk <ArrowUpRight size={16} aria-hidden="true"/></a>
        </article>
      </div>
    </section>
  );
}
