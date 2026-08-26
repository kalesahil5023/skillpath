/**
 * SkillSprint Data Layer
 * All content data extracted from the monolithic index.html.
 * Edit content here without touching app logic.
 */

/* eslint-disable quotes */

const pathDetails = {
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

const skillRecommendations = {
    "Freelancing": {
        "Technology": "Web development",
        "Design": "Graphic design",
        "Writing": "Content writing",
        "Social Media": "Social media management",
        "Data/Excel": "Spreadsheet and data-entry support",
        "Video": "Video editing"
    },
    "Affiliate Marketing": {
        "Technology": "Helpful technology content",
        "Design": "Visual content design",
        "Writing": "Helpful content writing",
        "Social Media": "Social media content creation",
        "Data/Excel": "Audience and content research",
        "Video": "Short-form video content"
    },
    "Online Jobs": {
        "Technology": "Entry-level technical support",
        "Design": "Design support",
        "Writing": "Customer support writing",
        "Social Media": "Social media assistance",
        "Data/Excel": "Spreadsheet and administrative support",
        "Video": "Video editing support"
    }
};

const pathDifficulty = {
    "Freelancing": "Beginner-friendly with practice",
    "Affiliate Marketing": "Beginner-friendly, but patience is needed",
    "Online Jobs": "Beginner-friendly with focused applications"
};

const weeklyTime = {
    "Less than 1 hour": "4–6 focused hours per week",
    "1–2 hours": "7–14 focused hours per week",
    "2–4 hours": "14–28 focused hours per week",
    "4+ hours": "28+ focused hours per week"
};

const roadmapLinks = {
    "Freelancing": {
        "Technology": "Web Development", "Design": "Graphic Design", "Writing": "Content Writing",
        "Social Media": "Social Media Management", "Data/Excel": "Excel & Data", "Video": "Video Editing"
    },
    "Affiliate Marketing": {
        "Technology": "Web Development", "Design": "Graphic Design", "Writing": "Content Writing",
        "Social Media": "Social Media Management", "Data/Excel": "Excel & Data", "Video": "Video Editing"
    },
    "Online Jobs": {
        "Technology": "Web Development", "Design": "Graphic Design", "Writing": "Content Writing",
        "Social Media": "Social Media Management", "Data/Excel": "Excel & Data", "Video": "Video Editing"
    }
};

/* Central monetization-safe resource configuration. Keep affiliateStatus as
 * "none" or "pending" until a verified partnership is approved. */
const RESOURCE_CATALOG = {
    mdnLearn: { id:"mdnLearn", name:"MDN Learn Web Development", category:"Learning · Web Development", description:"Official learning modules for front-end foundations.", whyRecommended:"Structured practice for HTML, CSS, JavaScript, accessibility, and responsive design.", officialUrl:"https://developer.mozilla.org/en-US/docs/Learn_web_development", affiliateUrl:"", pricingType:"Free", freeAlternative:"Not needed", limitations:"Focused on web fundamentals; it does not replace building projects.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Web learners", relevantSkills:["Web Development"], relevantProjects:["Responsive landing page"] },
    githubPages: { id:"githubPages", name:"GitHub Pages", category:"Portfolio · Web Development", description:"A service for publishing static websites from a GitHub repository.", whyRecommended:"Lets a finished web project have a live portfolio link.", officialUrl:"https://pages.github.com/", affiliateUrl:"", pricingType:"Free", freeAlternative:"Any static host you independently evaluate", limitations:"Designed for static sites and requires basic GitHub familiarity.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Web portfolios", relevantSkills:["Web Development"], relevantProjects:["Responsive landing page"] },
    figmaLibrary: { id:"figmaLibrary", name:"Figma Resource Library", category:"Learning · Design", description:"Official Figma learning resources, templates, and product guidance.", whyRecommended:"Supports practice with layout, components, and visual collaboration.", officialUrl:"https://www.figma.com/resource-library/", affiliateUrl:"", pricingType:"Freemium", freeAlternative:"Canva Design School", limitations:"Some product features depend on the selected plan.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Design practice", relevantSkills:["Graphic Design"], relevantProjects:["Brand identity concept"] },
    canvaDesignSchool: { id:"canvaDesignSchool", name:"Canva Design School", category:"Learning · Design", description:"Official learning material for visual communication and design basics.", whyRecommended:"Provides approachable exercises in layout, branding, and visual content.", officialUrl:"https://www.canva.com/designschool/", affiliateUrl:"", pricingType:"Freemium", freeAlternative:"Figma Resource Library", limitations:"Some templates and assets require a paid plan.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Design and content practice", relevantSkills:["Graphic Design","Content Writing","Social Media Management"], relevantProjects:["Brand identity concept","7-day content campaign"] },
    googleDocs: { id:"googleDocs", name:"Google Docs", category:"Productivity · Portfolio", description:"A browser-based document tool for drafting, revising, and sharing work.", whyRecommended:"Useful for writing samples, project notes, and application materials.", officialUrl:"https://workspace.google.com/products/docs/", affiliateUrl:"", pricingType:"Free", freeAlternative:"Any local document editor", limitations:"Advanced formatting and offline use can be limited by setup.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Writers and portfolios", relevantSkills:["Content Writing"], relevantProjects:["Long-form helpful article"] },
    davinciResolve: { id:"davinciResolve", name:"DaVinci Resolve", category:"Video", description:"A video-editing application with free and paid options.", whyRecommended:"Supports timeline editing, color, audio, captions, and exports.", officialUrl:"https://www.blackmagicdesign.com/products/davinciresolve", affiliateUrl:"", pricingType:"Freemium", freeAlternative:"Any editor that meets your device needs", limitations:"Can require a capable computer and time to learn.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Video editing practice", relevantSkills:["Video Editing"], relevantProjects:["Short promotional video"] },
    adobePremiere: { id:"adobePremiere", name:"Adobe Premiere", category:"Video", description:"A professional video-editing application from Adobe.", whyRecommended:"An established paid workflow to consider when it fits your needs.", officialUrl:"https://www.adobe.com/products/premiere.html", affiliateUrl:"", pricingType:"Paid", freeAlternative:"DaVinci Resolve", limitations:"Requires a paid subscription and a compatible device.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Advanced video workflows", relevantSkills:["Video Editing"], relevantProjects:["Short promotional video"] },
    excel: { id:"excel", name:"Microsoft Excel", category:"Learning · Productivity", description:"Spreadsheet software for organizing data, formulas, reports, and charts.", whyRecommended:"Supports practical spreadsheet exercises and dashboards.", officialUrl:"https://www.microsoft.com/microsoft-365/excel", affiliateUrl:"", pricingType:"Paid", freeAlternative:"Google Sheets", limitations:"Some features require a Microsoft 365 license.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Spreadsheet practice", relevantSkills:["Excel & Data"], relevantProjects:["Sales dashboard"] },
    googleSheets: { id:"googleSheets", name:"Google Sheets", category:"Learning · Productivity", description:"A browser-based spreadsheet tool for tables, formulas, and collaboration.", whyRecommended:"An accessible place to practice data cleanup and simple reports.", officialUrl:"https://workspace.google.com/products/sheets/", affiliateUrl:"", pricingType:"Free", freeAlternative:"Not needed", limitations:"It may not include every advanced desktop spreadsheet feature.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Spreadsheet beginners", relevantSkills:["Excel & Data"], relevantProjects:["Sales dashboard"] },
    metaBlueprint: { id:"metaBlueprint", name:"Meta Blueprint", category:"Learning", description:"Official learning resources from Meta for business and marketing tools.", whyRecommended:"Helps structure practice around content, audiences, and platform fundamentals.", officialUrl:"https://www.facebook.com/business/learn", affiliateUrl:"", pricingType:"Free", freeAlternative:"Platform documentation", limitations:"Material is platform-specific and platform features can change.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Social media learners", relevantSkills:["Social Media Management"], relevantProjects:["7-day content campaign"] },
    upwork: { id:"upwork", name:"Upwork", category:"Freelancing", description:"A freelance marketplace where clients post projects and professionals submit proposals.", whyRecommended:"A place to research real project briefs and client language.", officialUrl:"https://www.upwork.com/", affiliateUrl:"", pricingType:"Free", freeAlternative:"Company career pages and direct outreach", limitations:"Projects are competitive; review platform rules and fees.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Freelance research", relevantSkills:[], relevantProjects:[] },
    ftcDisclosureGuide: { id:"ftcDisclosureGuide", name:"FTC Endorsement Guides FAQ", category:"Learning", description:"Official U.S. guidance on endorsements and disclosures.", whyRecommended:"Explains why clear disclosure matters before using affiliate links.", officialUrl:"https://www.ftc.gov/system/files/documents/plain-language/pdf-0205-endorsement-guides-faqs_0.pdf", affiliateUrl:"", pricingType:"Free", freeAlternative:"Relevant local consumer-protection guidance", limitations:"This is U.S. guidance; requirements vary by location.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Affiliate content creators", relevantSkills:[], relevantProjects:[] },
    linkedinJobs: { id:"linkedinJobs", name:"LinkedIn Jobs", category:"Job Search", description:"A job-search area for exploring company roles and applications.", whyRecommended:"Helps research job descriptions and roles that match current skills.", officialUrl:"https://www.linkedin.com/jobs/", affiliateUrl:"", pricingType:"Free", freeAlternative:"Official company career pages", limitations:"Listings vary by location and role; verify employers independently.", dateChecked:"August 2026", affiliateStatus:"none", recommendedFor:"Job seekers", relevantSkills:[], relevantProjects:[] }
};

// Disabled by default. Set enabled and provide a provider callback during a future
// privacy review; no personal or sensitive data is included in these events.
const ANALYTICS_CONFIG = { enabled: false, provider: null };
function trackProductEvent(name, properties = {}) {
    if (ANALYTICS_CONFIG.enabled && typeof ANALYTICS_CONFIG.provider === "function") {
        ANALYTICS_CONFIG.provider(name, properties);
    }
}

// Reserved for future SkillSprint-owned products. Nothing here is displayed,
// priced, or purchasable until a real product and checkout are approved.
const FUTURE_PRODUCT_CONFIG = [];

const roadmapResources = {
    "Web Development": ["mdnLearn", "githubPages"],
    "Graphic Design": ["figmaLibrary", "canvaDesignSchool"],
    "Content Writing": ["googleDocs", "canvaDesignSchool"],
    "Video Editing": ["davinciResolve", "adobePremiere"],
    "Excel & Data": ["excel", "googleSheets"],
    "Social Media Management": ["metaBlueprint", "canvaDesignSchool"]
};

const skillRoadmaps = {
    "Web Development": {
        description: "Web development is the work of building websites and web pages people can use on phones and computers.",
        suitable: "People who enjoy technology, problem-solving, and patiently improving small details.",
        difficulty: "Moderate — beginner-friendly if you learn one layer at a time.",
        learn: ["HTML structure and semantic tags", "CSS layouts, responsive design, and accessibility", "JavaScript fundamentals and the DOM"],
        practice: ["Recreate a simple webpage from a screenshot", "Make a form work with browser-side validation", "Improve a page for mobile screens"],
        projects: ["A responsive portfolio website", "A landing page for a local business", "A simple task or expense tracker"],
        portfolio: "Publish three finished projects with a short explanation of the problem, your solution, and the devices you tested. Use screenshots and a live link when possible.",
        work: "Look for clearly scoped website updates, landing pages, and small business projects on Upwork, Fiverr, LinkedIn, or local-business outreach. Confirm the client, scope, payment terms, and platform rules before starting.",
        expectation: "The first month is usually about building foundations and portfolio samples, not immediate income. Paid work depends on your portfolio, communication, reliability, and the needs of the market.",
        mistakes: ["Trying to learn every framework before building anything", "Ignoring mobile layouts and accessibility", "Copying a project without understanding how it works"],
        plan: ["Days 1–7: Learn HTML and build one structured page.", "Days 8–14: Learn CSS and make that page responsive.", "Days 15–21: Add basic JavaScript interactions and form validation.", "Days 22–30: Finish, test, document, and publish one portfolio project."]
    },
    "Graphic Design": {
        description: "Graphic design uses layout, type, color, and images to communicate a message clearly.",
        suitable: "People who notice visual details and enjoy making information easier to understand.",
        difficulty: "Beginner-friendly — strong fundamentals matter more than expensive tools.",
        learn: ["Typography, spacing, hierarchy, and alignment", "Color basics and contrast", "Using a design tool such as Canva or Figma"],
        practice: ["Redesign a crowded social post for clarity", "Create a small brand color and type guide", "Make one design in desktop and mobile sizes"],
        projects: ["A three-post social media campaign", "A café or service-business flyer", "A simple brand kit with logo concept, colors, and templates"],
        portfolio: "Show 3–5 polished pieces in a clean PDF or portfolio page. Add a sentence about the audience, goal, and your design choices for every project.",
        work: "Look for small business social graphics, presentations, flyers, and simple brand-support work on reputable freelance platforms, LinkedIn, and through local businesses. Avoid vague jobs that request unpaid full campaigns.",
        expectation: "Early progress comes from repeated practice and critique. Rates and project availability vary; a clear portfolio makes it easier to earn trust over time.",
        mistakes: ["Using too many fonts or colors", "Designing without a clear audience or purpose", "Presenting only mockups and no explanation of the work"],
        plan: ["Days 1–7: Learn hierarchy, typography, and color through small redesigns.", "Days 8–14: Practice layouts and create a mini brand guide.", "Days 15–21: Build three related social media graphics.", "Days 22–30: Polish your best work and assemble a simple portfolio."]
    },
    "Content Writing": {
        description: "Content writing creates useful articles, web copy, emails, and posts that help a specific reader take action.",
        suitable: "People who enjoy research, explaining ideas, and editing their work for clarity.",
        difficulty: "Beginner-friendly — quality improves through research and revision.",
        learn: ["Finding a reader's question and search intent", "Clear outlines, headings, and introductions", "Editing for accuracy, clarity, and tone"],
        practice: ["Turn a long paragraph into clear bullet points", "Write an outline before drafting", "Edit an article after a one-day break"],
        projects: ["A helpful 800-word how-to article", "A homepage for an imaginary local business", "A five-email welcome sequence"],
        portfolio: "Collect 3–5 focused samples in a shareable document or website. Choose a niche if possible and explain the intended reader and goal of each sample.",
        work: "Look for transparent writing briefs on LinkedIn, company career pages, reputable freelance platforms, and niche communities. Confirm whether a test is paid and never provide a large unpaid article as a test.",
        expectation: "It can take time to build samples, find a niche, and earn trust. No article or application guarantees income; consistent quality and reliable communication matter.",
        mistakes: ["Writing before understanding the reader", "Using generic claims without research", "Skipping editing and fact-checking"],
        plan: ["Days 1–7: Learn article structure and write one outline each day.", "Days 8–14: Draft and edit one useful how-to article.", "Days 15–21: Create web-copy and email samples.", "Days 22–30: Choose your three best samples and publish a portfolio."]
    },
    "Video Editing": {
        description: "Video editing shapes raw footage into a clear story using pacing, cuts, sound, text, and visuals.",
        suitable: "People who enjoy storytelling, visual rhythm, and careful attention to detail.",
        difficulty: "Moderate — the basics are approachable, while speed develops with practice.",
        learn: ["Timeline editing, cuts, and file organization", "Basic audio cleanup and music levels", "Captions, simple transitions, and export settings"],
        practice: ["Edit the same short clip into two different styles", "Add readable captions to a short video", "Match cuts to a spoken explanation or music beat"],
        projects: ["A 30-second social media reel", "A short talking-head edit with captions", "A one-minute product or event highlight video"],
        portfolio: "Create a short showreel plus 3–5 separate samples. Label what you edited and use only footage, music, and assets you have permission to use.",
        work: "Look for clearly defined short-form edits, creator support, and small business content work through reputable platforms, LinkedIn, and direct outreach. Agree on revision limits and source-file needs before work begins.",
        expectation: "Your early work will be slower as you learn the tools. Income is not guaranteed; editors earn trust by meeting deadlines, following briefs, and improving with feedback.",
        mistakes: ["Using distracting effects instead of clear storytelling", "Ignoring sound quality", "Starting a project without organizing footage and revisions"],
        plan: ["Days 1–7: Learn your editor's timeline, cuts, and exports.", "Days 8–14: Practice pacing, captions, and audio on short clips.", "Days 15–21: Finish two distinct short-form edits.", "Days 22–30: Create a showreel and document three portfolio samples."]
    },
    "Excel & Data": {
        description: "Excel and data work organizes information, finds patterns, and turns numbers into useful reports.",
        suitable: "People who like organized work, practical problem-solving, and checking details carefully.",
        difficulty: "Beginner-friendly — confidence grows through real spreadsheet exercises.",
        learn: ["Tables, sorting, filters, and clean data entry", "Core formulas such as SUM, IF, COUNTIF, and XLOOKUP", "Charts and pivot tables for simple reporting"],
        practice: ["Clean an inconsistent contact list", "Build a monthly budget tracker", "Turn a small sales table into a summary report"],
        projects: ["A personal or small-business expense tracker", "A sales dashboard with charts", "An inventory tracker with simple alerts"],
        portfolio: "Share 3 anonymized spreadsheet projects with a short before-and-after explanation. Include screenshots of formulas, charts, and the business question each file answers.",
        work: "Look for administrative support, reporting, spreadsheet cleanup, and data-entry roles on company career pages, LinkedIn, and well-known freelance platforms. Be cautious of data-entry ads with upfront fees or vague payment promises.",
        expectation: "Beginner tasks may be competitive and detail-focused. Building accuracy and showing useful examples improves your chances, but work and income are never guaranteed.",
        mistakes: ["Entering data without consistent formats", "Using formulas without checking results", "Sharing confidential or real client data in a portfolio"],
        plan: ["Days 1–7: Practice clean tables, sorting, filters, and basic formulas.", "Days 8–14: Learn lookups and conditional formulas with sample data.", "Days 15–21: Build a dashboard using pivot tables and charts.", "Days 22–30: Polish three anonymized spreadsheet projects for a portfolio."]
    },
    "Social Media Management": {
        description: "Social media management plans, creates, publishes, and improves content for a business or creator.",
        suitable: "People who enjoy communication, trends, organizing calendars, and understanding an audience.",
        difficulty: "Beginner-friendly — consistency and good judgment are more important than chasing every trend.",
        learn: ["Content pillars, audience research, and brand voice", "Simple content calendars and platform basics", "Reading basic engagement metrics responsibly"],
        practice: ["Create a one-week content calendar", "Write captions in three different brand voices", "Review a public account and suggest three useful improvements"],
        projects: ["A 7-day Instagram content plan for a café", "A month of post ideas for a fitness coach", "A basic performance report using sample metrics"],
        portfolio: "Present 3–4 sample calendars or campaigns with example posts, captions, and a note explaining the audience and goals. Mark all samples clearly as practice work when they are not client projects.",
        work: "Look for assistant, content-planning, and community-support roles on LinkedIn, reputable freelance platforms, and through local businesses. Confirm who supplies assets, posting access, and approval before accepting work.",
        expectation: "Results depend on the brand, content quality, audience, and time. Social media management is not a guaranteed income path, and credible work often begins with small, well-defined responsibilities.",
        mistakes: ["Posting without a clear audience or goal", "Promising follower growth or sales", "Using copyrighted media or publishing without approval"],
        plan: ["Days 1–7: Learn content pillars and analyze three public accounts.", "Days 8–14: Create a one-week calendar with captions and visuals.", "Days 15–21: Build a sample campaign around one business goal.", "Days 22–30: Turn your best calendar and campaign into portfolio case studies."]
    }
};

const ROADMAP_PROGRESS_STORAGE_PREFIX = "skillpath_roadmap_progress_v1:";

const roadmapActionPlans = {
    "Web Development": { stages:[
        ["Learn", ["Learn basic HTML structure with headings, links, images, and forms.", "Learn CSS selectors, Flexbox, and responsive layout basics."]],
        ["Practice", ["Recreate a simple public webpage layout without copying its code.", "Add a working, browser-validated contact form to a practice page."]],
        ["Build", ["Build a responsive landing page for a fictional local business.", "Build a small interactive calculator or expense tracker with JavaScript."]],
        ["Portfolio", ["Publish one finished project with a live link and screenshots.", "Write a short case study explaining the problem, solution, and testing."]],
        ["Find Work", ["Prepare a focused service description for landing-page or website-update work.", "Review one clearly scoped opportunity and list its requirements before applying."]]
    ], projects:[
        ["Responsive local-business landing page", "Build a mobile-friendly page with services, testimonials marked as placeholder content, and a contact call to action.", "HTML, CSS, responsive design, and accessibility.", "Screenshots, a live link, and a brief explanation of the audience and layout choices."],
        ["Personal expense tracker", "Build a small browser-based tracker that adds and totals expenses.", "JavaScript events, DOM updates, and form handling.", "A live link, feature list, and one note about how you tested edge cases."],
        ["Portfolio website", "Create a simple site to present your own completed projects.", "Information architecture, responsive design, and project presentation.", "The live portfolio link and screenshots of the project pages."]
    ] },
    "Graphic Design": { stages:[
        ["Learn", ["Study typography, alignment, contrast, and visual hierarchy using three example designs.", "Create a small color and type reference for one fictional brand."]],
        ["Practice", ["Redesign a crowded social post so its main message is clear in three seconds.", "Create one design in square and vertical formats while keeping the hierarchy intact."]],
        ["Build", ["Create a three-post social campaign for a fictional business.", "Design a simple brand identity concept with logo direction, colors, and type."]],
        ["Portfolio", ["Export your strongest pieces and add a short brief for each.", "Explain the audience, goal, and design decisions behind one project."]],
        ["Find Work", ["Prepare a focused offer for social graphics, flyers, or presentation design.", "Review a brief and note scope, revisions, assets, and usage rights before applying."]]
    ], projects:[
        ["Three-post social campaign", "Create three coordinated posts for a fictional campaign.", "Visual hierarchy, brand consistency, and social formats.", "The brief, all three posts, and a note on the audience."],
        ["Small-business flyer", "Design a clear event or service flyer for a fictional business.", "Layout, typography, and call-to-action design.", "The final export plus a before-and-after explanation of your layout."],
        ["Mini brand kit", "Create a logo concept, color palette, typography, and two sample applications.", "Brand-system thinking and consistency.", "A brand board and the two applied examples."]
    ] },
    "Content Writing": { stages:[
        ["Learn", ["Choose a reader question and outline a helpful answer before drafting.", "Learn to use headings, introductions, and transitions for scannable articles."]],
        ["Practice", ["Turn one dense paragraph into a clear, accurate bullet list.", "Edit a draft after a break for clarity, accuracy, and tone."]],
        ["Build", ["Write an 800-word how-to article for a defined reader.", "Write a homepage and five-email welcome sequence for a fictional business."]],
        ["Portfolio", ["Select three focused samples and label each sample's reader and goal.", "Proofread every sample and verify factual claims before sharing it."]],
        ["Find Work", ["Prepare a service description for articles, web copy, or email writing.", "Review a writing brief and confirm whether any test assignment is paid and reasonably sized."]]
    ], projects:[
        ["Helpful how-to article", "Write a researched article that answers one beginner question.", "Research, outlining, drafting, and editing.", "The article, target-reader note, and source list where appropriate."],
        ["Fictional business homepage", "Write concise homepage copy for a fictional local service.", "Audience awareness, benefits, and calls to action.", "The brief and final page copy with a short rationale."],
        ["Welcome email sequence", "Write five emails that introduce a fictional service.", "Tone, structure, and reader journey planning.", "All five emails and a note on each email's purpose."]
    ] },
    "Video Editing": { stages:[
        ["Learn", ["Learn timeline editing, file organization, and export settings in one editor.", "Practice basic audio levels, captions, and clean cuts."]],
        ["Practice", ["Edit the same short clip into two different pacing styles.", "Create readable captions and review them on a phone screen."]],
        ["Build", ["Edit a 30-second promotional video using permitted footage and audio.", "Create a talking-head edit with captions, cutaways, and clean sound."]],
        ["Portfolio", ["Export three distinct samples and label exactly what you edited.", "Create a short showreel using only work you have permission to show."]],
        ["Find Work", ["Confirm footage rights, revision limits, deadlines, and source-file needs before applying.", "Prepare a focused offer for short-form edits or captioned talking-head videos."]]
    ], projects:[
        ["Short promotional video", "Edit a 30-second video for a fictional event or product.", "Pacing, captions, audio, and export quality.", "The final video, a captioned version, and a short editing note."],
        ["Talking-head edit", "Turn a short spoken clip into a concise, captioned edit.", "Story structure, cutaways, and audio cleanup.", "The final edit and a note on your editing decisions."],
        ["One-minute highlight reel", "Create a highlight sequence from permitted event or product footage.", "Clip selection, rhythm, and visual storytelling.", "The video plus a list of the permitted assets used."]
    ] },
    "Excel & Data": { stages:[
        ["Learn", ["Create a clean table using consistent dates, names, and number formats.", "Practice SUM, IF, COUNTIF, and a lookup formula with sample data."]],
        ["Practice", ["Clean an inconsistent contact list and explain your changes.", "Turn a sales table into a summary using filters and a pivot table."]],
        ["Build", ["Build a monthly budget or expense tracker with formulas.", "Build a sales dashboard with charts using anonymized sample data."]],
        ["Portfolio", ["Capture before-and-after screenshots for three anonymized spreadsheet projects.", "Write the business question and useful finding for each sample."]],
        ["Find Work", ["Prepare a service description for spreadsheet cleanup, tracking, or reporting support.", "Check that a role is legitimate and never share confidential data in an application sample."]]
    ], projects:[
        ["Expense tracker", "Build a monthly tracker with categories, totals, and a simple chart.", "Tables, formulas, and data organization.", "Screenshots, the anonymized sheet, and the question it helps answer."],
        ["Sales dashboard", "Turn a sample sales dataset into a dashboard with two useful charts.", "Data cleanup, pivots or formulas, and reporting.", "The dashboard and two honest observations from the data."],
        ["Inventory tracker", "Create a simple inventory table with status or reorder prompts.", "Structured data, conditional formulas, and usability.", "The anonymized file and an explanation of the workflow."]
    ] },
    "Social Media Management": { stages:[
        ["Learn", ["Define three content pillars and one audience for a fictional business.", "Study a platform's basic post formats and responsible use of metrics."]],
        ["Practice", ["Create a one-week calendar with captions and clear post goals.", "Write the same message in three different, appropriate brand voices."]],
        ["Build", ["Create a 7-day campaign for a fictional café, service, or creator.", "Create a simple sample performance report using clearly labelled sample metrics."]],
        ["Portfolio", ["Present a calendar, sample posts, and campaign rationale as practice work.", "Explain the audience, business goal, and approval process for one campaign."]],
        ["Find Work", ["Prepare a focused offer for content planning or community-support assistance.", "Confirm approval workflow, posting access, assets, and scope before applying."]]
    ], projects:[
        ["7-day café content plan", "Plan seven posts for a fictional café with captions and visual directions.", "Content planning, audience focus, and brand voice.", "The calendar, three sample posts, and campaign goal."],
        ["Fitness coach content ideas", "Create a month of post ideas for a fictional coach.", "Content pillars, variety, and audience research.", "The idea bank and a note explaining the audience."],
        ["Sample performance report", "Turn labelled sample metrics into a concise report.", "Basic analysis and clear communication of results.", "The report, sample data note, and two careful observations."]
    ] }
};

const roadmapStageDetailGuidance = {
    Learn: { why: "Understanding the fundamentals first helps you make deliberate choices instead of copying code or advice without knowing why it works.", steps: (task) => ["Set aside a focused 30–45 minute session and write down the specific concepts in this task.", `Use a reliable beginner reference to study: ${task}`, "Make a short set of notes in your own words and test one example yourself."], outcome: (task) => `A short set of notes and one completed example that demonstrates: ${task}` },
    Practice: { why: "Practice turns a concept into a repeatable skill and exposes the parts that still need attention before you use it in a real project.", steps: (task) => ["Choose a small, low-stakes practice brief and define what a finished attempt will look like.", `Complete the exercise: ${task}`, "Review the result against the brief, note one improvement, and save the before-and-after evidence."], outcome: (task) => `A finished practice exercise plus one note about what you improved while completing: ${task}` },
    Build: { why: "A finished build gives you concrete evidence of your ability and creates material you can later refine for a portfolio.", steps: (task) => ["Write a one-sentence project brief identifying the audience, problem, and success criteria.", `Build the project described in this task: ${task}`, "Test the finished work, fix the most important issue you find, and save a shareable version or screenshots."], outcome: (task) => `A working beginner project, tested and saved with evidence of the work completed for: ${task}` },
    Portfolio: { why: "Clear presentation helps someone understand what you can do, what you contributed, and how your work relates to their needs.", steps: (task) => ["Choose only work you completed yourself and gather the final files, link, and process notes.", `Prepare the portfolio evidence for: ${task}`, "Write a concise description covering the audience, your decisions, and the outcome without overstating results."], outcome: (task) => `A truthful, shareable portfolio entry that documents: ${task}` },
    "Find Work": { why: "Careful preparation protects you from unclear scope, unpaid speculative work, and opportunities that are not a good fit.", steps: (task) => ["Choose a legitimate, clearly scoped opportunity or create a focused service outline for the work you can honestly offer.", `Complete the preparation task: ${task}`, "Check the scope, payment expectations, deadlines, and any requested access before you apply or agree to work."], outcome: (task) => `A ready-to-use, honest application or service-preparation document for: ${task}` }
};

const earningPathContent = {
    "Freelancing": {
        title: "💻 Freelancing",
        intro: "Offer a focused service to clients and get paid for clearly agreed work.",
        roadmaps: ["Web Development", "Graphic Design", "Content Writing", "Video Editing", "Excel & Data", "Social Media Management"],
        resources: ["upwork", "googleDocs"],
        sections: [
            ["What freelancing is", "Freelancing means working independently for clients on projects or ongoing services. You choose the service you offer, agree on scope and payment, then deliver work professionally."],
            ["Popular skills", "<ul><li>Web Development and website updates</li><li>Graphic Design and social graphics</li><li>Content Writing and web copy</li><li>Video Editing and short-form content</li><li>Excel, reporting, and administrative support</li><li>Social Media Management</li></ul>"],
            ["Beginner path", "<ol><li>Choose one service and one target customer.</li><li>Learn the core basics and create 3 focused samples.</li><li>Build a simple portfolio and profile.</li><li>Apply for small, suitable projects consistently.</li></ol>"],
            ["How to build a portfolio", "Use practice projects when you have no clients. Show the client problem, your solution, and the finished result. Keep it focused: three strong examples are more useful than many unfinished ones."],
            ["How to find your first client", "Start with small, clearly defined jobs. Personalize every proposal: mention the client's goal, explain your relevant sample, and state a practical next step. Follow platform rules and avoid mass-copying proposals."],
            ["Legitimate platforms", '<ul><li><a href="https://www.upwork.com" target="_blank" rel="noopener noreferrer">Upwork</a> — project-based freelance work.</li><li><a href="https://www.fiverr.com" target="_blank" rel="noopener noreferrer">Fiverr</a> — service listings and client requests.</li><li><a href="https://www.peopleperhour.com" target="_blank" rel="noopener noreferrer">PeoplePerHour</a> — freelance projects.</li><li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> — contract opportunities and direct outreach.</li></ul>'],
            ["Useful tools", "Google Drive for sharing work, Canva or Figma for design, Trello for task tracking, and a simple spreadsheet for applications and client communication. Use only tools that suit your service."],
            ["Realistic expectation", "Your first weeks are usually spent learning, building samples, and applying. A first client is not guaranteed; outcomes vary with your skill, portfolio, communication, market demand, and consistency."],
            ["Scam warnings", '<ul><li>Never pay upfront to receive a job.</li><li>Do not share passwords, OTPs, or identity documents without a clear need.</li><li>Get the scope, payment, revisions, and delivery date in writing.</li><li>Be cautious of requests for large unpaid test projects or guaranteed-income claims.</li></ul>', "scam-card"]
        ]
    },
    "Affiliate Marketing": {
        title: "📈 Affiliate Marketing",
        intro: "Create helpful content, recommend relevant products or services, and earn a commission only when program conditions are met.",
        roadmaps: ["Content Writing", "Social Media Management", "Video Editing", "Graphic Design"],
        resources: ["ftcDisclosureGuide", "googleDocs"],
        sections: [
            ["How affiliate marketing works", "You choose a niche, create useful content for an audience, and use a tracked affiliate link from a legitimate program. A commission may be paid only after a qualifying purchase or action under that program's rules."],
            ["Suitable niches", "Good beginner niches are topics you can research responsibly and discuss honestly: productivity tools, beginner technology, fitness basics, education, home organization, or a skill you are actively learning. Choose the audience first, not just a high commission."],
            ["How to start", "<ol><li>Choose one audience and a problem they want solved.</li><li>Research useful products and their policies.</li><li>Create genuinely helpful content before relying on links.</li><li>Apply to relevant programs and follow their terms.</li></ol>"],
            ["Legitimate program guidance", "Use official brand affiliate pages or established affiliate networks. Read eligibility, commission, cookie, payout, and prohibited-promotion rules. Never pay to join a program simply because it promises easy earnings."],
            ["Content strategies", "Write comparison guides, how-to articles, tutorials, honest reviews, checklists, and short educational videos. Explain who a product is and is not for. Helpful content builds more trust than repeatedly posting links."],
            ["How commissions work", "Commission rates, qualifying actions, refund rules, tracking windows, and payment timing differ by program. Treat any displayed rate as a program estimate, not a guarantee of what you will receive."],
            ["Disclosure requirements", "Clearly state near the link that it is an affiliate link and that you may earn a commission at no extra cost to the reader. Also follow the program's terms and advertising rules that apply in your location."],
            ["Useful tools", "A notes app for audience questions, a content calendar, Canva for visuals, a website or social channel you control, and analytics provided by your publishing platform. Start simple; tools do not replace useful content."],
            ["Realistic expectation", "Most beginners need time to learn a niche, publish useful work, and build trust. Traffic, conversions, and commissions are not guaranteed and can be affected by audience needs, content quality, program changes, and platform rules."],
            ["Scam warnings", '<ul><li>Avoid courses or groups promising fixed daily income.</li><li>Do not promote products you have not researched.</li><li>Never hide affiliate relationships.</li><li>Be careful with programs that pressure you to recruit others instead of serving real customers.</li></ul>', "scam-card"]
        ]
    },
    "Online Jobs": {
        title: "💼 Online Jobs",
        intro: "Find legitimate remote employment or contract roles that match your current skills and experience.",
        roadmaps: ["Excel & Data", "Content Writing", "Graphic Design", "Web Development", "Social Media Management", "Video Editing"],
        resources: ["linkedinJobs", "googleDocs"],
        sections: [
            ["Types of legitimate online jobs", "Remote roles include customer support, virtual assistance, data and spreadsheet support, content writing, design support, software development, social media assistance, and operations coordination."],
            ["Suitable beginner roles", "Look for roles with clear responsibilities and realistic entry requirements, such as customer support associate, virtual assistant, data-entry or spreadsheet assistant, content assistant, junior designer, or social media assistant."],
            ["How to find jobs", "Search company career pages first, then LinkedIn and reputable remote-job boards. Use specific searches such as 'remote customer support entry level' rather than only 'online job'. Check the company website before applying."],
            ["Prepare your resume and profile", "Use a one-page, honest resume that highlights relevant skills, outcomes, tools, and sample projects. Match your LinkedIn headline and summary to the type of role you want. Do not claim experience you do not have."],
            ["How to apply", "Tailor your resume and short note to the job description. Show one relevant example, answer required questions carefully, and track the role, date, and follow-up. A smaller number of thoughtful applications is stronger than mass applications."],
            ["Legitimate job-platform guidance", 'Use official company career pages, <a href="https://www.linkedin.com/jobs" target="_blank" rel="noopener noreferrer">LinkedIn Jobs</a>, and reputable job boards that identify the employer and role. Confirm email domains and interview steps; legitimate employers do not charge candidates to be hired.'],
            ["Application checklist", "<ul><li>Read the full job description and requirements.</li><li>Tailor your resume to the role.</li><li>Check that the employer and contact details are real.</li><li>Keep copies of the role and your application.</li><li>Prepare for interviews and skills assessments.</li></ul>"],
            ["Realistic expectation", "A remote job search often takes time, especially for entry-level roles. Interviews and offers are not guaranteed; improving relevant skills, samples, and applications can increase readiness over time."],
            ["Scam warnings", '<ul><li>Never pay a recruiter or employer to secure a job.</li><li>Do not deposit a cheque or buy equipment from an unknown sender.</li><li>Verify company emails and video-interview invitations.</li><li>Be cautious when pay sounds unusually high for vague work.</li></ul>', "scam-card"]
        ]
    }
};

const projectTemplates = {
    "Web Development": { type: "Responsive landing page", objective: "Design and build a clear, responsive page for a fictional local business.", requirements: ["Mobile-first layout", "Accessible headings, links, and contrast", "A contact or enquiry call to action"], steps: ["Choose a business and write its customer goal", "Sketch the page sections", "Build semantic HTML and responsive CSS", "Test it on phone and desktop widths", "Publish or capture final screenshots"], deliverables: ["Live page or code repository", "Desktop and mobile screenshots", "Short project summary"], skills: ["HTML", "CSS", "responsive design", "accessibility"] },
    "Graphic Design": { type: "Brand identity concept", objective: "Create a focused visual identity for a fictional small business.", requirements: ["Audience and brand goal", "Color and type choices", "Three applied design pieces"], steps: ["Write a short creative brief", "Research visual references", "Create a logo concept and palette", "Apply the system to three assets", "Explain your design choices"], deliverables: ["Brand board", "Three polished mockups", "One-page rationale"], skills: ["visual hierarchy", "typography", "color", "layout"] },
    "Content Writing": { type: "Long-form helpful article", objective: "Write a useful article that answers one specific beginner question.", requirements: ["Clear audience", "Research-backed outline", "Accurate, edited copy"], steps: ["Choose one reader question", "Research reliable sources", "Create an outline", "Draft with clear headings", "Edit for accuracy and clarity"], deliverables: ["800–1,200 word article", "Outline", "Short author note"], skills: ["research", "outlining", "editing", "clear writing"] },
    "Video Editing": { type: "Short promotional video", objective: "Edit a concise video with a clear message for a fictional product or event.", requirements: ["Permitted footage and audio", "Readable captions", "Clean audio and export"], steps: ["Plan the story and select footage", "Organize clips", "Build a rough cut", "Add captions and audio polish", "Export and review on mobile"], deliverables: ["30–60 second video", "Captioned version", "Brief editing note"], skills: ["pacing", "cuts", "captions", "audio"] },
    "Excel & Data": { type: "Sales dashboard", objective: "Turn a sample sales dataset into a clear, decision-ready dashboard.", requirements: ["Cleaned data", "Useful formulas", "Two or more clear charts"], steps: ["Choose or create a small sample dataset", "Clean and format it", "Add formulas or a pivot table", "Create charts", "Write two honest observations"], deliverables: ["Spreadsheet dashboard", "Source-data tab", "Short insights summary"], skills: ["data cleanup", "formulas", "charts", "analysis"] },
    "Social Media Management": { type: "7-day content campaign", objective: "Plan a coherent week of content for a fictional small business.", requirements: ["Defined audience", "Seven post ideas", "Consistent voice and visual direction"], steps: ["Choose a business and audience", "Set one campaign goal", "Plan seven post ideas", "Create example assets or captions", "Review the schedule for variety"], deliverables: ["7-day calendar", "Three sample posts", "Campaign rationale"], skills: ["content planning", "audience research", "copywriting", "reporting"] }
};

const MY_PLAN_STORAGE_KEY = "skillpath_my_plan";
const MY_PLAN_VERSION = 1;
const myPlanGoals = new Set(["Side income", "Long-term income", "Remote job", "Build a business"]);
