import { BASE_URL } from "@/api/auth";
import { Dog, SearchData } from "@/types/types";

export async function searchDogs(): Promise<SearchData> {
  const response = await fetch(`${BASE_URL}/dogs/search`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch search data: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function fetchDogs(dogIds: string[]): Promise<Dog[]> {
  // console.log("Fetch dog, dog ids: ", dogIds);

  const response = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dogs: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
