import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";

interface AgeRangeFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export function AgeRangeField({ control }: AgeRangeFieldProps) {
  return (
    <FormField
      control={control}
      name="ageRange"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Age Range</FormLabel>
          <FormControl>
            <div className="h-6">
              <DualRangeSlider
                labelPosition="bottom"
                label={(value) => <span>{value}</span>}
                value={field.value}
                onValueChange={field.onChange}
                min={0}
                max={14}
                step={1}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
