interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
    bottom_right?: Coordinates;
    top_left?: Coordinates;
  };
  size?: number;
  from?: number;
}

interface LocationSearchResult {
  results: Location[];
  total: number;
}

export type {
  Coordinates,
  Location,
  LocationSearchParams,
  LocationSearchResult,
};
