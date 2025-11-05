"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code } from "lucide-react";
import Link from "next/link";
import DigitalBackground from "./DigitalBackground";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  features: string[];
  gradient: string;
  status: string;
}

const Projects = () => {
  // Projects from your resume
  const projects: Project[] = [
    {
      id: 1,
      title: "Raseed - Intelligent Receipt Management Platform",
      description:
        "Google Hackathon 2025 finalist project featuring AI-powered receipt processing with microservices architecture, Google Document AI integration, and vector-based semantic search.",
      longDescription:
        "Raseed is an intelligent receipt management platform built for Google Hackathon 2025, where we placed in the top 3.3% (60,000 out of 2,00,000 teams). The platform leverages Python-based microservices architecture with FastAPI for document processing, integrated Google Document AI for OCR text extraction, and implemented semantic search using Gemini AI embeddings with vector database support. The entire system is containerized with Docker and deployed via Kubernetes for reproducible environments.",
      image: "📄",
      technologies: [
        "Python",
        "FastAPI",
        "Google Document AI",
        "Gemini AI",
        "Vector Database",
        "Docker",
        "Kubernetes",
        "Microservices",
      ],
      liveDemo: "https://drive.google.com/file/d/1a1VjbocRSem2dsAOFmP3x6fTVCQkYRby/view?usp=sharing",
      github: "https://github.com/roshan-ican",
      features: [
        "Microservices backend with FastAPI and service-to-service communication",
        "Google Document AI OCR for intelligent text extraction",
        "Semantic search with Gemini AI embeddings and vector database",
        "Multilingual support for global receipt processing",
        "Containerized with Docker multi-stage builds",
        "Kubernetes deployment with reproducible environments",
        "Top 3.3% finalist in Google Hackathon 2025 (60K/200K teams)",
      ],
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      status: "Completed",
    },
    {
      id: 2,
      title: "Voice Todo Assistant with Notion Integration",
      description:
        "Real-time voice-to-task automation system featuring API gateway pattern, WebSocket-based stream processing, and seamless Notion API integration for intelligent task management.",
      longDescription:
        "Voice Todo Assistant is a microservices-based voice automation platform that converts spoken commands into organized Notion tasks in real-time. Built with a Fastify-based API gateway implementing request routing, authentication, and orchestration across Gemini STT service and Notion API. Features WebSocket-based voice stream processing with low-latency inference for immediate task creation and automation.",
      image: "🎤",
      technologies: [
        "Fastify",
        "Gemini STT",
        "Notion API",
        "WebSocket",
        "Node.js",
        "API Gateway",
        "Microservices",
      ],
      liveDemo: "https://www.linkedin.com/posts/roshan-ican_notion-elevenlabs-ai-activity-7362014673845567488-u0L6?utm_source=share&utm_medium=member_desktop&rcm=ACoAADWekZEB0PixUcP320X5CJcKZSPWzgVfGJk",
      github: "https://github.com/roshan-ican",
      features: [
        "API Gateway pattern with Fastify for request routing and orchestration",
        "WebSocket-based real-time voice stream processing",
        "Gemini Speech-to-Text integration for accurate transcription",
        "Seamless Notion API integration for task automation",
        "Low-latency inference for immediate task creation",
        "Authentication and authorization layer",
        "Microservices architecture for scalability",
      ],
      gradient: "from-green-500 via-teal-500 to-blue-500",
      status: "Completed",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <DigitalBackground id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>
            Featured Projects
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}></motion.div>
          <motion.p
            className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}>
            Featured projects showcasing expertise in distributed systems,
            microservices architecture, and AI integration. Google Hackathon
            2025 finalist with innovative solutions.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: 5,
                transition: {
                  type: "spring" as const,
                  stiffness: 300,
                  damping: 20,
                },
              }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300 group relative h-[600px] flex flex-col">
              {/* Project Image/Icon */}
              <div
                className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                <motion.span
                  className="text-6xl relative z-10"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 },
                  }}>
                  {project.image}
                </motion.span>

                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                      "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
                      "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6 relative flex-1 flex flex-col">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100/20 dark:from-gray-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <motion.h3
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring" as const, stiffness: 400 }}>
                    {project.title}
                  </motion.h3>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies
                      .slice(0, 4)
                      .map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + techIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.1 }}
                          className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm border border-purple-400/50 dark:border-purple-300/50 hover:border-pink-400/70 dark:hover:border-pink-300/70 hover:from-pink-500/30 hover:via-purple-500/30 hover:to-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-md">
                          {tech}
                        </motion.span>
                      ))}
                    {project.technologies.length > 4 && (
                      <motion.span
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-600 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium border border-purple-500/30"
                        whileHover={{ scale: 1.1 }}>
                        +{project.technologies.length - 4} more
                      </motion.span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {project.features
                        .slice(0, 3)
                        .map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1 + featureIndex * 0.1,
                            }}
                            viewport={{ once: true }}>
                            <div
                              className={`w-1 h-1 bg-gradient-to-r ${project.gradient} rounded-full`}></div>
                            {feature}
                          </motion.li>
                        ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(147, 51, 234, 0.4)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                      <ExternalLink size={16} />
                      View Project
                    </motion.a>
                    {/* <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(156, 163, 175, 0.1)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium backdrop-blur-sm">
                      <Github size={16} />
                      Code
                    </motion.a> */}
                  </div>
                </div>

                {/* Hover Popup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileHover={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 overflow-y-auto">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Detailed Description:
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Key Features:
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 bg-gradient-to-r ${project.gradient} rounded-full`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <motion.a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                        <ExternalLink size={16} />
                        View Project
                      </motion.a>
                      {/* <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                        <Github size={16} />
                        Code
                      </motion.a> */}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12">
          <Link href="https://github.com/roshan-ican">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold border border-purple-500/30 backdrop-blur-sm">
              <Code size={20} />
              View All Projects on GitHub
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </DigitalBackground>
  );
};

export default Projects;
