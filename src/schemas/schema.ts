import { z } from "zod";

export const loginFormSchema = z.object({
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Must be 5 or more characters long" }),
});

export const zipCodesSchema = z
  .array(z.string())
  .min(1, "At least one zip code is required")
  .max(100, "Maximum of 100 zip codes allowed");
