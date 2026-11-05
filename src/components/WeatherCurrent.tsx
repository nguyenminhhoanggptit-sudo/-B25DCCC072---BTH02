import { Clock, Droplets, MapPin, Wind, type LucideIcon } from "lucide-react";
import { CARD } from "../constants/ui";
import type { City, CurrentWeather, TemperatureUnit } from "../types/weather";
import { formatUpdatedAt } from "../utils/date";
import { getWeatherInfo } from "../utils/weather";

interface WeatherCurrentProps {
  city: City;
  weather: CurrentWeather;
  windUnit: string;
  unit: TemperatureUnit;
  formatTemp: (celsius: number) => string;
}

interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

function Stat({ icon: Icon, label, value, className = "" }: StatProps) {
  return (
    <div className={`rounded-2xl bg-slate-50/80 px-4 py-3 ${className}`}>
      <dt className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
        <Icon className="size-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 text-base font-medium text-slate-800">{value}</dd>
    </div>
  );
}

export default function WeatherCurrent({
  city,
  weather,
  windUnit,
  unit,
  formatTemp,
}: WeatherCurrentProps) {
  const { label, Icon } = getWeatherInfo(weather.weatherCode);

  return (
    <section className={`${CARD} animate-fade-up p-6 sm:p-10`}>
      <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
        <MapPin className="size-4" aria-hidden="true" />
        {city.name}
      </div>

      <div className="mt-6 flex items-center justify-between gap-6">
        <div>
          <p className="flex items-start text-7xl font-extralight leading-none tracking-tight text-slate-900 tabular-nums sm:text-8xl">
            {formatTemp(weather.temperatureC)}
            <span className="mt-2 text-2xl font-light text-slate-400 sm:text-3xl">
              {unit}
            </span>
          </p>
          <p className="mt-4 text-lg text-slate-600">{label}</p>
        </div>
        <Icon
          className="size-20 shrink-0 text-slate-700 sm:size-28"
          strokeWidth={1}
          aria-hidden="true"
        />
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat
          icon={Droplets}
          label="Độ ẩm"
          value={`${Math.round(weather.humidity)}%`}
        />
        <Stat
          icon={Wind}
          label="Tốc độ gió"
          value={`${Math.round(weather.windSpeed)} ${windUnit}`}
        />
        <Stat
          icon={Clock}
          label="Cập nhật"
          value={formatUpdatedAt(weather.time)}
          className="col-span-2 sm:col-span-1"
        />
      </dl>
    </section>
  );
}
