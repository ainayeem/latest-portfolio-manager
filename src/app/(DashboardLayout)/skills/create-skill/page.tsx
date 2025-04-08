import AddSkillForm from "@/components/modules/skills/addSkill";
import SectionTitle from "@/components/shared/SectionTitle";

const CreateSkillPage = () => {
  return (
    <>
      <SectionTitle title="Create Skill" />
      <div className="mt-4">
        <AddSkillForm />
      </div>
    </>
  );
};

export default CreateSkillPage;
