import { CARD } from "../constants/ui";
import type { DailyForecast } from "../types/weather";
import { formatDayMonth, formatWeekday } from "../utils/date";
import { getWeatherInfo } from "../utils/weather";

interface WeatherForecastProps {
  days: DailyForecast[];
  formatTemp: (celsius: number) => string;
}

export default function WeatherForecast({
  days,
  formatTemp,
}: WeatherForecastProps) {
  return (
    <section className={`${CARD} animate-fade-up p-6 sm:p-8`}>
      <h2 className="text-sm font-medium text-slate-500">Dự báo 7 ngày tới</h2>

      <ul className="mt-2 divide-y divide-slate-200/70">
        {days.map((day) => {
          const { label, Icon } = getWeatherInfo(day.weatherCode);
          return (
            <li key={day.date} className="flex items-center gap-4 py-3.5">
              <div className="w-20 shrink-0 sm:w-24">
                <p className="text-sm font-medium text-slate-800">
                  {formatWeekday(day.date)}
                </p>
                <p className="text-xs text-slate-400">
                  {formatDayMonth(day.date)}
                </p>
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-3 text-slate-600">
                <Icon
                  className="size-6 shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="hidden truncate text-sm sm:inline">
                  {label}
                </span>
                <span className="sr-only sm:hidden">{label}</span>
              </div>

              <div
                className="flex shrink-0 items-baseline gap-2 tabular-nums"
                title="Cao nhất / Thấp nhất"
              >
                <span className="text-base font-medium text-slate-900">
                  {formatTemp(day.maxC)}
                </span>
                <span className="text-sm text-slate-400">
                  {formatTemp(day.minC)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
