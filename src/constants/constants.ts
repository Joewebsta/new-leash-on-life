export const FILTERS_FORM_CONSTANTS = {
  DEFAULT_RESULTS_TOTAL: 10_000,
  DEFAULT_AGE_MIN: 0,
  DEFAULT_AGE_MAX: 14,
  DEFAULT_SORT: "breed:asc" as const,
  SEARCH_DEBOUNCE_MS: 300,
} as const;

export const BASE_URL = "https://frontend-take-home-service.fetch.com";
