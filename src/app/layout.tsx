import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://roshan-portfolio.vercel.app"),
  title: "Roshan Sahani - Senior Software Engineer | Distributed Systems, Microservices, Node.js",
  description:
    "Senior Software Engineer and Technical Architect specializing in distributed systems, microservices architecture, and data-intensive platforms. Expert in Node.js, TypeScript, Kafka, Redis, and cloud-native infrastructure. Google Hackathon finalist.",
  keywords: [
    "Senior Software Engineer",
    "Distributed Systems",
    "Microservices Architecture",
    "Node.js Developer",
    "TypeScript",
    "System Design",
    "Event-Driven Architecture",
    "Kafka",
    "Redis",
    "GraphQL",
    "AWS",
    "Kubernetes",
    "Backend Engineer",
    "Technical Architect",
    "Bengaluru",
    "India",
  ],
  authors: [{ name: "Roshan Sahani", url: "https://roshan-portfolio.vercel.app" }],
  creator: "Roshan Sahani",
  publisher: "Roshan Sahani",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://roshan-portfolio.vercel.app",
    title: "Roshan Sahani - Senior Software Engineer",
    description:
      "Distributed systems architect with expertise in microservices, event-driven design, and high-performance data pipelines. Senior Software Engineer at Neokred.",
    siteName: "Roshan Sahani Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Roshan Sahani - Senior Software Engineer | Distributed Systems Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roshan Sahani - Senior Software Engineer",
    description:
      "Technical architect specializing in distributed systems, microservices, and cloud-native infrastructure.",
    creator: "@RoshanAnu333",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://roshan-portfolio.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        {/* Additional SEO and Performance Tags */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#1f2937" />
        <meta name="color-scheme" content="dark light" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Roshan Sahani",
              jobTitle: "Senior Software Engineer",
              description:
                "Senior Software Engineer and Technical Architect specializing in distributed systems, microservices architecture, event-driven design, and high-performance data pipelines.",
              url: "https://roshan-portfolio.vercel.app",
              email: "roshansahani535@gmail.com",
              telephone: "Not provided",
              sameAs: [
                "https://github.com/roshan-ican",
                "https://www.linkedin.com/in/roshan-sahani",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                addressCountry: "India",
              },
              knowsAbout: [
                "Node.js",
                "TypeScript",
                "Microservices",
                "Distributed Systems",
                "Kafka",
                "Redis",
                "GraphQL",
                "AWS",
                "Kubernetes",
                "Docker",
                "Python",
                "FastAPI",
                "MongoDB",
                "PostgreSQL",
                "Event-Driven Architecture",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Central Board of Secondary Education (CBSE)",
              },
              worksFor: {
                "@type": "Organization",
                name: "Neokred",
                jobTitle: "Senior Software Engineer (SDE-2)",
              },
            }),
          }}
        />

        {/* Performance Hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${inter.className} antialiased dark`}>
        {children}

        {/* Analytics Script (uncomment and add your tracking ID) */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_TRACKING_ID');
          `}
        </Script> */}
      </body>
    </html>
  );
}
