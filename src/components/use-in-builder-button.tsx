"use client";

import { useRouter } from "next/navigation";

interface UseInBuilderButtonProps {
  label?: string;
  src?: string;
  dataset?: string;
}

export function UseInBuilderButton({
  label = "Gebruik in coalitiebouwer",
  src = "Exitpoll 22:15",
  dataset,
}: UseInBuilderButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const params = new URLSearchParams();
        if (src) {
          params.set("src", src);
        }
        if (dataset) {
          params.set("dataset", dataset);
        }
        const query = params.toString();
        router.push(query ? `/coalitie?${query}` : "/coalitie");
      }}
      className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 transition hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
    >
      {label}
    </button>
  );
}
