# Adding and maintaining blog articles

Articles live in `src/data/blog/`. The MDX filename is the public URL: `my-article.mdx` becomes `/blog/my-article`.

## Add an article

Create a file with a lowercase, hyphen-separated filename and this frontmatter:

```mdx
---
title: "Your article title"
summary: "A short, useful description of what readers will learn."
date: "2026-10-21"
tags:
  - DevOps
  - Observability
draft: true
---

Start with an introductory paragraph. The page already displays the title,
summary, author, date, and reading time.

## First section

Write your article here.

### A subsection

Use Markdown lists, links, images, tables, and fenced code blocks.
```

Remove `draft: true` (or set it to false) when ready to publish. Drafts are excluded from the blog, homepage previews, related articles, sitemap, and public article routes. Draft files in a public GitHub repository are still visible in GitHub.

New published files automatically appear in the listing, topic filters, related articles, and sitemap. The latest four appear on the homepage. No separate article registry or homepage JSON needs updating.

## Formatting

- Use `##` and `###` for sections. The contents menu and heading anchors are generated from them, with unique IDs for repeated headings.
- Add a language to fenced code blocks (for example, `bash`, `yaml`, `hcl`, or `python`) for highlighting and a copy button. Unlabelled blocks also have a copy button.
- Markdown tables and code blocks scroll horizontally on narrow screens.
- Use descriptive image alt text. Store images under `public/assets/blog/` and reference them with `/assets/blog/filename.png`.
- Link to other articles with `/blog/article-slug`. Topic links filter the local blog.
- Keep tags consistent. Tags are normalized to lowercase internally and displayed with readable labels. Selecting several topics matches any selected topic, as in the previous blog.
- Reading time is an estimate of 200 words per minute, including code.

## Updating an article

Preserve the original `date`. Add `updated: "YYYY-MM-DD"` after a substantive content revision. This adds a visible update date and updates search metadata. Do not change the publication date just to move a post to the top.

Keep filenames stable to preserve existing links. If an article is renamed, add an explicit redirect from its old URL.

## Review before publishing

Run the local site and review the blog listing, topic filters, article contents menu, code examples, tables, and mobile layout. Run `npm run build` before publishing. Stop the development server before building in the same checkout, then restart it afterwards.

Only compile trusted MDX committed by the site owner. MDX is executable content; never compile visitor submissions or arbitrary remote files.

The redesign preserves the existing article bodies. Published listing dates were retained when the old registry and MDX dates differed; existing topic tags were combined. Technical examples were not re-authored or claimed to be newly fact-checked.

## Article-specific covers

Add `cover: "/assets/blog/your-cover.webp"` to frontmatter to use an individual cover in cards and social previews. Without it, existing posts retain their technology cover. Store an optimized landscape WebP in `public/assets/blog/`. Add a Markdown image in the body if the cover should also appear inside the article. Paths are validated against local assets.
