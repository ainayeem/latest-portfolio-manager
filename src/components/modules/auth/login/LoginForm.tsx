"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAdmin } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginValidation } from "./login.validation";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginValidation),
    defaultValues: { email: "", password: "" },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    // console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ data:", data);
    try {
      const response = await loginAdmin(data);
      // console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ response:", response);

      if (response?.success) {
        toast.success(response?.message);
        // verifyToken(response.data?.token);
        router.push("/");
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Something went wring!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="sm:w-96 shadow-xl dark:bg-[#140C1C]">
        <CardHeader>
          <CardTitle className="text-center text-xl text-[#110E18] dark:text-[#FFFFFF]">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                {/* email field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <FormControl>
                          <Input {...field} placeholder="Enter your email" className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* password field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <FormControl>
                          <Input {...field} type="password" placeholder="Password" className="pl-10" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* submit button */}
                <Button type="submit" className="w-full cursor-pointer">
                  {isSubmitting ? "Logging..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
