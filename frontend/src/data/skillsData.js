/**
 * Complete SkillSprint Data Engine
 * Contains all scoring algorithms, roadmaps, step-by-step guidance, and resource catalog.
 */

export const PATH_DETAILS = {
  "Freelancing": {
    suitableSkills: "Technology, Design, Writing, Social Media, Data/Excel, and Video",
    expectation: "Expect your first few weeks to go into learning, creating samples, and applying for small projects. Getting a first client takes persistence, and earnings vary by skill, portfolio, and market.",
    checklist: [
      "Choose one service you can offer.",
      "Study three examples of good work in that service.",
      "Create a simple sample project for your portfolio.",
      "Create two more samples that show different strengths.",
      "Write a clear profile describing who you help and what you offer.",
      "Apply to a small number of suitable beginner projects.",
      "Review your applications and improve one part of your portfolio."
    ]
  },
  "Affiliate Marketing": {
    suitableSkills: "Writing, Social Media, Video, and Design",
    expectation: "Expect to spend your first few weeks learning a topic and creating useful content. Commissions depend on trust, audience, program rules, and qualifying purchases, so early income is not guaranteed.",
    checklist: [
      "Choose one audience and a problem you want to help with.",
      "List ten useful questions that audience may search for.",
      "Research reputable products or services that solve one of those problems.",
      "Learn the rules and disclosure requirements of any program you consider.",
      "Create one genuinely helpful post, video, or guide without focusing only on links.",
      "Publish a second helpful piece of content and ask for feedback.",
      "Plan your next week of useful content and review what people engaged with."
    ]
  },
  "Online Jobs": {
    suitableSkills: "Technology, Data/Excel, Writing, Customer Support, Design, and Virtual Assistance",
    expectation: "Expect to spend your first few weeks preparing your profile, tailoring applications, and completing assessments. A job search can take time; only apply to roles that clearly explain the work and never require payment to get hired.",
    checklist: [
      "Choose one or two job types that match your current skills.",
      "Create or update a simple, honest resume.",
      "Write a short professional summary for your profile.",
      "Search for legitimate entry-level remote roles.",
      "Tailor one application to a role you genuinely match.",
      "Prepare answers for common interview questions and assessments.",
      "Track your applications and improve your resume based on what you learn."
    ]
  }
};

export const SKILL_RECOMMENDATIONS = {
  "Freelancing": {
    "Technology": "Web Development",
    "Design": "Graphic Design",
    "Writing": "Content Writing",
    "Social Media": "Social Media Management",
    "Data/Excel": "Spreadsheet and Data Support",
    "Video": "Video Editing"
  },
  "Affiliate Marketing": {
    "Technology": "Helpful Tech Guides & Reviews",
    "Design": "Visual Content & Design Guides",
    "Writing": "In-Depth Product Review Writing",
    "Social Media": "Audience Curation & Social Content",
    "Data/Excel": "Niche Analytics & Product Comparisons",
    "Video": "Short-Form Video Breakdowns"
  },
  "Online Jobs": {
    "Technology": "Junior Front-End or Tech Support",
    "Design": "Junior Visual / Graphic Designer",
    "Writing": "Remote Content & Copywriting Assistant",
    "Social Media": "Social Media Assistant / Coordinator",
    "Data/Excel": "Spreadsheet & Operations Specialist",
    "Video": "Remote Video Editor & Producer"
  }
};

export const PATH_DIFFICULTY = {
  "Freelancing": "Beginner-friendly with deliberate practice",
  "Affiliate Marketing": "Beginner-friendly, but requires patience & audience trust",
  "Online Jobs": "Beginner-friendly with focused, tailored applications"
};

export const WEEKLY_TIME = {
  "Less than 1 hour": "4–6 focused hours per week",
  "1–2 hours": "7–14 focused hours per week",
  "2–4 hours": "14–28 focused hours per week",
  "4+ hours": "28+ focused hours per week"
};

export const ROADMAP_LINKS = {
  "Freelancing": {
    "Technology": "Web Development",
    "Design": "Graphic Design",
    "Writing": "Content Writing",
    "Social Media": "Social Media Management",
    "Data/Excel": "Excel & Data",
    "Video": "Video Editing"
  },
  "Affiliate Marketing": {
    "Technology": "Web Development",
    "Design": "Graphic Design",
    "Writing": "Content Writing",
    "Social Media": "Social Media Management",
    "Data/Excel": "Excel & Data",
    "Video": "Video Editing"
  },
  "Online Jobs": {
    "Technology": "Web Development",
    "Design": "Graphic Design",
    "Writing": "Content Writing",
    "Social Media": "Social Media Management",
    "Data/Excel": "Excel & Data",
    "Video": "Video Editing"
  }
};

export const RESOURCE_CATALOG = {
  mdnLearn: {
    id: "mdnLearn",
    name: "MDN Learn Web Development",
    category: "Learning · Web Development",
    description: "Official Mozilla guides covering HTML, CSS, JavaScript, and responsive accessibility.",
    whyRecommended: "The gold standard for clean, standards-compliant, and free front-end foundations.",
    officialUrl: "https://developer.mozilla.org/en-US/docs/Learn_web_development",
    pricingType: "Free",
    recommendedFor: "Web development learners"
  },
  githubPages: {
    id: "githubPages",
    name: "GitHub Pages",
    category: "Portfolio · Hosting",
    description: "Fast, reliable static site hosting directly from a GitHub repository.",
    whyRecommended: "Allows you to share live, interactive demo links of your projects with potential clients.",
    officialUrl: "https://pages.github.com/",
    pricingType: "Free",
    recommendedFor: "Live portfolio deployments"
  },
  figmaLibrary: {
    id: "figmaLibrary",
    name: "Figma Resource Library",
    category: "Learning · Design",
    description: "Official community resources, tutorials, wireframes, and design system kits.",
    whyRecommended: "Industry standard for UI/UX, social media asset creation, and client prototypes.",
    officialUrl: "https://www.figma.com/resource-library/",
    pricingType: "Freemium",
    recommendedFor: "Designers and visual creators"
  },
  canvaDesignSchool: {
    id: "canvaDesignSchool",
    name: "Canva Design School",
    category: "Learning · Visual Communication",
    description: "Bite-sized courses on layout, typography, branding, and social templates.",
    whyRecommended: "Fastest way to master visual hierarchy without a steep learning curve.",
    officialUrl: "https://www.canva.com/designschool/",
    pricingType: "Freemium",
    recommendedFor: "Social media and content creators"
  },
  googleDocs: {
    id: "googleDocs",
    name: "Google Docs Workspace",
    category: "Productivity · Writing",
    description: "Cloud-based collaboration tool for drafting articles, briefs, and client contracts.",
    whyRecommended: "Easy to share draft links with reviewers, clients, and collaborators with track changes.",
    officialUrl: "https://workspace.google.com/products/docs/",
    pricingType: "Free",
    recommendedFor: "Writers, researchers, and remote assistants"
  },
  davinciResolve: {
    id: "davinciResolve",
    name: "DaVinci Resolve",
    category: "Software · Video",
    description: "Hollywood-grade video editing, color correction, and audio post-production.",
    whyRecommended: "The most generous free version in the video industry with no watermarks.",
    officialUrl: "https://www.blackmagicdesign.com/products/davinciresolve",
    pricingType: "Freemium",
    recommendedFor: "Video editors wanting professional skills"
  },
  excel: {
    id: "excel",
    name: "Microsoft Excel & 365",
    category: "Software · Data",
    description: "Industry-standard spreadsheet software for complex modeling, pivots, and dashboards.",
    whyRecommended: "Ubiquitous in business, finance, logistics, and data analysis operations.",
    officialUrl: "https://www.microsoft.com/microsoft-365/excel",
    pricingType: "Paid",
    recommendedFor: "Data analysts and remote operators"
  },
  googleSheets: {
    id: "googleSheets",
    name: "Google Sheets",
    category: "Productivity · Data",
    description: "Online spreadsheet application with live real-time collaboration and script automation.",
    whyRecommended: "Ideal for sharing client trackers, budgets, and automated reporting dashboards.",
    officialUrl: "https://workspace.google.com/products/sheets/",
    pricingType: "Free",
    recommendedFor: "Beginner data organizers"
  },
  upwork: {
    id: "upwork",
    name: "Upwork Global Marketplace",
    category: "Freelance · Platforms",
    description: "The world's largest marketplace connecting freelance professionals with business clients.",
    whyRecommended: "Great for researching what real clients are paying for and crafting targeted proposals.",
    officialUrl: "https://www.upwork.com/",
    pricingType: "Free to Join",
    recommendedFor: "Freelance market research"
  },
  ftcDisclosureGuide: {
    id: "ftcDisclosureGuide",
    name: "FTC Endorsement & Disclosure Guides",
    category: "Compliance · Marketing",
    description: "Official legal guidelines on transparent advertising, affiliate tags, and endorsements.",
    whyRecommended: "Crucial for protecting your business and keeping audience trust 100% legitimate.",
    officialUrl: "https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking",
    pricingType: "Free",
    recommendedFor: "Affiliate marketers & content creators"
  },
  linkedinJobs: {
    id: "linkedinJobs",
    name: "LinkedIn Remote Jobs Portal",
    category: "Employment · Job Search",
    description: "Verified corporate job openings, company backgrounds, and direct recruiter access.",
    whyRecommended: "Filter legitimate remote opportunities with established enterprise employers.",
    officialUrl: "https://www.linkedin.com/jobs/",
    pricingType: "Free",
    recommendedFor: "Remote job seekers"
  }
};

export const ROADMAP_RESOURCES = {
  "Web Development": ["mdnLearn", "githubPages"],
  "Graphic Design": ["figmaLibrary", "canvaDesignSchool"],
  "Content Writing": ["googleDocs", "canvaDesignSchool"],
  "Video Editing": ["davinciResolve"],
  "Excel & Data": ["googleSheets", "excel"],
  "Social Media Management": ["canvaDesignSchool", "googleDocs"]
};

export const SKILL_ROADMAPS = {
  "Web Development": {
    description: "The craft of building interactive, responsive websites and applications for browsers across desktop and mobile.",
    suitable: "People who enjoy analytical thinking, problem-solving, structured logic, and building tangible software.",
    difficulty: "Moderate · Step-by-step beginner friendly",
    stages: [
      {
        name: "Learn",
        tasks: [
          {
            title: "Master Semantic HTML5 Structure",
            objective: "Learn semantic tags (<header>, <main>, <section>, <article>, <nav>) and accessible form controls.",
            why: "Semantic HTML forms the backbone of web accessibility, clean SEO indexing, and robust styling.",
            steps: [
              "Review MDN HTML basics and understand when to use section vs div.",
              "Construct an accessible contact form with labels, fieldsets, inputs, and validation attributes.",
              "Inspect your page with screen reader guidelines in DevTools."
            ],
            outcome: "A standalone, valid HTML5 document with structured sections and an accessible form."
          },
          {
            title: "Modern Responsive CSS & Layouts",
            objective: "Understand CSS Box Model, Flexbox alignment, CSS Grid, and mobile-first media queries.",
            why: "Over 60% of modern web traffic is mobile. A site that doesn't adapt gracefully loses clients.",
            steps: [
              "Build a 3-column card grid that collapses cleanly into a single column on phones.",
              "Implement CSS variables (custom properties) for consistent colors and font scales.",
              "Test layout shifts at 320px, 768px, and 1280px screen widths."
            ],
            outcome: "A fully responsive page layout with dark/light variables and mobile navigation."
          }
        ]
      },
      {
        name: "Practice",
        tasks: [
          {
            title: "Recreate a Commercial Landing Page",
            objective: "Look at an existing SaaS or boutique business page and rebuild its hero and feature grid by eye.",
            why: "Reverse-engineering real designs teaches you how professional developers solve layout challenges.",
            steps: [
              "Pick a clean page from Sitesee or Dribbble.",
              "Break the visual hierarchy into containers, rows, and typography.",
              "Build it from scratch using vanilla CSS or modern layout utilities without looking at source code."
            ],
            outcome: "A replica landing page demonstrating visual fidelity and layout mastery."
          },
          {
            title: "Client-Side DOM Manipulation & Interactivity",
            objective: "Add modal dialogs, tab switchers, dynamic filters, and input validation with JavaScript.",
            why: "Interactivity is what turns static pages into engaging, functional web applications.",
            steps: [
              "Implement an interactive FAQ accordion with aria-expanded toggles.",
              "Build a real-time search filter for a list of items.",
              "Store user preference (like theme mode) in browser localStorage."
            ],
            outcome: "A dynamic UI component library with accessible state handling."
          }
        ]
      },
      {
        name: "Build",
        tasks: [
          {
            title: "Local Business Showcase Website",
            objective: "Build a complete 3-page website for a fictional local coffee roastery or consulting firm.",
            why: "Local businesses are the #1 entry point for beginner web freelancers seeking first paying clients.",
            steps: [
              "Design hero, service catalog, customer testimonials, and contact inquiry form.",
              "Optimize image assets for fast load times and clean Core Web Vitals.",
              "Ensure zero layout shift on mobile viewports."
            ],
            outcome: "A production-grade, fast-loading business website ready for client presentation."
          },
          {
            title: "Interactive Client Calculator or Planner",
            objective: "Build an interactive web utility (e.g. freelance rate calculator or habit tracker).",
            why: "Utility tools demonstrate algorithmic logic, state persistence, and calculation reliability.",
            steps: [
              "Map input variables (hours, expenses, tax rates) to formula outputs.",
              "Render dynamic visual feedback or progress bars based on inputs.",
              "Implement input sanitization and boundary testing."
            ],
            outcome: "A functional browser utility with clean UX and dynamic outputs."
          }
        ]
      },
      {
        name: "Portfolio",
        tasks: [
          {
            title: "Publish Projects with Live GitHub Pages Links",
            objective: "Host your finished projects on GitHub Pages or Vercel with clean repository READMEs.",
            why: "Clients and employers only hire developers whose live work they can tap, click, and verify on their own devices.",
            steps: [
              "Create clean GitHub repositories with documented READMEs explaining problem, stack, and demo.",
              "Deploy live builds via GitHub Pages or static host.",
              "Verify HTTPS links and responsive previews."
            ],
            outcome: "3 live deployment links with clean git commit history."
          },
          {
            title: "Assemble 3 Case Studies Explaining Problem & Solution",
            objective: "Document what challenge you solved, technical decisions made, and measurable outcomes.",
            why: "Good clients don't just buy code—they invest in developers who understand business problems.",
            steps: [
              "Write a short 200-word brief for each project: Client Goal, Technical Approach, Results.",
              "Capture high-resolution desktop and mobile viewport mockups.",
              "Include live demo and source code links."
            ],
            outcome: "A structured developer case study package."
          }
        ]
      },
      {
        name: "Find Work",
        tasks: [
          {
            title: "Craft a Specialized Freelance Service Offer",
            objective: "Package a specific offer: e.g. 'I optimize slow local business websites for mobile & SEO.'",
            why: "Generalist 'I do everything' pitches get ignored. Focused, high-value problem solvers win projects.",
            steps: [
              "Define target client: e.g. dentists, artisan bakers, law firms.",
              "Package 3 clear deliverables: audit, mobile redesign, contact form setup.",
              "Draft a standard 1-page agreement covering revisions and timelines."
            ],
            outcome: "A crystal-clear service proposal outline ready to send to prospective clients."
          },
          {
            title: "Targeted Outreach & Upwork Starter Proposals",
            objective: "Submit 5 highly personalized project proposals addressing specific client pain points.",
            why: "Consistent, thoughtful proposals that reference the client's exact problem achieve 5x higher response rates.",
            steps: [
              "Find jobs on Upwork/LinkedIn with clear requirements.",
              "Reference their specific objective in line 1 of your proposal.",
              "Attach the most relevant case study link and ask one insightful clarifying question."
            ],
            outcome: "5 sent customized proposals tracked in an application spreadsheet."
          }
        ]
      }
    ]
  },
  "Graphic Design": {
    description: "Visual communication using hierarchy, typography, color harmony, and layout to convey clear brand messages.",
    suitable: "Creative thinkers with an eye for detail, visual rhythm, aesthetics, and communicative clarity.",
    difficulty: "Beginner-friendly · Focus on fundamentals over expensive software",
    stages: [
      {
        name: "Learn",
        tasks: [
          {
            title: "Typography & Visual Hierarchy Foundations",
            objective: "Master type pairing, kerning, leading, line-length, and hierarchical scale (H1 to caption).",
            why: "Great design is 90% typography. Strong type hierarchy makes any layout immediately readable.",
            steps: [
              "Learn the difference between serif, sans-serif, slab, and display typefaces.",
              "Establish a typographic scale: 48px, 32px, 24px, 16px, 14px.",
              "Design 3 headline + body pairings for different brand archetypes (playful, corporate, minimal)."
            ],
            outcome: "A typography style board demonstrating 3 distinct brand aesthetics."
          },
          {
            title: "Color Theory, Contrast, and Accessibility",
            objective: "Understand color harmony (complementary, analogous), semantic color, and WCAG contrast standards.",
            why: "Colors evoke emotion and convey actions. Poor contrast alienates users and looks amateur.",
            steps: [
              "Select a 5-color palette (dominant, secondary, accent, neutral dark, neutral light).",
              "Check color pairings on WebAIM contrast checker for 4.5:1 minimum ratios.",
              "Apply the 60-30-10 interior design rule to a layout."
            ],
            outcome: "An accessible color system kit with HEX codes and usage guidelines."
          }
        ]
      },
      {
        name: "Practice",
        tasks: [
          {
            title: "Redesign Cluttered Social Media Creatives",
            objective: "Take 3 busy, low-quality promo graphics and redesign them into clean, high-impact visuals.",
            why: "Decluttering and prioritizing key messages is the core skill small business clients pay for.",
            steps: [
              "Identify the single primary message and call-to-action.",
              "Increase whitespace and eliminate unnecessary decorative elements.",
              "Export in 1080x1080 (square) and 1080x1920 (story) aspect ratios."
            ],
            outcome: "Before-and-after redesign slides demonstrating clarity improvements."
          },
          {
            title: "Vector Icon & Logo Concept Drafting",
            objective: "Design 3 minimal vector logo concepts in Figma using geometric shapes and balance.",
            why: "Understanding grid systems and geometric balance helps you create logos that scale cleanly.",
            steps: [
              "Sketch 10 rapid ideas with pencil and paper.",
              "Vectorize the top 2 in Figma using shape union and pen tool.",
              "Test the logo in pure black-and-white at 32px favicon size."
            ],
            outcome: "A responsive vector mark that remains legible at small sizes."
          }
        ]
      },
      {
        name: "Build",
        tasks: [
          {
            title: "Cohesive 5-Asset Brand Identity Package",
            objective: "Create a complete visual identity kit for a fictional wellness or tech startup.",
            why: "Clients rarely want just a logo; they want a full brand kit they can immediately put to work.",
            steps: [
              "Design primary logo, alternate badge mark, color palette, and type pairing.",
              "Apply the system to 3 touchpoints: business card, email header, and packaging label.",
              "Compile into a clean Figma presentation board."
            ],
            outcome: "A polished brand guidelines presentation board."
          },
          {
            title: "Multi-Platform Campaign Ad Set",
            objective: "Design a 6-part digital marketing creative set maintaining consistent visual language.",
            why: "Performance marketing teams constantly hire freelancers for social creative variation.",
            steps: [
              "Create Instagram Feed, Story, and LinkedIn banner variants.",
              "Test different value propositions while maintaining identical branding.",
              "Export assets in optimized PNG/WebP formats."
            ],
            outcome: "A full digital campaign asset folder ready for deployment."
          }
        ]
      },
      {
        name: "Portfolio",
        tasks: [
          {
            title: "Build a Behance or PDF Visual Portfolio",
            objective: "Curate your top 3 projects into a beautiful, cohesive visual presentation.",
            why: "Art directors and clients decide within 10 seconds of scanning your portfolio whether to contact you.",
            steps: [
              "Display realistic 3D mockups (tote bag, smartphone screen, stationery).",
              "Write a short paragraph on the client brief and your design rationale.",
              "Ensure crisp resolution and consistent thumbnail covers."
            ],
            outcome: "A public Behance/Figma link or clean PDF ready to share."
          },
          {
            title: "Document Design Decisions & Rationales",
            objective: "Explain WHY you chose specific colors, typefaces, and layout structures.",
            why: "Clients pay top rates to designers who solve business problems, not just decorate.",
            steps: [
              "Highlight the target customer demographic for each piece.",
              "Explain how the design choices influence reader trust and action.",
              "Add a client testimonial placeholder or self-evaluation rubric."
            ],
            outcome: "A design rationale document supporting each portfolio piece."
          }
        ]
      },
      {
        name: "Find Work",
        tasks: [
          {
            title: "Brand Support Service Listing",
            objective: "Create an offer for 'Social Media Brand Kits & Marketing Assets for Small Businesses'.",
            why: "Small businesses constantly need monthly visual assets for social media and marketing.",
            steps: [
              "List exact deliverables: 10 social templates, brand style sheet, font guides.",
              "State revision terms (e.g. 2 rounds included) and turnaround times.",
              "Set a clear starter package price."
            ],
            outcome: "A client-ready service PDF brochure."
          },
          {
            title: "Targeted Outreach to Local Businesses & Creators",
            objective: "Reach out to 5 local brands or creators with polite, constructive visual recommendations.",
            why: "Direct outreach showing immediate value builds relationships without platform fee deductions.",
            steps: [
              "Find a business with inconsistent Instagram branding.",
              "Politely share 1 free mockup showing how their announcement could look cleaner.",
              "Offer a conversation with zero pressure."
            ],
            outcome: "5 relationship-building outreach messages sent."
          }
        ]
      }
    ]
  },
  "Content Writing": {
    description: "Crafting clear, compelling articles, web copy, newsletters, and guides that answer reader questions and inspire action.",
    suitable: "Detail-oriented writers who love research, clear communication, psychology, and structuring arguments.",
    difficulty: "Beginner-friendly · Focus on research, clarity, and tone",
    stages: [
      {
        name: "Learn",
        tasks: [
          {
            title: "Search Intent & Reader Psychology",
            objective: "Understand informational vs commercial search intent and reader pain points.",
            why: "Content succeeds when it immediately answers what the reader was searching for.",
            steps: [
              "Research the top 5 questions beginners ask in your chosen niche.",
              "Outline the reader's current problem and the exact relief they want.",
              "Draft an outline using H2 and H3 questions as headings."
            ],
            outcome: "A comprehensive article outline addressing reader intent."
          },
          {
            title: "Editing for Scannability & High Retention",
            objective: "Learn to eliminate fluff, shorten sentences, and format with bullets and bold highlights.",
            why: "Online readers don't read word-by-word; they scan. Great formatting drives reading completion.",
            steps: [
              "Take a 500-word draft and edit it down to 350 words without losing meaning.",
              "Ensure no paragraph exceeds 3 sentences.",
              "Add bulleted lists and bold key phrases."
            ],
            outcome: "A punchy, highly readable 350-word editorial piece."
          }
        ]
      },
      {
        name: "Practice",
        tasks: [
          {
            title: "800-Word Comprehensive How-To Guide",
            objective: "Write an authoritative tutorial that teaches a beginner how to solve one specific problem.",
            why: "How-to guides form the backbone of modern content marketing and affiliate publishing.",
            steps: [
              "Include step-by-step numbered instructions.",
              "Provide real-world tips and common pitfalls to avoid.",
              "Write a compelling, benefit-focused headline."
            ],
            outcome: "An 800-word polished guide formatted in Google Docs."
          },
          {
            title: "High-Converting Landing Page Copy",
            objective: "Write hero headlines, value props, objection handling, and CTA buttons for a service.",
            why: "Copywriting directly drives sales and is one of the highest-paid writing services online.",
            steps: [
              "Use the PAS formula (Problem - Agitate - Solve).",
              "Write 5 headline variations testing different emotional hooks.",
              "Draft concise social proof blurbs."
            ],
            outcome: "A complete 1-page website copywriting document."
          }
        ]
      },
      {
        name: "Build",
        tasks: [
          {
            title: "5-Part Email Welcome & Onboarding Sequence",
            objective: "Write a 5-day automated email drip welcoming new subscribers and building trust.",
            why: "Email marketing boasts the highest ROI of any digital channel and clients hire specialists constantly.",
            steps: [
              "Email 1: Welcome & delivery of lead magnet.",
              "Email 2: Vulnerable origin story & shared values.",
              "Email 3: Surprising insight & common myth debunked.",
              "Email 4: Customer case study & breakdown.",
              "Email 5: Clear call-to-action to work together."
            ],
            outcome: "A 5-email automated nurture sequence."
          },
          {
            title: "In-Depth Product Comparison Article",
            objective: "Write a balanced comparison of 2 popular tools (e.g. Notion vs Obsidian) with transparent pros/cons.",
            why: "Comparison queries attract readers ready to make purchasing decisions.",
            steps: [
              "Create a feature comparison matrix table.",
              "Break down pricing, usability, and ideal user persona for each.",
              "Include proper affiliate disclosure statements."
            ],
            outcome: "A 1,200-word decision-guide article."
          }
        ]
      },
      {
        name: "Portfolio",
        tasks: [
          {
            title: "Curate a Google Drive or Notion Portfolio Clip Hub",
            objective: "Organize your best 4 writing samples into a clean, easy-to-read Notion or Docs portfolio.",
            why: "Editors and content marketing managers appreciate zero-friction links where they can review copy immediately.",
            steps: [
              "Label each piece with: Niche, Format (e.g. SEO Guide), and Word Count.",
              "Provide a 2-sentence summary of the brief and outcome.",
              "Ensure Google Doc view permissions are set to 'Anyone with link can view'."
            ],
            outcome: "A shareable writer portfolio link."
          },
          {
            title: "Publish 1 Article on Medium or Substack",
            objective: "Publish a real, live article online with clean formatting and custom cover image.",
            why: "Having live published bylines proves you can use modern content management systems.",
            steps: [
              "Format headings, pull quotes, and images cleanly.",
              "Publish under your real name or author pseudonym.",
              "Add to your professional LinkedIn profile."
            ],
            outcome: "A live published article with social proof."
          }
        ]
      },
      {
        name: "Find Work",
        tasks: [
          {
            title: "Define Your Writing Niche & Rate Card",
            objective: "Choose 1–2 industries (FinTech, B2B SaaS, Health & Wellness) and set per-word or per-project pricing.",
            why: "Niche writers command 3x higher rates than generalists because they require zero domain training.",
            steps: [
              "Identify industry topics you genuinely enjoy reading about.",
              "Package per-article flat rates ($100, $250, $500 tiers).",
              "Draft standard terms: includes 1 round of revisions within 7 days."
            ],
            outcome: "A one-page writer rate and service card."
          },
          {
            title: "Direct Pitching to Editors & Marketing Leads",
            objective: "Send 5 custom story ideas or content pitches to blogs and digital marketing directors.",
            why: "Content managers are always hungry for reliable writers who come prepared with pre-packaged ideas.",
            steps: [
              "Identify 5 blogs that accept guest contributions or hire freelance writers.",
              "Pitch 2 specific article headlines with 3 bullet-point outlines.",
              "Link directly to your top 2 relevant portfolio samples."
            ],
            outcome: "5 sent customized editorial pitches."
          }
        ]
      }
    ]
  },
  "Video Editing": {
    description: "Assembling footage, pacing, audio balancing, subtitles, and color grading to tell engaging video stories.",
    suitable: "Storytellers who understand pacing, sound design, visual hooks, and audience attention retention.",
    difficulty: "Moderate · Rewarding hands-on software learning",
    stages: [
      {
        name: "Learn",
        tasks: [
          {
            title: "NLE Timeline Mastery & Keyboard Shortcuts",
            objective: "Learn timeline navigation, ripple edits, razor tools, and multi-track audio in DaVinci Resolve or Premiere.",
            why: "Speed is an editor's greatest competitive advantage. Shortcuts double your hourly earning power.",
            steps: [
              "Import footage, organize bin structures (A-roll, B-roll, Music, SFX).",
              "Master J-K-L playback and Ripple Delete shortcuts.",
              "Build a rough assembly cut of a 60-second video."
            ],
            outcome: "A fast, shortcut-driven editing workflow."
          },
          {
            title: "Audio Balancing, Sound Effects & Music Pacing",
            objective: "Master loudness normalization (-14 LUFS), noise reduction, and sound effect timing.",
            why: "Viewers will tolerate average video, but bad audio makes them click away within 3 seconds.",
            steps: [
              "Clean background hiss with basic parametric EQ.",
              "Set voice audio to peak around -6dB to -3dB.",
              "Cut transitions and text pops precisely on the beat of the background music."
            ],
            outcome: "Crisp, balanced stereo audio with ambient SFX."
          }
        ]
      },
      {
        name: "Practice",
        tasks: [
          {
            title: "Dynamic Social Media Subtitles & Animations",
            objective: "Create animated, color-highlighted captions formatted for vertical 9:16 mobile screens.",
            why: "Over 70% of social media video is viewed on mute. Captions are mandatory for client work.",
            steps: [
              "Generate clean subtitles with readable fonts (Inter, Montserrat, Arial Black).",
              "Add subtle scale-up keyframes on emphasized words.",
              "Ensure captions stay inside the safe zone away from platform UI icons."
            ],
            outcome: "A 30-second captioned talking-head short."
          },
          {
            title: "Pacing & Visual Hook Optimization",
            objective: "Edit the first 3 seconds of a video to maximize retention with movement and curiosity.",
            why: "The first 3 seconds dictate whether the algorithm recommends the video or drops it.",
            steps: [
              "Add an eye-catching B-roll cut or text prompt in second 0–1.",
              "Eliminate dead air, breaths, and pauses from the speaker's audio.",
              "Cut between wide and punched-in shots on key statements."
            ],
            outcome: "A high-retention 15-second hook edit."
          }
        ]
      },
      {
        name: "Build",
        tasks: [
          {
            title: "30-Second Commercial Promo Video",
            objective: "Edit a punchy product showcase video using permitted stock footage, music, and kinetic text.",
            why: "E-commerce brands and local events constantly hire editors for paid ad creatives.",
            steps: [
              "Source high-quality royalty-free clips from Pexels/Pixabay.",
              "Layer sound effects (whooshes, risers, hits) to accentuate motion.",
              "Color grade clips for cohesive tone and contrast."
            ],
            outcome: "A commercial-grade 30-second promo ad."
          },
          {
            title: "Talking-Head Educational YouTube Video",
            objective: "Edit a 3-minute tutorial with chapter titles, diagram cutaways, and lower-third badges.",
            why: "Creators on YouTube pay ongoing monthly retainers to reliable editors who understand formatting.",
            steps: [
              "Add branded lower-third name graphics.",
              "Insert screen recordings and diagram overlays at appropriate moments.",
              "Export in high-bitrate 1080p or 4K with clean render settings."
            ],
            outcome: "A full 3-minute structured YouTube video edit."
          }
        ]
      },
      {
        name: "Portfolio",
        tasks: [
          {
            title: "Cut a 45-Second Fast-Paced Showreel",
            objective: "Compile your best cuts, motion graphics, and audio drops into an energetic reel.",
            why: "Clients want to feel the energy of your work in under 60 seconds.",
            steps: [
              "Select your top 8 visual moments.",
              "Time every cut to an upbeat music track.",
              "Add a title card with your name, contact email, and specializations."
            ],
            outcome: "A 45-second high-impact showreel video."
          },
          {
            title: "Upload Unlisted YouTube or Google Drive Portfolio Hub",
            objective: "Create a clean portfolio folder with 3 full-length video samples and the showreel.",
            why: "Gives clients full visibility into your pacing on real projects without file compression artifacts.",
            steps: [
              "Organize by format: Short-Form (TikTok/Reels) vs Long-Form (YouTube).",
              "Include a short note detailing what software was used and what role you played.",
              "Verify shared folder links work in incognito mode."
            ],
            outcome: "A verified video portfolio link."
          }
        ]
      },
      {
        name: "Find Work",
        tasks: [
          {
            title: "Short-Form Creator Monthly Retainer Package",
            objective: "Package a monthly service: 'I edit 12 short-form reels/TikToks per month for $600.'",
            why: "Retainers provide recurring monthly income and save you from hunting for new clients every week.",
            steps: [
              "Define turnaround: e.g. 48-hour delivery per batch.",
              "Include 1 revision round per video.",
              "Specify source footage requirements and upload folder."
            ],
            outcome: "A standardized monthly creator retainer agreement."
          },
          {
            title: "Cold Email & DM Outreach to Growing Creators",
            objective: "Reach out to 5 creators with a free 15-second sample edit showing how to improve retention.",
            why: "A free sample of THEIR footage showing immediate improvement is the #1 way editors get hired.",
            steps: [
              "Download a publicly available video from a podcast or creator.",
              "Edit the best 30 seconds into an engaging captioned short.",
              "Send it with a friendly note: 'I loved this episode and made this short for you to post!'"
            ],
            outcome: "5 customized creator pitches with sample reels."
          }
        ]
      }
    ]
  },
  "Excel & Data": {
    description: "Organizing raw information, building formulas, automating calculations, and creating decision-ready dashboards.",
    suitable: "Systematic thinkers who enjoy logic, numbers, categorization, accuracy, and operational efficiency.",
    difficulty: "Beginner-friendly · Scales to high-value enterprise consulting",
    stages: [
      {
        name: "Learn",
        tasks: [
          {
            title: "Data Hygiene & Tabular Formatting",
            objective: "Learn data types, clean headers, date standardization, and eliminating blank rows.",
            why: "80% of data work is cleaning. If data is poorly formatted, formulas and pivot tables will break.",
            steps: [
              "Standardize date formats (YYYY-MM-DD) across inconsistent entries.",
              "Use TRIM, PROPER, and CLEAN to fix messy text inputs.",
              "Convert raw cell ranges into official formatted Excel/Sheets Tables."
            ],
            outcome: "A normalized, error-free raw dataset."
          },
          {
            title: "Essential Formulas: XLOOKUP, IF, COUNTIF & SUMIFS",
            objective: "Master dynamic formulas to search datasets and calculate conditional sums.",
            why: "These 5 core formulas power 95% of day-to-day business reporting and inventory trackers.",
            steps: [
              "Build an XLOOKUP to pull product prices based on SKU codes.",
              "Use SUMIFS to calculate revenue filtered by both region and month.",
              "Implement nested IF or IFS statements to categorize lead scores."
            ],
            outcome: "A formula sheet with dynamic lookup calculations."
          }
        ]
      },
      {
        name: "Practice",
        tasks: [
          {
            title: "Pivot Tables & Dynamic Slicers",
            objective: "Aggregate 1,000+ rows of sample sales data into instant category summaries and drill-downs.",
            why: "Pivot tables allow business owners to answer complex questions in seconds without writing code.",
            steps: [
              "Insert a Pivot Table summarizing sales by salesperson and region.",
              "Add interactive slicers for quick year and status filtering.",
              "Calculate year-over-year percentage growth."
            ],
            outcome: "An interactive pivot summary with visual slicers."
          },
          {
            title: "Conditional Formatting & Data Validation Rules",
            objective: "Build dropdown menus and automatic color alerts for overdue tasks or budget overruns.",
            why: "Prevents human entry error and draws immediate attention to critical business metrics.",
            steps: [
              "Add dropdown lists using Data Validation rules.",
              "Apply color scales to highlight high-value sales.",
              "Set an alert rule that turns a row red if days overdue exceeds 30."
            ],
            outcome: "A self-auditing spreadsheet with visual alert rules."
          }
        ]
      },
      {
        name: "Build",
        tasks: [
          {
            title: "Sales & Revenue Executive Dashboard",
            objective: "Build a single-page clean dashboard with KPI scorecards, trendline charts, and breakdown bars.",
            why: "Executives pay consultants for clarity. A well-designed dashboard drives real business decisions.",
            steps: [
              "Create 4 KPI cards: Total Revenue, Gross Margin %, Average Order Value, Active Clients.",
              "Add a clean monthly trendline chart with no visual clutter.",
              "Build a regional breakdown bar chart."
            ],
            outcome: "A professional executive KPI dashboard."
          },
          {
            title: "Small Business Cash Flow & Budget Tracker",
            objective: "Build an operational cash flow forecast showing incoming invoices vs upcoming expenses.",
            why: "Cash flow mismanagement is the #1 reason small businesses struggle. This tool is universally needed.",
            steps: [
              "Set up income, fixed expense, and variable expense tabs.",
              "Calculate net monthly cash balance automatically.",
              "Add a warning indicator when projected balance dips below safe thresholds."
            ],
            outcome: "A complete small business cash flow template."
          }
        ]
      },
      {
        name: "Portfolio",
        tasks: [
          {
            title: "Create 3 Anonymized Showcase Sheets with Screenshots",
            objective: "Package your dashboard, cash tracker, and data cleanup project with dummy numbers.",
            why: "Real client numbers are confidential. Anonymized dummy templates allow you to showcase capability safely.",
            steps: [
              "Replace names and company identifiers with realistic fictional data.",
              "Capture high-resolution screenshots of formulas and dashboards.",
              "Upload view-only Google Sheets links or downloadable Excel files."
            ],
            outcome: "3 anonymized spreadsheet portfolio templates."
          },
          {
            title: "Write Business Problem & Solution Summaries",
            objective: "Explain what business question each spreadsheet answers and how much time it saves.",
            why: "Clients hire data specialists to save hours of manual busywork every week.",
            steps: [
              "State: 'Before this sheet, the client spent 4 hours a week manually tallying orders.'",
              "Detail the exact formulas and automated summary views implemented.",
              "Highlight ease of ongoing use."
            ],
            outcome: "A 1-page data case study document."
          }
        ]
      },
      {
        name: "Find Work",
        tasks: [
          {
            title: "Spreadsheet Cleanup & Automation Service Package",
            objective: "Package a service: 'I turn your messy spreadsheets into clean, automated reporting dashboards.'",
            why: "Nearly every small business has an unwieldy spreadsheet they're embarrassed to show. You fix it.",
            steps: [
              "Define package: 3-day turnaround, data normalization, 1 custom dashboard tab.",
              "Include a 15-minute Loom video walking the client through how to use it.",
              "Set a clear project price ($150–$350)."
            ],
            outcome: "A service proposal ready for business owners."
          },
          {
            title: "Job Applications for Remote Spreadsheet & Ops Roles",
            objective: "Apply to 5 remote Operations Assistant, Data Entry, or Reporting roles on LinkedIn/Upwork.",
            why: "Companies frequently hire dedicated spreadsheet wizards for regular remote operational support.",
            steps: [
              "Tailor your resume highlighting Excel/Sheets formulas, speed, and accuracy.",
              "Attach screenshots of your dashboard portfolio in your cover letter.",
              "Complete skills assessments to showcase verification badges."
            ],
            outcome: "5 targeted applications submitted."
          }
        ]
      }
    ]
  },
  "Social Media Management": {
    description: "Planning content pillars, designing posts, writing captions, engaging communities, and analyzing growth metrics.",
    suitable: "Communicators who understand audience psychology, brand voice, content calendars, and digital trends.",
    difficulty: "Beginner-friendly · Requires consistency and strategic focus",
    stages: [
      {
        name: "Learn",
        tasks: [
          {
            title: "Content Pillars & Audience Persona Definition",
            objective: "Define 4 core topics (pillars) and a detailed target customer profile for a brand.",
            why: "Random posting fails. Consistent content pillars build authority and clear audience expectations.",
            steps: [
              "Pick a business (e.g. boutique fitness studio or specialty bakery).",
              "Establish 4 pillars: Education, Behind-The-Scenes, Customer Transformation, Product Spotlight.",
              "Draft target customer persona: demographics, daily challenges, values."
            ],
            outcome: "A documented content strategy blueprint."
          },
          {
            title: "Content Calendar Architecture & Scheduling",
            objective: "Build a structured monthly calendar mapping post themes, formats, and optimal posting times.",
            why: "Organization prevents last-minute scramble and allows consistent, strategic publishing.",
            steps: [
              "Set up a calendar in Notion or Google Sheets with Date, Pillar, Format, Caption, and Status columns.",
              "Plan 12 posts across a 4-week span with varied formats (carousel, reel, single image).",
              "Draft standard call-to-action rotations."
            ],
            outcome: "A complete 30-day social media editorial calendar."
          }
        ]
      },
      {
        name: "Practice",
        tasks: [
          {
            title: "Brand Voice Copywriting & Carousel Slides",
            objective: "Write 3 distinct captions delivering the same message in 3 different brand tones (witty, authoritative, calm).",
            why: "A social media manager must seamlessly adopt the client's voice, not just their own.",
            steps: [
              "Draft a caption for a luxury spa (calm, elegant).",
              "Draft the same message for an indie gym (high energy, direct).",
              "Create a 5-slide educational carousel summarizing key points."
            ],
            outcome: "A voice versatility portfolio piece with carousel slides."
          },
          {
            title: "Social Media Analytics & Growth Metrics Interpretation",
            objective: "Analyze sample impressions, engagement rate, saves, and reach to recommend 3 actionable improvements.",
            why: "Vanity likes don't matter to business owners; shares, saves, and inquiry clicks do.",
            steps: [
              "Calculate engagement rate = (Engagements / Total Reach) * 100.",
              "Identify which content pillar generated the highest save and share metrics.",
              "Write a short 3-point recommendation note for next month."
            ],
            outcome: "A mock monthly client performance audit report."
          }
        ]
      },
      {
        name: "Build",
        tasks: [
          {
            title: "7-Day Comprehensive Multi-Asset Campaign",
            objective: "Create 7 fully finished posts (visual asset + polished caption + targeted hashtag set) for a brand.",
            why: "Proves to prospective clients that you can handle end-to-end production without handholding.",
            steps: [
              "Design 7 Canva/Figma graphics matching brand colors.",
              "Write engaging captions with curiosity hooks and clear questions to encourage comments.",
              "Select 15 relevant, niche-specific hashtags."
            ],
            outcome: "A full week of ready-to-publish campaign assets."
          },
          {
            title: "Community Management & Engagement Playbook",
            objective: "Draft standard response templates for common customer inquiries, compliments, and complaints.",
            why: "Brands need confident community managers who protect reputation and convert comments into customers.",
            steps: [
              "Write polite, brand-aligned answers to 5 common customer questions.",
              "Draft a de-escalation framework for addressing a dissatisfied client comment.",
              "Outline proactive outreach steps to engage target audience accounts daily."
            ],
            outcome: "A complete community management SOP document."
          }
        ]
      },
      {
        name: "Portfolio",
        tasks: [
          {
            title: "Assemble a Social Media Case Study Slide Deck",
            objective: "Combine your content calendar, 7 sample posts, and strategy blueprint into a clean presentation.",
            why: "Business owners want to see a cohesive strategy before granting access to their company accounts.",
            steps: [
              "Create an 8-slide presentation in Canva or Google Slides.",
              "Include mockups of how the grid looks when published.",
              "State the business objective and target audience clearly on slide 1."
            ],
            outcome: "A presentation-ready social media portfolio deck."
          },
          {
            title: "Publish Real Samples on a Live Practice Account",
            objective: "Publish 9 coordinated posts on an Instagram or LinkedIn page showcasing aesthetic curation.",
            why: "A live 9-grid profile allows prospective clients to verify formatting and bio optimization in real life.",
            steps: [
              "Optimize the bio with a clear value statement and link.",
              "Publish the 9 grid posts in planned order.",
              "Add highlights covers with relevant categories."
            ],
            outcome: "A live demonstration profile."
          }
        ]
      },
      {
        name: "Find Work",
        tasks: [
          {
            title: "Monthly Social Media Management Starter Package",
            objective: "Package an offer: '12 branded posts, monthly content calendar, and caption writing for $400/month.'",
            why: "A defined, predictable package eliminates client friction and guarantees monthly recurring revenue.",
            steps: [
              "List exact inclusions: graphic design, copywriting, calendar approval, monthly metrics review.",
              "Set expectations: client provides raw photos/videos; you handle strategy and polish.",
              "Draft a simple onboarding checklist for new clients."
            ],
            outcome: "A packaged social media service agreement."
          },
          {
            title: "Direct Outreach to Local Businesses with Active Needs",
            objective: "Identify 5 local businesses with dormant or inconsistent social accounts and propose assistance.",
            why: "Busy local business owners know they should post, but lack time. A helpful proposal solves their headache.",
            steps: [
              "Audit their current profile: note when they last posted.",
              "Send a supportive, polite message with 2 free post ideas tailored to their current season.",
              "Offer to manage a 14-day trial without locking them into long contracts."
            ],
            outcome: "5 direct outreach messages sent to business owners."
          }
        ]
      }
    ]
  }
};

export const EARNING_PATH_CONTENT = {
  "Freelancing": {
    title: "Freelancing",
    intro: "Provide specialized services directly to clients, setting clear scope and earning on agreed terms.",
    roadmaps: ["Web Development", "Graphic Design", "Content Writing", "Video Editing", "Excel & Data", "Social Media Management"],
    resources: ["upwork", "googleDocs"],
    sections: [
      {
        title: "What Freelancing Truly Is",
        content: "Freelancing means working as an independent contractor providing services directly to businesses or individuals. You agree on deliverables, deadlines, and pricing, and get paid upon completion."
      },
      {
        title: "In-Demand Beginner Skills",
        content: "Web development, graphic design, content writing, video editing, spreadsheet reporting, and social media management have constant commercial demand from small businesses globally."
      },
      {
        title: "How to Build an Irresistible Portfolio",
        content: "When starting with zero clients, build practice projects for fictional businesses. Document the problem, your solution, and provide live links or screenshots. 3 polished case studies beat 20 unfinished sketches."
      },
      {
        title: "Landing Your First Paying Client",
        content: "Start small. Target micro-projects with fast turnarounds. Personalize every proposal: mention the client's goal, provide a relevant sample, and ask a thoughtful question. Never copy-paste boilerplate proposals."
      },
      {
        title: "Legitimate Platforms",
        content: "Upwork, Fiverr, LinkedIn Jobs, and direct email outreach to local businesses. Always verify client payment methods and avoid taking transactions off-platform until trust is established."
      },
      {
        title: "Realistic Income Expectations",
        content: "The first 2–4 weeks are spent learning, building samples, and submitting proposals. Income is never instant or guaranteed; earnings grow as your portfolio, communication, and reputation compound."
      },
      {
        title: "Scam Warnings & Red Flags",
        content: "Never pay upfront fees to receive a job. Never cash third-party checks or buy equipment with promised reimbursement. Legitimate employers pay you—never the other way around.",
        isScamCard: true
      }
    ]
  },
  "Affiliate Marketing": {
    title: "Affiliate Marketing",
    intro: "Create genuinely helpful, honest content recommending products you research, earning commissions on qualifying sales.",
    roadmaps: ["Content Writing", "Social Media Management", "Video Editing", "Graphic Design"],
    resources: ["ftcDisclosureGuide", "googleDocs"],
    sections: [
      {
        title: "How Affiliate Marketing Operates",
        content: "You publish helpful articles, tutorials, or comparison guides for a target audience. When a reader clicks your verified affiliate link and makes a purchase, the merchant pays you a commission."
      },
      {
        title: "Selecting a Viable Niche",
        content: "Choose topics you can research thoroughly and recommend honestly: beginner software tools, productivity systems, home organization, or skills you are actively mastering. Choose audience trust over high commissions."
      },
      {
        title: "Content Strategies That Convert",
        content: "Write detailed comparison articles, honest reviews highlighting both pros and cons, and step-by-step tutorials. Explain who the product is NOT for. Authentic honesty builds long-term reader trust."
      },
      {
        title: "Strict Legal Disclosure Requirements",
        content: "The FTC and international advertising regulators require clear, conspicuous disclosure near your links. Clearly state: 'I may earn a commission if you purchase through this link at no additional cost to you.'"
      },
      {
        title: "Legitimate Affiliate Networks",
        content: "Apply to official brand affiliate programs or established networks like Amazon Associates, ShareASale, CJ, or Impact. Never pay to join an affiliate program."
      },
      {
        title: "Realistic Income Expectations",
        content: "Building search traffic or an audience takes 3–6+ months of consistent publishing. Commissions are not guaranteed and depend on audience size, product relevance, and program terms."
      },
      {
        title: "Scam Warnings & Red Flags",
        content: "Avoid gurus promising 'passive automated $5,000/day income'. Beware of multi-level schemes pressuring you to recruit other members rather than selling real products to genuine customers.",
        isScamCard: true
      }
    ]
  },
  "Online Jobs": {
    title: "Online Remote Jobs",
    intro: "Find legitimate remote employment or contract positions with established companies that match your capabilities.",
    roadmaps: ["Excel & Data", "Content Writing", "Graphic Design", "Web Development", "Social Media Management"],
    resources: ["linkedinJobs", "googleDocs"],
    sections: [
      {
        title: "Types of Legitimate Remote Roles",
        content: "Entry-level remote roles include Customer Support Associate, Virtual Assistant, Spreadsheet & Data Entry Support, Content Writer, Junior Designer, and Operations Coordinator."
      },
      {
        title: "Searching Effectively",
        content: "Use verified job boards like LinkedIn Jobs, WeWorkRemotely, and official company career portals. Search specific terms like 'remote customer support entry level' rather than generic 'make money online'."
      },
      {
        title: "Resume & Profile Preparation",
        content: "Keep your resume to one clean, honest page highlighting relevant software tools (Excel, Docs, Slack, Notion) and practical samples. Never claim experience or credentials you do not possess."
      },
      {
        title: "Application Strategy",
        content: "Submit 3 tailored, thoughtful applications with custom cover notes rather than blasting 50 generic resumes. Address specific requirements listed in the job description."
      },
      {
        title: "Interview & Assessment Preparation",
        content: "Prepare for asynchronous video interviews, typing assessments, or small paid test projects. Test your internet connection, camera, and microphone in advance."
      },
      {
        title: "Realistic Timelines",
        content: "Remote job searches often take 4–12 weeks from application to first paycheck. Consistency, continuous skill enhancement, and interview preparation are key."
      },
      {
        title: "Scam Warnings & Red Flags",
        content: "Legitimate companies will never interview exclusively via Telegram or WhatsApp. They will never charge application fees, background check fees, or ask you to purchase equipment from their 'preferred vendor'.",
        isScamCard: true
      }
    ]
  }
};

export const PROJECT_TEMPLATES = {
  "Web Development": {
    type: "Responsive Landing Page",
    objective: "Design and code a mobile-first, accessible landing page for a fictional local business with clear calls to action.",
    requirements: [
      "Mobile-first responsive layout (320px to 1440px)",
      "Accessible semantic HTML with clean heading hierarchy",
      "Interactive contact or inquiry form with validation",
      "Optimized images and clean typography"
    ],
    steps: [
      "Define business concept (e.g. artisan bakery, veterinary clinic)",
      "Sketch wireframe for mobile and desktop screens",
      "Code semantic HTML structure and CSS variables",
      "Add interactive JavaScript form handling",
      "Deploy live build to GitHub Pages and verify performance"
    ],
    deliverables: [
      "Live deployed URL",
      "Public GitHub repository with README",
      "High-resolution mobile and desktop screenshots"
    ],
    skills: ["HTML5", "CSS3", "Responsive Design", "JavaScript", "Web Accessibility"]
  },
  "Graphic Design": {
    type: "Brand Identity Concept",
    objective: "Create a cohesive visual identity kit including logo mark, typography pairing, color system, and 3 applied assets.",
    requirements: [
      "Target audience definition and creative brief",
      "WCAG-compliant 5-color palette",
      "Primary logo and icon variant in vector format",
      "3 real-world application mockups"
    ],
    steps: [
      "Write a one-paragraph creative brief and target persona",
      "Sketch 10 logo ideas and vectorize the best concept",
      "Establish typography pairing and color palette",
      "Apply the branding to 3 mockups (packaging, social, stationery)",
      "Assemble into a presentation board with rationale"
    ],
    deliverables: [
      "Visual brand presentation board",
      "Vector logo files (SVG/PNG)",
      "1-page design rationale document"
    ],
    skills: ["Visual Hierarchy", "Typography", "Color Theory", "Figma", "Brand Identity"]
  },
  "Content Writing": {
    type: "Comprehensive How-To Guide",
    objective: "Write an authoritative 800–1,200 word guide answering a specific beginner question with actionable instructions.",
    requirements: [
      "Clear target reader intent identified",
      "Search-optimized H2/H3 outline",
      "Zero fluff with bulleted checklists and actionable tips",
      "Proofread for 100% factual accuracy and grammar"
    ],
    steps: [
      "Research the reader's core problem and list key questions",
      "Draft a structured outline with benefit-focused headings",
      "Write first draft focusing on clear explanations",
      "Perform a second pass editing for scannability and brevity",
      "Format cleanly in Google Docs with shareable link"
    ],
    deliverables: [
      "800–1,200 word polished article in Google Docs",
      "Reader persona and intent brief",
      "Target headline variations"
    ],
    skills: ["Research", "Article Structuring", "SEO Writing", "Copy Editing", "Formatting"]
  },
  "Video Editing": {
    type: "Dynamic Social Media Promo",
    objective: "Edit a high-retention 30–60 second promotional video with animated captions, music pacing, and clean cuts.",
    requirements: [
      "Strong visual hook in the first 3 seconds",
      "Animated, color-highlighted subtitles",
      "Balanced audio with music normalized to -14 LUFS",
      "Exported in 9:16 vertical mobile aspect ratio"
    ],
    steps: [
      "Source permitted B-roll and audio footage",
      "Cut rough assembly removing dead air and breath pauses",
      "Add animated captions and sound effects on transitions",
      "Color grade and balance audio tracks",
      "Export high-bitrate MP4 and review on a smartphone"
    ],
    deliverables: [
      "Final 30–60 second MP4 video file",
      "Captioned and uncaptioned clean exports",
      "Short editing rationale and asset attribution log"
    ],
    skills: ["Pacing", "Subtitling", "Audio Mixing", "Color Grading", "DaVinci Resolve / Premiere"]
  },
  "Excel & Data": {
    type: "Executive Sales Dashboard",
    objective: "Transform a raw sample sales dataset into a dynamic, interactive dashboard with KPI cards and charts.",
    requirements: [
      "Normalized, error-free raw data table",
      "Automated formulas (SUMIFS, XLOOKUP, IF)",
      "Interactive Pivot Tables and Slicers",
      "At least 2 clean, un-cluttered visual charts"
    ],
    steps: [
      "Clean raw data using TRIM and date formatting",
      "Construct summary pivot tables aggregating sales by region and month",
      "Build KPI scorecards for revenue, margin, and order count",
      "Design clean bar and trendline charts",
      "Write 2 business observations derived from the data"
    ],
    deliverables: [
      "Completed Google Sheets / Excel workbook",
      "Anonymized raw data tab",
      "Executive summary of key business insights"
    ],
    skills: ["Data Hygiene", "Formulas", "Pivot Tables", "Data Visualization", "Spreadsheet Design"]
  },
  "Social Media Management": {
    type: "7-Day Strategic Campaign",
    objective: "Develop a cohesive 7-day social media campaign including editorial calendar, visual graphics, and captions.",
    requirements: [
      "Target audience profile and campaign objective",
      "7 structured post ideas mapped across content pillars",
      "3 fully designed visual assets",
      "Engaging captions with clear calls to action"
    ],
    steps: [
      "Define campaign goal (e.g. holiday promotion or product launch)",
      "Map out 7 days of varied post types in a calendar grid",
      "Design 3 graphics in Canva/Figma matching brand guidelines",
      "Write conversational captions with curiosity hooks",
      "Compile into an organized client presentation document"
    ],
    deliverables: [
      "7-day editorial calendar spreadsheet",
      "3 high-resolution visual post graphics",
      "Campaign strategy summary and hashtag sets"
    ],
    skills: ["Content Strategy", "Graphic Design", "Copywriting", "Calendar Planning", "Community Engagement"]
  }
};

/**
 * Path Finder recommendation algorithm
 * Computes weighted scores across Freelancing, Affiliate Marketing, and Online Jobs
 */
export function getRecommendation(skills, time, goal) {
  const scores = { "Freelancing": 0, "Affiliate Marketing": 0, "Online Jobs": 0 };

  const skillScores = {
    "Technology": { "Freelancing": 3, "Online Jobs": 3 },
    "Design": { "Freelancing": 3, "Affiliate Marketing": 1, "Online Jobs": 1 },
    "Writing": { "Freelancing": 2, "Affiliate Marketing": 3, "Online Jobs": 1 },
    "Social Media": { "Freelancing": 2, "Affiliate Marketing": 3 },
    "Data/Excel": { "Freelancing": 2, "Online Jobs": 3 },
    "Video": { "Freelancing": 3, "Affiliate Marketing": 2 }
  };

  skills.forEach((skill) => {
    if (skillScores[skill]) {
      Object.entries(skillScores[skill]).forEach(([path, points]) => {
        scores[path] += points;
      });
    }
  });

  const goalScores = {
    "Side income": { "Freelancing": 2, "Affiliate Marketing": 2 },
    "Long-term income": { "Freelancing": 1, "Affiliate Marketing": 3 },
    "Remote job": { "Freelancing": 1, "Online Jobs": 4 },
    "Build a business": { "Freelancing": 1, "Affiliate Marketing": 4 }
  };

  const timeScores = {
    "Less than 1 hour": { "Affiliate Marketing": 2, "Online Jobs": 1 },
    "1–2 hours": { "Freelancing": 1, "Affiliate Marketing": 2 },
    "2–4 hours": { "Freelancing": 2, "Online Jobs": 2, "Affiliate Marketing": 1 },
    "4+ hours": { "Freelancing": 2, "Online Jobs": 2, "Affiliate Marketing": 1 }
  };

  [goalScores[goal], timeScores[time]].forEach((scoreGroup) => {
    if (scoreGroup) {
      Object.entries(scoreGroup).forEach(([path, points]) => {
        scores[path] += points;
      });
    }
  });

  const ranked = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  return {
    primary: ranked[0] || "Freelancing",
    runnerUp: ranked[1] || "Online Jobs",
    scores
  };
}
