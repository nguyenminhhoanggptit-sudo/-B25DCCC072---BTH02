import { useCallback, useEffect, useState } from "react";
import { fetchWeather } from "../services/weatherApi";
import type { City, WeatherData, WeatherStatus } from "../types/weather";

interface RequestResult {
  key: string;
  data: WeatherData | null;
  error: string | null;
}

export function useWeather(city: City | null) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<RequestResult | null>(null);

  const requestKey = city ? `${city.id}#${attempt}` : null;

  useEffect(() => {
    if (!city || requestKey === null) return;

    const controller = new AbortController();

    fetchWeather(city, controller.signal)
      .then((data) => setResult({ key: requestKey, data, error: null }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setResult({
          key: requestKey,
          data: null,
          error: err instanceof Error ? err.message : "Đã có lỗi xảy ra.",
        });
      });

    return () => controller.abort();
  }, [city, requestKey]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  let status: WeatherStatus;
  let data: WeatherData | null = null;
  let error: string | null = null;

  if (requestKey === null) {
    status = "idle";
  } else if (!result || result.key !== requestKey) {
    status = "loading";
  } else if (result.error) {
    status = "error";
    error = result.error;
  } else {
    status = "success";
    data = result.data;
  }

  const lastData = result?.data ?? null;

  return { status, data, lastData, error, retry };
}
