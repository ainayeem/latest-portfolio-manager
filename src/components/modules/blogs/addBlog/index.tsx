"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addBlog } from "@/services/blog";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { blogSchema } from "./blog.validation";
import Tiptap from "./Tiptap";

export default function AddBlogForm() {
  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(false);
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
    watch,
    setValue,
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
      toast.error("Something went wrong!");
    }
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Create New Blog Post</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title and Thumbnail */}
            <div className="grid grid-cols-1 gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your blog title" className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Thumbnail URL <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} placeholder="Enter thumbnail URL" className="w-full pr-10" />
                        {watch("thumbnail") && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {isImageLoading ? (
                              <div className="h-6 w-6 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                              </div>
                            ) : (
                              <Image
                                src={watch("thumbnail")}
                                alt="Thumbnail preview"
                                width={24}
                                height={24}
                                className="h-6 w-6 object-cover rounded"
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                onLoadStart={() => setIsImageLoading(true)}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Recommended size: 1200x630px</p>
                  </FormItem>
                )}
              />
            </div>

            {/* Category and Author Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Technology, Design, Business..." className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Author Name */}
              <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Author Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter author name" className="w-full" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* Introduction */}
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Introduction <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="min-h-32" {...field} placeholder="Write a compelling introduction to hook your readers..." />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Keep it concise (2-3 paragraphs)</p>
                </FormItem>
              )}
            />

            {/* Main Content */}
            <FormField
              control={form.control}
              name="mainContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Main Content <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <Tiptap mainContent={field.value} onChange={field.onChange} placeholder="Write your blog content here..." />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({}) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        placeholder="react, nextjs, webdev"
                        onChange={(e) => {
                          const value = e.target.value;
                          setValue(
                            "tags",
                            value.split(",").map((item) => item.trim())
                          );
                        }}
                        className="w-full"
                      />
                      <div className="flex flex-wrap gap-2">
                        {watch("tags")?.map(
                          (tag, index) =>
                            tag && (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              >
                                {tag}
                              </span>
                            )
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate tags with commas (max 5 tags recommended)</p>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" className="px-8 py-3 text-md font-medium" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  "Publish Blog"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
