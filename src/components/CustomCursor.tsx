"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useVelocity } from "framer-motion";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for the cat
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const catX = useSpring(mouseX, springConfig);
  const catY = useSpring(mouseY, springConfig);
  
  // Get velocity for dynamic animations
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
      
      // Calculate rotation based on movement direction
      const deltaX = e.clientX - lastX;
      if (Math.abs(deltaX) > 1) {
        setRotation(deltaX > 0 ? -5 : 5);
      }
      lastX = e.clientX;
      
      // Detect movement
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

      {/* Cat follower */}
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: catX,
            y: catY,
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
            {/* Cat Character */}
            <svg
              width="64"
              height="64"
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
              
              {/* Cat Body */}
              <ellipse cx="32" cy="40" rx="16" ry="14" fill="#FF6B35" filter="url(#glow)" />
              
              {/* Cat Head */}
              <circle cx="32" cy="26" r="14" fill="#FF6B35" filter="url(#glow)" />
              
              {/* Left Ear */}
              <path d="M 20 18 L 16 6 L 26 14 Z" fill="#FF6B35" />
              <path d="M 20 18 L 18 10 L 24 15 Z" fill="#FF8C61" />
              
              {/* Right Ear */}
              <path d="M 44 18 L 48 6 L 38 14 Z" fill="#FF6B35" />
              <path d="M 44 18 L 46 10 L 40 15 Z" fill="#FF8C61" />
              
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
                <ellipse cx="26" cy="24" rx="2.5" ry="4" fill="#1a1a1a" />
                <ellipse cx="38" cy="24" rx="2.5" ry="4" fill="#1a1a1a" />
                <ellipse cx="26.5" cy="23" rx="1" ry="1.5" fill="white" />
                <ellipse cx="38.5" cy="23" rx="1" ry="1.5" fill="white" />
              </motion.g>
              
              {/* Nose */}
              <path d="M 32 28 L 30 30 L 34 30 Z" fill="#E63946" />
              
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
                stroke="#FF6B35"
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
              
              {/* Animated Paws */}
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
                <ellipse cx="26" cy="52" rx="4" ry="3" fill="#FF6B35" />
                <circle cx="25" cy="52" r="1" fill="#FF8C61" />
                <circle cx="27" cy="52" r="1" fill="#FF8C61" />
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
                <ellipse cx="38" cy="52" rx="4" ry="3" fill="#FF6B35" />
                <circle cx="37" cy="52" r="1" fill="#FF8C61" />
                <circle cx="39" cy="52" r="1" fill="#FF8C61" />
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
                  <circle cx="10" cy="13" r="3.5" fill="#FF6B35" opacity="0.6" />
                  <circle cx="7" cy="8" r="2" fill="#FF6B35" opacity="0.6" />
                  <circle cx="13" cy="8" r="2" fill="#FF6B35" opacity="0.6" />
                  <circle cx="6" cy="11" r="2" fill="#FF6B35" opacity="0.6" />
                  <circle cx="14" cy="11" r="2" fill="#FF6B35" opacity="0.6" />
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
          x: catX,
          y: catY,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
          className="w-24 h-24 -translate-x-1/2 -translate-y-1/2 border-2 border-orange-400 rounded-full"
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;