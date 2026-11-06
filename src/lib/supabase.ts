import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "./config";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

export const sb = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

let script: Promise<void> | undefined;

function loadTurnstile() {
  script ??= new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    el.onload = () => resolve();
    el.onerror = () => {
      script = undefined;
      reject(new Error("Couldn't load the bot check"));
    };
    document.head.appendChild(el);
  });
  return script;
}

// Usually invisible; a visitor who looks risky sees the check at the bottom of the screen
export async function captchaToken() {
  await loadTurnstile();
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9999";
  document.body.appendChild(box);
  let id: string | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await new Promise<string>((resolve, reject) => {
      timer = setTimeout(() => reject(new Error("The bot check timed out")), 30000);
      id = window.turnstile!.render(box, {
        sitekey: CONFIG.turnstileSiteKey,
        appearance: "interaction-only",
        callback: resolve,
        "error-callback": () => reject(new Error("Bot check failed")),
        "expired-callback": () => reject(new Error("Bot check expired")),
      });
    });
  } finally {
    clearTimeout(timer);
    if (id) window.turnstile!.remove(id);
    box.remove();
  }
}

// A browser's first vote or comment signs it in anonymously: an id, but no account
export async function ensureVisitor() {
  const { data } = await sb.auth.getSession();
  if (data.session) return;
  const { error } = await sb.auth.signInAnonymously({ options: { captchaToken: await captchaToken() } });
  if (error) throw error;
}
