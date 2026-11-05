export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;

  aliases?: string[];
}

export type TemperatureUnit = "C" | "F";
export type WeatherTheme = "idle" | "clear" | "cloudy" | "rain";
export type WeatherStatus = "idle" | "loading" | "success" | "error";

export interface OpenMeteoCurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  wind_speed_10m: string;
  weather_code: string;
}

export interface OpenMeteoCurrent {
  /** ISO8601 theo giờ địa phương, vd "2026-11-05T14:30" */
  time: string;
  interval: number;
  /** °C */
  temperature_2m: number;
  /** % */
  relative_humidity_2m: number;
  /** km/h */
  wind_speed_10m: number;
  /** Mã WMO */
  weather_code: number;
}

export interface OpenMeteoDailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
}

export interface OpenMeteoDaily {
  /** "YYYY-MM-DD" */
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: OpenMeteoCurrentUnits;
  current: OpenMeteoCurrent;
  daily_units: OpenMeteoDailyUnits;
  daily: OpenMeteoDaily;
}

export interface CurrentWeather {
  temperatureC: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  time: string;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  maxC: number;
  minC: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  windUnit: string;
}
