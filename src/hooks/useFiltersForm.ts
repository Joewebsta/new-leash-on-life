import { FILTERS_FORM_CONSTANTS } from "@/constants/constants";
import { buildSearchParams, getDefaultFormValues } from "@/lib/utils";
import { FiltersFormData, FiltersFormSchema } from "@/schemas/filters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

export function useFiltersForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<FiltersFormData>({
    resolver: zodResolver(FiltersFormSchema),
    defaultValues: getDefaultFormValues(searchParams),
  });

  const onSubmit = (data: FiltersFormData) => {
    const params = buildSearchParams(data);
    setSearchParams(params);
  };

  const handleReset = () => {
    const { DEFAULT_SORT, DEFAULT_AGE_MIN, DEFAULT_AGE_MAX } =
      FILTERS_FORM_CONSTANTS;

    form.reset({
      sort: DEFAULT_SORT,
      breeds: [],
      ageRange: [DEFAULT_AGE_MIN, DEFAULT_AGE_MAX],
      zipCodes: [],
    });
    setSearchParams(new URLSearchParams(`?sort=${DEFAULT_SORT}`));
  };

  return {
    form,
    onSubmit,
    handleReset,
  };
}
