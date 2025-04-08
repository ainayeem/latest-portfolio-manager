import UpdateProjectForm from "@/components/modules/projects/updateProject";
import SectionTitle from "@/components/shared/SectionTitle";
import { getProjectById } from "@/services/project";

const UpdateProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data: project } = await getProjectById(id);

  return (
    <>
      <SectionTitle title="Update Project" />
      <UpdateProjectForm project={project} />
    </>
  );
};

export default UpdateProjectPage;
