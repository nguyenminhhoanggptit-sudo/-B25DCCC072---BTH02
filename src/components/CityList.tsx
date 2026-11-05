import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { CARD } from "../constants/ui";
import type { City } from "../types/weather";
import { normalizeText } from "../utils/text";

interface CityListProps {
  cities: readonly City[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function CityList({
  cities,
  selectedId,
  onSelect,
}: CityListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    if (!q) return cities;
    return cities.filter((city) =>
      [city.name, ...(city.aliases ?? [])].some((term) =>
        normalizeText(term).includes(q),
      ),
    );
  }, [cities, query]);

  return (
    <aside className={`${CARD} p-4 md:sticky md:top-8`}>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && filtered.length > 0)
              onSelect(filtered[0].id);
          }}
          placeholder="Tìm thành phố…"
          aria-label="Tìm thành phố"
          className="w-full rounded-2xl bg-slate-100/80 py-2.5 pl-9 pr-9 text-sm text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Xóa tìm kiếm"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="px-3 py-8 text-center text-sm text-slate-400">
          Không tìm thấy thành phố phù hợp
        </p>
      ) : (
        <ul className="mt-3 grid grid-cols-2 gap-1.5 md:grid-cols-1">
          {filtered.map((city) => {
            const active = city.id === selectedId;
            return (
              <li key={city.id}>
                <button
                  type="button"
                  onClick={() => onSelect(city.id)}
                  aria-current={active ? "true" : undefined}
                  className={`flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${
                    active
                      ? "bg-slate-900 font-medium text-white shadow-md shadow-slate-900/20"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{city.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
