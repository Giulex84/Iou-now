"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type IOU = {
  id: string;
  title: string;
  amount: number;
  currency: string;
  debtor: string;
};

type StoreState = {
  currency: string;
  setCurrency: (c: string) => void;
  ious: IOU[];
  setIous: (list: IOU[]) => void;
  deleteIou: (id: string) => void;
};

export const useIOUStore = create<StoreState>()(
  persist(
    (set) => ({
      currency: "π Pi",
      setCurrency: (c) => set({ currency: c }),

      ious: [],
      setIous: (list) => set({ ious: list }),

      deleteIou: (id) =>
        set((state) => ({
          ious: state.ious.filter((iou) => iou.id !== id),
        })),
    }),

    {
      name: "iou-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      skipHydration: true, // <— evita errori SSR
    }
  )
);
