import ManageSkill from "@/components/modules/skills";
import SectionTitle from "@/components/shared/SectionTitle";
import { getAllSkills } from "@/services/skill";

const SkillsPage = async () => {
  const { data } = await getAllSkills();
  const skills = data ?? [];

  return (
    <div className="w-full">
      <SectionTitle title="Skills" />
      <ManageSkill skills={skills} />
    </div>
  );
};

export default SkillsPage;
