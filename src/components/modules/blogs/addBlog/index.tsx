"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addBlog } from "@/services/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { blogSchema } from "./blog.validation";
import Tiptap from "./Tiptap";

export default function AddBlogForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      category: "",
      authorName: "",
      introduction: "",
      mainContent: "",
      tags: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addBlog(data);

      if (response?.success) {
        toast.success(response?.message);
        router.push("/blogs");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wring!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog Post</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            {/* title and thumbnail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your blog title" className="" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Thumbnail URL <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter thumbnail URL" className="" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* category and author name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter blog category" className="" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Author Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter author name" className="" />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* introduction */}
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Introduction <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="min-h-32 " {...field} placeholder="Enter blog introduction" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* main content */}
            <FormField
              control={form.control}
              name="mainContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Main Content <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="rounded-md overflow-hidden">
                      <Tiptap mainContent={field.value} onChange={field.onChange} placeholder="Write the main content of your blog here" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({}) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Tags</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-20 "
                      placeholder="Enter tags (comma-separated)"
                      onChange={(e) => {
                        const value = e.target.value;
                        form.setValue(
                          "tags",
                          value.split(",").map((item) => item.trim())
                        );
                      }}
                    />
                  </FormControl>
                  {/* <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p> */}
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* submit button */}
            <div className="pt-2">
              <Button type="submit" className="w-full md:w-auto cursor-pointer px-8 py-4 text-md font-medium" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Blog"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
