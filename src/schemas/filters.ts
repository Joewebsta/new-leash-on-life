import * as z from "zod";

export const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const FiltersFormSchema = z.object({
  breeds: z.array(optionSchema),
  ageRange: z.array(z.number()).length(2),
  zipCodes: z.array(optionSchema),
  sort: z
    .enum([
      "name:asc",
      "name:desc",
      "breed:asc",
      "breed:desc",
      "age:asc",
      "age:desc",
    ])
    .nullable(),
});

export type FiltersFormData = z.infer<typeof FiltersFormSchema>;
export type Option = z.infer<typeof optionSchema>;
