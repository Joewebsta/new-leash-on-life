import { BASE_URL } from "@/lib/constants";
import { zipCodesSchema } from "@/schemas/schema";
import { Location } from "@/types/location";

export async function fetchLocations(zipCodes: string[]): Promise<Location[]> {
  zipCodesSchema.parse(zipCodes);

  const response = await fetch(`${BASE_URL}/locations/zip-codes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(zipCodes),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch locations: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
