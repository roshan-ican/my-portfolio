"use client"
import { useState, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // --- 1. "Blog" has been added here ---
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    // { name: "Projects", href: "#projects" },
    { name: "Blog", href: "https://dev.to/roshan_ican" },
    { name: "Contact", href: "#contact" },
  ]

  // --- 2. This function is updated to handle external links ---
  const scrollToSection = (href: string) => {
    // Handle full external URLs (like your blog)
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener noreferrer")
    }
    // Handle internal hash links
    else if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        const navHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navHeight
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
    // Handle other relative links
    else if (href.startsWith("/")) {
      window.location.href = href
    }
    setIsOpen(false)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-slate-900/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="flex items-center gap-2 text-2xl font-bold text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Globe size={16} className="text-white" />
            </motion.div>
            <span className="font-extrabold">Roshan Sahani</span>
          </motion.div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 400 },
                }}
                className="relative px-4 py-2 text-white/70 hover:text-white transition-all duration-300 font-medium rounded-lg group"
              >
                {item.name}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300 transform -translate-x-1/2"
                  whileHover={{ width: "100%" }}
                />
              </motion.button>
            ))}
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-lg border border-white/30 text-white/70 hover:text-white transition-colors duration-200"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl mt-2 py-4 border border-white/20 overflow-hidden"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  variants={itemVariants}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ x: 10, transition: { type: "spring", stiffness: 400 } }}
                  className="block w-full text-left px-6 py-3 text-white/70 hover:text-white transition-all duration-200 relative group"
                >
                  {item.name}
                  <motion.div
                    className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation