import { Option } from "@/components/ui/multiple-selector";
import { cn } from "@/lib/utils";

import { Form } from "@/components/ui/form";
import * as React from "react";

import { useFiltersForm } from "@/hooks/useFiltersForm";
import { useFiltersSearch } from "@/hooks/useFiltersSearch";
import { FiltersFormData } from "@/schemas/filters";
import {
  AgeRangeField,
  BreedsField,
  FormActions,
  SortByField,
  ZipCodesField,
} from "./fields";

interface FiltersFormProps extends React.ComponentProps<"form"> {
  breedOptions: Option[];
  onClose: () => void;
}

export function FiltersForm({
  className,
  breedOptions,
  onClose,
}: FiltersFormProps) {
  const { form, onSubmit, handleReset } = useFiltersForm();
  const formValues = form.watch();

  const {
    isLoading: isLoadingSearchData,
    isError: isSearchError,
    resultsTotal,
  } = useFiltersSearch(formValues);

  const handleFormSubmit = (data: FiltersFormData) => {
    onSubmit(data);
    onClose();
  };

  return (
    <div className={cn("pb-[98px] px-4 md:px-0", className)}>
      {isSearchError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">
            There was an error loading the search results. Please try again.
          </p>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-8"
        >
          <SortByField control={form.control} />
          <BreedsField control={form.control} breedOptions={breedOptions} />
          <AgeRangeField control={form.control} />
          <ZipCodesField control={form.control} />
          <FormActions
            onReset={handleReset}
            isLoading={isLoadingSearchData}
            resultsTotal={resultsTotal}
          />
        </form>
      </Form>
    </div>
  );
}
