// lib/store.ts
import { create } from "zustand";
import { supabase } from "./supabase";

export type IOU = {
  id: string;
  title: string;
  amount: number;
  debtor: string;
  created_at: string;
};

type State = {
  ious: IOU[];
  fetchIOUs: () => Promise<void>;
  addIOU: (iou: Omit<IOU, "id" | "created_at">) => Promise<void>;
  deleteIOU: (id: string) => Promise<void>;
};

export const useIOUStore = create<State>((set, get) => ({
  ious: [],

  fetchIOUs: async () => {
    const { data } = await supabase
      .from("ious")
      .select("*")
      .order("created_at", { ascending: false });

    set({ ious: data || [] });
  },

  addIOU: async (iou) => {
    const { data } = await supabase
      .from("ious")
      .insert(iou)
      .select()
      .single();

    set({ ious: [data, ...get().ious] });
  },

  deleteIOU: async (id) => {
    await supabase.from("ious").delete().eq("id", id);
    set({ ious: get().ious.filter((x) => x.id !== id) });
  },
}));
