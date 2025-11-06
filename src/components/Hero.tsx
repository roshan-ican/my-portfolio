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
import DigitalBackground from "./DigitalBackground";

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

  const floatingIcons = [
    { icon: Code, delay: 0, color: "from-royal to-champagne" },
    { icon: Zap, delay: 0.5, color: "from-burgundy to-gold" },
    { icon: Sparkles, delay: 1, color: "from-champagne to-royal" },
  ];

  const techCards = [
    {
      icon: Database,
      label: "Distributed Systems",
      color: "from-royal to-champagne",
    },
    {
      icon: Code,
      label: "Microservices",
      color: "from-burgundy to-royal",
    },
    {
      icon: Cpu,
      label: "Event-Driven",
      color: "from-gold to-champagne",
    },
    {
      icon: Globe,
      label: "Cloud Native",
      color: "from-royal to-burgundy",
    },
  ];

  // Seeded random number generator for consistent values
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const glitterParticles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: i * 0.2,
    position: {
      top: `${seededRandom(i + 1000) * 100}%`,
      left: `${seededRandom(i + 2000) * 100}%`,
    },
  }));

  // Calculate positions for tech cards in a circular spread
  const getCardPosition = (index: number) => {
    const totalCards = techCards.length;
    const angle = (index / totalCards) * 360;
    const radius = 35; // Distance from center in percentage
    
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <DigitalBackground
      id="home"
      className="min-h-screen flex items-center justify-center pt-12 sm:pt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-6 sm:space-y-8">
            {/* Live Time Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-royal/10 to-midnight/10 border border-royal/30 rounded-full text-royal backdrop-blur-sm mx-auto lg:mx-0">
              <Clock size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">
                {time && timezone ? `${time} • ${timezone}` : "Loading..."}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">
                  Hi, I&apos;m{" "}
                </span>
                <span className="bg-gradient-to-r from-royal via-champagne to-gold bg-clip-text text-transparent">
                  Roshan Sahani
                </span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium px-2 sm:px-0">
                Senior Software Engineer • Distributed Systems Architect
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed px-2 sm:px-0 mx-auto lg:mx-0">
              Building scalable, high-performance distributed systems and
              microservices architectures. Specializing in event-driven design,
              real-time data pipelines, and cloud-native infrastructure.
              <br/> Proven
              track record processing millions of transactions reliably at
              scale.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
              {[
                { value: "3+", label: "Years Experience" },
                { value: "30M+", label: "Txns Processed" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-2 sm:p-3 rounded-lg bg-white/5 dark:bg-black/20 border border-border/50 backdrop-blur-sm">
                  <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-royal to-gold bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
              <motion.button
                onClick={() => scrollToSection("#projects")}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 btn-primary rounded-xl font-semibold overflow-hidden text-sm sm:text-base">
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection("#experience")}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(156, 163, 175, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 sm:py-4 btn-secondary rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base">
                View Experience
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
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
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 sm:p-3 bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-border/50 text-gray-300 hover:text-gold transition-all duration-300">
                  <social.icon size={18} className="sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Animated UI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative h-96 sm:h-96 md:h-[500px] lg:h-[600px] flex items-center justify-center hidden sm:flex">
            {/* Outer Rotating Circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 sm:w-72 md:w-80 lg:w-96 h-64 sm:h-72 md:h-80 lg:h-96 border-2 border-royal/20 rounded-full"></motion.div>

            {/* Middle Rotating Circle */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 sm:w-64 md:w-72 lg:w-80 h-56 sm:h-64 md:h-72 lg:h-80 border-2 border-gold/20 rounded-full"></motion.div>

            {/* Inner Rotating Circle (opposite direction) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-48 sm:w-56 md:w-64 lg:w-64 h-48 sm:h-56 md:h-64 lg:h-64 border-2 border-burgundy/25 rounded-full"></motion.div>

            {/* Floating Tech Cards - Spread Out Circularly */}
            {techCards.map((card, index) => {
              const position = getCardPosition(index);
              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.15 }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={position}>
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: index * 0.4,
                      ease: "easeInOut",
                    }}
                    className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-royal/20 to-gold/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-white/5 dark:bg-black/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-border/50 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <div
                        className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center mb-2 sm:mb-3`}>
                        <card.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-300 whitespace-nowrap">
                        {card.label}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Floating Icons */}
            {floatingIcons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.3 }}
                className="absolute"
                style={{
                  top: `${12 + index * 28}%`,
                  right: `${5 + index * 18}%`,
                }}>
                <motion.div
                  animate={{
                    y: [0, -18, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  }}
                  className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300`}>
                  <item.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </motion.div>
              </motion.div>
            ))}

            {/* Central Profile Circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.08 }}
              className="relative z-10">
              <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full bg-gradient-to-r from-royal via-champagne to-gold p-1 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="w-full h-full rounded-full bg-white/5 dark:bg-black/20 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-royal via-champagne to-gold bg-clip-text text-transparent">
                    RS
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Glitter Particles */}
            {glitterParticles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={particle.position}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.button
            onClick={() => scrollToSection("#about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            className="p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
            <ArrowDown size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
        </motion.div>
      </div>
    </DigitalBackground>
  );
};

export default Hero;