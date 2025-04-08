import ManageProject from "@/components/modules/projects";
import SectionTitle from "@/components/shared/SectionTitle";
import { getAllProjects } from "@/services/project";

const ProjectsPage = async () => {
  const { data } = await getAllProjects();
  const projects = data ?? [];
  console.log("🚀 ~ ProjectsPage ~ projects:", projects);

  return (
    <div className="w-full">
      <SectionTitle title="Projects" />
      <ManageProject projects={projects} />
    </div>
  );
};

export default ProjectsPage;
