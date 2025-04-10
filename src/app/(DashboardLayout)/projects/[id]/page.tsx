import ProjectDetails from "@/components/modules/projects/projectDetails";
import SectionTitle from "@/components/shared/SectionTitle";
import { getProjectById } from "@/services/project";

const ProjectDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: project } = await getProjectById(id);
  // console.log("🚀 ~ ProjectDetailsPage ~ project:", project);

  return (
    <>
      <SectionTitle title="Project Details" />
      <ProjectDetails project={project} />
    </>
  );
};

export default ProjectDetailsPage;
