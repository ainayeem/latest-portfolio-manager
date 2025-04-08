import ManageBlog from "@/components/modules/blogs";
import SectionTitle from "@/components/shared/SectionTitle";
import { getAllBlogs } from "@/services/blog";
const BlogsPage = async () => {
  const { data } = await getAllBlogs();
  const blogs = data ?? [];

  return (
    <div className="w-full">
      <SectionTitle title="Blogs" />
      <ManageBlog blogs={blogs} />
    </div>
  );
};

export default BlogsPage;
