import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolio } from "@/data/portfolio";
import ProjectDetail from "@/components/ProjectDetail";

// Build ke waqt har project ka page bana do
export function generateStaticParams() {
  return portfolio.projects.map((p) => ({ slug: p.slug }));
}

// Next.js 15+ mein params Promise hota hai
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | ${portfolio.profile.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}