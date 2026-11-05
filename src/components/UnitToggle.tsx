import type { TemperatureUnit } from "../types/weather";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

const OPTIONS: TemperatureUnit[] = ["C", "F"];

export default function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div
      role="group"
      aria-label="Đơn vị nhiệt độ"
      className="inline-flex rounded-full bg-white/80 p-1 shadow-lg shadow-slate-900/5 ring-1 ring-black/5 backdrop-blur-md"
    >
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={unit === option}
          onClick={() => onChange(option)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
            unit === option
              ? "bg-slate-900 text-white"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          °{option}
        </button>
      ))}
    </div>
  );
}
