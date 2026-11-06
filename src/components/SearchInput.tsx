import { useStore } from "../lib/store";
import { Icon } from "./Icon";

export function SearchInput({ placeholder }: { placeholder: string }) {
  const query = useStore((s) => s.query);
  const patch = useStore((s) => s.patch);
  return (
    <div className="search">
      <Icon name="search" size={15} />
      <input
        className="input"
        placeholder={placeholder}
        aria-label={placeholder}
        value={query}
        onChange={(e) => patch({ query: e.target.value })}
      />
    </div>
  );
}
