import {BlogPostProps} from "@/lib/types";

const posts: BlogPostProps[] = [
    {
        slug: 'datadog-fundamentals',
        title: 'Getting Started with Datadog',
        summary: 'A beginner-friendly guide to setting up monitoring with Datadog, creating dashboards, alerts, and integrating with your infrastructure.',
        date: '2025-11-02',
        tags: ['monitoring', 'observability', 'devops', 'datadog']
    },
    {
        slug: 'linux-commands-1',
        title: 'Most Important Linux Commands',
        summary: 'A practical guide to essential Linux commands every developer, engineer, or system administrator should know.',
        date: '2025-01-03',
        tags: ['linux', 'devops', 'command line', 'system administration']
    },
    {
        slug: 'terraform-concepts',
        title: 'Essential Terraform Commands and Concepts',
        summary: 'Terraform makes infrastructure as code easy, reusable, and consistent.',
        date: '2025-06-15',
        tags: ['aws', 'azure', 'devops', 'terraform', 'iac']
    },
    {
        slug: 'kubernetes-deployment-strategies',
        title: 'Kubernetes Deployment Types: Blue-Green, Canary...',
        summary: 'When working with Kubernetes in a production environment, selecting the right deployment strategy is crucial. ',
        date: '2025-06-20',
        tags: ['kubernetes', 'cloud', 'devops', 'yaml']
    },
]

export default posts
