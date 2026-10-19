# Nirmal Chandrasiri Portfolio

Personal portfolio built with Next.js and React. The homepage includes a blue interactive hero, career and education history, tools, credentials, blog links, and a contact form. Existing MDX blog, project, and work pages are preserved.

## Local setup

Use Node.js 22 LTS. Open this repository folder in VS Code, then run:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Edit `src/components/portfolio/Portfolio.jsx` to change the homepage; the browser updates automatically.

If the Windows npm launcher reports a missing `npm-cli.js`, use the installed Node.js npm directly in PowerShell:

```powershell
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' ci --cache .npm-cache --registry https://registry.npmjs.org
node 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' run dev
```

To check a production build locally:

```sh
npm run build
npm start
```

## Where to edit

| Content | Location |
| --- | --- |
| Homepage sections | `src/components/portfolio/Portfolio.jsx` |
| Biography, career, education, tools | `src/components/portfolio/content/portfolio.js` |
| Credentials, homepage blog links, social profiles | `src/components/portfolio/content/extras.json` |
| Homepage styling and responsive layouts | `src/components/portfolio/portfolio.css` |
| Hero and scrolling animations | `src/components/portfolio/HeroWaves.jsx`, `Motion.jsx`, `TopicIcon.jsx` |
| Contact form and public form identifier | `src/components/portfolio/ContactForm.jsx`, `content/contact.js` |
| Homepage images, logos, and font | `public/assets/` |
| Full blog, project, and work content | `src/data/` |

The homepage styles are scoped so existing article and project layouts keep their own styling. Motion respects the visitor's reduced-motion preference.

## Preview before production

The production branch is `main`. Develop on `feature/portfolio-blue-redesign` and open a pull request targeting `main`.

1. Push the feature branch to GitHub.
2. Check the Vercel deployment linked to that branch or pull request. In Vercel, confirm this repository is connected and the Production Branch is `main`.
3. Review the preview on desktop, phone, and tablet. Check navigation, article links, images, and the contact form.
4. Merge the pull request into `main` only after reviewing the preview. With the Git integration configured, that merge triggers the production deployment.

Keep the Vercel framework preset as Next.js, with the repository root as the Root Directory and the framework's default build/output settings. Do not upload the separate standalone HTML or Vite build into this repository.

## Contact form

The homepage uses Web3Forms with a public access key and hCaptcha. No server secret is required in the repository. Enable the corresponding spam protection in the Web3Forms dashboard. CAPTCHA verification and real message delivery must be checked on the hosted preview; local automated checks should mock the service and must not send email.

The existing free-plan account controls submission limits. This repository does not require a paid form subscription.
