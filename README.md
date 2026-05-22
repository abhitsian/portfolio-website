# Portfolio — Abhishek Sivaraman

An AI-native product manager's portfolio: skills, projects, apps, writing, and products
as one body of work. Static site, no build step, deployed on GitHub Pages.

## Edit the content

Everything renders from **`data.js`** (`window.PORTFOLIO`). To add a project, app, or
skill, edit that file and refresh — no build, no framework.

```
portfolio-website/
├── index.html   # structure (hero, nav, section containers, footer)
├── styles.css   # "The System" aesthetic — Space Grotesk + IBM Plex Mono
├── app.js       # renders sections from data.js
├── data.js      # ← edit this: profile, skills, projects, apps, writing, products
└── README.md
```

## Wire up email capture

The Products section has a signup form. Point it at a real endpoint in `data.js`:

- `products.formAction` → a [Formspree](https://formspree.io) / [Buttondown](https://buttondown.email) form URL
- `products.gumroad` → your Gumroad profile (the "follow" link)

Until `formAction` is set, the form shows a friendly placeholder instead of submitting.

## Run locally

Open `index.html` directly in a browser (data is a `.js` file, so no server needed).

## Deploy

Pushed to `main` → served by GitHub Pages at
`https://abhitsian.github.io/portfolio-website/`.

---

Built with Claude Code.
