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
      // sort projects by date in descending order
      .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
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
    const allProjects = getAllProjects(['slug', 'title', 'date', 'featured', 'description', 'featuredImage', ...fields]);
    return allProjects.filter(project => project.featured === true);
  } catch (error) {
    console.error('Error getting featured projects:', error);
    return [];
  }
}