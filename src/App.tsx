import CityList from "./components/CityList";
import RainAnimation from "./components/RainAnimation";
import {
  EmptyState,
  ErrorState,
  WeatherSkeleton,
} from "./components/StatusViews";
import UnitToggle from "./components/UnitToggle";
import WeatherCurrent from "./components/WeatherCurrent";
import WeatherForecast from "./components/WeatherForecast";
import { CITIES } from "./constants/cities";
import { useSelectedCity } from "./hooks/useSelectedCity";
import { useTemperatureUnit } from "./hooks/useTemperatureUnit";
import { useWeather } from "./hooks/useWeather";
import type { WeatherTheme } from "./types/weather";
import { THEME_STYLES, getWeatherTheme, isThunderCode } from "./utils/weather";

const THEME_KEYS = Object.keys(THEME_STYLES) as WeatherTheme[];

export default function App() {
  const { city, selectCity } = useSelectedCity();
  const { unit, setUnit, formatTemp } = useTemperatureUnit();
  const { status, data, lastData, error, retry } = useWeather(city);

  const weatherCode =
    status === "idle" ? null : (lastData?.current.weatherCode ?? null);
  const theme = getWeatherTheme(weatherCode);
  const styles = THEME_STYLES[theme];
  const showThunder = weatherCode !== null && isThunderCode(weatherCode);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans antialiased">
      {}
      {THEME_KEYS.map((key) => (
        <div
          key={key}
          aria-hidden="true"
          className={`fixed inset-0 z-0 bg-linear-to-br ${THEME_STYLES[key].background} transition-opacity duration-1000 ${
            key === theme ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {theme === "rain" && <RainAnimation thunder={showThunder} />}

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12">
        <header className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1
              className={`text-2xl font-light tracking-tight transition-colors duration-700 ${styles.heading}`}
            >
              Thời tiết
            </h1>
            <p
              className={`mt-1 text-sm transition-colors duration-700 ${styles.subtle}`}
            >
              Việt Nam · {CITIES.length} thành phố
            </p>
          </div>
          <UnitToggle unit={unit} onChange={setUnit} />
        </header>

        {}
        <div className="grid gap-6 md:grid-cols-[17rem_1fr] md:items-start">
          <CityList
            cities={CITIES}
            selectedId={city?.id ?? null}
            onSelect={selectCity}
          />

          <main className="min-w-0 space-y-6" aria-busy={status === "loading"}>
            {status === "idle" && <EmptyState />}
            {status === "loading" && <WeatherSkeleton />}
            {status === "error" && (
              <ErrorState
                message={error ?? "Đã có lỗi xảy ra."}
                onRetry={retry}
              />
            )}
            {status === "success" && city && data && (
              <>
                <WeatherCurrent
                  city={city}
                  weather={data.current}
                  windUnit={data.windUnit}
                  unit={unit}
                  formatTemp={formatTemp}
                />
                <WeatherForecast days={data.daily} formatTemp={formatTemp} />
              </>
            )}
          </main>
        </div>

        <footer
          className={`mt-10 text-center text-xs transition-colors duration-700 ${styles.subtle}`}
        >
          Dữ liệu từ Open-Meteo.com
        </footer>
      </div>
    </div>
  );
}
