import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/brain';

export async function GET(request, { params }) {
  const { id } = await params;
  
  const projects = getProjects();
  const work = projects.find(p => p.slug === id);

  if (!work) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Map the Markdown project format to match what the frontend expects
  const formattedWork = {
    id: work.slug,
    title: work.title,
    category: work.tags?.[0] || 'Project',
    image_url: work.coverImage,
    description: work.content.replace(/!\[.*?\]\(.*?\)/g, '').replace(/^#\s+.+$/m, '').trim(),
    tech: work.tags || [],
    services: work.tags || [],
    client: work.status,
    year: "2024", // Default or extract if needed
    link: work.repository ? `https://github.com/${work.repository}` : null,
  };

  return NextResponse.json(formattedWork);
}
