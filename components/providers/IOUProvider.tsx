"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export interface IOU {
  id: string;
  name: string;
  amount: number;
  date: string;
  paid: boolean;
  type: "owed" | "owing";
  category: string;
  currency: "EUR" | "USD" | "PI";
}

interface IOUContextType {
  ious: IOU[];
  addIOU: (iou: Omit<IOU, "id">) => void;
  togglePaid: (id: string) => void;
}

const IOUContext = createContext<IOUContextType | undefined>(undefined);

export const useIOUS = (): IOUContextType => {
  const ctx = useContext(IOUContext);
  if (!ctx) throw new Error("useIOUS must be used inside IOUProvider");
  return ctx;
};

export default function IOUProvider({ children }: { children: ReactNode }) {
  const [ious, setIous] = useState<IOU[]>([]);

  const addIOU = (iou: Omit<IOU, "id">) => {
    setIous((prev) => [
      ...prev,
      { ...iou, id: Date.now().toString() },
    ]);
  };

  const togglePaid = (id: string) => {
    setIous((prev) =>
      prev.map((iou) =>
        iou.id === id ? { ...iou, paid: !iou.paid } : iou
      )
    );
  };

  return (
    <IOUContext.Provider value={{ ious, addIOU, togglePaid }}>
      {children}
    </IOUContext.Provider>
  );
}
