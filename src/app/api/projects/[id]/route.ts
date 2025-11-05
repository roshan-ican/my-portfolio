import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Project } from "@/types/project";

// File path for storing projects
const projectsFilePath = path.join(process.cwd(), "data", "projects.json");

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.dirname(projectsFilePath);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
};

// Load projects from file
const loadProjects = async (): Promise<Project[]> => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(projectsFilePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Save projects to file
const saveProjects = async (projects: Project[]) => {
  await ensureDataDir();
  await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2));
};

// PUT - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await request.json();

    // Load existing projects
    const projects = await loadProjects();

    // Find the project to update
    const projectIndex = projects.findIndex((p) => p.id === projectId);
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Update the project
    const updatedProject = {
      ...projects[projectIndex],
      ...body,
      id: projectId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    projects[projectIndex] = updatedProject;
    await saveProjects(projects);

    return NextResponse.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    // Load existing projects
    const projects = await loadProjects();

    // Find the project to delete
    const projectIndex = projects.findIndex((p) => p.id === projectId);
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Remove the project
    const deletedProject = projects.splice(projectIndex, 1)[0];
    await saveProjects(projects);

    return NextResponse.json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Get a specific project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    // Load existing projects
    const projects = await loadProjects();

    // Find the project
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
