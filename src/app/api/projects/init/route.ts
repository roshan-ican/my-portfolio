import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Define the Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  features: string[];
  gradient: string;
  status: string;
  createdAt: string;
}

// File path for storing projects
const projectsFilePath = path.join(process.cwd(), "data", "projects.json");

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(projectsFilePath);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Load projects from file
const loadProjects = async (): Promise<Project[]> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(projectsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Save projects to file
const saveProjects = async (projects: Project[]) => {
  await ensureDataDir();
  await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2));
};

// Default projects data
const defaultProjects = [
  {
    id: 1,
    title: "Medical E-commerce Platform",
    description:
      "A comprehensive e-commerce platform specifically designed for medical supplies and healthcare products. Features secure payment processing, inventory management, and healthcare compliance.",
    longDescription:
      "Developed a specialized e-commerce platform for medical supplies with healthcare-specific features including prescription management, medical device categorization, and compliance with healthcare regulations. The platform includes secure payment processing, real-time inventory tracking, and integration with healthcare providers. Features responsive design optimized for medical professionals and patients.",
    image: "https://scrnli.com/files/3l5aBP9PJ0BLY2",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "E-commerce",
      "Healthcare",
      "Payment Integration",
    ],
    liveDemo: "https://medical-ecommerce-eight.vercel.app/",
    github: "https://github.com/roshan-ican/medical-ecommerce",
    features: [
      "Medical Product Catalog",
      "Prescription Management",
      "Secure Payment Processing",
      "Healthcare Compliance",
      "Inventory Management",
      "Provider Integration",
    ],
    gradient: "from-blue-500 to-cyan-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Car Booking System",
    description:
      "A modern car rental and booking platform with real-time availability, booking management, and payment processing. Features user authentication and admin dashboard.",
    longDescription:
      "Built a comprehensive car booking system with real-time availability tracking, booking management, and secure payment processing. The platform includes user authentication, admin dashboard for fleet management, booking history, and review system. Features responsive design and integration with payment gateways for seamless transactions.",
    image: "/project-images/car-booking.png",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Booking System",
      "Payment Integration",
      "Real-time Updates",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/Car-booking",
    features: [
      "Real-time Availability",
      "Booking Management",
      "Payment Processing",
      "Admin Dashboard",
      "User Authentication",
      "Review System",
    ],
    gradient: "from-purple-500 to-pink-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Travel Agency Platform",
    description:
      "A comprehensive travel booking platform with tour packages, booking management, and travel planning features. Live demo available with modern UI/UX.",
    longDescription:
      "Developed a full-featured travel agency platform with tour package management, booking system, and travel planning tools. The platform includes user authentication, admin dashboard for tour management, booking history, and payment processing. Features modern responsive design and integration with travel APIs.",
    image: "/project-images/travel-agency.png",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Travel APIs",
      "Booking System",
      "Payment Integration",
    ],
    liveDemo: "https://travel-agency-egmf.vercel.app/",
    github: "https://github.com/roshan-ican/travel-agency",
    features: [
      "Tour Package Management",
      "Booking System",
      "Travel Planning",
      "Payment Processing",
      "Admin Dashboard",
      "Responsive Design",
    ],
    gradient: "from-green-500 to-emerald-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Furniture E-commerce",
    description:
      "A specialized e-commerce platform for furniture with product catalog, shopping cart, and payment integration. Features modern design and user experience.",
    longDescription:
      "Created a dedicated e-commerce platform for furniture with comprehensive product catalog, shopping cart functionality, and secure payment processing. The platform includes user authentication, admin dashboard for inventory management, order processing, and analytics. Features responsive design optimized for furniture shopping experience.",
    image: "/project-images/furniture-ecommerce.png",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "E-commerce",
      "Payment Integration",
      "Inventory Management",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/ecommerce-furniture",
    features: [
      "Furniture Catalog",
      "Shopping Cart",
      "Payment Processing",
      "Admin Dashboard",
      "Order Management",
      "Inventory Tracking",
    ],
    gradient: "from-orange-500 to-red-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Salary Slip Generator",
    description:
      "A comprehensive salary management system with slip generation, payroll processing, and employee management features.",
    longDescription:
      "Built a complete salary management system with automated slip generation, payroll processing, and employee management. The platform includes tax calculations, deduction management, and comprehensive reporting. Features secure data handling and integration with accounting systems.",
    image: "/project-images/salary-slip.png",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Payroll System",
      "PDF Generation",
      "Data Management",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/salaryslip",
    features: [
      "Salary Slip Generation",
      "Payroll Processing",
      "Tax Calculations",
      "Employee Management",
      "Reporting System",
      "PDF Export",
    ],
    gradient: "from-yellow-500 to-orange-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Digital Banking Platform",
    description:
      "A modern digital banking application with account management, transactions, and financial services. Features secure authentication and real-time updates.",
    longDescription:
      "Developed a comprehensive digital banking platform with account management, transaction processing, and financial services. The platform includes secure authentication, real-time transaction updates, account statements, and fund transfer capabilities. Features modern UI/UX with focus on security and user experience.",
    image: "/project-images/digital-banking.png",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Banking APIs",
      "Security",
      "Real-time Updates",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/Digibank",
    features: [
      "Account Management",
      "Transaction Processing",
      "Fund Transfers",
      "Security Features",
      "Real-time Updates",
      "Account Statements",
    ],
    gradient: "from-indigo-500 to-purple-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: "Movie Website",
    description:
      "A comprehensive movie browsing and information platform with search, filtering, and detailed movie information. Live demo available.",
    longDescription:
      "Created a feature-rich movie website with comprehensive movie database, search functionality, and detailed movie information. The platform includes movie ratings, reviews, trailers, and filtering options. Features responsive design and integration with movie APIs for real-time data.",
    image: "/project-images/movie-website.png",
    technologies: [
      "JavaScript",
      "React",
      "Material-UI",
      "Styled Components",
      "Movie APIs",
      "Lodash",
    ],
    liveDemo: "https://movie-website-cj98.vercel.app/",
    github: "https://github.com/roshan-ican/Movie-website",
    features: [
      "Movie Database",
      "Search & Filter",
      "Movie Details",
      "Ratings & Reviews",
      "Trailer Integration",
      "Responsive Design",
    ],
    gradient: "from-red-500 to-pink-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    title: "Real Estate Platform",
    description:
      "A modern real estate platform with property listings, search functionality, and property management features. Live demo available.",
    longDescription:
      "Built a comprehensive real estate platform with property listings, advanced search functionality, and property management tools. The platform includes property details, image galleries, contact forms, and admin dashboard. Features modern design with Chakra UI and integration with real estate APIs.",
    image: "/project-images/real-estate.png",
    technologies: [
      "JavaScript",
      "React",
      "Next.js",
      "Chakra UI",
      "Real Estate APIs",
      "Millify",
    ],
    liveDemo: "https://real-estate-oiz1.vercel.app/",
    github: "https://github.com/roshan-ican/Real-Estate",
    features: [
      "Property Listings",
      "Advanced Search",
      "Property Details",
      "Image Galleries",
      "Contact Forms",
      "Admin Dashboard",
    ],
    gradient: "from-teal-500 to-cyan-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    title: "Digital Agency Website",
    description:
      "A modern website for digital agency services with portfolio showcase, service offerings, and contact management.",
    longDescription:
      "Designed and developed a modern website for digital agency services with portfolio showcase, service offerings, and contact management. The website includes responsive design, smooth animations, and modern UI/UX. Features contact forms, service descriptions, and portfolio gallery.",
    image: "/project-images/digital-agency.png",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Modern UI/UX",
      "Responsive Design",
      "Animations",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/DIGITAL-AGENCY",
    features: [
      "Portfolio Showcase",
      "Service Offerings",
      "Contact Management",
      "Responsive Design",
      "Modern UI/UX",
      "Smooth Animations",
    ],
    gradient: "from-violet-500 to-purple-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    title: "Sweet Delights Bakery",
    description:
      "An e-commerce platform for bakery products with online ordering, payment processing, and delivery management.",
    longDescription:
      "Developed a specialized e-commerce platform for bakery products with online ordering system, payment processing, and delivery management. The platform includes product catalog, shopping cart, order tracking, and admin dashboard for inventory and order management.",
    image: "/project-images/sweet-delights.png",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "E-commerce",
      "Payment Integration",
      "Order Management",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/Sweet-Delights",
    features: [
      "Product Catalog",
      "Online Ordering",
      "Payment Processing",
      "Order Tracking",
      "Delivery Management",
      "Admin Dashboard",
    ],
    gradient: "from-pink-500 to-rose-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 11,
    title: "Medical Store Management",
    description:
      "A comprehensive medical store management system with inventory tracking, sales management, and reporting features.",
    longDescription:
      "Built a complete medical store management system with inventory tracking, sales management, and comprehensive reporting. The system includes stock management, sales tracking, customer management, and financial reporting. Features user authentication and role-based access control.",
    image: "/project-images/medical-store.png",
    technologies: [
      "TypeScript",
      "React",
      "Node.js",
      "Inventory Management",
      "Sales Tracking",
      "Reporting System",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/medical-store",
    features: [
      "Inventory Management",
      "Sales Tracking",
      "Customer Management",
      "Financial Reporting",
      "Stock Alerts",
      "User Authentication",
    ],
    gradient: "from-emerald-500 to-teal-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
  {
    id: 12,
    title: "Web App Builder",
    description:
      "A platform for building and deploying web applications with drag-and-drop functionality and template system.",
    longDescription:
      "Created a web application builder platform with drag-and-drop functionality, template system, and deployment capabilities. The platform allows users to create custom web applications without coding knowledge. Features template library, customization options, and hosting integration.",
    image: "/project-images/web-app-builder.png",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Drag & Drop",
      "Template System",
      "Deployment",
    ],
    liveDemo: "#",
    github: "https://github.com/roshan-ican/makemywebapp",
    features: [
      "Drag & Drop Builder",
      "Template Library",
      "Customization Options",
      "Deployment System",
      "User Dashboard",
      "Hosting Integration",
    ],
    gradient: "from-slate-500 to-gray-500",
    status: "Completed",
    createdAt: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    // Load existing projects
    const existingProjects = await loadProjects();

    // Only initialize if there are no projects at all
    if (existingProjects.length === 0) {
      // Add default projects only when the file is completely empty
      await saveProjects(defaultProjects);

      return NextResponse.json({
        message: "Default projects initialized successfully",
        added: defaultProjects.length,
        total: defaultProjects.length,
      });
    } else {
      return NextResponse.json({
        message: "Projects already exist, skipping initialization",
        count: existingProjects.length,
      });
    }
  } catch (error) {
    console.error("Error initializing default projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const projects = await loadProjects();
    return NextResponse.json({
      message: "Current projects status",
      count: projects.length,
      hasDefaults: projects.some((p) => p.id <= 12),
    });
  } catch (error) {
    console.error("Error checking projects status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
