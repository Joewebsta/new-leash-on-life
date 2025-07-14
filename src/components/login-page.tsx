import { cn } from "@/lib/utils";
import { loginFormSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { usePerformLogin } from "@/services/authService";
import {
  LoginHeader,
  LoginFormFields,
  LoginSubmitButton,
  LoginErrorMessage,
} from "@/components/login";

export function LoginPage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutateAsync: loginAsync, isPending, isError } = usePerformLogin();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      await loginAsync(values);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <LoginHeader />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <LoginFormFields form={form} />
            <LoginSubmitButton isPending={isPending} />
            <LoginErrorMessage isError={isError} />
          </form>
        </Form>
      </div>
    </div>
  );
}
