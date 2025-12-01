"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface IOU {
  id: string;
  name: string;
  amount: number;
  date: string;
  paid: boolean;
  type: string;
  category: string;
  currency: string;
  description?: string;
}

interface IOUContextType {
  ious: IOU[];
  addIOU: (iou: Omit<IOU, "id">) => void;
}

const IOUContext = createContext<IOUContextType | undefined>(undefined);

export const useIOUS = () => {
  const ctx = useContext(IOUContext);
  if (!ctx) throw new Error("useIOUS deve essere usato dentro IOUProvider");
  return ctx;
};

export default function IOUProvider({ children }: { children: ReactNode }) {
  const [ious, setIous] = useState<IOU[]>([]);

  // 🔥 Carica IOUs da localStorage:
  useEffect(() => {
    const saved = localStorage.getItem("ious");
    if (saved) {
      try {
        setIous(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // 🔥 Salva ogni modifica
  useEffect(() => {
    localStorage.setItem("ious", JSON.stringify(ious));
  }, [ious]);

  const addIOU = (iou: Omit<IOU, "id">) => {
    const newIOU: IOU = {
      ...iou,
      id: Date.now().toString(),
    };
    setIous((prev) => [...prev, newIOU]);
  };

  return (
    <IOUContext.Provider value={{ ious, addIOU }}>
      {children}
    </IOUContext.Provider>
  );
}
