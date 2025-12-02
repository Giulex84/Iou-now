import { supabase } from "./supabase";

export async function getIous() {
  const { data } = await supabase.from("ious").select("*").order("created_at", { ascending: false });
  return data || [];
}

export async function addIou(iou: { person: string; amount: number; type: "owes_me" | "i_owe" }) {
  await supabase.from("ious").insert(iou);
}

export async function deleteIou(id: string) {
  await supabase.from("ious").delete().eq("id", id);
}

export async function getIousSummary() {
  const items = await getIous();

  let owedToMe = 0;
  let iOwe = 0;

  for (const i of items) {
    if (i.type === "owes_me") owedToMe += i.amount;
    else iOwe += i.amount;
  }

  return { owedToMe, iOwe };
}
