"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface DigitalBackgroundProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const DigitalBackground = ({
  children,
  className = "",
  id,
}: DigitalBackgroundProps) => {
  const [networkNodes, setNetworkNodes] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      color: { light: string; dark: string };
    }>
  >([]);

  const [networkConnections, setNetworkConnections] = useState<
    Array<{
      id: number;
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      delay: number;
      color: { light: string; dark: string };
    }>
  >([]);

  // Solo Leveling color palette - Blue and Black theme
  const nodeColors = [
    { light: "bg-blue-400", dark: "dark:bg-blue-300" },
    { light: "bg-blue-500", dark: "dark:bg-blue-400" },
    { light: "bg-cyan-400", dark: "dark:bg-cyan-300" },
    { light: "bg-blue-600", dark: "dark:bg-blue-500" },
    { light: "bg-sky-400", dark: "dark:bg-sky-300" },
    { light: "bg-indigo-500", dark: "dark:bg-indigo-400" },
  ];

  const connectionGradients = [
    { light: "from-blue-500/60 to-cyan-400/60", dark: "dark:from-blue-400/60 dark:to-cyan-300/60" },
    { light: "from-cyan-400/60 to-blue-600/60", dark: "dark:from-cyan-300/60 dark:to-blue-500/60" },
    { light: "from-blue-400/60 to-indigo-500/60", dark: "dark:from-blue-300/60 dark:to-indigo-400/60" },
    { light: "from-indigo-500/60 to-cyan-400/60", dark: "dark:from-indigo-400/60 dark:to-cyan-300/60" },
    { light: "from-sky-400/60 to-blue-500/60", dark: "dark:from-sky-300/60 dark:to-blue-400/60" },
    { light: "from-blue-600/60 to-sky-400/60", dark: "dark:from-blue-500/60 dark:to-sky-300/60" },
  ];

  useEffect(() => {
    // Create network nodes for the digital background with color variation
    const nodes = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      color: nodeColors[i % nodeColors.length],
    }));

    // Create network connections with color variation
    const connections = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      delay: Math.random() * 2,
      color: connectionGradients[i % connectionGradients.length],
    }));

    setNetworkNodes(nodes);
    setNetworkConnections(connections);
  }, []);

  return (
    <div id={id} className={`relative overflow-hidden ${className}`}>
      {/* Solo Leveling Dark Blue & Black Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-blue-950 dark:from-black dark:via-slate-950 dark:to-blue-950 z-10">
        
        {/* Dark Vignette Edges */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/60 pointer-events-none"></div>

        {/* Epic Blue Glow Elements - Solo Leveling style */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/30 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none"
        ></motion.div>

        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-cyan-500/25 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none"
        ></motion.div>

        {/* Additional Dark Blue Accent */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-gradient-to-br from-indigo-600/20 to-transparent rounded-full blur-3xl pointer-events-none"
        ></motion.div>

        {/* Network Nodes */}
        {networkNodes.length > 0 &&
          networkNodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute w-2 h-2 ${node.color.light} ${node.color.dark} rounded-full shadow-2xl`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                boxShadow:
                  node.id % 2 === 0
                    ? `0 0 15px currentColor, 0 0 30px currentColor`
                    : `0 0 20px currentColor, 0 0 40px currentColor`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 1, 0.3],
                scale: [0, 1, 1.3, 1, 0.5],
              }}
              transition={{
                duration: 5,
                delay: node.delay,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          ))}

        {/* Network Connections */}
        {networkConnections.length > 0 &&
          networkConnections.map((connection) => (
            <motion.div
              key={connection.id}
              className={`absolute h-px bg-gradient-to-r ${connection.color?.light} ${connection.color.dark}`}
              style={{
                left: `${Math.min(connection.startX, connection.endX)}%`,
                top: `${Math.min(connection.startY, connection.endY)}%`,
                width: `${Math.abs(connection.endX - connection.startX)}%`,
                transform: `rotate(${
                  (Math.atan2(
                    connection.endY - connection.startY,
                    connection.endX - connection.startX
                  ) *
                    180) /
                  Math.PI
                }deg)`,
                transformOrigin: "0 0",
                boxShadow: "0 0 10px currentColor",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: [0, 0.8, 0.4, 0.8, 0],
                scaleX: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: connection.delay,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          ))}

        {/* Floating Blue Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              i % 3 === 0
                ? "bg-blue-400/50 shadow-lg shadow-blue-400/50"
                : i % 3 === 1
                ? "bg-cyan-400/40 shadow-md shadow-cyan-400/40"
                : "bg-indigo-500/50 shadow-lg shadow-indigo-500/50"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Pulsing Blue Orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className={`absolute rounded-full ${
              i % 2 === 0
                ? "bg-blue-400/30 shadow-2xl shadow-blue-400/60"
                : "bg-cyan-400/20 shadow-xl shadow-cyan-400/40"
            }`}
            style={{
              left: `${15 + i * 18}%`,
              top: `${25 + (i % 3) * 30}%`,
              width: `${3 + i}px`,
              height: `${3 + i}px`,
            }}
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.2, 0.7, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Scanning Lines Effect */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`scan-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2.5,
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
