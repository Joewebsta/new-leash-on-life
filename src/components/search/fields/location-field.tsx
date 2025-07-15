import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "../filters-form";

interface LocationFieldProps {
  control: Control<z.infer<typeof FormSchema>>;
}

// TODO: TYPE NEEDS TO BE UPDATED
interface MapboxFeature {
  type: "Feature";
  id: string;
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    mapbox_id: string;
    feature_type: string;
    name: string;
    name_preferred?: string;
    place_formatted: string;
    full_address?: string;
    context: {
      country?: {
        mapbox_id: string;
        name: string;
        wikidata_id?: string;
        country_code: string;
        country_code_alpha_3: string;
      };
      region?: {
        mapbox_id: string;
        name: string;
        wikidata_id?: string;
        region_code: string;
        region_code_full: string;
      };
      postcode?: {
        mapbox_id: string;
        name: string;
      };
      district?: {
        mapbox_id: string;
        name: string;
        wikidata_id?: string;
      };
      place?: {
        mapbox_id: string;
        name: string;
        wikidata_id?: string;
      };
      locality?: {
        mapbox_id: string;
        name: string;
        wikidata_id?: string;
      };
      neighborhood?: {
        mapbox_id: string;
        name: string;
      };
      address?: {
        mapbox_id: string;
        address_number: string;
        street_name: string;
        name: string;
      };
      street?: {
        mapbox_id: string;
        name: string;
      };
    };
    coordinates: {
      longitude: number;
      latitude: number;
      accuracy?: string;
      routable_points?: Array<{
        name: string;
        longitude: number;
        latitude: number;
        note?: string;
      }>;
    };
    bbox?: [number, number, number, number];
    language?: string;
    maki?: string;
  };
}

interface MapboxGeocodingResponse {
  type: "FeatureCollection";
  features: MapboxFeature[];
  attribution: string;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN!;

const searchLocations = async (query: string): Promise<Option[]> => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
        query
      )}&access_token=${MAPBOX_TOKEN}&autocomplete=true&types=place,region,postcode&limit=5&country=US`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data: MapboxGeocodingResponse = await response.json();

    // console.log("data", data);

    return data.features.map((feature) => {
      const place = feature.properties.context.place?.name || "";
      const region = feature.properties.context.region?.name || "";
      const postcode = feature.properties.context.postcode?.name || "";
      const country = feature.properties.context.country?.country_code || "";

      // Build formatted location string
      let formattedLocation = "";
      if (feature.properties.feature_type === "postcode") {
        // formattedLocation = `${postcode}, ${region}, ${country}`;
        formattedLocation = `${place}, ${region}, ${postcode}, ${country}`;
      } else if (feature.properties.feature_type === "region") {
        formattedLocation = `${region}, ${country}`;
      } else if (feature.properties.feature_type === "place") {
        formattedLocation = `${place}, ${region}, ${country}`;
      } else {
        formattedLocation = feature.properties.place_formatted;
      }

      const locationParams = {
        city: feature.properties.context.place?.name,
        states: feature.properties.context.region?.region_code,
        zipCode: feature.properties.context.postcode?.name,
      };

      return {
        value: JSON.stringify(locationParams),
        label: formattedLocation,
      };
    });
  } catch (error) {
    console.error("Error searching locations:", error);
    return [];
  }
};

export function LocationField({ control }: LocationFieldProps) {
  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <FormControl>
            <MultipleSelector
              {...field}
              onSearch={searchLocations}
              placeholder="City, state or ZIP"
              maxSelected={1}
              delay={300}
              triggerSearchOnFocus={false}
              loadingIndicator={
                <div className="py-3.5 px-2 text-sm opacity-50 text-muted-foreground">
                  Loading...
                </div>
              }
              emptyIndicator={
                <div className="py-2 text-sm text-muted-foreground">
                  No locations found
                </div>
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
