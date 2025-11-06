"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import DigitalBackground from "../../components/DigitalBackground";

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

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // First, initialize default projects if needed
        await initializeDefaultProjects();

        // Then fetch all projects
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data.projects || []);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to fetch projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Initialize default projects if needed
  const initializeDefaultProjects = async () => {
    try {
      const response = await fetch("/api/projects/init", {
        method: "POST",
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Default projects initialized:", result);
      }
    } catch (error) {
      console.error("Error initializing default projects:", error);
    }
  };

  return (
    <DigitalBackground className="min-h-screen">
      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300">
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        </Link>
      </div>

      {/* Admin Button */}
   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            All Projects
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            A comprehensive collection of my work showcasing full-stack
            development skills across various domains including healthcare,
            fintech, and web applications.
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading projects...
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="font-medium">Error loading projects</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
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
                  className={`h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                  {project.image &&
                  (project.image.startsWith("http") ||
                    project.image.startsWith("/")) ? (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover relative z-10"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.3 },
                      }}
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          const fallback = document.createElement("span");
                          fallback.className = "text-6xl relative z-10";
                          fallback.textContent = "📁";
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <motion.span
                      className="text-6xl relative z-10"
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 },
                      }}>
                      📁
                    </motion.span>
                  )}

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

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === "Completed"
                          ? "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30"
                          : "bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                      }`}>
                      {project.status}
                    </span>
                  </div>
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
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: index * 0.1 + techIndex * 0.05,
                            }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm border border-purple-400/50 dark:border-purple-300/50 hover:border-pink-400/70 dark:hover:border-pink-300/70 hover:from-pink-500/30 hover:via-purple-500/30 hover:to-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-md">
                            {tech}
                          </motion.span>
                        ))}
                      {project.technologies.length > 3 && (
                        <motion.span
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium border border-blue-500/30"
                          whileHover={{ scale: 1.1 }}>
                          +{project.technologies.length - 3} more
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
                          .slice(0, 2)
                          .map((feature, featureIndex) => (
                            <motion.li
                              key={feature}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1 + featureIndex * 0.1,
                              }}>
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
                          boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                        <ExternalLink size={16} />
                        Live Demo
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
                              className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Key Features:
                        </h4>
                        <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                          {project.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2">
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
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium">
                          <ExternalLink size={16} />
                          Live Demo
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
          </div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Projects Completed", value: `${projects.length}+` },
            { label: "Technologies Used", value: "20+" },
            { label: "Years Experience", value: "3+" },
            { label: "Success Rate", value: "100%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DigitalBackground>
  );
};

export default ProjectsPage;
