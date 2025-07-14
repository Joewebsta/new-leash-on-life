import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "../filters-form";

interface BreedsFieldProps {
  control: Control<z.infer<typeof FormSchema>>;
  breedOptions: Option[];
}

export function BreedsField({ control, breedOptions }: BreedsFieldProps) {
  return (
    <FormField
      control={control}
      name="breeds"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Breeds</FormLabel>
          <FormControl>
            <MultipleSelector
              {...field}
              defaultOptions={breedOptions}
              placeholder="Select one or more breeds"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
