"use client";
import { motion } from "framer-motion";
import {
  Database,
  User,
  Globe,
  Zap,
  Palette,
} from "lucide-react";
import DigitalBackground from "./DigitalBackground";

const About = () => {
  const skills = [
    {
      name: "React & Next.js",
      color: "from-royal to-champagne",
    },
    {
      name: "Node.js & TypeScript",
      color: "from-burgundy to-royal",
    },
    {
      name: "Distributed Systems",
      color: "from-gold to-champagne",
    },
    {
      name: "Microservices Architecture",
      color: "from-royal to-gold",
    },
    {
      name: "System Design & Scaling",
      color: "from-champagne to-burgundy",
    },
    {
      name: "Cloud & DevOps (AWS, K8s)",
      color: "from-gold to-royal",
    },
  ];

  return (
    <DigitalBackground id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full text-white/80 backdrop-blur-sm mb-6"
          >
            <User size={16} />
            <span className="text-xs font-medium">About Me</span>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Building Scalable{" "}
              <span className="font-semibold bg-gradient-to-r from-royal via-champagne to-gold bg-clip-text text-transparent">
                Applications
              </span>
            </motion.h3>

            <div className="space-y-4 text-white/60 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                I&apos;m Roshan Sahani, a Fullstack Software Engineer based in Bengaluru, India. With a proven track record in crafting high-stakes platforms, I design and deliver resilient architectures that power millions of transactions with unyielding performance and precision.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                I&apos;ve orchestrated transformative migrations from monolithic legacies to cutting-edge TypeScript microservices, engineered Kafka-fueled pipelines devouring 30M+ records daily, and architected settlement engines mastering 200+ concurrent streams with flawless deterministic ordering. The outcome? A 40% plunge in failures through battle-hardened resilience patterns like circuit breakers and adaptive backoff—unleashing systems that scale fearlessly and outperform under pressure.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                My drive extends beyond code: I mentor teams to embrace modern development practices, fuel open-source innovation with real-world rigor, and fuse AI/ML into cloud-native ecosystems at the forefront of tech evolution. As a Google Agentic AI Hackathon 2025 finalist (top 3.3% of 200,000 teams), my Raseed project—a seamless AI receipt engine blending microservices and vector databases—exemplifies turning visionary concepts into production-ready powerhouses.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                viewport={{ once: true }}
                className="font-medium text-white/80"
              >
                Let&apos;s engineer the future: From elegant frontends to resilient backends and intelligent architectures, I build what endures, excels, and elevates—driving impact at every scale.
              </motion.p>

              {/* Skills List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <h4 className="text-lg font-light text-white mb-4">
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
                      className="group flex items-center gap-3 p-2.5 rounded-lg border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-300 cursor-default"
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${skill.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span className="text-sm font-light text-white/70 group-hover:text-white transition-colors duration-300">
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
            </div>
          </motion.div>

          {/* Right Content - Glassmorphic Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              whileHover={{ rotateY: 5, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative perspective-1000"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 dark:bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden"
              >
                {/* Animated border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-royal/20 via-gold/20 to-champagne/20 p-[1px]"
                >
                  <div className="absolute inset-0 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-sm"></div>
                </motion.div>

                <div className="relative z-10 space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto"
                  >
                    <Zap size={24} className="text-white" />
                  </motion.div>

                  <div className="text-center space-y-2">
                    <h4 className="text-xl font-light text-white">
                      Fullstack Software Engineer
                    </h4>
                    <p className="text-white/70 text-sm">
                      Frontend • Backend • System Architecture
                    </p>
                    <p className="text-xs text-white/50">
                      Google Hackathon 2025 Finalist
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        icon: Database,
                        label: "Distributed Systems",
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        icon: Globe,
                        label: "Microservices",
                        color: "from-purple-500 to-blue-500",
                      },
                      {
                        icon: Zap,
                        label: "High-Performance",
                        color: "from-indigo-500 to-purple-500",
                      },
                      {
                        icon: Palette,
                        label: "System Design",
                        color: "from-cyan-500 to-blue-500",
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
                        className={`p-3 bg-gradient-to-r ${item.color}/20 border border-white/10 rounded-xl text-center group cursor-pointer backdrop-blur-sm`}
                      >
                        <item.icon
                          size={20}
                          className="text-white/70 mx-auto mb-1 group-hover:text-white group-hover:scale-110 transition-all duration-300"
                        />
                        <div className="text-xs font-light text-white/70 group-hover:text-white">
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
                    className="pt-4 border-t border-white/10"
                  >
                    <p className="text-xs text-white/50 text-center">
                      <span className="font-light text-white">Bengaluru, India</span>
                      <br />
                      Driving fullstack engineering excellence across global time zones.
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