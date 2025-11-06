"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/roshan-ican",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="w-4 h-4" />,
      href: "https://www.linkedin.com/feed/",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: "mailto:john.doe@email.com",
      label: "Email",
    },
  ];

  return (
    <footer className="bg-background text-foreground relative navbar-premium">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left">
            <h3 className="text-lg font-bold gradient-text mb-2">
              Roshan Sahani
            </h3>
            <p className="text-gray-300 text-sm mb-3 max-w-md">
              Full Stack Developer who belives that ideas can be turn into reality.
            </p>
            <div className="flex justify-center md:justify-start space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                  aria-label={social.label}>
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center md:text-right">
            <div className="space-y-1 text-gray-300 text-sm">
              <p>Bangalore, India</p>
              <a
                href="mailto:roshansahani535@gmail.com"
                className="block hover:text-white transition-colors duration-200">
                roshansahani535@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-gray-300 text-xs flex items-center justify-center gap-2">
            © {currentYear} Roshan Sahani. Made with{" "}
            <Heart className="w-3 h-3 text-red-500 fill-current" /> Love ♥️
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
