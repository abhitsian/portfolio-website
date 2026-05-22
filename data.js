/* Portfolio content. Add new items here — the site renders from this file. */
window.PORTFOLIO = {
  profile: {
    name: "Abhishek Sivaraman",
    handle: "abhitsian",
    role: "AI-native product manager",
    headline: "I build the tools I use to do the job.",
    blurb: "Director of PM by day. The rest of the time I build my own AI tooling — 100+ Claude Code skills, MCP servers, eval kits, and desktop apps. Shipped, used daily, documented. This is the practice, not the theory.",
    links: {
      github: "https://github.com/abhitsian",
      x: "https://x.com/abhitsian",
      email: "mailto:abhishek.sivaraman87@gmail.com"
    }
  },

  stats: [
    { k: "skills",   v: "100+", note: "custom Claude Code skills" },
    { k: "projects", v: "20+",  note: "public repos" },
    { k: "apps",     v: "12",   note: "locally-built tools" },
    { k: "writing",  v: "39",   note: "PM × AI articles" }
  ],

  skills: {
    total: "100+",
    note: "Custom skills I built to do product work with AI — design, writing, research, and the meta-skill of building more skills.",
    featured: [
      { name: "frontend-design", cat: "design",  desc: "Production-grade UI with a point of view." },
      { name: "anti-slop",       cat: "writing",  desc: "Strips AI filler from any prose." },
      { name: "ideation-memo",   cat: "product",  desc: "Rough idea → structured product memo." },
      { name: "spec-review",     cat: "product",  desc: "Socratic spec interviews + critique." },
      { name: "visualize",       cat: "build",    desc: "Concepts → diagrams, flows, animations." },
      { name: "html-spec",       cat: "product",  desc: "A feature, explored as a rich HTML spec." },
      { name: "critique",        cat: "design",   desc: "UX critique with actionable fixes." },
      { name: "distill",         cat: "design",   desc: "Strip a design to its essence." },
      { name: "skillify",        cat: "meta",     desc: "Find the repetitive work, make it a skill." },
      { name: "clarify",         cat: "writing",  desc: "Sharpen microcopy, errors, labels." }
    ]
  },

  projects: [
    { name: "sessions-mcp",         desc: "Search, read, and tail past and live Claude Code sessions.", tags: ["MCP","Node"],   github: "https://github.com/abhitsian/sessions-mcp" },
    { name: "receipts",             desc: "Keep the receipts of your Claude Code usage — dashboard, insights, shareable cards.", tags: ["Tool","Python"], github: "https://github.com/abhitsian/receipts" },
    { name: "claude-desk",          desc: "A UI for Claude Code: permanent history, cost tracking, prompting coach.", tags: ["App"],   github: "https://github.com/abhitsian/claude-desk" },
    { name: "coauthor",             desc: "A shared surface for humans and AI agents to shape documents together.", tags: ["Tool"],    github: "https://github.com/abhitsian/coauthor" },
    { name: "ai-eval-kit",          desc: "Evaluation toolkit for PMs building AI products — config evals, trace viewer, LLM judges.", tags: ["Kit","Eval"], github: "https://github.com/abhitsian/ai-eval-kit" },
    { name: "compound-pm",          desc: "Your second brain as a PM — a Claude Code plugin: 9 agents, 15 commands, 6 skills.", tags: ["Plugin"], github: "https://github.com/abhitsian/compound-pm-marketplace" },
    { name: "poised",               desc: "macOS app that coaches how you sound and look on video calls.", tags: ["macOS"],   github: "https://github.com/abhitsian/poised" },
    { name: "design-talk",          desc: "Canvas-based design annotation tool with Claude integration.", tags: ["Tool"],    github: "https://github.com/abhitsian/design-talk" },
    { name: "tldl",                 desc: "Too Long; Didn't Listen — transcribe any video to markdown.", tags: ["CLI"],      github: "https://github.com/abhitsian/tldl" },
    { name: "speakcoach",           desc: "macOS teleprompter with built-in speech coaching.", tags: ["macOS"],   github: "https://github.com/abhitsian/speakcoach" },
    { name: "ai-slop-filter",       desc: "macOS menu-bar app that filters AI verbosity using local Ollama.", tags: ["macOS"], github: "https://github.com/abhitsian/ai-slop-filter" },
    { name: "video-to-claude",      desc: "Convert video to Claude-ready frames + synced transcript.", tags: ["Tool"],     github: "https://github.com/abhitsian/video-to-claude" },
    { name: "claude-mcp-tools",     desc: "MCP servers: Memory Vault (FAISS semantic search) + Smart Rate Limiter.", tags: ["MCP"], github: "https://github.com/abhitsian/claude-mcp-tools" },
    { name: "spec-analyzer-mac",    desc: "Native macOS app for PM spec analysis with Socratic coaching.", tags: ["macOS"], github: "https://github.com/abhitsian/spec-analyzer-mac" }
  ],

  apps: [
    { name: "Brain Dump",       desc: "Capture → AI classifier → tasks, ideas, journal, saved items." },
    { name: "Taste Simulator",  desc: "Train product judgment on real strategy scenarios, graded." },
    { name: "Agents Chat",      desc: "Live group chat with a Claude council that converges on an answer." },
    { name: "Tab Tasks",        desc: "Reads your open Chrome tabs and clusters them into tasks." },
    { name: "Scraps",           desc: "A lightweight inbox of parked snippets, ready to promote." },
    { name: "Cabinet",          desc: "One browsable surface over memory, notes, and tasks." },
    { name: "TLDL Offline",     desc: "Fully-offline video transcription + chat (Whisper + local LLM)." },
    { name: "Improv Adventure", desc: "100 improv games as a tap-to-strike checklist, with saved progress." }
  ],

  writing: [
    { name: "LLM Concepts for PMs", desc: "39 articles explaining how language models actually work — with interactive Bézier-curve diagrams. Written for product managers, no math required.", tags: ["39 articles"], github: "https://github.com/abhitsian/llm-concepts-for-pms" }
  ],

  products: {
    status: "Launching soon",
    blurb: "I'm packaging the strongest of these — the eval kit, the skill bundles, the judgment trainer — into products PMs can buy. Leave an email and I'll tell you when the first one ships.",
    // Wire this to a real endpoint: Formspree, Buttondown, or your Gumroad follow link.
    formAction: "https://formspree.io/f/YOUR_FORM_ID",
    gumroad: "https://gumroad.com/abhitsian",
    teasers: [
      { name: "AI Eval Kit for PMs",   note: "The eval tooling PMs shipping AI never had." },
      { name: "AI-Native PM Toolkit",  note: "The skills + the system, packaged." },
      { name: "Taste Simulator",       note: "Train product judgment, rep by rep." }
    ]
  }
};
