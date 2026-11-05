import { useCallback } from "react";
import { CITIES } from "../constants/cities";
import type { City } from "../types/weather";
import { useLocalStorage } from "./useLocalStorage";

export function useSelectedCity() {
  const [cityId, setCityId] = useLocalStorage<string | null>(
    "weather:last-city-id",
    null,
  );

  const city: City | null = CITIES.find((c) => c.id === cityId) ?? null;

  const selectCity = useCallback((id: string) => setCityId(id), [setCityId]);

  return { city, selectCity };
}
