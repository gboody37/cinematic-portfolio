import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BRAIN_DIR = path.join(process.cwd(), 'src', 'content');

export function getProjects() {
  const projectsDir = path.join(BRAIN_DIR, '03 - Projects');
  
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const files = fs.readdirSync(projectsDir);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  const projects = markdownFiles.map(filename => {
    const filePath = path.join(projectsDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Extract title from h1 or filename
    let title = filename.replace('.md', '');
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].replace(/`/g, '').trim();
    }

    // Extract first image
    const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
    const coverImage = imgMatch ? imgMatch[1] : null;

    return {
      slug: filename.replace('.md', ''),
      title,
      tags: data.tags || [],
      status: data.status || 'Unknown',
      repository: data.repository || '',
      coverImage,
      content
    };
  });

  return projects;
}
