import { BASE_URL } from "@/lib/constants";
import { Location } from "@/types/location";

export async function fetchLocations(zipCodes: string[]): Promise<Location[]> {
  if (!Array.isArray(zipCodes) || zipCodes.length === 0) {
    throw new Error("At least one zip code is required");
  }

  if (zipCodes.length > 100) {
    throw new Error("Maximum of 100 zip codes allowed per request");
  }

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
