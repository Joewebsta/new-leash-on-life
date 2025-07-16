import { FiltersFormData, Option } from "@/schemas/filters";
import { FILTERS_FORM_CONSTANTS } from "@/constants/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buildSearchParams = (data: FiltersFormData) => {
  const params = new URLSearchParams();

  if (data.sort) params.append("sort", data.sort);
  data.breeds.forEach((breed: Option) => params.append("breeds", breed.value));
  data.zipCodes.forEach((zipCode: Option) =>
    params.append("zipCodes", zipCode.value)
  );
  params.append("ageMin", data.ageRange[0].toString());
  params.append("ageMax", data.ageRange[1].toString());
  return params;
};

export const getDefaultFormValues = (searchParams: URLSearchParams) => {
  const { DEFAULT_AGE_MIN, DEFAULT_AGE_MAX } = FILTERS_FORM_CONSTANTS;

  return {
    sort: searchParams.get("sort") as FiltersFormData["sort"],
    breeds: searchParams
      .getAll("breeds")
      .map((breed) => ({ value: breed, label: breed })),
    ageRange: [
      Number(searchParams.get("ageMin")) || DEFAULT_AGE_MIN,
      Number(searchParams.get("ageMax")) || DEFAULT_AGE_MAX,
    ],
    zipCodes: searchParams
      .getAll("zipCodes")
      .map((zipCode) => ({ value: zipCode, label: zipCode })),
  };
};
