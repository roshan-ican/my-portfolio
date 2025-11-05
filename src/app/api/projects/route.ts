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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "longDescription",
      "github",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Set default image if not provided
    if (!body.image) {
      body.image = "/project-images/default-project.png";
    }

    // Load existing projects
    const projects = await loadProjects();

    // Create new project with auto-generated ID
    const newProject = {
      ...body,
      id: projects.length + 1,
      createdAt: new Date().toISOString(),
    };

    // Add to projects array and save to file
    projects.push(newProject);
    await saveProjects(projects);

    return NextResponse.json(
      {
        message: "Project added successfully",
        project: newProject,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const projects = await loadProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
