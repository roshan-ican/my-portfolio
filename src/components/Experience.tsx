"use client";

import { motion } from "framer-motion";
import { Calendar, Building } from "lucide-react";
import DigitalBackground from "./DigitalBackground";

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const workExperience = [
    {
      id: 1,
      title: "Senior Software Engineer (SDE-2)",
      company: "Neokred",
      period: "Jul 2023 – Sept 2025",
      type: "work",
      description:
        "Senior Software Engineer specializing in distributed systems and microservices architecture. Led architectural transformations, designed high-throughput data pipelines, and mentored junior engineers on systems thinking and code quality standards.",
      achievements: [
        "Migrated JavaScript monolith to TypeScript microservices (30+ independent services) enabling parallel deployment cycles with zero downtime and backward compatibility across payment, settlement, and reporting domains",
        "Built distributed data pipeline processing 30M records via Redis, Kafka, and S3, reducing latency by 25% and enabling real-time transaction reporting",
        "Architected settlement engine handling 200 concurrent transactions with deterministic ordering, GraphQL bulk APIs with validation schemas, and T+1 hourly reconciliation",
        "Implemented resilience patterns: Kafka DLQ, exponential backoff, circuit breakers, and environment parity validation, reducing transaction failures by 40%",
        "Designed GraphQL gateway with query complexity analysis, rate limiting, authentication, and request batching for 10K QPS",
        "Mentored junior engineers on distributed systems, code review standards, and architectural decision frameworks",
      ],
      technologies: [
        "Node.js",
        "TypeScript",
        "Microservices",
        "Kafka",
        "Redis",
        "GraphQL",
        "Docker",
        "Kubernetes",
        "AWS",
        "Fastify",
        "MongoDB",
        "PostgreSQL",
      ],
      gradient: "from-blue-500 to-black",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "Sibin Group",
      period: "Feb 2023 – Jul 2023",
      type: "work",
      description:
        "Full Stack Engineer working on disease management systems and clinical workflows. Designed backend architecture using ASP.NET Core, optimized database performance, and built responsive frontend components.",
      achievements: [
        "Designed disease management system using ASP.NET Core with repository patterns and dependency injection for clean, testable code",
        "Engineered optimized SQL stored procedures reducing report latency by 35% through advanced index strategies and query optimization",
        "Built responsive Angular UI components with real-time validation, change detection optimization, and complex form state management for clinical workflows",
      ],
      technologies: [
        "ASP.NET Core",
        "Angular",
        "SQL Server",
        "Repository Pattern",
        "Backend Development",
        "Frontend Development",
      ],
      gradient: "from-cyan-500 to-black",
    },
  ];

  return (
    <DigitalBackground id="experience" className="py-20">
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
            Work Experience
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-black mx-auto mb-4"
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
            My professional journey in software development, from distributed
            systems architecture to mentoring engineering teams on building
            scalable, production-grade applications.
          </motion.p>
        </motion.div>

        {/* Work Experience */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <Building className="w-6 h-6 text-blue-400" />
            Experience
          </motion.h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-black"></div>

            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="relative flex gap-8">
                  {/* Timeline dot */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-4 h-4 bg-gradient-to-r ${job.gradient} rounded-full border-4 border-gray-100 dark:border-gray-900 relative z-10`}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                      className={`absolute inset-0 bg-gradient-to-r ${job.gradient} rounded-full blur-sm`}
                    />
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                      transition: { type: "spring" as const, stiffness: 300 },
                    }}
                    className="flex-1 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300 relative overflow-hidden group">
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${job.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {job.title}
                          </h4>
                          <p
                            className={`text-lg font-medium bg-gradient-to-r ${job.gradient} bg-clip-text text-transparent mb-2`}>
                            {job.company}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {job.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {job.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Key Achievements:
                        </h5>
                        <ul className="space-y-1">
                          {job.achievements.map(
                            (achievement, achievementIndex) => (
                              <motion.li
                                key={achievementIndex}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: achievementIndex * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                <div
                                  className={`w-1.5 h-1.5 bg-gradient-to-r ${job.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                                {achievement}
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: techIndex * 0.05,
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                            className="bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-black/20 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm border border-blue-400/50 dark:border-blue-300/50 hover:border-cyan-400/70 dark:hover:border-cyan-300/70 hover:from-cyan-500/30 hover:via-blue-500/30 hover:to-black/30 transition-all duration-300 shadow-sm hover:shadow-md">
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DigitalBackground>
  );
};

export default Experience;