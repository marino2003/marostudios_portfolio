import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'content', 'projects');

export function getProjectSlugs() {
  if (typeof window !== 'undefined') {
    // Client-side - return empty array or handle differently
    return [];
  }
  
  try {
    return fs.readdirSync(projectsDirectory);
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

export function getProjectBySlug(slug, fields) {
  if (typeof window !== 'undefined') {
    // Client-side - return empty object or handle differently
    return {};
  }
  
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(projectsDirectory, `${realSlug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === 'slug') {
        items[field] = realSlug;
      }
      if (field === 'content') {
        items[field] = content;
      }
      if (data[field] !== undefined) {
        items[field] = data[field];
      }
    });

    return items;
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return {};
  }
}

export function getAllProjects(fields) {
  if (typeof window !== 'undefined') {
    // Client-side - return empty array or handle differently
    return [];
  }
  
  try {
    const slugs = getProjectSlugs();
    const projects = slugs
      .map((slug) => getProjectBySlug(slug, fields))
      // Filter out draft projects
      .filter(project => !project.draft)
      // Sort projects by order field (if exists) or by date
      .sort((project1, project2) => {
        // If both projects have order field, sort by order
        if (project1.order !== undefined && project2.order !== undefined) {
          return project1.order - project2.order;
        }
        // If only project1 has order, it comes first
        if (project1.order !== undefined) {
          return -1;
        }
        // If only project2 has order, it comes first
        if (project2.order !== undefined) {
          return 1;
        }
        // If neither has order, sort by date (newest first)
        return (project1.date > project2.date ? -1 : 1);
      });
    return projects;
  } catch (error) {
    console.error('Error getting all projects:', error);
    return [];
  }
}

export function getFeaturedProjects(fields) {
  if (typeof window !== 'undefined') {
    // Client-side - return empty array or handle differently
    return [];
  }
  
  try {
    const allProjects = getAllProjects(['slug', 'title', 'date', 'featured', 'description', 'featuredImage', 'order', ...fields]);
    return allProjects.filter(project => project.featured === true);
  } catch (error) {
    console.error('Error getting featured projects:', error);
    return [];
  }
}

export function getDraftProjects(fields) {
  if (typeof window !== 'undefined') {
    // Client-side - return empty array or handle differently
    return [];
  }
  
  try {
    const slugs = getProjectSlugs();
    const projects = slugs
      .map((slug) => getProjectBySlug(slug, fields))
      // Filter to only include draft projects
      .filter(project => project.draft === true)
      // Sort projects by order field (if exists) or by date
      .sort((project1, project2) => {
        // If both projects have order field, sort by order
        if (project1.order !== undefined && project2.order !== undefined) {
          return project1.order - project2.order;
        }
        // If only project1 has order, it comes first
        if (project1.order !== undefined) {
          return -1;
        }
        // If only project2 has order, it comes first
        if (project2.order !== undefined) {
          return 1;
        }
        // If neither has order, sort by date (newest first)
        return (project1.date > project2.date ? -1 : 1);
      });
    return projects;
  } catch (error) {
    console.error('Error getting draft projects:', error);
    return [];
  }
}