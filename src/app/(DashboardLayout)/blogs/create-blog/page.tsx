import AddBlogForm from "@/components/modules/blogs/addBlog";
import SectionTitle from "@/components/shared/SectionTitle";
const CreateBlogPage = () => {
  return (
    <>
      <SectionTitle title="Create Blog" />
      <div className="mt-4">
        <AddBlogForm />
      </div>
    </>
  );
};

export default CreateBlogPage;
