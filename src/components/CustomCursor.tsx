"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity } from "framer-motion";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // --- CHANGE 1: Slower spring physics ---
  // Increased damping/mass and decreased stiffness for a slower, "floatier" feel
  const springConfig = { damping: 60, stiffness: 100, mass: 2 };
  const mewX = useSpring(mouseX, springConfig); 
  const mewY = useSpring(mouseY, springConfig); 
  
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  const [isMoving, setIsMoving] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let lastX = 0;
    let moveTimer: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
      
      const deltaX = e.clientX - lastX;
      if (Math.abs(deltaX) > 1) {
        setRotation(deltaX > 0 ? -5 : 5);
      }
      lastX = e.clientX;
      
      setIsMoving(true);
      clearTimeout(moveTimer);
      moveTimer = setTimeout(() => {
        setIsMoving(false);
        setRotation(0);
      }, 150);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsMoving(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(moveTimer);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Custom cursor styles */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </motion.div>

      {/* Mew follower */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: mewX,
            y: mewY,
          }}
        >
          <motion.div
            animate={{
              scale: isHovering ? 1.3 : 1,
              rotate: rotation,
            }}
            transition={{
              scale: { duration: 0.3 },
              rotate: { duration: 0.2 },
            }}
            className="relative -translate-x-1/2 -translate-y-1/2"
          >
            {/* Mew Character */}
            <svg
              // --- CHANGE 2: Smaller size ---
              width="42"
              height="40"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
            >
              {/* Glow effect */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Mew Body */}
              <ellipse cx="32" cy="40" rx="16" ry="14" fill="#C8A2C8" filter="url(#glow)" />
              
              {/* Mew Head */}
              <circle cx="32" cy="26" r="14" fill="#C8A2C8" filter="url(#glow)" />
              
              {/* Left Ear */}
              <path d="M 20 18 L 16 6 L 26 14 Z" fill="#C8A2C8" />
              <path d="M 20 18 L 18 10 L 24 15 Z" fill="#E0BBE4" />
              
              {/* Right Ear */}
              <path d="M 44 18 L 48 6 L 38 14 Z" fill="#C8A2C8" />
              <path d="M 44 18 L 46 10 L 40 15 Z" fill="#E0BBE4" />
              
              {/* Eyes */}
              <motion.g
                animate={isMoving ? {} : {
                  scaleY: [1, 0.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <ellipse cx="26" cy="24" rx="2.5" ry="4" fill="#66CCFF" />
                <ellipse cx="38" cy="24" rx="2.5" ry="4" fill="#66CCFF" />
                <ellipse cx="26.5" cy="23" rx="1" ry="1.5" fill="white" />
                <ellipse cx="38.5" cy="23" rx="1" ry="1.5" fill="white" />
              </motion.g>
              
              {/* Nose */}
              <path d="M 32 28 L 30 30 L 34 30 Z" fill="#F8BBD0" />
              
              {/* Mouth */}
              <path d="M 32 30 Q 28 33 26 31" stroke="#1a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M 32 30 Q 36 33 38 31" stroke="#1a1a1a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              
              {/* Whiskers */}
              <line x1="16" y1="26" x2="8" y2="24" stroke="#1a1a1a" strokeWidth="1" opacity="0.8" />
              <line x1="16" y1="28" x2="8" y2="28" stroke="#1a1a1a" strokeWidth="1" opacity="0.8" />
              <line x1="16" y1="30" x2="8" y2="32" stroke="#1a1a1a" strokeWidth="1" opacity="0.8" />
              
              <line x1="48" y1="26" x2="56" y2="24" stroke="#1a1a1a" strokeWidth="1" opacity="0.8" />
              <line x1="48" y1="28" x2="56" y2="28" stroke="#1a1a1a" strokeWidth="1" opacity="0.8" />
              <line x1="48" y1="30" x2="56" y2="32" stroke="#1a1a1a" strokeWidth="1" opacity="0.8" />
              
              {/* Animated Tail */}
              <motion.path
                d="M 46 44 Q 56 46 60 42 Q 62 38 58 34"
                stroke="#C8A2C8"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 46 44 Q 56 46 60 42 Q 62 38 58 34",
                    "M 46 44 Q 56 42 60 36 Q 64 30 62 26",
                    "M 46 44 Q 56 46 60 42 Q 62 38 58 34"
                  ]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* --- CHANGE 3: Show Feet More (Moved cy="52" to cy="56") --- */}
              <motion.g
                animate={isMoving ? {
                  y: [0, -4, 0],
                  rotate: [0, -8, 0],
                } : {}}
                transition={{
                  duration: 0.4,
                  repeat: isMoving ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <ellipse cx="26" cy="56" rx="4" ry="3" fill="#C8A2C8" />
                <circle cx="25" cy="56" r="1" fill="#E0BBE4" />
                <circle cx="27" cy="56" r="1" fill="#E0BBE4" />
              </motion.g>
              
              <motion.g
                animate={isMoving ? {
                  y: [0, -4, 0],
                  rotate: [0, 8, 0],
                } : {}}
                transition={{
                  duration: 0.4,
                  repeat: isMoving ? Infinity : 0,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              >
                <ellipse cx="38" cy="56" rx="4" ry="3" fill="#C8A2C8" />
                <circle cx="37" cy="56" r="1" fill="#E0BBE4" />
                <circle cx="39" cy="56" r="1" fill="#E0BBE4" />
              </motion.g>
            </svg>

            {/* Paw prints trail */}
            {isMoving && [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.8],
                  x: -30 - i * 20,
                  y: 20 + (i % 2) * 10,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute top-0 left-0"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="13" r="3.5" fill="#C8A2C8" opacity="0.6" />
                  <circle cx="7" cy="8" r="2" fill="#C8A2C8" opacity="0.6" />
                  <circle cx="13" cy="8" r="2" fill="#C8A2C8" opacity="0.6" />
                  <circle cx="6" cy="11" r="2" fill="#C8A2C8" opacity="0.6" />
                  <circle cx="14" cy="11" r="2" fill="#C8A2C8" opacity="0.6" />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {/* Outer ring follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] mix-blend-screen"
        style={{
          x: mewX,
          y: mewY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
          className="w-24 h-24 -translate-x-1/2 -translate-y-1/2 border-2 border-[#C8A2C8] rounded-full"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;