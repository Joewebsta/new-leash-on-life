import { BASE_URL } from "@/lib/constants";
import { zipCodesSchema } from "@/schemas/schema";
import {
  Location,
  LocationSearchParams,
  LocationSearchResult,
} from "@/types/location";

export async function searchLocations(
  params: LocationSearchParams
): Promise<LocationSearchResult> {
  const response = await fetch(`${BASE_URL}/locations/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to search locations: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function fetchLocations(zipCodes: string[]): Promise<Location[]> {
  zipCodesSchema.parse(zipCodes);

  const response = await fetch(`${BASE_URL}/locations/`, {
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
