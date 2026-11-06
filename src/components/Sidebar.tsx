import logo from "../assets/logo.jpg";
import { CONFIG } from "../lib/config";
import { useStore } from "../lib/store";
import { AreaList } from "./AreaList";
import { Icon } from "./Icon";
import { SearchInput } from "./SearchInput";

export function Sidebar() {
  const view = useStore((s) => s.view);
  const setView = useStore((s) => s.setView);
  const openSubmit = useStore((s) => s.openSubmit);
  const collapsed = useStore((s) => s.sidebarCollapsed);
  const patch = useStore((s) => s.patch);

  return (
    <aside className="sidebar">
      <div className="sb-scroll">
        <div className="sb-sec sb-top">
          <div className="brand">
            <div className="sign" aria-hidden="true">
              <div className="sign-in">
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="wordmark">
              <span className="wm-1">Smoother</span>
              <span className="wm-2">Roads</span>
            </div>
            <button
              className="ibtn sb-toggle"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!collapsed}
              onClick={() => patch({ sidebarCollapsed: !collapsed })}
            >
              <Icon d='<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/>' size={18} />
            </button>
          </div>
          <button className="btn fun block" onClick={openSubmit}>
            <Icon d='<path d="M12 5v14M5 12h14"/>' size={16} weight={2.6} />
            Request Area
          </button>
          <SearchInput placeholder="Search by name, location…" />
          {CONFIG.database && (
            <nav className="seg full">
              <button className={view === "map" ? "on" : ""} onClick={() => setView("map")}>
                <Icon d='<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>' size={15} />
                Map
              </button>
              <button className={view === "list" ? "on" : ""} onClick={() => setView("list")}>
                <Icon d='<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3"/>' size={15} />
                Leaderboard
              </button>
            </nav>
          )}
        </div>
        <div className="sb-sec">
          <AreaList />
        </div>
      </div>
    </aside>
  );
}
