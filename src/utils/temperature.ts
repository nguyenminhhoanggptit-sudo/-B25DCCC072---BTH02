import type { TemperatureUnit } from "../types/weather";

export const celsiusToFahrenheit = (celsius: number): number =>
  celsius * 1.8 + 32;

export const convertTemperature = (
  celsius: number,
  unit: TemperatureUnit,
): number => (unit === "F" ? celsiusToFahrenheit(celsius) : celsius);
