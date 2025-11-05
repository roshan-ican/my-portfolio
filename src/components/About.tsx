"use client";

import { motion } from "framer-motion";
import {
  Database,
  Smartphone,
  User,
  Globe,
  Zap,
  Palette,
} from "lucide-react";
import DigitalBackground from "./DigitalBackground";

const About = () => {
  const skills = [
    {
      name: "Distributed Systems",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Microservices Architecture",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Kafka & Event-Driven Design",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Node.js/TypeScript",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "System Design & Scaling",
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Cloud & DevOps (AWS, K8s)",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <DigitalBackground id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 backdrop-blur-sm mb-6">
            <User size={16} />
            <span className="text-sm font-medium">About Me</span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}>
              Building Scalable
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Systems
              </span>
            </motion.h3>

            <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}>
                I&apos;m Roshan Sahani, a Senior Software Engineer and Technical Architect based in Bengaluru, India. With expertise in distributed systems and microservices architecture, I specialize in designing and building high-performance, scalable platforms that process millions of transactions reliably.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}>
                At Neokred, I led architectural transformations migrating monolithic systems to TypeScript microservices, designed distributed data pipelines processing 30M+ records, and architected settlement engines handling 200 concurrent transactions with deterministic ordering. My passion lies in building resilient systems with clean architecture, implementing resilience patterns like circuit breakers and exponential backoff, and reducing system failures by up to 40%.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}>
                Beyond engineering, I&apos;m deeply committed to mentoring junior engineers, fostering a culture of continuous learning, and sharing knowledge about distributed systems thinking. I&apos;m also passionate about open-source contributions and staying at the cutting edge of cloud-native technologies and AI/ML integration.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                viewport={{ once: true }}>
                Recently, I was a Google Agentic AI Hackathon 2025 finalist with the Raseed project, placing in the top 3.3% (60,000 out of 200,000 teams) with an AI-powered receipt management platform leveraging microservices and vector databases.
              </motion.p>
            </div>

            {/* Skills List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-3">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Core Expertise
              </h4>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ x: 8 }}
                    className="group flex items-center gap-3 p-2.5 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-default">
                    <div
                      className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${skill.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                    <div className="ml-auto">
                      <div
                        className={`w-6 h-0.5 rounded-full bg-gradient-to-r ${skill.color} opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Glassmorphic Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative">
            <motion.div
              whileHover={{ rotateY: 5, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative perspective-1000">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl relative overflow-hidden">
                {/* Animated border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                  <div className="absolute inset-0 rounded-3xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"></div>
                </motion.div>

                <div className="relative z-10 space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap size={32} className="text-white" />
                  </motion.div>

                  <div className="text-center space-y-4">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Senior Software Engineer
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Distributed Systems & Microservices Architect
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Google Hackathon 2025 Finalist
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: Database,
                        label: "Distributed Systems",
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        icon: Globe,
                        label: "Microservices",
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        icon: Zap,
                        label: "High-Performance",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        icon: Palette,
                        label: "System Design",
                        color: "from-orange-500 to-red-500",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 1 + index * 0.1,
                        }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className={`p-4 bg-gradient-to-r ${item.color} rounded-xl text-center group cursor-pointer`}>
                        <item.icon
                          size={24}
                          className="text-white mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="text-sm font-medium text-white">
                          {item.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    viewport={{ once: true }}
                    className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                      <span className="font-semibold text-gray-900 dark:text-white">Bengaluru, India</span>
                      <br />
                      Available for backend engineering & architecture roles in any time zone.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </DigitalBackground>
  );
};

export default About;
