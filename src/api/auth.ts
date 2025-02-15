import { loginFormSchema } from "@/schemas/schema";
import { z } from "zod";

export const BASE_URL = "https://frontend-take-home-service.fetch.com";

export async function performLogin(values: z.infer<typeof loginFormSchema>) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status} ${response.statusText}`);
  }
}

export async function performLogout() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status} ${response.statusText}`);
  }
}
