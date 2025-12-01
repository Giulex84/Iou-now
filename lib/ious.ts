// lib/ious.ts
import { supabase } from "./supabase";

export async function getIOUS() {
  const { data, error } = await supabase
    .from("ious")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addIOU(iou) {
  const { data, error } = await supabase.from("ious").insert(iou);
  if (error) throw error;
  return data;
}

export async function deleteIOU(id: string) {
  const { error } = await supabase.from("ious").delete().eq("id", id);
  if (error) throw error;
}
