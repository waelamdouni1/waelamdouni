import type { ProjectCaseStudy } from "@/lib/cms/types";

const defaultSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "research", label: "Research" },
  { id: "strategy", label: "UX Strategy" },
  { id: "ui", label: "UI Showcase" },
  { id: "system", label: "Design System" },
  { id: "results", label: "Results" },
] as const;

export const caseStudies: ProjectCaseStudy[] = [
  {
    id: "1",
    slug: "transit-management-platform",
    title: "Transit Management Platform",
    category: "B2B SaaS",
    description:
      "Real-time dispatch, route monitoring, and operational compliance platform customized for ZATCA's requirements.",
    tags: ["Real-Time Mapping", "Transit Operations", "SaaS Dashboard"],
    image: "/images/Transit_Featured.png",
    imageAlt: "Transit dispatch real-time dashboard layout",
    heroImage: "/images/Transit_Featured.png",
    featured: true,
    size: "tall",
    year: 2025,
    role: "Lead Product Designer",
    timeline: "4 months",
    deliverables: ["UX Audit", "Real-time UI", "Component Library", "Clickable Prototype"],
    overview:
      "The Transit Management Platform empowers operators to monitor vehicles, trips, and overall transit operations in real time. The project successfully tailored the interface to ZATCA's operational regulations while drastically improving dispatcher ergonomics.",
    problem:
      "Operators struggled to monitor vehicles, trips, and transit operations in real time, making daily operations difficult to manage efficiently and causing compliance delays.",
    research:
      "Conducted contextual inquiries with dispatch managers and shadowed operations teams to understand high-stress telemetry monitoring, cognitive load, and routing priorities.",
    uxStrategy:
      "Designed a real-time transit management platform with interactive maps, zone management, trip monitoring, operational dashboards, and a companion mobile app for drivers.",
    designSystem:
      "Developed a telemetry-oriented UI kit with unified status indicators, clear typography scale for mapping interfaces, and highly visible interactive alert nodes.",
    results:
      "Improved the user experience and successfully customized the platform to meet ZATCA's operational requirements.",
    gallery: [
      {
        src: "/images/Transit_Mockup_1.png",
        alt: "Active route monitoring view",
        caption: "Real-time tracking grid",
      },
      {
        src: "/images/Transit_Mockup_2.png",
        alt: "Zone management maps",
        caption: "Geofencing and zone telemetry setup",
      },
      {
        src: "/images/Transit_Mockup_3.png",
        alt: "Operator dispatcher dashboard",
        caption: "Daily statistics and vehicle alerts",
      },
      {
        src: "/images/Transit_Mockup_4.png",
        alt: "Companion driver application",
        caption: "Driver-focused UI overview",
      },
    ],
    uiShowcase: [
      {
        src: "/images/Transit_Mockup_1.png",
        alt: "Dispatcher interface mockup",
      },
      {
        src: "/images/Transit_Mockup_2.png",
        alt: "Interactive map visualization",
      },
    ],
    sidebarSections: [...defaultSections],
  },
  {
    id: "2",
    slug: "lrt-cloud",
    title: "LRT Cloud",
    category: "EV Charging",
    description:
      "Centralized SaaS dashboard for charging station telemetry, automated reimbursements, and energy grid load balancing.",
    tags: ["EV Telemetry", "Energy Management", "B2B SaaS"],
    image: "/images/LRT_Featured.png",
    imageAlt: "Centralized EV charging status dashboard",
    heroImage: "/images/LRT_Featured.png",
    featured: true,
    size: "medium",
    year: 2024,
    role: "Lead Product Designer",
    timeline: "5 months",
    deliverables: ["SaaS Architecture", "UI Design System", "Telemetry Workflows"],
    overview:
      "LRT Cloud is a centralized platform for managing charging stations, users, organizations, subscriptions, reimbursements, and energy systems, helping operators track load distribution and billing.",
    problem:
      "EV charging operators lacked a centralized way to monitor charging stations, users, and energy consumption in a unified interface.",
    research:
      "Audited energy management standards and surveyed station operators to map the core billing and maintenance workflow loops.",
    uxStrategy:
      "Designed a cloud platform for managing charging stations, users, organizations, subscriptions, reimbursements, and energy systems.",
    designSystem:
      "Created a component framework with telemetry sparklines, consumption badges, and subscription/pricing builder patterns.",
    results:
      "Accelerated product readiness by designing scalable workflows for charging management, reimbursements, subscriptions, and energy systems.",
    gallery: [
      {
        src: "/images/LRT_Mockup_1.png",
        alt: "Station status monitoring",
        caption: "Charging telemetry list",
      },
      {
        src: "/images/LRT_Mockup_2.png",
        alt: "Reimbursement setup flow",
        caption: "SaaS automated billing and rules",
      },
      {
        src: "/images/LRT_Mockup_3.png",
        alt: "Organization overview",
        caption: "Multi-tenant workspace controls",
      },
      {
        src: "/images/LRT_Mockup_4.png",
        alt: "Energy consumption telemetry",
        caption: "Live consumption load analytics",
      },
    ],
    uiShowcase: [
      {
        src: "/images/LRT_Mockup_1.png",
        alt: "LRT Cloud station view mockup",
      },
      {
        src: "/images/LRT_Mockup_2.png",
        alt: "Load balance chart details",
      },
    ],
    sidebarSections: [...defaultSections],
  },
  {
    id: "3",
    slug: "powerup-mobile-app",
    title: "PowerUp Mobile App",
    category: "Mobile Apps",
    description:
      "Reimagined EV charging app focusing on seamless hardware onboarding, instant map payments, and charging logs.",
    tags: ["Mobile UX", "EV Charging", "User Growth"],
    image: "/images/Powerup_Featured.png",
    imageAlt: "PowerUp mobile onboarding screen mockups",
    heroImage: "/images/Powerup_Featured.png",
    featured: true,
    size: "short",
    year: 2024,
    role: "UI/UX Designer",
    timeline: "3 months",
    deliverables: ["User Flows", "Mobile UI Layouts", "Growth Mechanics"],
    overview:
      "The PowerUp mobile app delivers an intuitive onboarding and charger setup experience. The redesign addresses major onboarding bottlenecks and provides streamlined public charging paths.",
    problem:
      "Users found public charging and charger setup unnecessarily complex, leading to friction during onboarding and charging sessions.",
    research:
      "Conducted card sorting, interactive remote usability tests, and user interviews to isolate key points of drop-off during the initial Bluetooth charger pairing sequence.",
    uxStrategy:
      "Redesigned the mobile experience focusing on charger setup, public charging, user engagement, and growth-focused UX improvements.",
    designSystem:
      "Constructed a high-contrast mobile design system optimized for outdoor visibility, featuring friendly helper illustrations and large touch targets.",
    results:
      "Improved the charging experience through a redesigned onboarding flow and growth-focused user journeys.",
    gallery: [
      {
        src: "/images/Powerup_Mockup_1.png",
        alt: "Charger onboarding setup guide",
        caption: "Bluetooth charger provisioning UI",
      },
      {
        src: "/images/Powerup_Mockup_2.png",
        alt: "Map view and station details",
        caption: "Map-centric station locator",
      },
      {
        src: "/images/Powerup_Mockup_3.png",
        alt: "Active charging session timer",
        caption: "Live charging progress view",
      },
    ],
    uiShowcase: [
      {
        src: "/images/Powerup_Mockup_1.png",
        alt: "PowerUp app home showcase",
      },
      {
        src: "/images/Powerup_Mockup_2.png",
        alt: "Onboarding screens assembly",
      },
    ],
    sidebarSections: [...defaultSections],
  },
  {
    id: "4",
    slug: "caria-car-rental",
    title: "Caria",
    category: "B2B SaaS",
    description:
      "Car rental comparison platform unifying offers, booking processes, and fleet management for Tunisian agencies.",
    tags: ["Platform Design", "B2C Marketplace", "Tunisian Tech"],
    image: "/images/Caria_Featured.png",
    imageAlt: "Caria car rental web application grid",
    heroImage: "/images/Caria_Featured.png",
    featured: true,
    size: "medium",
    year: 2024,
    role: "Lead Product Designer",
    timeline: "4 months",
    deliverables: ["UX Audit", "Marketplace UI", "Agency Dashboard"],
    overview:
      "Caria resolves agency fragmentation by offering a unified booking and search platform. Renters can locate, compare, and reserve vehicles through a simplified, reliable UI.",
    problem:
      "Renting a car in Tunisia required comparing offers across multiple agencies, creating a fragmented user experience.",
    research:
      "Conducted interviews with renters and local car rental owners to map out pricing schemas, availability constraints, and typical trust barriers.",
    uxStrategy:
      "Designed a car rental comparison platform allowing users to compare vehicles, prices, and agencies from a single interface.",
    designSystem:
      "Developed a modern layout engine with custom filter panels, detailed comparison tables, and agency review badges.",
    results:
      "Created a unified comparison experience that simplified the car rental search and booking process.",
    gallery: [
      {
        src: "/images/Caria_Mockup_1.png",
        alt: "Search results comparison grid",
        caption: "Vehicle search grid layout",
      },
      {
        src: "/images/Caria_Mockup_2.png",
        alt: "Vehicle selection detail page",
        caption: "Pricing details and terms overview",
      },
      {
        src: "/images/Caria_Mockup_3.png",
        alt: "Agency partner administration dashboard",
        caption: "Fleet reservation dashboard",
      },
    ],
    uiShowcase: [
      {
        src: "/images/Caria_Mockup_1.png",
        alt: "Comparison grid view UI",
      },
      {
        src: "/images/Caria_Mockup_2.png",
        alt: "Detailed product card mockup",
      },
    ],
    sidebarSections: [...defaultSections],
  },
  {
    id: "5",
    slug: "pts-redesign",
    title: "PTS Redesign",
    category: "UX Strategy",
    description:
      "Enterprise workflow optimization and user research to streamline task tracking and cross-team collaboration.",
    tags: ["Workflow Redesign", "Task Management", "User Research"],
    image: "/images/ThinkTank_Featured.png",
    imageAlt: "PTS project management dashboard UI",
    heroImage: "/images/ThinkTank_Featured.png",
    featured: true,
    size: "tall",
    year: 2023,
    role: "Product Designer & Researcher",
    timeline: "6 months",
    deliverables: ["Contextual Inquiry", "Information Architecture", "Interface Redesign"],
    overview:
      "The PTS Redesign focused on simplifying internal project management systems. By analyzing team behaviors and streamlining workflows, we transformed a complex application into an operational tool.",
    problem:
      "Users struggled with a complex interface and inefficient workflows that slowed daily operations.",
    research:
      "Performed shadowing, workflow diagram audits, and user surveys to identify where multi-team handoffs failed or became blocked.",
    uxStrategy:
      "Redesigned the platform using user research, improved information architecture, and simplified workflows for internal project management.",
    designSystem:
      "Rebuilt the dashboard theme with modular task tables, notification center models, and clean dashboard stats.",
    results:
      "Research insights helped streamline task management and improve collaboration between multiple teams.",
    gallery: [
      {
        src: "/images/ThinkTank_Mockup_1.png",
        alt: "Enterprise dashboard view",
        caption: "Project activity tracking overview",
      },
      {
        src: "/images/ThinkTank_Mockup_2.png",
        alt: "Task distribution boards",
        caption: "Simplified project roadmap view",
      },
      {
        src: "/images/ThinkTank_Mockup_3.png",
        alt: "Cross-team collaboration activity logs",
        caption: "Activity feed design showcase",
      },
    ],
    uiShowcase: [
      {
        src: "/images/ThinkTank_Mockup_1.png",
        alt: "PTS main dashboard mockup",
      },
      {
        src: "/images/ThinkTank_Mockup_2.png",
        alt: "Roadmap timeline visualizer",
      },
    ],
    sidebarSections: [...defaultSections],
  },
];
