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

const sb = createClient(CONFIG.supabase.url, CONFIG.supabase.key);

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
async function captchaToken() {
  await loadTurnstile();
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9999";
  document.body.appendChild(box);
  let id: string | undefined;
  try {
    return await new Promise<string>((resolve, reject) => {
      id = window.turnstile!.render(box, {
        sitekey: CONFIG.turnstileSiteKey,
        appearance: "interaction-only",
        callback: resolve,
        "error-callback": () => reject(new Error("Bot check failed")),
        "expired-callback": () => reject(new Error("Bot check expired")),
      });
    });
  } finally {
    if (id) window.turnstile!.remove(id);
    box.remove();
  }
}

// A browser's first vote signs it in anonymously, which gives it a voter id and no account
async function ensureVoter() {
  const { data } = await sb.auth.getSession();
  if (data.session) return;
  const { error } = await sb.auth.signInAnonymously({ options: { captchaToken: await captchaToken() } });
  if (error) throw error;
}

export async function fetchVotes() {
  const counts = new Map<string, number>();
  const mine = new Set<string>();
  const { data, error } = await sb.rpc("vote_counts");
  if (error) throw error;
  for (const row of (data ?? []) as { area_id: string; votes: number }[]) counts.set(row.area_id, Number(row.votes));

  const { data: session } = await sb.auth.getSession();
  if (session.session) {
    const { data: own } = await sb.from("area_votes").select("area_id");
    for (const row of own ?? []) mine.add(row.area_id);
  }
  return { counts, mine };
}

export async function setVote(areaId: string, on: boolean) {
  await ensureVoter();
  if (on) {
    const { error } = await sb.from("area_votes").insert({ area_id: areaId });
    if (error && error.code !== "23505") throw error; // Already voted, e.g. in another tab
  } else {
    const { error } = await sb.from("area_votes").delete().eq("area_id", areaId);
    if (error) throw error;
  }
}
