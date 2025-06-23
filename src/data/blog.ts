import {BlogPostProps} from "@/lib/types";

const posts: BlogPostProps[] = [
    {
        slug: 'post1',
        title: 'Getting Started with Datadog',
        summary: 'A beginner-friendly guide to setting up monitoring with Datadog, creating dashboards, alerts, and integrating with your infrastructure.',
        date: '2025-11-02',
        tags: ['monitoring', 'observability', 'devops', 'datadog']
    },
    {
        slug: 'post2',
        title: 'Most Important Linux Commands',
        summary: 'A practical guide to essential Linux commands every developer, engineer, or system administrator should know.',
        date: '2025-01-03',
        tags: ['linux', 'devops', 'command line', 'system administration']
    },
]

export default posts
