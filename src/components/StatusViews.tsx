import { CircleAlert, CloudSun, RefreshCw } from "lucide-react";
import { CARD } from "../constants/ui";

export function EmptyState() {
  return (
    <div
      className={`${CARD} flex min-h-80 flex-col items-center justify-center gap-4 p-10 text-center`}
    >
      <CloudSun
        className="size-14 text-slate-400"
        strokeWidth={1}
        aria-hidden="true"
      />
      <div>
        <p className="text-lg font-medium text-slate-800">Chọn một thành phố</p>
        <p className="mt-1 text-sm text-slate-500">
          Chọn từ danh sách để xem thời tiết hiện tại và dự báo 7 ngày tới.
        </p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={`${CARD} flex min-h-80 flex-col items-center justify-center gap-4 p-10 text-center`}
    >
      <CircleAlert
        className="size-12 text-rose-400"
        strokeWidth={1.25}
        aria-hidden="true"
      />
      <div>
        <p className="text-lg font-medium text-slate-800">
          Không tải được dữ liệu
        </p>
        <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        Thử lại
      </button>
    </div>
  );
}

export function WeatherSkeleton() {
  return (
    <div
      role="status"
      aria-label="Đang tải dữ liệu thời tiết"
      className="space-y-6"
    >
      <div className={`${CARD} animate-pulse p-6 sm:p-10`}>
        <div className="h-4 w-28 rounded-full bg-slate-200" />
        <div className="mt-6 flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-20 w-44 rounded-2xl bg-slate-200" />
            <div className="h-5 w-32 rounded-full bg-slate-200" />
          </div>
          <div className="size-24 rounded-full bg-slate-200" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>

      <div className={`${CARD} animate-pulse p-6 sm:p-8`}>
        <div className="h-4 w-32 rounded-full bg-slate-200" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="h-11 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>

      <span className="sr-only">Đang tải…</span>
    </div>
  );
}
