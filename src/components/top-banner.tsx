import { formatDateTime } from "@/lib/time";

interface TopBannerProps {
  updatedAt: string;
}

export function TopBanner({ updatedAt }: TopBannerProps) {
  return (
    <div className="rounded-2xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100 shadow-lg shadow-indigo-500/20">
      Exitpoll 21:45 — geen nieuwe cijfers, laatste update {formatDateTime(updatedAt)}
    </div>
  );
}
