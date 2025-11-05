"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Save, X, Upload, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import DigitalBackground from "@/components/DigitalBackground";

interface ProjectFormData {
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

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState<ProjectFormData>({
    id: 0,
    title: "",
    description: "",
    longDescription: "",
    image: "",
    technologies: [],
    liveDemo: "",
    github: "",
    features: [],
    gradient: "from-blue-500 to-cyan-500",
    status: "Completed",
  });

  const [newTechnology, setNewTechnology] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuthenticated");
      if (auth === "true") {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    router.push("/admin/login");
  };

  const gradientOptions = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-purple-500",
    "from-red-500 to-pink-500",
    "from-teal-500 to-cyan-500",
    "from-violet-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-emerald-500 to-teal-500",
    "from-slate-500 to-gray-500",
  ];

  const statusOptions = ["Completed", "In Progress", "Planning"];

  const handleInputChange = (
    field: keyof ProjectFormData,
    value: string | string[] | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Reset image error when image URL changes
    if (field === "image") {
      setImageError(false);
    }
  };

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !formData.technologies.includes(newTechnology.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()],
      }));
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title.trim()) {
      setMessage({
        type: "error",
        text: "Project title is required",
      });
      return;
    }

    if (!formData.description.trim()) {
      setMessage({
        type: "error",
        text: "Project description is required",
      });
      return;
    }

    if (!formData.longDescription.trim()) {
      setMessage({
        type: "error",
        text: "Long description is required",
      });
      return;
    }

    if (!formData.github.trim()) {
      setMessage({
        type: "error",
        text: "GitHub URL is required",
      });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    // Prepare data for submission
    const submitData = {
      ...formData,
      // Ensure image has a value
      image: formData.image || "/project-images/default-project.png",
    };

    console.log("Submitting project data:", submitData);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      console.log("API response:", result);

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Project added successfully!",
        });

        // Reset form
        setFormData({
          id: 0,
          title: "",
          description: "",
          longDescription: "",
          image: "",
          technologies: [],
          liveDemo: "",
          github: "",
          features: [],
          gradient: "from-blue-500 to-cyan-500",
          status: "Completed",
        });

        // Reset image upload error
        setImageUploadError("");
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to add project. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({
        type: "error",
        text: "Failed to add project. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <DigitalBackground className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </DigitalBackground>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return null;
  }

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

      {/* Logout Button */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white backdrop-blur-sm rounded-lg border border-red-500/50 hover:bg-red-700 transition-all duration-300">
          <LogOut size={20} />
          Logout
        </motion.button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Admin Dashboard
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            Manage your portfolio projects
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Link href="/admin/projects">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50 p-6 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Manage Projects
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    View, edit, and delete existing projects
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>

          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Project
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create a new project for your portfolio
                </p>
              </div>
            </div>
          </div>

          <motion.button
            onClick={async () => {
              try {
                const response = await fetch("/api/projects/init", {
                  method: "POST",
                });
                const result = await response.json();
                setMessage({
                  type: "success",
                  text: `Default projects initialized: ${result.added} projects added`,
                });
              } catch (error) {
                setMessage({
                  type: "error",
                  text: "Failed to initialize default projects",
                });
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50 p-6 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300 cursor-pointer text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Initialize Defaults
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Add default projects to database
                </p>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
            }`}>
            {message.text}
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project ID
                </label>
                <input
                  type="number"
                  value={formData.id}
                  onChange={(e) =>
                    handleInputChange("id", parseInt(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter short description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long Description
              </label>
              <textarea
                value={formData.longDescription}
                onChange={(e) =>
                  handleInputChange("longDescription", e.target.value)
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter detailed description"
                required
              />
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.liveDemo}
                  onChange={(e) =>
                    handleInputChange("liveDemo", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => handleInputChange("github", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://github.com/username/repo"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Image
              </label>
              <ImageUpload
                currentImageUrl={formData.image}
                onImageChange={(url) => handleInputChange("image", url)}
                onImageError={setImageUploadError}
              />
              {imageUploadError && (
                <p className="text-red-500 text-sm mt-2">{imageUploadError}</p>
              )}
            </div>

            {/* Gradient */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gradient Style
              </label>
              <select
                value={formData.gradient}
                onChange={(e) => handleInputChange("gradient", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                {gradientOptions.map((gradient) => (
                  <option key={gradient} value={gradient}>
                    {gradient}
                  </option>
                ))}
              </select>
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechnology())
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Add technology"
                />
                <motion.button
                  type="button"
                  onClick={addTechnology}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Plus size={20} />
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-blue-900 dark:hover:text-blue-100">
                      <X size={14} />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Features
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addFeature())
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Add feature"
                />
                <motion.button
                  type="button"
                  onClick={addFeature}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  <Plus size={20} />
                </motion.button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="flex-1 text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200">
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding Project...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Add Project
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Project Preview
          </h2>

          {formData.title ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Image Section */}
              <div
                className={`h-48 bg-gradient-to-br ${formData.gradient} flex items-center justify-center relative overflow-hidden`}>
                {formData.image &&
                formData.image.trim() !== "" &&
                !imageError ? (
                  <img
                    src={formData.image}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                    onError={() => {
                      setImageError(true);
                    }}
                    onLoad={() => {
                      setImageError(false);
                    }}
                  />
                ) : null}
                <div
                  className={`text-white/50 text-center ${
                    formData.image &&
                    formData.image.trim() !== "" &&
                    !imageError
                      ? "hidden"
                      : ""
                  }`}>
                  <Upload size={48} className="mx-auto mb-2" />
                  <p>
                    {formData.image && formData.image.trim() !== ""
                      ? "Image failed to load"
                      : "No image preview"}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30">
                    {formData.status}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {formData.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {formData.description || "No description provided"}
                </p>

                {/* Technologies */}
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {formData.technologies.length > 3 && (
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                        +{formData.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* Features */}
                {formData.features.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {formData.features.slice(0, 2).map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div
                            className={`w-1 h-1 bg-gradient-to-r ${formData.gradient} rounded-full`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {formData.liveDemo && formData.liveDemo !== "#" && (
                    <a
                      href={formData.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded text-xs font-medium text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                      Live Demo
                    </a>
                  )}
                  {formData.github && (
                    <a
                      href={formData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded text-xs font-medium text-center hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <Upload size={48} className="mx-auto mb-4 opacity-50" />
              <p>Fill in the form above to see a preview of your project</p>
            </div>
          )}
        </motion.div>
      </div>
    </DigitalBackground>
  );
};

export default AdminPage;
