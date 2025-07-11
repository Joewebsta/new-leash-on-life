import { BASE_URL } from "@/lib/constants";
import { Dog, Match, SearchData } from "@/types/types";

export async function searchDogs(searchParams?: string): Promise<SearchData> {
  const response = await fetch(`${BASE_URL}/dogs/search?${searchParams}`, {
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

export async function fetchBreeds(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch breeds: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function identifyMatch(dogIds: string[]): Promise<Match> {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogIds),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to find a match: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
