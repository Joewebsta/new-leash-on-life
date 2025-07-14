import { FormSchema } from "@/components/search/filters-form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildSearchParams = (data: z.infer<typeof FormSchema>) => {
  const params = new URLSearchParams();

  if (data.sort) params.append("sort", data.sort);
  data.breeds.forEach((breed) => params.append("breeds", breed.value));
  data.zipCodes.forEach((zipCode) => params.append("zipCodes", zipCode.value));
  params.append("ageMin", data.ageRange[0].toString());
  params.append("ageMax", data.ageRange[1].toString());
  return params;
};

export const getDefaultFormValues = (searchParams: URLSearchParams) => {
  const CONSTANTS = {
    DEFAULT_RESULTS_TOTAL: 10_000,
    DEFAULT_AGE_MIN: 0,
    DEFAULT_AGE_MAX: 14,
    DEFAULT_SORT: "breed:asc" as const,
    SEARCH_DEBOUNCE_MS: 300,
  } as const;

  return {
    sort: searchParams.get("sort") as z.infer<typeof FormSchema>["sort"],
    breeds: searchParams
      .getAll("breeds")
      .map((breed) => ({ value: breed, label: breed })),
    ageRange: [
      Number(searchParams.get("ageMin")) || CONSTANTS.DEFAULT_AGE_MIN,
      Number(searchParams.get("ageMax")) || CONSTANTS.DEFAULT_AGE_MAX,
    ],
    zipCodes: searchParams
      .getAll("zipCodes")
      .map((zipCode) => ({ value: zipCode, label: zipCode })),
  };
};
