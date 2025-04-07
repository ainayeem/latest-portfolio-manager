import { z } from "zod";
export const loginValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, "Password is required"),
});
