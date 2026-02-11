# Personal Portfolio - Side Projects

A dynamic personal website showcasing all your side projects and hustles built with Claude Code.

## Features

- **Dynamic Loading**: Projects are loaded from a JSON file for easy updates
- **Filtering**: Filter projects by type (Desktop, Web, MCP, Extensions, Bots)
- **Responsive Design**: Works beautifully on all devices
- **Modern UI**: Clean, dark-themed interface with smooth animations
- **Auto-updating Stats**: Automatically shows total project count and last update date

## How to Use

1. **View the website**: Open `index.html` in your web browser
2. **Update projects**: Edit `projects.json` to add, remove, or modify projects
3. **Deploy**: Host on GitHub Pages, Netlify, Vercel, or any static hosting service

## File Structure

```
personal-website/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── app.js             # JavaScript logic
├── projects.json      # Project data (EDIT THIS TO UPDATE)
└── README.md          # This file
```

## Updating Projects

To add or update projects, simply edit `projects.json`:

```json
{
  "id": 10,
  "name": "Your New Project",
  "type": "Web App",
  "description": "Project description here",
  "tech": ["React", "Node.js"],
  "features": [
    "Feature 1",
    "Feature 2"
  ],
  "path": "/path/to/project",
  "github": "https://github.com/username/repo",
  "status": "Active"
}
```

The website will automatically update when you refresh the page.

## Project Types Available

- Desktop App
- Web App
- MCP Server
- MCP Utilities
- MCP Proxy
- Native Mac App
- Chrome Extension
- Telegram Bot
- Python Project

## Status Options

- **Active**: Project is complete and working
- **In Development**: Project is still being built
- **Placeholder**: Project is planned or just started

## Deployment

### GitHub Pages
1. Push this directory to a GitHub repository
2. Go to Settings > Pages
3. Select the branch and folder
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the `personal-website` folder to Netlify
2. Your site will be live instantly

### Vercel
1. Run `vercel` in this directory
2. Follow the prompts

## Built With

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript
- No frameworks or dependencies needed

---

Built with Claude Code
