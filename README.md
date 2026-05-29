# Big Dan's Solutions

Current public pages:

- `index.html`
- `services.html`
- `about-dan.html`
- `project-examples.html`
- `privacy.html`
- `contact.html`

Contact:

- `dan@bigdanssolutions.com`
- `706-612-3502`
- Northeast, GA

Project examples:

- The services page should read as a practical menu of business problems and service areas, not a fixed package list.
- Public screenshots are recreated portfolio views with fictional sample data.
- Do not publish live client screens, private client names, private customer names, or real client numbers.
- The current public examples include one deeper sample `Owner Dashboard` app with modules that follow one workflow: daily overview, lead intake, estimating, cost catalog, jobs, money, customers, online presence, documents, research, automations, and reports.
- The public examples also include non-dashboard proof artifacts for website/local presence work, follow-up automation, and cleanup/reporting work.
- The examples should prove the kind of work Big Dan's Solutions can build: websites and local presence cleanup, custom owner dashboards, internal systems, automation, cleanup tools, reports, and business-specific workflows.
- Keep the public wording clear: examples are privacy-safe recreations, not off-the-shelf templates.

Screenshot workflow:

- Current screenshots live in `portfolio-screenshots/`.
- The current screenshot refresh script is `tools/generate-portfolio-screenshots.js`.
- If screenshots are refreshed, also review `index.html`, `project-examples.html` captions, surrounding copy, image filenames, and cache-busting query strings.
- The dashboard screenshots should look like one cohesive custom owner-ops app. Show real states, transitions, and owner decisions across lead -> estimate -> job -> follow-up -> report. No generic KPI-card soup.
- The non-dashboard proof artifacts should look like real work outputs, not fake app screens.

Deployment:

- Preferred simple path: static hosting with a custom domain, such as GitHub Pages.
- `CNAME` is already set to `bigdanssolutions.com`.
- Contact form: wired to Formspree form id `xzdworpp`. Keep direct email/call/text visible either way.
- Publish only the public site files, `art-package/`, and `portfolio-screenshots/`.
- Do not publish `output/`, `tools/`, or temporary QA files.
- A clean deploy copy is generated at `deploy/site/`, with a zip at `deploy/bigdanssolutions-site.zip`.
