import * as React from "react";
import { Button } from "@/components/ui/button";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { FiltersForm } from "@/components/filters-form";
import { Settings2 } from "lucide-react";

export function DrawerDialog({ breeds }: { breeds: string[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const breedOptions = React.useMemo(
    () => breeds.map((breed) => ({ label: breed, value: breed })),
    [breeds]
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Settings2 /> Filters
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <FiltersForm
            breedOptions={breedOptions}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Settings2 /> Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[100%]">
        <div className="overflow-scroll">
          <DrawerHeader className="text-left">
            <DrawerTitle>Filters</DrawerTitle>
            <DialogDescription></DialogDescription>
          </DrawerHeader>
          <FiltersForm
            breedOptions={breedOptions}
            onClose={() => setOpen(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
