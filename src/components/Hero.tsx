"use client";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Clock,
  Zap,
  Code,
  Globe,
  Database,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";
import DigitalBackground from "./DigitalBackground"; // Switched to alias the original for luxury/space hybrid feel

const Hero = () => {
  const [time, setTime] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
      const tzString = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(tzString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80; // Approximate height of the fixed navigation
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Simplified floating icons with subtle space accents
  const floatingIcons = [
    { icon: Code, delay: 0, color: "bg-blue-400/20" },
    { icon: Zap, delay: 0.5, color: "bg-purple-400/20" },
    { icon: Sparkles, delay: 1, color: "bg-indigo-400/20" },
  ];

  // Minimal tech cards with clean labels
  const techCards = [
    {
      icon: Database,
      label: "Distributed Systems",
      color: "bg-blue-500/10",
    },
    {
      icon: Code,
      label: "Microservices",
      color: "bg-purple-500/10",
    },
    {
      icon: Cpu,
      label: "Event-Driven",
      color: "bg-indigo-500/10",
    },
    {
      icon: Globe,
      label: "Cloud Native",
      color: "bg-cyan-500/10",
    },
  ];

  // Seeded random for consistent glitter (now subtle stars)
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const glitterParticles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    position: {
      top: `${seededRandom(i + 1000) * 100}%`,
      left: `${seededRandom(i + 2000) * 100}%`,
    },
  }));

  // Calculate positions for tech cards in a gentle arc (less chaotic)
  const getCardPosition = (index: number) => {
    const totalCards = techCards.length;
    const angle = (index / totalCards) * 180 - 45; // Gentle arc
    const radius = 25; // Closer for minimalism
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <DigitalBackground
      id="home"
      className="min-h-screen flex items-center justify-center pt-12 sm:pt-20 relative overflow-hidden font-sans" // Added font-sans for minimalism
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Reduced max-w for cleaner layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> {/* Increased gap for breathing room */}
          {/* Left Content - Minimal Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} // Subtler entrance
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left space-y-6" // Reduced space-y
          >
            {/* Live Time Badge - Subtle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full text-white/80 backdrop-blur-sm mx-auto lg:mx-0 text-xs font-medium" // Simplified colors
            >
              <Clock size={14} />
              <span>{time && timezone ? `${time} • ${timezone}` : "Loading..."}</span>
            </motion.div>

            {/* Main Heading - Clean, Large Sans Serif */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2" // Tighter spacing
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight text-white"> {/* Lighter font-weight for minimalism */}
                <span>Hello,</span>
                {/* <br /> */}
                <span className="font-semibold bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"> {/* Subtle space-themed gradient */}
                  World
                </span>
              </h1>
              <h2 className="text-lg sm:text-xl text-white/70 font-light"> {/* Lighter subtitle */}
                Senior Software Engineer • Distributed Systems Architect
              </h2>
            </motion.div>

            {/* Description - More Selling/Compelling Version */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base text-white/60 max-w-md leading-relaxed" // Shorter max-w, lighter text
            >
              Crafting high-performance distributed systems and microservices that scale effortlessly with demand. Mastering event-driven architectures and cloud-native deployments to drive innovation and reliability.
              <br />
              Proven expertise in powering platforms that process millions of transactions daily—delivering speed, security, and unbreakable uptime.
            </motion.p>

            {/* Stats - Minimal Cards */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0"
            >
              {[
                { value: "3+", label: "Years" },
                { value: "30M+", label: "Txns" },
                { value: "100%", label: "Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="p-3 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm text-center"
                >
                  <p className="text-xl font-light text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Clean, Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                onClick={() => scrollToSection("#projects")}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg font-light text-white text-sm hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("#experience")}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-transparent border border-white/10 rounded-lg font-light text-white/70 text-sm hover:border-white/20 hover:text-white transition-all duration-300"
              >
                View Experience
              </motion.button>
            </motion.div>

            {/* Social Links - Subtle Icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                {
                  icon: Mail,
                  href: "mailto:roshansahani535@gmail.com",
                  label: "Email",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/roshan-sahani",
                  label: "LinkedIn",
                },
                {
                  icon: Github,
                  href: "https://github.com/RoshanAnu333",
                  label: "GitHub",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2, color: "#60a5fa" }} // Blue accent for hover
                  whileTap={{ scale: 0.95 }}
                  className="p-3 text-white/60 hover:text-white transition-all duration-300"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Simplified Animated UI */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative h-80 sm:h-96 md:h-[450px] lg:h-[500px] flex items-center justify-center hidden sm:flex" // Slightly smaller
          >
            {/* Simplified Rotating Rings - Slower, Subtler */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }} // Slower for calm
              className="absolute w-48 sm:w-56 md:w-64 lg:w-72 h-48 sm:h-56 md:h-64 lg:h-72 border border-white/10 rounded-full" // Thinner, lighter border
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64 border border-purple-500/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 sm:w-40 md:w-48 lg:w-48 h-32 sm:h-40 md:h-48 lg:h-48 border border-blue-500/10 rounded-full"
            />

            {/* Floating Tech Cards - Gentle Arc */}
            {techCards.map((card, index) => {
              const position = getCardPosition(index);
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={position}
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0], // Subtler float
                      rotate: [0, 2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 shadow-lg" // Cleaner card
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${card.color} flex items-center justify-center mb-2`}>
                      <card.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                    </div>
                    <p className="text-xs font-light text-white/70 whitespace-nowrap">{card.label}</p>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Floating Icons - Minimal */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="absolute"
                style={{
                  top: `${10 + index * 25}%`,
                  right: `${10 + index * 15}%`,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 90, 180],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut",
                  }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.color} flex items-center justify-center shadow-md`}
                >
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                </motion.div>
              </motion.div>
            ))}

            {/* Central Profile - Clean Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="relative z-10"
            >
              <div className="w-20 sm:w-24 md:w-28 h-20 sm:h-24 md:h-28 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 p-1 shadow-xl border border-white/10">
                <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-light bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"> {/* Updated with matching gradient for contrast */}
                    RS
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subtle Glitter Particles (Now like Distant Stars) */}
            {glitterParticles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={particle.position}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("#about")}
            animate={{ y: [0, 8, 0] }} // Subtler bounce
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            className="p-3 bg-white/5 border border-white/20 rounded-full backdrop-blur-sm text-white/50 hover:text-white transition-all duration-300"
          >
            <ArrowDown size={18} />
          </motion.button>
        </motion.div>
      </div>
    </DigitalBackground>
  );
};

export default Hero;