import { useMemo } from "react";
import { matches, useStore } from "./store";

// The legend filter applies to the map and sidebar; the leaderboard always shows every status
export function useVisible(useLegend: boolean) {
  const areas = useStore((s) => s.areas);
  const hidden = useStore((s) => s.hidden);
  const query = useStore((s) => s.query);
  return useMemo(
    () => areas.filter((a) => (!useLegend || !hidden.has(a.status)) && matches(a, query)),
    [areas, hidden, query, useLegend],
  );
}
