"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addSkill } from "@/services/skill";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { skillSchema } from "./skill.validation";

export default function AddSkillForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      icon: "",
      name: "",
      description: "",
      category: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const categories = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "language", label: "Language" },
    { value: "tools", label: "Tools" },
    { value: "others", label: "Others" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await addSkill(data);

      if (response?.success) {
        toast.success(response?.message);
        router.push("/skills");
      } else {
        toast.error(response.error[0]?.message);
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Add New Skill</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Icon and Name */}
            <div className="grid grid-cols-1 gap-6">
              {/* Icon URL */}
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Icon URL <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} placeholder="Enter icon URL" className="w-full mt-1 pr-10" />

                        {(field?.value?.startsWith("http") || !field?.value) && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {field?.value && field?.value?.startsWith("http") && (
                              <Image src={field?.value} width={24} height={24} alt="Icon preview" className="h-6 w-6 object-contain" />
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Paste URL of skill icon (Freepik.com)</p>
                  </FormItem>
                )}
              />

              {/* Skill Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter skill name" className="w-full mt-1" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* Category and Description */}
            <div className="grid grid-cols-1 gap-6">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value} className="flex items-center">
                              <span className="capitalize">{category.label}</span>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter skill description" className="w-full mt-1" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Brief description of your skill level or experience</p>
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button type="submit" className="px-6 py-3 min-w-32" disabled={isSubmitting}>
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
                    Adding...
                  </span>
                ) : (
                  "Add Skill"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
