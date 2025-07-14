import MultipleSelector from "@/components/ui/multiple-selector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface ZipCodesFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export function ZipCodesField({ control }: ZipCodesFieldProps) {
  return (
    <FormField
      control={control}
      name="zipCodes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Zipcodes</FormLabel>
          <FormControl>
            <MultipleSelector
              {...field}
              defaultOptions={[]}
              creatable
              placeholder="Select one or more zip codes"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
