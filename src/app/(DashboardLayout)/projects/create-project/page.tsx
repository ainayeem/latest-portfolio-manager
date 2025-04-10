import AddProjectForm from "@/components/modules/projects/addProject";
const CreateProjectPage = () => {
  return (
    <>
      <div>
        {/* section title */}
        {/* <SectionTitle title="Create Project" /> */}
        <div className="mt-4">
          <AddProjectForm />
        </div>
      </div>
    </>
  );
};

export default CreateProjectPage;
