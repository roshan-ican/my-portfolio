import { motion, type Variants, type Transition } from "framer-motion";
import { Github, GitCommit, BookOpen, Users } from "lucide-react";

const GitHubStats = () => {
  const username = "roshan-ican";

  const stats = [
    {
      label: "Total Repositories",
      value: "30+", // Updated from 25+
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      shadow: "hover:shadow-cyan-500/30",
    },
    {
      label: "Total Commits",
      value: "500+",
      icon: GitCommit,
      color: "from-purple-500 to-pink-500",
      shadow: "hover:shadow-pink-500/30",
    },
    {
      label: "Followers",
      value: "130+", // Updated from 100+
      icon: Users,
      color: "from-green-500 to-teal-500",
      shadow: "hover:shadow-teal-500/30",
    },
    {
      label: "Starred",
      value: "50+",
      icon: Github,
      color: "from-orange-500 to-red-500",
      shadow: "hover:shadow-red-500/30",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const springTransition: Transition = { type: "spring", stiffness: 100, damping: 15 };

  const cardVariants: Variants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: springTransition,
    },
  };

  return (
    <div id="github" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
            whileInView={{ scale: [0.9, 1] }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}>
            GitHub
            <span className="bg-gradient-to-r from-royal via-champagne to-gold bg-clip-text text-transparent">
              {" "}
              Contributions
            </span>
          </motion.h2>
          <motion.div
            className="w-16 sm:w-24 h-1 bg-gradient-to-r from-royal via-champagne to-gold mx-auto mb-3 sm:mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: "auto" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}></motion.div>
          <motion.p
            className="text-sm sm:text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}>
            My coding activity and contribution history
          </motion.p>
        </motion.div>

        {/* --- STATS GRID IMPROVEMENT --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                // Added 'group' for children hover effects and dynamic shadow
                className={`group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700/50 transition-all duration-300 h-[200px] sm:h-[220px] flex flex-col hover:shadow-xl ${stat.shadow} dark:hover:shadow-none`}
              >
                {/* Icon now animates on group-hover */}
                <motion.div
                  className={`inline-block p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-4 w-fit transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12`}
                >
                  <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </motion.div>
                
                <h3 className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium mb-2 flex-1">
                  {stat.label}
                </h3>
                
                {/* Value now animates on group-hover */}
                <motion.p
                  className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent transition-transform duration-300 ease-in-out group-hover:scale-105`}
                  whileInView={{ scale: [0.9, 1] }}
                  transition={{ duration: 0.5 }}>
                  {stat.value}
                </motion.p>
                
                {/* --- Removed the absolute inset-0 popup --- */}

              </motion.div>
            );
          })}
        </motion.div>

        {/* --- CONTRIBUTION GRAPH IMPROVEMENT --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          variants={cardVariants}
          whileHover={{
            y: -10,
            scale: 1.02,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
          className="group bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300 relative min-h-[400px] sm:min-h-[500px] flex flex-col overflow-hidden"
        >
          
          {/* Main Graph View */}
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Contribution Activity
            </h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=github-dark&hide_border=true&area=true&color=FFB81C&point=DBC6A3&line=4169E1`}
                alt="GitHub Contribution Graph"
                className="w-full min-w-full rounded-lg"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </div>

          {/* --- New Hover Overlay --- */}
          {/* This overlay slides up from the bottom instead of covering the whole card */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 text-center flex flex-col items-center
                       bg-gradient-to-t from-white via-white dark:from-gray-800 dark:via-gray-800
                       transform translate-y-1/2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                       transition-all duration-300 ease-in-out"
          >
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-royal via-champagne to-gold bg-clip-text text-transparent mb-3">
              Contribution Activity
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
              View my GitHub profile to see more projects, contributions, and open-source work
            </p>
            <motion.a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold text-xs sm:text-sm border border-purple-500/30 backdrop-blur-sm">
              <Github size={16} className="sm:w-5 sm:h-5" />
              Visit GitHub
            </motion.a>
          </motion.div>
        </motion.div>

        {/* CTA Button (Kept as is, it's good) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10">
          <motion.a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(255, 184, 28, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold text-sm sm:text-base border border-purple-500/30 backdrop-blur-sm">
            <Github size={18} className="sm:w-5 sm:h-5" />
            Visit GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default GitHubStats;