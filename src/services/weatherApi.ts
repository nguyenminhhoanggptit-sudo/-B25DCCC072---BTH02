import type {
  City,
  DailyForecast,
  OpenMeteoResponse,
  WeatherData,
} from "../types/weather";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const FORECAST_DAYS = 7;

function buildUrl(city: City): string {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",

    forecast_days: String(FORECAST_DAYS + 1),
  });
  return `${BASE_URL}?${params.toString()}`;
}

function toWeatherData(json: OpenMeteoResponse): WeatherData {
  const { current, current_units: units, daily } = json;
  if (!current || !daily) throw new Error("Dữ liệu trả về không hợp lệ.");

  const count = Math.max(0, Math.min(FORECAST_DAYS, daily.time.length - 1));
  const forecast: DailyForecast[] = Array.from({ length: count }, (_, i) => {
    const idx = i + 1;
    return {
      date: daily.time[idx],
      weatherCode: daily.weather_code[idx],
      maxC: daily.temperature_2m_max[idx],
      minC: daily.temperature_2m_min[idx],
    };
  });

  return {
    current: {
      temperatureC: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      time: current.time,
    },
    daily: forecast,
    windUnit: units?.wind_speed_10m ?? "km/h",
  };
}

export async function fetchWeather(
  city: City,
  signal?: AbortSignal,
): Promise<WeatherData> {
  let response: Response;
  try {
    response = await fetch(buildUrl(city), { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") throw err;
    throw new Error(
      "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng và thử lại.",
    );
  }

  if (!response.ok) {
    throw new Error(
      `Không thể tải dữ liệu thời tiết (HTTP ${response.status}).`,
    );
  }

  const json = (await response.json()) as OpenMeteoResponse;
  return toWeatherData(json);
}
