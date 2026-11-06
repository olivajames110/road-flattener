import { useRef } from "react";
import { useStore, type PanelMode } from "../lib/store";
import type { Area } from "../lib/types";
import { DetailPanel } from "./DetailPanel";
import { SubmitPanel } from "./SubmitPanel";

export function Panel() {
  const panel = useStore((s) => s.panel);
  const area = useStore((s) => s.areas.find((a) => a.id === s.selectedId));

  // Keep the last content on screen while the panel slides away
  const mode = useRef<PanelMode>(null);
  const lastArea = useRef<Area | undefined>(undefined);
  if (panel) mode.current = panel;
  if (area) lastArea.current = area;

  return (
    <aside className={"panel" + (panel ? " open" : "")} inert={!panel}>
      {mode.current === "submit" && <SubmitPanel />}
      {mode.current === "detail" && lastArea.current && <DetailPanel area={lastArea.current} />}
    </aside>
  );
}
