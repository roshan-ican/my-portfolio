"use client";

import { motion } from "framer-motion";
import { Code, Database, Server } from "lucide-react";
import { useState, useEffect } from "react";
import DigitalBackground from "./DigitalBackground";

const Skills = () => {
  const [glitterData, setGlitterData] = useState<{
    pixelGlitter: Array<{
      id: number;
      size: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>;
    pixelGrid: Array<{ id: string; left: number; top: number; delay: number }>;
    floatingCrystals: Array<{
      id: number;
      size: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>;
    glitterRain: Array<{
      id: number;
      left: number;
      delay: number;
      duration: number;
    }>;
    sparkleBursts: Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
    }>;
    microDust: Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>;
    glitterSwirls: Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
    }>;
    glitterExplosions: Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
    }>;
    glitterWaves: Array<{ id: number; delay: number }>;
    glitterOrbs: Array<{
      id: number;
      size: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>;
    glitterSpiral: Array<{
      id: number;
      left: number;
      top: number;
      delay: number;
    }>;
    glitterMatrix: Array<{
      id: string;
      left: number;
      top: number;
      delay: number;
    }>;
    pulseRings: Array<{ id: number; left: number; top: number; delay: number }>;
  }>({
    pixelGlitter: [],
    pixelGrid: [],
    floatingCrystals: [],
    glitterRain: [],
    sparkleBursts: [],
    microDust: [],
    glitterSwirls: [],
    glitterExplosions: [],
    glitterWaves: [],
    glitterOrbs: [],
    glitterSpiral: [],
    glitterMatrix: [],
    pulseRings: [],
  });

  const [isClient, setIsClient] = useState(false);

  // Seeded random number generator for consistent values
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    setIsClient(true);

    // Generate all glitter data
    const generateGlitterData = () => {
      const pixelGlitter = [...Array(50)].map((_, i) => ({
        id: i,
        size:
          seededRandom(i + 1000) > 0.7 ? 2 : seededRandom(i + 1001) > 0.4 ? 1 : 0.5,
        left: seededRandom(i + 1002) * 100,
        top: seededRandom(i + 1003) * 100,
        delay: seededRandom(i + 1004) * 4,
        duration: 1.5 + seededRandom(i + 1005) * 2,
      }));

      const pixelGrid = [];
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 12; col++) {
          if (seededRandom(row * 12 + col + 2000) > 0.7) {
            pixelGrid.push({
              id: `${row}-${col}`,
              left: (col / 12) * 100,
              top: (row / 8) * 100,
              delay: seededRandom(row * 12 + col + 2001) * 3,
            });
          }
        }
      }

      const floatingCrystals = [...Array(15)].map((_, i) => ({
        id: i,
        size:
          seededRandom(i + 3000) > 0.6
            ? 3
            : seededRandom(i + 3001) > 0.3
            ? 2
            : 1,
        left: seededRandom(i + 3002) * 100,
        top: seededRandom(i + 3003) * 100,
        delay: seededRandom(i + 3004) * 5,
        duration: 2 + seededRandom(i + 3005) * 2,
      }));

      const glitterRain = [...Array(25)].map((_, i) => ({
        id: i,
        left: seededRandom(i + 4000) * 100,
        delay: seededRandom(i + 4001) * 4,
        duration: 3 + seededRandom(i + 4002) * 2,
      }));

      const sparkleBursts = [...Array(5)].map((_, i) => ({
        id: i,
        left: 15 + i * 20,
        top: 25 + i * 15,
        delay: i * 1.5,
      }));

      const microDust = [...Array(80)].map((_, i) => ({
        id: i,
        left: seededRandom(i + 5000) * 100,
        top: seededRandom(i + 5001) * 100,
        delay: seededRandom(i + 5002) * 3,
        duration: 1.5 + seededRandom(i + 5003) * 1,
      }));

      const glitterSwirls = [...Array(8)].map((_, i) => ({
        id: i,
        left: 10 + i * 12,
        top: 20 + i * 10,
        delay: i * 0.8,
      }));

      const glitterExplosions = [...Array(12)].map((_, i) => ({
        id: i,
        left: seededRandom(i + 6000) * 100,
        top: seededRandom(i + 6001) * 100,
        delay: seededRandom(i + 6002) * 6,
      }));

      const glitterWaves = [...Array(6)].map((_, i) => ({
        id: i,
        delay: i * 1.2,
      }));

      const glitterOrbs = [...Array(20)].map((_, i) => ({
        id: i,
        size: seededRandom(i + 7000) > 0.5 ? 4 : 2,
        left: seededRandom(i + 7001) * 100,
        top: seededRandom(i + 7002) * 100,
        delay: seededRandom(i + 7003) * 4,
        duration: 2 + seededRandom(i + 7004) * 2,
      }));

      const glitterSpiral = [...Array(4)].map((_, i) => ({
        id: i,
        left: 25 + i * 20,
        top: 35 + i * 15,
        delay: i * 1.5,
      }));

      const glitterMatrix = [];
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 15; col++) {
          if (seededRandom(row * 15 + col + 8000) > 0.6) {
            glitterMatrix.push({
              id: `${row}-${col}`,
              left: (col / 15) * 100,
              top: (row / 10) * 100,
              delay: seededRandom(row * 15 + col + 8001) * 4,
            });
          }
        }
      }

      const pulseRings = [...Array(8)].map((_, i) => ({
        id: i,
        left: seededRandom(i + 9000) * 100,
        top: seededRandom(i + 9001) * 100,
        delay: i * 0.8,
      }));

      setGlitterData({
        pixelGlitter,
        pixelGrid,
        floatingCrystals,
        glitterRain,
        sparkleBursts,
        microDust,
        glitterSwirls,
        glitterExplosions,
        glitterWaves,
        glitterOrbs,
        glitterSpiral,
        glitterMatrix,
        pulseRings,
      });
    };

    generateGlitterData();
  }, []);

  const skillCategories = [
    {
      title: "Backend & Distributed Systems",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Node.js" },
        { name: "TypeScript" },
        { name: "Microservices" },
        { name: "Kafka" },
        { name: "Redis" },
        { name: "Fastify" },
        { name: "GraphQL" },
        { name: "REST APIs" },
        { name: "gRPC" },
        { name: "Socket.io" },
      ],
    },
    {
      title: "Data & Architecture",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "MongoDB" },
        { name: "PostgreSQL" },
        { name: "Vector Database" },
        { name: "Event-Driven Architecture" },
        { name: "System Design" },
        { name: "Data Pipeline" },
        { name: "Schema Design" },
        { name: "Query Optimization" },
        { name: "Distributed Transactions" },
        { name: "API Gateway" },
      ],
    },
    {
      title: "DevOps & Cloud",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "AWS" },
        { name: "Git" },
        { name: "CI/CD" },
        { name: "Linux" },
        { name: "Monitoring" },
        { name: "Vercel" },
        { name: "Performance Optimization" },
        { name: "Security Best Practices" },
      ],
    },
  ];

  if (!isClient) {
    return (
      <DigitalBackground id="skills" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              My Technical
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Expertise
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2">
              Distributed systems architect with expertise in microservices,
              event-driven architectures, and high-performance data platforms.
            </p>
          </div>
        </div>
      </DigitalBackground>
    );
  }

  return (
    <DigitalBackground id="skills" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}>
            My Technical
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Expertise
            </span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}>
            Distributed systems architect with expertise in microservices,
            event-driven architectures, and high-performance data platforms.
            Specialized in building scalable, resilient systems that process
            millions of transactions.
          </motion.p>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + categoryIndex * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                y: -10,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="relative perspective-1000">
              <motion.div
                whileHover={{ rotateY: 5, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/70 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group">
                {/* Glittering background effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
                  {category.title === "Backend & Distributed Systems" && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-400/20 to-teal-400/20 animate-pulse"></div>
                      <div
                        className="absolute inset-0 bg-gradient-to-tl from-sky-400/15 via-blue-400/15 to-indigo-400/15 animate-pulse"
                        style={{ animationDelay: "1s" }}></div>
                    </>
                  )}
                  {category.title === "Data & Architecture" && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-rose-400/20 animate-pulse"></div>
                      <div
                        className="absolute inset-0 bg-gradient-to-tl from-violet-400/15 via-purple-400/15 to-fuchsia-400/15 animate-pulse"
                        style={{ animationDelay: "1s" }}></div>
                    </>
                  )}
                  {category.title === "DevOps & Cloud" && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-400/20 to-teal-400/20 animate-pulse"></div>
                      <div
                        className="absolute inset-0 bg-gradient-to-tl from-lime-400/15 via-green-400/15 to-emerald-400/15 animate-pulse"
                        style={{ animationDelay: "1s" }}></div>
                    </>
                  )}

                  {/* Simplified glitter effect */}
                  <div className="absolute inset-0 pointer-events-none">
                    {glitterData.pixelGlitter.map((item) => {
                      const color =
                        category.title === "Backend & Distributed Systems"
                          ? [
                              "#60A5FA",
                              "#22D3EE",
                              "#2DD4BF",
                              "#818CF8",
                            ][Math.floor(seededRandom(item.id + 10000) * 4)]
                          : category.title === "Data & Architecture"
                          ? [
                              "#A78BFA",
                              "#F472B6",
                              "#FB7185",
                              "#E879F9",
                            ][Math.floor(seededRandom(item.id + 10001) * 4)]
                          : [
                              "#4ADE80",
                              "#34D399",
                              "#10B981",
                              "#84CC16",
                            ][Math.floor(seededRandom(item.id + 10002) * 4)];

                      return (
                        <motion.div
                          key={item.id}
                          className="absolute"
                          style={{
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                            width: `${item.size}px`,
                            height: `${item.size}px`,
                            backgroundColor: color,
                            borderRadius:
                              item.size === 2 ? "1px" : "0px",
                          }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            delay: item.delay,
                            ease: "easeInOut",
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  {/* Category Header */}
                  <motion.div
                    className={`w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r ${category.color} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}>
                    <category.icon size={20} className="sm:w-6 sm:h-6 text-white" />
                  </motion.div>

                  <motion.h3
                    className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}>
                    {category.title}
                  </motion.h3>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay:
                            0.5 +
                            categoryIndex * 0.1 +
                            skillIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ x: 8 }}
                        className="group flex items-center gap-2 sm:gap-3 p-2 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-default">
                        <div
                          className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r ${category.color} shadow-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 flex-1">
                          {skill.name}
                        </span>
                        <div
                          className={`w-4 sm:w-5 h-0.5 rounded-full bg-gradient-to-r ${category.color} opacity-40 group-hover:opacity-70 transition-opacity duration-300 flex-shrink-0`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-20 text-center">
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}>
            Core Competencies
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {[
              "Microservices Architecture",
              "System Design",
              "Distributed Systems",
              "Event-Driven Architecture",
              "Performance Optimization",
              "Scalability",
              "Resilience Patterns",
              "API Gateway Design",
              "Database Optimization",
              "Cloud Architecture",
              "Code Review Leadership",
              "Technical Mentoring",
              "Problem Solving",
              "Clean Code",
              "Security Best Practices",
              "Team Leadership",
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.0 + index * 0.02,
                  type: "spring",
                  stiffness: 200,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  boxShadow:
                    "0 15px 35px rgba(147, 51, 234, 0.3)",
                }}
                className="bg-gradient-to-r from-blue-600/50 to-cyan-600/50 dark:from-blue-400/50 dark:to-cyan-400/50 to-blue-500/20 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-default border border-blue-400/50 dark:border-purple-300/50 hover:border-pink-400/70 dark:hover:border-pink-300/70 hover:from-pink-500/30 hover:via-purple-500/30 hover:to-blue-500/30 hover:shadow-lg">
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </DigitalBackground>
  );
};

export default Skills;