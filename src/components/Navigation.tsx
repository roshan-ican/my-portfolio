"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Globe removed
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from "framer-motion";

// --- 1. Reusable Mew SVG Component ---
// We make this a separate component to keep the main return clean
const MewSvg = ({ animate, variants }: { animate: string; variants: Variants }) => (
  <motion.svg
    width="56" // Standardized size
    height="56"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-2xl"
    variants={variants}
    animate={animate} // "move", "stop", or "sleep"
    style={{ transformOrigin: "center center" }}
  >
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Body */}
    <ellipse cx="32" cy="40" rx="16" ry="14" fill="#C8A2C8" filter="url(#glow)" />
    <circle cx="32" cy="26" r="14" fill="#C8A2C8" filter="url(#glow)" />
    {/* Ears */}
    <path d="M 20 18 L 16 6 L 26 14 Z" fill="#C8A2C8" />
    <path d="M 20 18 L 18 10 L 24 15 Z" fill="#E0BBE4" />
    <path d="M 44 18 L 48 6 L 38 14 Z" fill="#C8A2C8" />
    <path d="M 44 18 L 46 10 L 40 15 Z" fill="#E0BBE4" />
    {/* Eyes (Blinking animation is now part of the variants) */}
    <motion.g variants={eyeVariants} animate={animate}>
      <ellipse cx="26" cy="24" rx="2.5" ry="4" fill="#66CCFF" />
      <ellipse cx="38" cy="24" rx="2.5" ry="4" fill="#66CCFF" />
      <ellipse cx="26.5" cy="23" rx="1" ry="1.5" fill="white" />
      <ellipse cx="38.5" cy="23" rx="1" ry="1.5" fill="white" />
    </motion.g>
    {/* Face */}
    <path d="M 32 28 L 30 30 L 34 30 Z" fill="#F8BBD0" />
    <path d="M 32 30 Q 28 33 26 31" stroke="#1a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M 32 30 Q 36 33 38 31" stroke="#1a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    {/* Whiskers removed */}
    {/* Tail */}
    <motion.path
      d="M 46 44 Q 56 46 60 42 Q 62 38 58 34"
      stroke="#C8A2C8"
      strokeWidth="6"
      fill="none"
      strokeLinecap="round"
      variants={tailVariants}
      animate={animate}
    />
    {/* Feet */}
    <motion.g variants={feetVariants} animate={animate}>
      <ellipse cx="26" cy="56" rx="4" ry="3" fill="#C8A2C8" />
      <circle cx="25" cy="56" r="1" fill="#E0BBE4" />
      <circle cx="27" cy="56" r="1" fill="#E0BBE4" />
    </motion.g>
    <motion.g variants={feetVariants} animate={animate}>
      <ellipse cx="38" cy="56" rx="4" ry="3" fill="#C8A2C8" />
      <circle cx="37" cy="56" r="1" fill="#E0BBE4" />
      <circle cx="39" cy="56" r="1" fill="#E0BBE4" />
    </motion.g>
  </motion.svg>
);

// --- 2. Animation Variants ---
const mewVariants: Variants = {
  move: {
    y: [0, -8, 0],
    rotate: [0, 3, -3, 0],
    skewY: [0, 0.5, -0.5, 0],
    transition: {
      y: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 1.0, repeat: Infinity, ease: "easeInOut" },
      skewY: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
    }
  },
  stop: {
    y: [0, -3, 0],
    rotate: 0,
    skewY: 0,
    transition: {
      y: { duration: 2.0, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 0.4 },
      skewY: { duration: 0.4 }
    }
  },
  sleep: { // Special "sleeping" variant for mobile
    y: [0, -2, 0], // Gentle bob
    rotate: 0,
    skewY: 0,
    transition: {
      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    }
  }
};

const eyeVariants: Variants = {
  move: { scaleY: 1, transition: { duration: 0.2 } }, // Eyes open when moving
  stop: { // Blink when idle
    scaleY: [1, 0.1, 1],
    transition: { duration: 0.3, repeat: Infinity, repeatDelay: 3 }
  },
  sleep: { // Eyes closed when sleeping
    scaleY: 0.1,
    transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 }
  }
};

const tailVariants: Variants = {
  move: { // Animated tail path
    d: [
      "M 46 44 Q 56 46 60 42 Q 62 38 58 34",
      "M 46 44 Q 56 42 60 36 Q 64 30 62 26",
      "M 46 44 Q 56 46 60 42 Q 62 38 58 34"
    ],
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
  },
  stop: { d: "M 46 44 Q 56 46 60 42 Q 62 38 58 34", transition: { duration: 0.4 } }, // Static tail
  sleep: { d: "M 46 44 Q 56 46 60 42 Q 62 38 58 34", transition: { duration: 0.4 } } // Static tail
};

const feetVariants: Variants = {
  move: { // Wiggle feet
    y: [0, -4, 0],
    rotate: [0, -8, 0],
    transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" }
  },
  stop: { y: 0, rotate: 0, transition: { duration: 0.4 } }, // Static feet
  sleep: { y: 0, rotate: 0, transition: { duration: 0.4 } } // Static feet
};


// --- 3. Main Navigation Component ---
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false);

  // --- Mew Cursor State ---
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Slower, floatier spring
  const springConfig = { damping: 60, stiffness: 100, mass: 2 };
  const mewX = useSpring(mouseX, springConfig);
  const mewY = useSpring(mouseY, springConfig);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md: breakpoint
    };
    checkMobile(); // Check on initial load
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mouse move effect (Gated by isMobile)
  useEffect(() => {
    let lastX = 0;
    let moveTimer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const deltaX = e.clientX - lastX;
      if (deltaX > 5) setDirection("right");
      else if (deltaX < -5) setDirection("left");
      lastX = e.clientX;
      
      setIsMoving(true); 
      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => setIsMoving(false), 150);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    // Only add mouse listeners if not on mobile
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseover", handleMouseEnter);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseEnter);
      clearTimeout(moveTimer);
    };
  }, [isMobile, mouseX, mouseY]); // Re-run if isMobile changes


  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Blog", href: "https://dev.to/roshan_ican" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener noreferrer")
    }
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
    else if (href.startsWith("/")) {
      window.location.href = href
    }
    setIsOpen(false)
  }

  const menuVariants = {
    closed: { opacity: 0, y: -20, scale: 0.95, /*...*/ },
    open: { opacity: 1, y: 0, scale: 1, /*...*/ },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  // Determine current animation state
  const animationState = isMobile ? "sleep" : (isMoving ? "move" : "stop");

  return (
    <>
      {/* --- 4. FOLLOWER MEW (Desktop Only) --- */}
      {/* This is the cursor that follows the mouse */}
      {!isMobile && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: mewX,
            y: mewY,
          }}
          // Fades in when moving, out when stopped
          animate={{ opacity: isMoving ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <motion.div
            animate={{
              scale: isHovering ? 1.3 : 1,
              scaleX: direction === "left" ? -1 : 1, // Flip direction
            }}
            transition={{
              scale: { duration: 0.3 },
            }}
            className="relative -translate-x-1/2 -translate-y-1/2"
          >
            <MewSvg animate="move" variants={mewVariants} />
          </motion.div>
        </motion.div>
      )}

      {/* --- 5. NAVIGATION BAR --- */}
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
            
            {/* Logo Section */}
            <motion.div
              className="flex items-center gap-2 text-2xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* --- 6. DOCKED MEW (Replaces Globe) --- */}
              <motion.div
                className="flex items-center justify-center scale-75" // Scaled down for nav
                // Hides on desktop when mouse is moving
                animate={{ 
                  opacity: !isMobile && isMoving ? 0 : 1 
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <MewSvg animate={animationState} variants={mewVariants} />
              </motion.div>
              <span className="font-extrabold">Roshan Sahani</span>
            </motion.div>

            {/* Desktop Navigation */}
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

            {/* Mobile Menu Button */}
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

          {/* Mobile Navigation */}
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
    </>
  )
}

export default Navigation