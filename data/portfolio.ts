export const portfolio = {
  profile: {
    name: "Muneer Hussain",
    role: "Full Stack Developer",
    location: "Faisalabad, Pakistan",
    email: "muhammadmuneer579op@gmail.com", // apni email likhein
    phone: "+92 3069110314", // apna number likhein
    bio: "I build fast, thoughtful web experiences from front to back.",
    cv: "/cv.pdf", // apna CV public/cv.pdf mein rakhein
    portrait: "/muneernew.png",
  },

  // Menu ke links (har ek unique hai)
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  // type se sahi icon chunta hai: github | linkedin | email
  socials: [
    { type: "github", label: "GitHub", href: "https://github.com/sheikhmuneerabd-star" },
    { type: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/muneer-hussain-76a458439" },
    { type: "email", label: "Email", href: "mailto:muhammadmuneer579@gmail.com" },
  ],

    hero: {
    headline: ["FULL STACK", "DEVELOPER"],
    intro:
      "I design and build fast, polished web apps, from pixel-perfect interfaces to solid APIs.",
    focus: ["Next.js & React", "Node.js & MongoDB", "AI-powered apps"],
    stats: [
      { value: "1.5+", label: "Years experience" },
      { value: "8+", label: "Projects built" },
    ],
  },

  about: {
    statement:
      "I turn ideas into fast, thoughtful and beautiful web products, with clean code behind every pixel and motion that feels natural.",
    bio: "I'm Muneer, a full stack developer from Faisalabad. I enjoy building complete products: the interface people touch, and the backend that keeps it reliable. Right now I'm focused on modern React, animation and AI features.",
  },

  experience: [
    { year: "2025 - Now", role: "Full Stack Developer", place: "Freelance" },
    { year: "2024 - 2025", role: "Frontend Developer", place: "Company Name" },
    { year: "2023", role: "Junior Developer", place: "Company Name" },
  ],

    services: [
    {
      num: "01",
      art: "frontend",
      title: "Frontend",
      description: "Fast, responsive interfaces with smooth motion and clean, accessible code.",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    },
    {
      num: "02",
      art: "backend",
      title: "Backend",
      description: "Reliable APIs, databases and authentication that scale with your product.",
      tech: ["Node.js", "Express", "MongoDB", "REST"],
    },
    {
      num: "03",
      art: "ai",
      title: "AI / GenAI",
      description: "Chatbots, smart search and AI features added into real products.",
      tech: ["OpenAI", "Claude API", "LangChain", "RAG", "Vector DB"],
    },
    {
      num: "04",
      art: "cloud",
      title: "Cloud & DevOps",
      description: "Deployments, CI/CD and hosting that keep your app fast and online.",
      tech: ["Vercel", "AWS", "Docker", "GitHub Actions", "Linux"],
    },
  ],

    projects: [
    {
      slug: "bespoke-wear",
      featured: true,
      category: "E-commerce Platform",
      title: "Bespoke Wear",
      description:
        "A full-stack custom sports uniforms store with catalog, cart, checkout, and admin tools.",
      overview:
        "A high-performance custom e-commerce web application designed for Bespoke Wear, offering premium custom team uniforms and activewear to sports teams and athletes worldwide. Built with a seamless user interface, dynamic catalog management, and secure online payment processing.",
      built: [
        "Full-stack Next.js architecture with server components",
        "Product catalog with live search, filters, and sorting",
        "Admin dashboard for products, orders, and customer management",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "PayPal API"],
      features: [
        "Live product search",
        "Persistent cart sync",
        "Order tracking system",
        "Role-based admin",
      ],
      github: "https://github.com/sheikhmuneerabd-star/xteamwear-frontend-next",
      live: "https://bespoketeamwear.vercel.app",
      image: "/bespokewear/intro.png",
      gallery: [
        { src: "/bespokewear/homenewpro.png", caption: "Store homepage with featured collections" },
        { src: "/bespokewear/productCart.png", caption: "Product catalog grid with filter drawer" },
        { src: "/bespokewear/singleProduct.png", caption: "Detailed product view with size selector" },
        { src: "/bespokewear/addToCart.png", caption: "Interactive shopping cart drawer" },
        { src: "/bespokewear/adminDash.png", caption: "Admin analytics & order management dashboard" },
      ],
    },
    {
      slug: "ai-content-generated",
      featured: true,
      category: "SaaS / AI",
      title: "AI Content Generation SaaS",
      description:
        "An AI-powered content creation platform for generating high-converting blog posts, ads, emails, and SEO articles.",
      overview:
        "A SaaS web application designed to help creators, marketers, and businesses generate SEO-optimized articles, ad copy, emails, and social media content using advanced AI models.",
      built: [
        "Multi-template AI prompt processing engine",
        "Real-time streaming generation responses",
        "User credits and subscription tracking system",
      ],
      tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Groq API", "Tailwind CSS"],
      features: [
        "AI content templates",
        "Real-time streaming",
        "Credit management",
        "History tracking",
      ],
      github: "https://github.com/sheikhmuneerabd-star/ai-content-generated-nextJS",
      live: "https://ai-content-generated-next-js.vercel.app",
      image: "/aiContent/intro.png",
      gallery: [
        { src: "/aiContent/aiContent.png", caption: "AI content tools landing page" },
        { src: "/aiContent/dashboard.png", caption: "User workspace & dashboard overview" },
        { src: "/aiContent/template.png", caption: "Content prompt templates collection" },
        { src: "/aiContent/generated.png", caption: "Real-time AI output generation editor" },
        { src: "/aiContent/analytics.png", caption: "Usage stats & credit analytics view" },
      ],
    },
    {
      slug: "ai-generated-prompt",
      featured: true,
      category: "AI Tool / SaaS",
      title: "AI Prompt Engineering",
      description:
        "Transform rough ideas into precision-crafted prompts for ChatGPT, Claude, Gemini, Midjourney, and DALL-E.",
      overview:
        "A high-performance prompt engineering tool designed to refine, enhance, and optimize raw ideas into precision-crafted prompts across top AI models.",
      built: [
        "Multi-model prompt parser & tailoring engine",
        "Dynamic enhancement preset algorithms",
        "Instant formatted prompt output generator",
      ],
      tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "GroqAI API"],
      features: [
        "Multi-model support",
        "Prompt optimization",
        "Enhancement modes",
        "One-click copy",
      ],
      github: "https://github.com/sheikhmuneerabd-star/generated-prompt-web",
      live: "https://ai-generated-prompt.vercel.app",
      image: "/aiGeneratedPrompt/intro.png",
      gallery: [
        { src: "/aiGeneratedPrompt/fullpage.png", caption: "Prompt generator platform overview" },
      ],
    },
    {
      slug: "linkedin-clone",
      featured: false,
      category: "Full-Stack / Social",
      title: "LinkedIn Clone - Social Network & Real-Time Chat",
      description:
        "A full-stack social networking platform featuring real-time messaging, post interactions, user profiles, and connection requests.",
      overview:
        "A professional social media platform built to simulate core LinkedIn functionalities, including real-time chat, media posts, comments, profile customization, and network management.",
      built: [
        "Real-time one-on-one messaging using Socket.io",
        "Post creation, media upload, and interactive comment system",
        "Profile editing, experience management, and network connections",
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      features: [
        "Real-time chat",
        "Post feed & comments",
        "Profile management",
        "Connection requests",
      ],
      github: "https://github.com/sheikhmuneerabd-star/Linkedin",
      live: "",
      image: "/linkedin/intro.png",
      gallery: [
        { src: "/linkedin/edit.png", caption: "Profile & experience editing section" },
        { src: "/linkedin/message.png", caption: "Real-time messaging chat interface" },
        { src: "/linkedin/post.png", caption: "Interactive main feed & post creator" },
        { src: "/linkedin/commentSec.png", caption: "Post details with comment section" },
      ],
    },
    {
      slug: "freelancer-workspace",
      featured: false,
      category: "Full-Stack / Marketplace",
      title: "FreelancerHub - Freelance Marketplace & Workspace",
      description:
        "A full-stack freelance platform connecting clients and freelancers with client/freelancer dashboards, project proposals, real-time chat, and review systems.",
      overview:
        "A comprehensive freelance marketplace solution that enables clients to post jobs and manage projects while allowing freelancers to submit proposals, manage tasks, track earnings, and communicate seamlessly.",
      built: [
        "Dual dashboard views for clients and freelancers",
        "Real-time proposal submission and contract management",
        "Direct messaging system and client review ratings",
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      features: [
        "Client & freelancer dashboards",
        "Real-time chat",
        "Proposal management",
        "Review & rating system",
      ],
      github: "https://github.com/sheikhmuneerabd-star/freelancerWorkspace",
      live: "",
      image: "/freelancerWorkspace/intro.png",
      gallery: [
        { src: "/freelancerWorkspace/client dash.png", caption: "Client dashboard & job posting management" },
        { src: "/freelancerWorkspace/freelacer dash.png", caption: "Freelancer workspace & proposal overview" },
        { src: "/freelancerWorkspace/client pro.png", caption: "Client profile & active contract details" },
        { src: "/freelancerWorkspace/chat.png", caption: "Real-time client-freelancer chat interface" },
        { src: "/freelancerWorkspace/freelancer review.png", caption: "Freelancer ratings & feedback section" },
      ],
    },
    {
      slug: "ai-productivity-platform",
      featured: false,
      category: "AI / SaaS Platform",
      title: "All-in-One - AI Productivity SaaS Platform",
      description:
        "An all-in-one productivity suite featuring 20+ AI tools for content creation, code generation, document analysis, and AI chat.",
      overview:
        "An all-in-one AI productivity SaaS platform equipped with 20+ specialized micro-tools—including resume builders, code generators, PDF chat, humanizers, and image tools—designed to optimize daily workflows under a unified dashboard.",
      built: [
        "Modular architecture hosting 20+ AI micro-tools",
        "Real-time streaming AI chat and generation workflows",
        "Credit management and token usage tracking system",
      ],
      tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "GroqAI API"],
      features: [
        "20+ AI micro-tools",
        "Unified SaaS dashboard",
        "Credit tracking system",
        "PDF & document chat",
      ],
      github: "https://github.com/sheikhmuneerabd-star/ai-productivity-platform",
      live: "https://ai-productivity-platform-pro-max.vercel.app",
      image: "/aiProductivity/fullpage.png",
      gallery: [
        { src: "/aiProductivity/twentyTools.png", caption: "20+ AI tools grid dashboard view" },
        { src: "/aiProductivity/ai chat.png", caption: "Interactive AI chat & assistant interface" },
        { src: "/aiProductivity/imageGen.png", caption: "AI image generation workflow tool" },
        { src: "/aiProductivity/landingPage.png", caption: "Platform homepage & feature showcase" },
      ],
    },
    {
      slug: "xteamwear-ecommerce",
      featured: false,
      category: "E-commerce / React",
      title: "Xteamwear - Custom Sports Uniforms Store",
      description:
        "A full-stack e-commerce web application built with React for custom sportswear featuring live uniform previews, dynamic product catalogs, and cart management.",
      overview:
        "A full-stack e-commerce platform built using React, designed specifically for sports teams and athletes to customize, preview, and purchase bespoke team uniforms and sportswear online.",
      built: [
        "Interactive product option selector for dynamic customization",
        "Categorized product catalog with instant filter capabilities",
        "Persistent shopping cart state and checkout flow integration",
      ],
      tech: ["React", "JavaScript", "Tailwind CSS"],
      features: [
        "Dynamic product catalog",
        "Sports category filters",
        "Product option selector",
        "Persistent shopping cart",
      ],
      github: "https://github.com/sheikhmuneerabd-star/xteamwear",
      live: "https://xteamwear-frontend.netlify.app",
      image: "/xteamwear/intro.png",
      gallery: [
        { src: "/xteamwear/home.png", caption: "Store homepage & featured teamwear collections" },
        { src: "/xteamwear/single product.png", caption: "Detailed product customization & size selector" },
        { src: "/xteamwear/category.png", caption: "Sports category filtering & item listings" },
        { src: "/xteamwear/cart.png", caption: "Shopping cart & order summary drawer" },
      ],
    },
    {
      slug: "luxecart-ecommerce",
      featured: false,
      category: "E-commerce / MERN Stack",
      title: "LuxeCart - Modern E-commerce Store",
      description:
        "A full-stack modern e-commerce platform built with the MERN stack, featuring product filtering, cart management, user auth, and secure checkout.",
      overview:
        "A high-performance online retail store designed to offer a seamless shopping experience with dynamic product search, interactive cart drawers, user account management, and payment processing.",
      built: [
        "Full-stack MERN architecture with MongoDB product schemas",
        "Persistent shopping cart state and real-time total calculations",
        "Secure user authentication and end-to-end checkout flow",
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      features: [
        "Dynamic product catalog",
        "Category & price filtering",
        "User authentication",
        "Interactive shopping cart",
      ],
      github: "https://github.com/sheikhmuneerabd-star/luxecart-ecommerce",
      live: "",
      image: "/luxecart/intro.png",
      gallery: [
        { src: "/luxecart/home.png", caption: "Store homepage & featured collections" },
        { src: "/luxecart/single.png", caption: "Single product details & variant selector" },
        { src: "/luxecart/cart.png", caption: "Interactive shopping cart drawer view" },
        { src: "/luxecart/payment.png", caption: "Secure checkout & order confirmation screen" },
      ],
    },
  ],

  techStack: [
    "React", "Next.js", "TypeScript", "Node.js", "Express", "Tailwind CSS",
    "GSAP", "Framer Motion", "MongoDB", "Git", "Figma", "Vercel",
  ],

  contact: {
    eyebrow: "Contact",
    heading: ["Let's work", "together."],
    text: "Have a project in mind or just want to say hello? Send me a message and I will reply within a day or two.",
  },
} as const;

export type Social = (typeof portfolio.socials)[number];
export type Project = Omit<(typeof portfolio.projects)[number], "live"> & {
  live?: string;
};