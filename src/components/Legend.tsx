import { useMemo } from "react";
import { STATUS } from "../lib/icons";
import { matches, useStore } from "../lib/store";
import type { Status } from "../lib/types";

const ORDER: Status[] = ["requested", "progress", "released"];

// The legend doubles as the status filter
export function Legend() {
  const areas = useStore((s) => s.areas);
  const query = useStore((s) => s.query);
  const hidden = useStore((s) => s.hidden);
  const toggleStatus = useStore((s) => s.toggleStatus);

  const counts = useMemo(() => {
    const shown = areas.filter((a) => matches(a, query));
    return Object.fromEntries(ORDER.map((s) => [s, shown.filter((a) => a.status === s).length]));
  }, [areas, query]);

  return (
    <div className="legend">
      <div className="grp">
        {ORDER.map((s) => (
          <button
            key={s}
            className={"lg-btn" + (hidden.has(s) ? " off" : "")}
            aria-pressed={!hidden.has(s)}
            title={`Show or hide ${STATUS[s].label.toLowerCase()} areas`}
            onClick={() => toggleStatus(s)}
          >
            <i className="ring" style={{ "--sc": STATUS[s].color } as React.CSSProperties} />
            {STATUS[s].label}
            <span className="c">{counts[s]}</span>
          </button>
        ))}
      </div>
      <div className="grp sizes">
        <span><i style={{ background: "var(--c-sm)" }} />1–4</span>
        <span><i style={{ background: "var(--c-md)" }} />5–14</span>
        <span><i style={{ background: "var(--c-lg)" }} />15+</span>
      </div>
    </div>
  );
}
