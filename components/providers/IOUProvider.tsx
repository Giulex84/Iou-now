"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface IOU {
  id: string;
  amount: number;
  description: string;
}

interface IOUContextType {
  ious: IOU[];
  addIOU: (iou: Omit<IOU, "id">) => void;
}

const IOUContext = createContext<IOUContextType | undefined>(undefined);

export const useIOUs = (): IOUContextType => {
  const context = useContext(IOUContext);
  if (!context) {
    throw new Error("useIOUs deve essere usato dentro IOUProvider");
  }
  return context;
};

export function IOUProvider({ children }: { children: ReactNode }) {
  const [ious, setIous] = useState<IOU[]>([]);

  const addIOU = (iou: Omit<IOU, "id">) => {
    const newIOU: IOU = { ...iou, id: Date.now().toString() };
    setIous((prev) => [...prev, newIOU]);
  };

  return (
    <IOUContext.Provider value={{ ious, addIOU }}>
      {children}
    </IOUContext.Provider>
  );
}
