"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface SpaceBackgroundProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const DigitalBackground = ({
  children,
  className = "",
  id,
}: SpaceBackgroundProps) => {
  const [stars, setStars] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      size: number;
      opacity: number;
    }>
  >([]);

  const [shootingStars, setShootingStars] = useState<
    Array<{
      id: number;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      delay: number;
      length: number;
    }>
  >([]);

  useEffect(() => {
    // Create twinkling stars
    const starCount = 150; // More stars for a dense space look
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 2 + 0.5, // Vary size for depth
      opacity: Math.random() * 0.5 + 0.3, // Base opacity
    }));
    setStars(newStars);

    // Create shooting stars (occasional streaks)
    const shootingCount = 5; // Fewer, as they are dynamic
    const newShootingStars = Array.from({ length: shootingCount }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100 - 20, // Move leftward/upward
      endY: Math.random() * 100 - 20,
      delay: Math.random() * 10 + i * 3, // Staggered
      length: Math.random() * 50 + 20, // Length of trail
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div id={id} className={`relative overflow-hidden ${className}`}>
      {/* Space background - dark with subtle gradient */}
      <div className="absolute inset-0 z-10 bg-black">
        {/* Subtle space gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 70%)",
          }}
        />
        {/* Nebula-like glows for atmosphere */}
        <motion.div
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.03, 0.1, 0.03] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-pink-900/15 via-purple-900/5 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        {/* Vignette for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Twinkling Stars */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white shadow-lg"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              boxShadow: `0 0 ${star.size * 3}px rgba(255,255,255,0.8)`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, star.opacity, 1, star.opacity, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              delay: star.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Shooting Stars */}
        {shootingStars.map((shootingStar) => (
          <motion.div
            key={shootingStar.id}
            className="absolute bg-white"
            style={{
              left: `${shootingStar.startX}%`,
              top: `${shootingStar.startY}%`,
              width: `${shootingStar.length}px`,
              height: "1px",
              transform: `rotate(${Math.atan2(
                shootingStar.endY - shootingStar.startY,
                shootingStar.endX - shootingStar.startX
              ) * 180 / Math.PI}deg)`,
              transformOrigin: "0 0",
              boxShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: 1,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: shootingStar.delay,
              repeat: Infinity,
              repeatDelay: 8 + Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating space dust/particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full bg-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, Math.random() * 5 - 2.5, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180],
            }}
            transition={{
              duration: 10 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Distant planets/orbs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`planet-${i}`}
            className={`absolute rounded-full shadow-2xl ${
              i % 3 === 0
                ? "bg-blue-400/20 shadow-blue-500/30"
                : i % 3 === 1
                ? "bg-purple-500/15 shadow-purple-600/20"
                : "bg-gray-300/10 shadow-white/20"
            }`}
            style={{
              left: `${10 + i * 30}%`,
              top: `${20 + (i % 2) * 40}%`,
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 30 + i * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );
};

export default DigitalBackground;