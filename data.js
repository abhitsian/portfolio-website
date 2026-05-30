/* Portfolio content. Add/extend items here — index, detail pages, and the skills
   browser all render from this file. Each item has a `slug` → /project.html?id=slug. */
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
    { k: "apps",     v: "13",   note: "locally-built tools" },
    { k: "writing",  v: "39",   note: "PM × AI articles" }
  ],

  // Meta-theme: tools built to improve the Claude Code workflow itself.
  metaTheme: {
    label: "A throughline",
    title: "Tools that make AI a better collaborator.",
    blurb: "A lot of this work points the same direction: the better my tools for working with Claude, the better everything else gets. So I build for the workflow itself — history, cost, memory, document review, parallel sessions — then use it to build the rest.",
    slugs: ["claude-desk", "coauthor", "sessions-mcp", "receipts", "compound-pm", "claude-mcp-tools", "agents-chat", "ambient-ai"]
  },

  skills: {
    total: "100+",
    note: "Custom skills I built to do product work with AI — design, writing, research, and the meta-skill of building more skills. 45 of them are generic enough to share.",
    browse: "skills.html"
  },

  projects: [
    { slug:"sessions-mcp", name:"sessions-mcp", meta:true, tags:["MCP","Node"], github:"https://github.com/abhitsian/sessions-mcp",
      desc:"Search, read, and tail past and live Claude Code sessions.",
      about:"Claude Code writes every session to disk as a transcript. sessions-mcp turns that pile into something the agent can use mid-conversation — search across everything you've ever done, pull a clean copy of any session, or tail one that's running right now in another terminal.",
      features:["Four MCP tools: list, search, get, tail","Reads the JSONL transcripts Claude already writes — zero deps","Tail a session running live in another terminal","Strips thinking + tool-result noise so the agent sees real conversation"] },

    { slug:"dispatch", name:"dispatch", meta:true, logo:"assets/dispatch-logo.png", audio:"assets/dispatch-sample.mp3", tags:["macOS","Python"], github:"https://github.com/abhitsian/dispatch",
      desc:"Menu-bar app that turns your live Claude Code sessions into a radio channel.",
      about:"Running three terminals with three Claude sessions means three permission prompts to chase, three places to alt-tab to, three trains of thought to keep apart. dispatch puts them all on one channel — every live session shows up as a numbered unit, every tool-call approval lands in one menu, and voice transmits get typed straight into the right terminal.",
      features:["Auto-discovers live Claude sessions via the pid registry","One-click Allow / Deny for every Bash/Write/Edit hook across all sessions","Voice → whisper → typed into iTerm/Terminal via AppleScript","Mirrors Claude's permissions.allow so it doesn't over-prompt","Web dashboard for visual review"] },

    { slug:"receipts", name:"receipts", meta:true, image:"assets/receipts.png", tags:["Tool","Python"], github:"https://github.com/abhitsian/receipts",
      desc:"Keep the receipts of your Claude Code usage — dashboard, insights, shareable cards.",
      about:"A dashboard for what you actually did with Claude Code: tokens, streaks, hours saved, and brag-worthy receipt cards you can share. Turns invisible AI usage into something you can see and show.",
      features:["Local usage dashboard — tokens, streaks, hours saved","Shareable receipt cards","Insights on how you actually work with Claude","Runs locally"] },

    { slug:"claude-desk", name:"claude-desk", meta:true, tags:["App"], github:"https://github.com/abhitsian/claude-desk",
      desc:"A UI for Claude Code: permanent history, cost tracking, prompting coach.",
      about:"Claude Code lives in the terminal. claude-desk wraps it in a real UI — permanent conversation history, cost tracking, a prompting coach, and conversation intelligence — so the work doesn't vanish when the terminal closes.",
      features:["Permanent, browsable conversation history","Cost tracking across sessions","Prompting coach that improves how you ask","Conversation intelligence over your whole history"] },

    { slug:"coauthor", name:"coauthor", meta:true, tags:["Tool"], github:"https://github.com/abhitsian/coauthor",
      desc:"A shared surface for humans and AI agents to shape documents together.",
      about:"Editing a doc with an AI usually means copy-paste ping-pong. coauthor is a shared review surface — inline edits, anchored comments, version history — where a human and an agent work the same document without losing the thread.",
      features:["Inline editing + anchored comments","Version history","Built for human + agent collaboration","Hand off between chat and precise, anchored feedback"] },

    { slug:"ai-eval-kit", name:"ai-eval-kit", tags:["Kit","Eval"], github:"https://github.com/abhitsian/ai-eval-kit",
      desc:"Evaluation toolkit for PMs building AI products — config evals, trace viewer, LLM judges.",
      about:"PMs ship AI features with no real way to tell if they're getting better or worse. ai-eval-kit is the eval tooling they never had — config-driven evals, a trace viewer, LLM judges, and a launch-readiness dashboard, all built for product people, not ML engineers.",
      features:["Config-driven evals — no ML background needed","Trace viewer to see what the model actually did","LLM judges for subjective quality","Launch-readiness dashboard"] },

    { slug:"compound-pm", name:"compound-pm", meta:true, tags:["Plugin"], github:"https://github.com/abhitsian/compound-pm-marketplace",
      desc:"Your second brain as a PM — a Claude Code plugin: 9 agents, 15 commands, 6 skills.",
      about:"A Claude Code plugin that turns your product work into a system that compounds. Nine agents, fifteen commands, six skills — personalized PM workflows that get sharper with every product cycle instead of starting from scratch.",
      features:["9 agents for PM workflows","15 commands + 6 skills","Compounds with each product cycle","Installable as a Claude Code plugin"] },

    { slug:"poised", name:"Poised", tags:["macOS"], github:"https://github.com/abhitsian/poised",
      desc:"A macOS app that coaches how you sound and look on video calls.",
      about:"A macOS app that coaches the things you can't see on a call — how you sound and how you look. Teleprompter, speech coaching, framing, posture, and eye-contact, all live.",
      features:["Teleprompter with live highlighting","Speech coaching — pace, fillers, pauses","Framing + posture + eye-contact cues","Native macOS"] },

    { slug:"design-talk", name:"design-talk", tags:["Tool"], github:"https://github.com/abhitsian/design-talk",
      desc:"Canvas-based design annotation with Claude integration.",
      about:"A canvas where you annotate designs and bring Claude into the critique. Mark up a screen, ask questions, and get design feedback in the same surface.",
      features:["Canvas-based annotation","Claude integration for design critique","Mark up screens and prototypes","Feedback in-context"] },

    { slug:"tldl", name:"tldl", tags:["CLI"], github:"https://github.com/abhitsian/tldl",
      desc:"Too Long; Didn't Listen — transcribe any video to markdown.",
      about:"Turn any video into clean, readable markdown. Point it at a file or link and get a transcript you can search, skim, or feed to an AI — instead of scrubbing through an hour of footage.",
      features:["Any video → markdown transcript","Searchable, skimmable output","Feed transcripts to Claude","Command-line simple"] },

    { slug:"speakcoach", name:"speakcoach", tags:["macOS"], github:"https://github.com/abhitsian/speakcoach",
      desc:"macOS teleprompter with built-in speech coaching.",
      about:"A macOS teleprompter that doesn't just scroll your script — it coaches your delivery. Tracks pace, filler words, pauses, and accuracy in real time as you speak.",
      features:["Teleprompter with real-time highlighting","Tracks pace, fillers, pauses","Accuracy scoring","Native macOS"] },

    { slug:"ai-slop-filter", name:"ai-slop-filter", tags:["macOS"], github:"https://github.com/abhitsian/ai-slop-filter",
      desc:"macOS menu-bar app that strips AI verbosity using local Ollama.",
      about:"Select bloated AI text anywhere on your Mac, hit a hotkey, and get back something tight. Runs on local Ollama — no cloud, no API costs, private by default.",
      features:["Works in any macOS app","Global hotkey","Local Ollama — private, no API cost","Side-by-side original vs filtered"] },

    { slug:"video-to-claude", name:"video-to-claude", tags:["Tool"], github:"https://github.com/abhitsian/video-to-claude",
      desc:"Convert video to Claude-ready frames + synced transcript.",
      about:"Makes video analysis with Claude's vision easy — extracts key frames, transcribes the audio locally, and syncs them into a Claude-ready format for multimodal analysis.",
      features:["Frame extraction via FFmpeg","Local transcription with Whisper","Frames synced to spoken content","Claude Messages API export"] },

    { slug:"claude-mcp-tools", name:"claude-mcp-tools", meta:true, tags:["MCP"], github:"https://github.com/abhitsian/claude-mcp-tools",
      desc:"MCP servers: Memory Vault (semantic search) + Smart Rate Limiter.",
      about:"A pair of reusable MCP servers: a Memory Vault that stores conversations with semantic embeddings and FAISS search, and a Smart Rate Limiter that throttles requests token-aware.",
      features:["Memory Vault — semantic conversation storage","FAISS vector similarity search","Smart Rate Limiter — token-aware throttling","Easy to drop into Claude"] },

    { slug:"spec-analyzer-mac", name:"spec-analyzer-mac", tags:["macOS"], github:"https://github.com/abhitsian/spec-analyzer-mac",
      desc:"Native macOS app for PM spec analysis with Socratic coaching.",
      about:"Paste or upload a spec and get a Socratic review across eight dimensions — the app asks the clarifying questions a good reviewer would, so you sharpen your thinking before anyone else reads it.",
      features:["8-dimensional spec evaluation","Socratic, stage-aware questioning","Runs locally — no API keys","Export results"] }
  ],

  apps: [
    { slug:"taste-library", name:"Taste Library", image:"assets/taste-library.png", tags:["Tool","Python"],
      desc:"Curated taste anchors — text and image captures from the web, searchable.",
      about:"A personal library for things worth keeping — articles, images, talks, whatever catches the eye. Capture from anywhere on the web with a Chrome extension or paste a URL; the library pulls clean text and YouTube transcripts so the page is searchable, not just bookmarked.",
      features:["Chrome extension capture + manual URL/text/image","YouTube transcript extraction","Full-text search across everything captured","Local, lives on your machine"] },

    { slug:"agents-chat", name:"Agents Chat", meta:true, tags:["Node"], github:"https://github.com/abhitsian/agents-chat",
      desc:"Live group chat with a Claude council that debates and converges.",
      about:"Spawn a room with a question and watch a council of Claude agents auto-form, join, and debate in peer mode across rounds — then converge on an answer. Multiple perspectives instead of one.",
      features:["A council of agents in a shared room","Watch them debate across rounds","Converges on an answer","Live group-chat UI"] },

    { slug:"ambient-ai", name:"Ambient AI", meta:true, tags:["Python"],
      desc:"Hotkey Claude overlay — screenshots your screen and answers in context.",
      about:"Cmd+Shift+Space brings up a Claude overlay anywhere. It screenshots what you're looking at, queries Claude Code with context, and answers without leaving what you're doing.",
      features:["Global hotkey overlay","Screenshots your screen for context","Queries Claude Code in place","Ambient — always a keystroke away"] },

    { slug:"taste-simulator", name:"Taste Simulator", image:"assets/taste-simulator.png", tags:["Python"],
      desc:"Train product judgment on real strategy scenarios, graded by Claude.",
      about:"A flight simulator for product taste. Work real strategy scenarios drawn from what's actually happening in the industry; Claude grades your reasoning across five dimensions so you build judgment rep by rep.",
      features:["Real, current strategy scenarios","Claude grades reasoning across 5 dimensions","Build product judgment, rep by rep","Great for PM interview prep"] },

    { slug:"brain-dump", name:"Brain Dump", image:"assets/brain-dump.png", tags:["Python"],
      desc:"Freeform capture → AI classifier → tasks, ideas, journal, saved items.",
      about:"One box for everything in your head. Dump a thought and an AI classifier routes it — task, idea, journal entry, saved item — so capture stays frictionless and nothing gets lost.",
      features:["One freeform capture box","AI classifies into tasks/ideas/journal/saved","Replaces the personal-WhatsApp-to-self habit","Frictionless capture"] },

    { slug:"tab-tasks", name:"Tab Tasks", image:"assets/tab-tasks.png", tags:["Python"], github:"https://github.com/abhitsian/tab-tasks",
      desc:"Reads your open Chrome tabs and clusters them into the tasks you're on.",
      about:"Your open tabs are a map of what you're working on. Tab Tasks reads them on demand, clusters them into the tasks they belong to, and flags the ones that have gone stale.",
      features:["Reads open Chrome tabs on demand","Clusters tabs into tasks","Flags stale tabs","On-demand board"] },

    { slug:"riff", name:"Riff", tags:["Node"],
      desc:"Point at any mock, draw a box and comment, and get redesign options on the mock's own design tokens.",
      about:"A design partner for HTML mocks. Drop in any mock, select a region, and say what you want — Riff returns a few labeled options (from your own patterns, best practice, or something new) rendered on the mock's own design tokens, then writes the ones you keep back into the file. The evolution of an earlier token-tuner.",
      features:["Point at any mock file or folder","Draw a box + comment on any region","Get 2–3 redesign options on the mock's own tokens","Keeps the options you choose, written back to the file"] },

    { slug:"scraps", name:"Scraps", meta:true, tags:["Python"], github:"https://github.com/abhitsian/scraps",
      desc:"A lightweight inbox of parked snippets, ready to promote.",
      about:"The lightest possible capture. Park a snippet the moment you want to keep it, then later open it in a review surface or promote it to a real document. An inbox for half-formed things.",
      features:["Park a snippet in one move","Inbox for half-formed ideas","Promote to a document later","Pairs with coauthor"] },

    { slug:"interface-craft-demo", name:"Interface Craft Demo", tags:["Node"],
      desc:"Live demo of Storyboard Animation + DialKit interface skills.",
      about:"A live demo of two interface-craft skills — Storyboard Animation and DialKit — built with React and Motion. Shows the techniques in motion rather than describing them.",
      features:["Storyboard Animation demo","DialKit demo","React + Motion","Skills shown live"] },

    { slug:"tldl-offline", name:"TLDL Offline", tags:["Python"],
      desc:"Fully-offline video transcription + chat. No cloud, no API keys.",
      about:"Transcribe and chat with any video, fully offline. Whisper handles transcription, a local LLM handles summarize-and-chat — nothing leaves your machine.",
      features:["Whisper transcription, local","Summarize + chat with a local LLM","No cloud, no API keys","Private by default"] },

    { slug:"bookmark-resurrector", name:"Bookmark Resurrector", tags:["Node"],
      desc:"Scrapes Twitter bookmarks and syncs them to Notion for resurfacing.",
      about:"Bookmarks go to die. This scrapes your Twitter/X bookmarks and syncs them into a Notion database so they resurface where you actually work, instead of vanishing into a list you never reopen.",
      features:["Scrapes X/Twitter bookmarks","Syncs to a Notion database","Resurfaces what you saved","Runs on demand"] },

    { slug:"cabinet", name:"Cabinet", meta:true, tags:["Static"],
      desc:"One browsable surface over memory, notes, and tasks.",
      about:"A read-only knowledge browser that pulls everything into one place — agent memory, notes, and tasks — so you can see your whole knowledge base at a glance instead of hunting across tools.",
      features:["One surface over memory + notes + tasks","Read-only, fast to browse","Refreshed on demand","Your knowledge base at a glance"] },

    { slug:"improv-adventure", name:"Improv Adventure", tags:["Static"],
      desc:"100 improv games as a tap-to-strike checklist, with saved progress.",
      about:"A hundred improv games as a playful tap-to-strike checklist — category tracking, saved progress, and a surprise-me button. Built for a seven-year-old; works for anyone who wants to play.",
      features:["100 improv games","Tap-to-strike with saved progress","Category tracking + surprise-me","Made for kids, fun for all"] }
  ],

  writing: [
    { slug:"llm-concepts-for-pms", name:"LLM Concepts for PMs", tags:["39 articles"], github:"https://github.com/abhitsian/llm-concepts-for-pms",
      desc:"39 articles explaining how language models actually work — with interactive Bézier-curve diagrams. For PMs, no math required.",
      about:"A 39-article series explaining how language models actually work, written for product managers — no math required. Each piece pairs plain-language explanation with interactive Bézier-curve diagrams you can play with.",
      features:["39 articles, PM-first","Interactive Bézier-curve diagrams","Plain language, no math","Token economics + roadmap implications throughout"] }
  ],

  products: {
    status: "Launching soon",
    blurb: "I'm packaging the strongest of these — the eval kit, the skill bundles, the judgment trainer — into products PMs can buy. Leave an email and I'll tell you when the first one ships.",
    formAction: "https://formspree.io/f/YOUR_FORM_ID",
    gumroad: "https://gumroad.com/abhitsian",
    teasers: [
      { name: "AI Eval Kit for PMs",  note: "The eval tooling PMs shipping AI never had." },
      { name: "AI-Native PM Toolkit", note: "The skills + the system, packaged." },
      { name: "Taste Simulator",      note: "Train product judgment, rep by rep." }
    ]
  }
};
