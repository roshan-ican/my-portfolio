# Full-Stack Developer Portfolio

A modern, responsive portfolio website built with Next.js 14+, TypeScript, Tailwind CSS, and Framer Motion. Features dark/light theme switching, smooth animations, and comprehensive SEO optimization.

![Portfolio Preview](https://via.placeholder.com/1200x630/1f2937/ffffff?text=Modern+Portfolio+Website)

## ✨ Features

### 🎨 **Modern Design**

- **Dark/Light Theme Toggle** with smooth transitions
- **Glassmorphism Effects** with backdrop blur
- **Gradient Animations** and interactive elements
- **Mobile-First Responsive Design**

### 🚀 **Enhanced Animations**

- **Framer Motion** powered smooth animations
- **Scroll-triggered animations** with viewport detection
- **Interactive hover effects** and micro-interactions
- **Staggered content reveals** for better UX

### 📱 **Complete Sections**

- **Hero Section** with animated elements and social links
- **About Me** with skills highlights and personal story
- **Technical Skills** with animated progress bars
- **Experience Timeline** with work history and education
- **Projects Showcase** with live demos and GitHub links
- **Contact Form** with validation and submission handling

### ⚡ **Performance & SEO**

- **Next.js 14+ App Router** for optimal performance
- **SEO Optimized** with meta tags and structured data
- **Image Optimization** with Next.js Image component
- **Font Optimization** with Google Fonts
- **Accessibility Features** with ARIA labels and keyboard navigation

### 🛠 **Technical Features**

- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom design system
- **Form Validation** with real-time feedback
- **Theme Persistence** with localStorage
- **Smooth Scrolling** navigation
- **Custom Animations** with CSS keyframes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Main page component
│   │   └── globals.css         # Global styles and themes
│   └── components/
│       ├── Hero.tsx            # Hero section
│       ├── About.tsx           # About section
│       ├── Skills.tsx          # Skills section
│       ├── Experience.tsx      # Experience timeline
│       ├── Projects.tsx        # Projects showcase
│       ├── Contact.tsx         # Contact form
│       ├── Navigation.tsx      # Navigation menu
│       ├── Footer.tsx          # Footer section
│       └── ThemeToggle.tsx     # Theme switcher
├── public/                     # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.ts             # Next.js configuration
└── package.json               # Dependencies
```

## 🎨 Customization Guide

### 1. **Personal Information**

Update the following files with your information:

**Hero Section** (`src/components/Hero.tsx`):

```tsx
// Update name, title, and description
<h1>Hi, I'm <span>Your Name</span></h1>
<h2>Your Title</h2>
<p>Your description...</p>

// Update social links
const socialLinks = [
  { icon: Mail, href: "mailto:your.email@domain.com" },
  { icon: Linkedin, href: "https://linkedin.com/in/yourprofile" },
  { icon: Github, href: "https://github.com/yourusername" }
];
```

**About Section** (`src/components/About.tsx`):

- Update personal story and background
- Modify skills and traits
- Add your professional photo

**Experience Section** (`src/components/Experience.tsx`):

- Replace work experience with your history
- Update education background
- Modify certifications

**Projects Section** (`src/components/Projects.tsx`):

- Replace sample projects with your work
- Update project descriptions and links
- Add project screenshots

**Contact Section** (`src/components/Contact.tsx`):

- Update contact information
- Configure form submission endpoint

### 2. **Styling & Theme**

**Colors** (`tailwind.config.ts`):

```ts
// Customize your color palette
theme: {
  extend: {
    colors: {
      primary: {
        // Your brand colors
      }
    }
  }
}
```

**Animations** (`src/app/globals.css`):

```css
/* Add custom animations */
@keyframes yourAnimation {
  /* Animation keyframes */
}
```

### 3. **SEO Configuration**

**Meta Tags** (`src/app/layout.tsx`):

```tsx
export const metadata: Metadata = {
  title: "Your Name - Your Title",
  description: "Your description",
  // Update all meta tags with your information
};
```

**Structured Data**:

```tsx
// Update the JSON-LD structured data with your information
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# Contact Form
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your_formspree_endpoint
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Form Submission

The contact form is ready to integrate with:

1. **Formspree**: Update the form action
2. **EmailJS**: Configure EmailJS service
3. **Netlify Forms**: Add `data-netlify="true"`
4. **Custom API**: Create `/api/contact` endpoint

### Analytics

Uncomment and configure the analytics script in `layout.tsx`:

```tsx
// Google Analytics
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
  strategy="afterInteractive"
/>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Custom Server

1. Build: `npm run build`
2. Start: `npm start`

## 📊 Performance

This portfolio is optimized for:

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Excellent ratings
- **SEO**: Comprehensive optimization
- **Accessibility**: WCAG 2.1 AA compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js** for the amazing framework
- **Tailwind CSS** for the utility-first CSS
- **Framer Motion** for smooth animations
- **Lucide React** for beautiful icons

---

**Built with ❤️ by [Your Name](https://yourwebsite.com)**

Ready to showcase your skills? Customize this portfolio and make it your own! 🚀
# portfolio-latest
