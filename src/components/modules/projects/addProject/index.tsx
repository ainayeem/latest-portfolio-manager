"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addProject } from "@/services/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { projectSchema } from "./project.validation";

export default function AddProjectForm() {
  const router = useRouter();
  const [techInput, setTechInput] = useState("");
  const techSuggestions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Shadcn/ui",
  ];

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      description: "",
      projectRole: "",
      technologiesUsed: [],
      keyFeatures: [],
      liveLink: "",
      frontendSourceCode: "",
      backendSourceCode: "",
      apiDocumentation: "",
      isFeatured: false,
    },
  });

  const roles = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full-Stack" },
    { value: "ui-ux", label: "UI/UX" },
  ];

  const {
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addProject(data);

      if (response?.success) {
        toast.success(response?.message);
        router.push("/projects");
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !watch("technologiesUsed").includes(techInput.trim())) {
      setValue("technologiesUsed", [...watch("technologiesUsed"), techInput.trim()]);
      setTechInput("");
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setValue(
      "technologiesUsed",
      watch("technologiesUsed").filter((tech) => tech !== techToRemove)
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Add New Project</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title and Thumbnail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Input {...field} placeholder="Enter your project title" className="w-full mt-1" />
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
                      <Input {...field} placeholder="Enter thumbnail URL" className="w-full mt-1" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea className="min-h-40 w-full mt-1" {...field} placeholder="Enter project description" />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Project stack */}
            <FormField
              control={form.control}
              name="projectRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project Stack <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Select a Stack" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Technologies Used - Dynamic Input */}
            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Technologies Used <span className="text-red-500">*</span>
              </Label>

              <div className="flex gap-2">
                <Input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add a technology"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTechnology();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTechnology} variant="outline" className="shrink-0">
                  Add
                </Button>
              </div>

              {/* Technology suggestions */}
              <div className="flex flex-wrap gap-2 mt-2">
                {techSuggestions.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => {
                      if (!watch("technologiesUsed").includes(tech)) {
                        setValue("technologiesUsed", [...watch("technologiesUsed"), tech]);
                      }
                    }}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {tech}
                  </button>
                ))}
              </div>

              {/* Selected technologies */}
              <div className="mt-4">
                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Technologies</Label>
                {watch("technologiesUsed").length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No technologies added yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {watch("technologiesUsed").map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                      >
                        <span className="text-sm">{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTechnology(tech)}
                          className="text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-100"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <FormMessage className="text-xs text-red-500" />
            </div>

            {/* Key Features */}
            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Key Features <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-24 w-full mt-1"
                      {...field}
                      placeholder="Enter key features (comma-separated)"
                      onChange={(e) => {
                        const value = e.target.value;
                        setValue(
                          "keyFeatures",
                          value.split(",").map((item) => item.trim())
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate each feature with a comma</p>
                </FormItem>
              )}
            />

            {/* Links Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Project Links</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Live Link */}
                <FormField
                  control={form.control}
                  name="liveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Live Link <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter live project link" className="w-full mt-1" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Frontend Source Code */}
                <FormField
                  control={form.control}
                  name="frontendSourceCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">Frontend Source Code</FormLabel>
                      <FormControl>
                        <Input type="url" {...field} placeholder="Enter frontend source code URL" className="w-full mt-1" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Backend Source Code */}
                <FormField
                  control={form.control}
                  name="backendSourceCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">Backend Source Code</FormLabel>
                      <FormControl>
                        <Input type="url" {...field} placeholder="Enter backend source code URL" className="w-full mt-1" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* API Documentation */}
                <FormField
                  control={form.control}
                  name="apiDocumentation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">API Documentation</FormLabel>
                      <FormControl>
                        <Input type="url" {...field} placeholder="Enter API documentation URL" className="w-full mt-1" />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Featured Project */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-gray-200 dark:border-gray-700">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="h-4 w-4 mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</FormLabel>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Check this box to highlight this project in your portfolio</p>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="px-6 py-3" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Project"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
