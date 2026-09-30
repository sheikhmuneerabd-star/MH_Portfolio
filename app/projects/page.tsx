import type { Metadata } from "next";
import AllProjects from "@/components/AllProjects";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `All Projects | ${portfolio.profile.name}`,
  description: "Every project I have built, filterable by category.",
};

export default function ProjectsPage() {
  return <AllProjects />;
}