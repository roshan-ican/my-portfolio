"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Eye,
  Save,
  X,
  ExternalLink,
  Github,
  GripVertical,
  Search,
  Filter,
  Grid3X3,
  List,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/ImageUpload";
import DigitalBackground from "@/components/DigitalBackground";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  createdAt?: string;
}

// Sortable Project Item Component
const SortableProjectItem = ({
  project,
  index,
  onEdit,
  onDelete,
  isDeleting,
}: {
  project: Project;
  index: number;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "In Progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  return (
    <div className="flex items-start gap-3 group">
      {/* Drag Handle - Outside the card */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:scale-110 mt-4">
        <GripVertical size={20} />
      </div>

      {/* Project Card */}
      <motion.div
        ref={setNodeRef}
        style={style}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="flex-1 group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
        {/* Project Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700/50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${project.gradient} rounded-lg flex items-center justify-center shadow-md overflow-hidden`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-2 border-white dark:border-gray-800 shadow-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                    {project.id}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <motion.button
                onClick={() => onEdit(project)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <Edit size={14} />
              </motion.button>
              <motion.button
                onClick={() => onDelete(project.id)}
                disabled={isDeleting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50">
                <Trash2 size={14} />
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                  project.status
                )}`}>
                {project.status}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                {project.technologies.length} technologies
              </span>
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-4">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Description
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-600">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium border border-blue-200 dark:border-blue-800">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700/50">
            {project.liveDemo && project.liveDemo !== "#" && (
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-1.5 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 text-xs font-medium shadow-md hover:shadow-lg">
                <ExternalLink size={14} />
                Live Demo
              </motion.a>
            )}
            {project.github && project.github !== "#" && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-1.5 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 text-xs font-medium shadow-md hover:shadow-lg">
                <Github size={14} />
                GitHub
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AdminProjectsPage = () => {
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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Edit form state
  const [newTechnology, setNewTechnology] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [imageError, setImageError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuthenticated");
      if (auth === "true") {
        setIsAuthenticated(true);
        fetchProjects();
      } else {
        router.push("/admin/login");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");

      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      } else {
        console.error("Failed to fetch projects, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setMessage({
        type: "error",
        text: "Failed to fetch projects",
      });
    }
  };

  const handleEdit = (project: Project) => {
    console.log("Opening edit modal for project:", project);
    setEditingProject({ ...project });
    setIsEditing(false); // Don't set to true until we actually save
    setNewTechnology("");
    setNewFeature("");
    setImageError(false);
    setImageUploadError("");
  };

  const handleDelete = async (projectId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from local state
        setProjects(projects.filter((p) => p.id !== projectId));

        // Also refresh from server to ensure consistency
        await fetchProjects();

        setMessage({
          type: "success",
          text: "Project deleted successfully",
        });
      } else {
        const errorData = await response.json();
        setMessage({
          type: "error",
          text: errorData.error || "Failed to delete project",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage({
        type: "error",
        text: "Failed to delete project",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Save the new order to the server
        saveProjectOrder(newOrder.map((p) => p.id));

        return newOrder;
      });
    }
  };

  const saveProjectOrder = async (projectIds: number[]) => {
    try {
      const response = await fetch("/api/projects/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectIds }),
      });

      if (!response.ok) {
        console.error("Failed to save project order");
      }
    } catch (error) {
      console.error("Error saving project order:", error);
    }
  };

  const handleSaveEdit = async () => {
    console.log("Save edit function called");
    if (!editingProject) {
      console.log("No editing project found");
      return;
    }

    console.log("Validating fields...");
    // Validate required fields
    if (!editingProject.title.trim()) {
      console.log("Title validation failed");
      setMessage({
        type: "error",
        text: "Project title is required",
      });
      return;
    }

    if (!editingProject.description.trim()) {
      setMessage({
        type: "error",
        text: "Project description is required",
      });
      return;
    }

    if (!editingProject.longDescription.trim()) {
      setMessage({
        type: "error",
        text: "Long description is required",
      });
      return;
    }

    if (!editingProject.github.trim()) {
      setMessage({
        type: "error",
        text: "GitHub URL is required",
      });
      return;
    }

    // Prepare data for submission
    const submitData = {
      ...editingProject,
      // Ensure image has a value
      image: editingProject.image || "/project-images/default-project.png",
    };

    console.log("Updating project data:", submitData);

    try {
      setIsEditing(true); // Set loading state only when starting the API call

      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();
      console.log("Update API response:", result);

      if (response.ok) {
        setProjects(
          projects.map((p) => (p.id === editingProject.id ? submitData : p))
        );
        setEditingProject(null);
        setIsEditing(false);
        setMessage({
          type: "success",
          text: "Project updated successfully",
        });
      } else {
        setIsEditing(false); // Reset loading state on error
        setMessage({
          type: "error",
          text: result.error || "Failed to update project",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      setIsEditing(false); // Reset loading state on error
      setMessage({
        type: "error",
        text: "Failed to update project",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsEditing(false);
    setNewTechnology("");
    setNewFeature("");
    setImageError(false);
    setImageUploadError("");
  };

  const handleInputChange = (
    field: keyof Project,
    value: string | string[] | number
  ) => {
    if (editingProject) {
      setEditingProject({ ...editingProject, [field]: value });

      // Reset image error when image URL changes
      if (field === "image") {
        setImageError(false);
      }
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim() && editingProject) {
      const updatedProject = {
        ...editingProject,
        technologies: [...editingProject.technologies, newTechnology.trim()],
      };
      setEditingProject(updatedProject);
      setNewTechnology("");
    }
  };

  const removeTechnology = (tech: string) => {
    if (editingProject) {
      const updatedProject = {
        ...editingProject,
        technologies: editingProject.technologies.filter((t) => t !== tech),
      };
      setEditingProject(updatedProject);
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && editingProject) {
      const updatedProject = {
        ...editingProject,
        features: [...editingProject.features, newFeature.trim()],
      };
      setEditingProject(updatedProject);
      setNewFeature("");
    }
  };

  const removeFeature = (feature: string) => {
    if (editingProject) {
      const updatedProject = {
        ...editingProject,
        features: editingProject.features.filter((f) => f !== feature),
      };
      setEditingProject(updatedProject);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <DigitalBackground className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 dark:border-gray-700 mx-auto mb-6"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading your projects...
          </p>
        </div>
      </DigitalBackground>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <DigitalBackground className="min-h-screen relative overflow-hidden">
      {/* Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/admin">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl">
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Admin</span>
          </motion.button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 px-6 py-3 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-blue-700 dark:text-blue-300 font-medium">
              Project Management
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Manage Projects
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            View, edit, and delete your portfolio projects with our intuitive
            drag-and-drop interface
          </motion.p>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-6 rounded-2xl border-2 backdrop-blur-xl ${
              message.type === "success"
                ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 shadow-xl"
                : "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 shadow-xl"
            }`}>
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  message.type === "success" ? "bg-emerald-500" : "bg-red-500"
                }`}></div>
              <span className="font-medium">{message.text}</span>
            </div>
          </motion.div>
        )}

        {/* Stats and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Grid3X3 size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Total Projects
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <CheckCircle size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.filter((p) => p.status === "Completed").length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Completed
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {projects.filter((p) => p.status === "In Progress").length}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    In Progress
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Project Button */}
          <div className="text-center">
            <Link href="/admin">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-3 mx-auto shadow-xl hover:shadow-2xl font-semibold text-lg">
                <Plus size={24} />
                Add New Project
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-8">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Plus
                    size={40}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  No projects yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  Get started by adding your first project to showcase your work
                </p>
                <Link href="/admin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                    Add First Project
                  </motion.button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Your Projects ({projects.length})
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <GripVertical size={16} />
                    <span>Drag to reorder</span>
                  </div>
                </div>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}>
                  <SortableContext
                    items={projects.map((p) => p.id)}
                    strategy={verticalListSortingStrategy}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                      {projects.map((project, index) => (
                        <SortableProjectItem
                          key={project.id}
                          project={project}
                          index={index}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          isDeleting={isDeleting}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden border border-white/20 dark:border-gray-700/50">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Edit size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      Edit Project
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Update project details and preview changes
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCancelEdit}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-200 hover:scale-110">
                  <X size={24} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex h-[calc(80vh-200px)]">
              {/* Form Section */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-5">
                    <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-5 border border-blue-200/50 dark:border-blue-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Enter project title"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-2xl p-5 border border-emerald-200/50 dark:border-emerald-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                        Short Description
                      </label>
                      <textarea
                        value={editingProject.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Brief description of the project"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-5 border border-purple-200/50 dark:border-purple-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        Long Description
                      </label>
                      <textarea
                        value={editingProject.longDescription}
                        onChange={(e) =>
                          handleInputChange("longDescription", e.target.value)
                        }
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-purple-200 dark:border-purple-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Detailed description of the project"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl p-5 border border-orange-200/50 dark:border-orange-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                        Project Image
                      </label>
                      <ImageUpload
                        currentImageUrl={editingProject.image}
                        onImageChange={(url) => handleInputChange("image", url)}
                        onImageError={setImageUploadError}
                      />
                      {imageUploadError && (
                        <p className="text-red-500 text-sm mt-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          {imageUploadError}
                        </p>
                      )}
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-2xl p-5 border border-indigo-200/50 dark:border-indigo-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={editingProject.github}
                        onChange={(e) =>
                          handleInputChange("github", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-5 border border-emerald-200/50 dark:border-emerald-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={editingProject.liveDemo}
                        onChange={(e) =>
                          handleInputChange("liveDemo", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="https://demo.example.com"
                      />
                    </div>

                    <div className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-2xl p-5 border border-amber-200/50 dark:border-amber-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
                        Project Status
                      </label>
                      <select
                        value={editingProject.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-amber-200 dark:border-amber-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200">
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-2xl p-5 border border-pink-200/50 dark:border-pink-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
                        Gradient Style
                      </label>
                      <select
                        value={editingProject.gradient}
                        onChange={(e) =>
                          handleInputChange("gradient", e.target.value)
                        }
                        className="w-full px-4 py-3 border-2 border-pink-200 dark:border-pink-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200">
                        {gradientOptions.map((gradient) => (
                          <option key={gradient} value={gradient}>
                            {gradient
                              .replace("from-", "")
                              .replace("to-", " → ")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Technologies */}
                    <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                        Technologies Used
                      </label>
                      <div className="flex gap-3 mb-4">
                        <input
                          type="text"
                          value={newTechnology}
                          onChange={(e) => setNewTechnology(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addTechnology())
                          }
                          className="flex-1 px-4 py-3 border-2 border-blue-200 dark:border-blue-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="Add technology"
                        />
                        <motion.button
                          type="button"
                          onClick={addTechnology}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                          <Plus size={20} />
                        </motion.button>
                      </div>
                      <div className="space-y-3">
                        {editingProject.technologies.map((tech) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-blue-200/50 dark:border-blue-800/50 shadow-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                            <span className="flex-1 text-blue-700 dark:text-blue-300 font-medium">
                              {tech}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeTechnology(tech)}
                              className="p-1 text-blue-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200">
                              <X size={16} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/50">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                        Key Features
                      </label>
                      <div className="flex gap-3 mb-4">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addFeature())
                          }
                          className="flex-1 px-4 py-3 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
                          placeholder="Add feature"
                        />
                        <motion.button
                          type="button"
                          onClick={addFeature}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                          <Plus size={20} />
                        </motion.button>
                      </div>
                      <div className="space-y-3">
                        {editingProject.features.map((feature) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50 shadow-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                            <span className="flex-1 text-gray-700 dark:text-gray-300 font-medium">
                              {feature}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFeature(feature)}
                              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200">
                              <X size={16} />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              <div className="w-96 border-l border-gray-100 dark:border-gray-700/50 p-6 overflow-y-auto bg-gradient-to-br from-purple-50/30 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Eye size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      Live Preview
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      See how your project will look
                    </p>
                  </div>
                </div>

                {editingProject.title ? (
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden shadow-xl">
                    {/* Image Section */}
                    <div
                      className={`h-40 bg-gradient-to-br ${editingProject.gradient} flex items-center justify-center relative overflow-hidden`}>
                      {editingProject.image &&
                      editingProject.image.trim() !== "" &&
                      !imageError ? (
                        <img
                          src={editingProject.image}
                          alt={editingProject.title}
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
                          editingProject.image &&
                          editingProject.image.trim() !== "" &&
                          !imageError
                            ? "hidden"
                            : ""
                        }`}>
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p>
                          {editingProject.image &&
                          editingProject.image.trim() !== ""
                            ? "Image failed to load"
                            : "No image preview"}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-lg">
                          {editingProject.status}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {editingProject.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                        {editingProject.description ||
                          "No description provided"}
                      </p>

                      {/* Technologies */}
                      {editingProject.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {editingProject.technologies
                            .slice(0, 3)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600">
                                {tech}
                              </span>
                            ))}
                          {editingProject.technologies.length > 3 && (
                            <span className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg text-xs font-medium border border-blue-200 dark:border-blue-800">
                              +{editingProject.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Features */}
                      {editingProject.features.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                            Key Features:
                          </h4>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                            {editingProject.features
                              .slice(0, 2)
                              .map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-center gap-3">
                                  <div
                                    className={`w-1.5 h-1.5 bg-gradient-to-r ${editingProject.gradient} rounded-full`}></div>
                                  <span className="leading-relaxed">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">
                        {editingProject.liveDemo &&
                          editingProject.liveDemo !== "#" && (
                            <a
                              href={editingProject.liveDemo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-semibold text-center hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                              Live Demo
                            </a>
                          )}
                        {editingProject.github && (
                          <a
                            href={editingProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-xl text-xs font-semibold text-center hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-16">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-200/50 to-gray-300/50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Eye size={32} className="opacity-50" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      No Preview Available
                    </h4>
                    <p className="text-sm leading-relaxed">
                      Fill in the form to see a live preview of your project
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-900/20 dark:to-purple-900/20 flex justify-end gap-4">
              <motion.button
                onClick={handleSaveEdit}
                disabled={isEditing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-3 font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl">
                {isEditing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Changes</span>
                  </>
                )}
              </motion.button>
              <motion.button
                onClick={handleCancelEdit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-32 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm font-semibold shadow-md hover:shadow-lg">
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </DigitalBackground>
  );
};

export default AdminProjectsPage;
