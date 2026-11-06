import { useEffect, useState } from "react";
import { useStore } from "../lib/store";
import { Icon } from "./Icon";

export function Lightbox() {
  const image = useStore((s) => s.lightbox);
  const patch = useStore((s) => s.patch);
  return (
    <div className={"lightbox" + (image ? " show" : "")} onClick={() => patch({ lightbox: null })}>
      {image && <img src={image} alt="Screenshot" />}
    </div>
  );
}

export function Toast() {
  const toast = useStore((s) => s.toast);
  const [text, setText] = useState("");
  useEffect(() => {
    if (toast) setText(toast);
  }, [toast]);
  return (
    <div className={"toast" + (toast ? " show" : "")} role="status">
      <Icon name="check" size={16} weight={3} />
      {text}
    </div>
  );
}
