"use client";

import { useState } from "react";
import { useIOUs } from "@/components/iou-context";
import IOUCard from "@/components/iou-card";
import type { IOUCurrency } from "@/lib/types";
import StartPaymentButton from "@/components/StartPaymentButton";

type CurrencyFilter = IOUCurrency | "ALL";

export default function Home() {
  const { ious } = useIOUs();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [currencyFilter, setCurrencyFilter] =
    useState<CurrencyFilter>("ALL");

  const active = ious.filter((i) => !i.paid);

  const categories = Array.from(
    new Set(active.map((i) => i.category))
  ).filter(Boolean);

  const filteredActive = active.filter((iou) => {
    const matchesSearch =
      iou.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || iou.category === categoryFilter;
    const matchesCurrency =
      currencyFilter === "ALL" || iou.currency === currencyFilter;

    return matchesSearch && matchesCategory && matchesCurrency;
  });

  const totalCount = filteredActive.length;

  const currencySymbol = (cur: IOUCurrency | "ALL") => {
    if (cur === "ALL") return "₽/$/₱/€";
    switch (cur) {
      case "USD":
        return "$";
      case "PI":
        return "₱";
      case "EUR":
        return "€";
      default:
        return "₽";
    }
  };

  return (
    <div className="space-y-6">
      <div className="w-full flex justify-center mt-4">
        <
