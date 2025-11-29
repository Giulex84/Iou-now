"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

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

// ✅ Hook che prima NON era esportato
export const useIOUs = (): IOUContextType => {
  const context = useContext(IOUContext);
  if (!context) {
    throw new Error("useIOUs deve essere usato dentro IOUProvider");
  }
  return context;
};

export default function IOUProvider({ children }: { children: ReactNode }) {
  const [ious, setIous] = useState<IOU[]>([]);

  const addIOU = (iou: Omit<IOU, "id">) => {
    setIous((prev) => [
      ...prev,
      { ...iou, id: Date.now().toString() },
    ]);
  };

  return (
    <IOUContext.Provider value={{ ious, addIOU }}>
      {children}
    </IOUContext.Provider>
  );
}
