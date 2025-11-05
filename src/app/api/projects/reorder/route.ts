import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Project } from "@/types/project";

const projectsFilePath = path.join(process.cwd(), "data", "projects.json");

const ensureDataDir = async () => {
  const dir = path.dirname(projectsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const loadProjects = async (): Promise<Project[]> => {
  await ensureDataDir();
  if (!fs.existsSync(projectsFilePath)) {
    return [];
  }
  const data = fs.readFileSync(projectsFilePath, "utf8");
  return JSON.parse(data);
};

const saveProjects = async (projects: Project[]) => {
  await ensureDataDir();
  fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
};

// POST - Reorder projects
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { projectIds } = body; // Array of project IDs in new order

    if (!Array.isArray(projectIds)) {
      return NextResponse.json(
        { error: "projectIds must be an array" },
        { status: 400 }
      );
    }

    // Load existing projects
    const projects = await loadProjects();

    // Create a map of projects by ID for quick lookup
    const projectsMap = new Map(projects.map((p) => [p.id, p]));

    // Reorder projects based on the provided order
    const reorderedProjects = projectIds
      .map((id) => projectsMap.get(id))
      .filter((project): project is Project => project !== undefined); // Remove any undefined projects

    // Save the reordered projects
    await saveProjects(reorderedProjects);

    return NextResponse.json({
      message: "Projects reordered successfully",
      projects: reorderedProjects,
    });
  } catch (error) {
    console.error("Error reordering projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
