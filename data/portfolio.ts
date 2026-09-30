export const portfolio = {
  profile: {
    name: "Muneer Hussain",
    role: "Full Stack Developer",
    location: "Faisalabad, Pakistan",
    email: "hello@example.com", // apni email likhein
    phone: "+92 300 0000000", // apna number likhein
    bio: "I build fast, thoughtful web experiences from front to back.",
    cv: "/cv.pdf", // apna CV public/cv.pdf mein rakhein
    portrait: "/portrait.svg",
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
    { type: "github", label: "GitHub", href: "https://github.com/your-username" },
    { type: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/your-username" },
    { type: "email", label: "Email", href: "mailto:hello@example.com" },
  ],

    hero: {
    headline: ["FULL STACK", "DEVELOPER"],
    intro:
      "I design and build fast, polished web apps, from pixel-perfect interfaces to solid APIs.",
    focus: ["Next.js & React", "Node.js & APIs", "AI-powered apps"],
    stats: [
      { value: "3+", label: "Years experience" },
      { value: "20+", label: "Projects built" },
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
      tech: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST", "Prisma"],
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
      slug: "shopverse",
      featured: true,
      category: "E-commerce Platform",
      title: "ShopVerse",
      description: "A fast online store with cart, payments and an admin dashboard.",
      overview:
        "ShopVerse is a full e-commerce platform built for small brands. It focuses on speed, a simple checkout and an easy admin panel to manage products and orders.",
      built: [
        "Product catalog with search, filters and sorting",
        "Secure checkout with Stripe payments",
        "Admin dashboard for products, orders and customers",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Stripe"],
      features: ["Live search", "Cart that syncs across devices", "Order tracking", "Role-based admin"],
      github: "https://github.com/your-username/shopverse",
      live: "https://example.com",
      image: "",
      gallery: [
        { src: "", caption: "Home page with featured products" },
        { src: "", caption: "Product page and cart drawer" },
        { src: "", caption: "Admin dashboard overview" },
      ],
    },
    {
      slug: "chatmind",
      featured: true,
      category: "AI Application",
      title: "ChatMind",
      description: "An AI assistant that answers questions from your own documents.",
      overview:
        "ChatMind lets people upload documents and chat with them. It uses retrieval so answers come from the uploaded files, with sources shown.",
      built: [
        "Document upload and text extraction",
        "Vector search with RAG pipeline",
        "Streaming chat interface with sources",
      ],
      tech: ["Next.js", "Claude API", "LangChain", "Vector DB", "Tailwind CSS"],
      features: ["Streaming answers", "Source citations", "Multiple document chats", "Chat history"],
      github: "https://github.com/your-username/chatmind",
      live: "https://example.com",
      image: "",
      gallery: [
        { src: "", caption: "Chat screen with cited sources" },
        { src: "", caption: "Document library" },
      ],
    },
    {
      slug: "taskflow",
      featured: true,
      category: "SaaS Dashboard",
      title: "TaskFlow",
      description: "A clean project management app for small teams.",
      overview:
        "TaskFlow helps small teams plan work with boards, deadlines and simple reports, in an interface that stays out of the way.",
      built: [
        "Drag and drop kanban boards",
        "Team accounts with roles and invites",
        "Weekly progress charts",
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "Docker", "AWS"],
      features: ["Drag and drop boards", "Deadline reminders", "Team roles", "Progress charts"],
      github: "https://github.com/your-username/taskflow",
      live: "https://example.com",
      image: "",
      gallery: [
        { src: "", caption: "Kanban board view" },
        { src: "", caption: "Reports and charts" },
      ],
    },
        {
      slug: "weatherly",
      featured: false, // home par nahi, sirf /projects par
      category: "Web App",
      title: "Weatherly",
      description: "A simple weather app with a 7-day forecast.",
      overview:
        "Weatherly shows current weather and a weekly forecast with a clean, fast interface.",
      built: ["Location search", "7-day forecast", "Saved cities"],
      tech: ["React", "TypeScript", "Tailwind CSS"],
      features: ["City search", "Hourly forecast", "Saved cities", "Dark mode"],
      github: "https://github.com/your-username/weatherly",
      live: "https://example.com",
      image: "",
      gallery: [{ src: "", caption: "Forecast view" }],
    },
  ],

  techStack: [
    "React", "Next.js", "TypeScript", "Node.js", "Express", "Tailwind CSS",
    "GSAP", "Framer Motion", "PostgreSQL", "MongoDB", "Docker", "Git", "Figma", "Vercel",
  ],

  contact: {
    eyebrow: "Contact",
    heading: ["Let's work", "together."],
    text: "Have a project in mind or just want to say hello? Send me a message and I will reply within a day or two.",
  },
} as const;

export type Social = (typeof portfolio.socials)[number];
export type Project = (typeof portfolio.projects)[number];