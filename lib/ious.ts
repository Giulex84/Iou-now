import { supabase } from "./supabase";
import type { IOU } from "./types";

export async function getIous(): Promise<IOU[]> {
  const { data, error } = await supabase
    .from("ious")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading IOUs", error);
    throw new Error(error.message);
  }

  return (data ?? []) as IOU[];
}

export async function addIou(input: {
  title: string;
  amount: number;
  debtor: string;
  date: string;
  paid: boolean;
}): Promise<IOU> {
  const { data, error } = await supabase
    .from("ious")
    .insert({
      title: input.title,
      amount: input.amount,
      debtor: input.debtor,
      date: input.date,
      paid: input.paid,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error creating IOU", error);
    throw new Error(error.message);
  }

  return data as IOU;
}

export async function deleteIou(id: string): Promise<void> {
  const { error } = await supabase.from("ious").delete().eq("id", id);

  if (error) {
    console.error("Error deleting IOU", error);
    throw new Error(error.message);
  }
}
