const WEEKDAYS = [
  "Chủ nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

/** Parse "YYYY-MM-DD" theo giờ local (tránh lệch ngày do new Date("YYYY-MM-DD") hiểu là UTC) */
function parseLocalDate(iso: string): Date {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatWeekday(iso: string): string {
  return WEEKDAYS[parseLocalDate(iso).getDay()];
}

export function formatDayMonth(iso: string): string {
  const date = parseLocalDate(iso);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}`;
}

/** "2026-11-05T14:30" -> "14:30 · 05/11/2026" */
export function formatUpdatedAt(iso: string): string {
  const [date, time = ""] = iso.split("T");
  const [year, month, day] = date.split("-");
  return `${time.slice(0, 5)} · ${day}/${month}/${year}`;
}
