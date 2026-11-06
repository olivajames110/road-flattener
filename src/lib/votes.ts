import { ensureVisitor, sb } from "./supabase";

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
  await ensureVisitor();
  if (on) {
    const { error } = await sb.from("area_votes").insert({ area_id: areaId });
    if (error && error.code !== "23505") throw error; // Already voted, e.g. in another tab
  } else {
    const { error } = await sb.from("area_votes").delete().eq("area_id", areaId);
    if (error) throw error;
  }
}
