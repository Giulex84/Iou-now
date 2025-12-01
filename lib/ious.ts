import { supabase } from "./supabase";
import type { IOU } from "./types";

// ------------------------------
// CREATE IOU
// ------------------------------
export async function addIou(iou: IOU) {
  const { data, error } = await supabase
    .from("ious")
    .insert(iou)
    .select()
    .single();

  if (error) {
    console.error("Errore Supabase (addIou):", error.message);
    throw error;
  }

  return data;
}

// ------------------------------
// GET ALL IOU
// ------------------------------
export async function getIous() {
  const { data, error } = await supabase
    .from("ious")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Errore Supabase (getIous):", error.message);
    throw error;
  }

  return data;
}

// ------------------------------
// UPDATE IOU
// ------------------------------
export async function updateIou(id: string, updates: Partial<IOU>) {
  const { data, error } = await supabase
    .from("ious")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Errore Supabase (updateIou):", error.message);
    throw error;
  }

  return data;
}

// ------------------------------
// DELETE IOU
// ------------------------------
export async function deleteIou(id: string) {
  const { error } = await supabase
    .from("ious")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Errore Supabase (deleteIou):", error.message);
    throw error;
  }

  return true;
}
