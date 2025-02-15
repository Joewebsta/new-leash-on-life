import { loginFormSchema } from "@/schemas/schema";
import { z } from "zod";

export async function performLogin(values: z.infer<typeof loginFormSchema>) {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/auth/logi",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    }
  );

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status} ${response.statusText}`);
  }
}
