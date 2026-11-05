import { useCallback } from "react";
import type { TemperatureUnit } from "../types/weather";
import { convertTemperature } from "../utils/temperature";
import { useLocalStorage } from "./useLocalStorage";

export function useTemperatureUnit() {
  const [storedUnit, setUnit] = useLocalStorage<TemperatureUnit>(
    "weather:unit",
    "C",
  );
  const unit: TemperatureUnit = storedUnit === "F" ? "F" : "C";

  const toggleUnit = useCallback(
    () => setUnit((prev) => (prev === "C" ? "F" : "C")),
    [setUnit],
  );

  const formatTemp = useCallback(
    (celsius: number) => `${Math.round(convertTemperature(celsius, unit))}°`,
    [unit],
  );

  return { unit, setUnit, toggleUnit, formatTemp };
}
