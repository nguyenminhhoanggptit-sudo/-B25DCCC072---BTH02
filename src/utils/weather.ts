import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { WeatherTheme } from "../types/weather";

interface WeatherInfo {
  label: string;
  Icon: LucideIcon;
}

const UNKNOWN: WeatherInfo = { label: "Không xác định", Icon: Cloud };

/** Bảng mã WMO mà Open-Meteo trả về */
const WEATHER_INFO: Record<number, WeatherInfo> = {
  0: { label: "Trời quang", Icon: Sun },
  1: { label: "Gần như quang đãng", Icon: Sun },
  2: { label: "Có mây rải rác", Icon: CloudSun },
  3: { label: "Nhiều mây", Icon: Cloud },
  45: { label: "Sương mù", Icon: CloudFog },
  48: { label: "Sương mù đóng băng", Icon: CloudFog },
  51: { label: "Mưa phùn nhẹ", Icon: CloudDrizzle },
  53: { label: "Mưa phùn", Icon: CloudDrizzle },
  55: { label: "Mưa phùn dày", Icon: CloudDrizzle },
  56: { label: "Mưa phùn lạnh nhẹ", Icon: CloudDrizzle },
  57: { label: "Mưa phùn lạnh dày", Icon: CloudDrizzle },
  61: { label: "Mưa nhỏ", Icon: CloudRain },
  63: { label: "Mưa vừa", Icon: CloudRain },
  65: { label: "Mưa to", Icon: CloudRain },
  66: { label: "Mưa lạnh nhẹ", Icon: CloudRain },
  67: { label: "Mưa lạnh nặng hạt", Icon: CloudRain },
  71: { label: "Tuyết nhẹ", Icon: CloudSnow },
  73: { label: "Tuyết vừa", Icon: CloudSnow },
  75: { label: "Tuyết dày", Icon: CloudSnow },
  77: { label: "Hạt tuyết", Icon: CloudSnow },
  80: { label: "Mưa rào nhẹ", Icon: CloudRain },
  81: { label: "Mưa rào", Icon: CloudRain },
  82: { label: "Mưa rào rất to", Icon: CloudRain },
  85: { label: "Mưa tuyết nhẹ", Icon: CloudSnow },
  86: { label: "Mưa tuyết nặng", Icon: CloudSnow },
  95: { label: "Dông", Icon: CloudLightning },
  96: { label: "Dông kèm mưa đá nhẹ", Icon: CloudLightning },
  99: { label: "Dông kèm mưa đá lớn", Icon: CloudLightning },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_INFO[code] ?? UNKNOWN;
}

export function isRainCode(code: number): boolean {
  return (
    (code >= 51 && code <= 67) || // mưa phùn, mưa (61-65 + biến thể lạnh)
    (code >= 80 && code <= 82) || // mưa rào
    (code >= 95 && code <= 99) // dông
  );
}

export const isThunderCode = (code: number): boolean =>
  code >= 95 && code <= 99;

export function getWeatherTheme(code: number | null | undefined): WeatherTheme {
  if (code === null || code === undefined) return "idle";
  if (code <= 2) return "clear";
  if (isRainCode(code)) return "rain";
  return "cloudy"; // 3, 45, 48 và các mã còn lại
}

/** Class đầy đủ (không ghép chuỗi động) để Tailwind quét được */
export const THEME_STYLES: Record<
  WeatherTheme,
  { background: string; heading: string; subtle: string }
> = {
  idle: {
    background: "from-slate-50 via-white to-sky-50",
    heading: "text-slate-800",
    subtle: "text-slate-500",
  },
  clear: {
    background: "from-amber-100 via-yellow-50 to-sky-200",
    heading: "text-slate-800",
    subtle: "text-slate-600",
  },
  cloudy: {
    background: "from-slate-200 via-gray-200 to-slate-300",
    heading: "text-slate-800",
    subtle: "text-slate-600",
  },
  rain: {
    background: "from-slate-400 via-slate-500 to-slate-600",
    heading: "text-white",
    subtle: "text-slate-200",
  },
};
