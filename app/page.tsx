"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useIOUS } from "@/components/providers/IOUProvider";

type FilterMode = "all" | "active" | "paid";

export default function HomePage() {
  const { ious, loading, error } = useIOUS();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterMode>("active");

  const {
    totalActive,
    totalCount,
    activeCount,
    paidCount,
    filteredIous,
    totalOwedToMe,
  } = useMemo(() => {
    const active = ious.filter((i) => !i.paid);
    const paid = ious.filter((i) => i.paid);

    const byFilter =
      filter === "all"
        ? ious
        : filter === "active"
        ? active
        : paid;

    const bySearch = byFilter.filter((iou) => {
      const q = search.toLowerCase().trim();
      if (!q) return true;
      return (
        iou.title.toLowerCase().includes(q) ||
        iou.debtor.toLowerCase().includes(q)
      );
    });

    const sum = (items: typeof ious) =>
      items.reduce((acc, i) => acc + Number(i.amount || 0), 0);

    return {
      totalActive: sum(active),
      totalOwedToMe: sum(active), // per ora tutto è "deve a me"
      totalCount: ious.length,
      activeCount: active.length,
      paidCount: paid.length,
      filteredIous: bySearch,
    };
  }, [ious, filter, search]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 pb-10 pt-10">
        {/* HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            IOU Ledger Pro
          </h1>
          <p className="text-sm text-slate-400">
            Traccia chi ti deve cosa, in qualsiasi valuta.
          </p>
        </header>

        {/* AZIONI PRINCIPALI */}
        <section className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/add"
            className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold shadow-md shadow-blue-900/40 transition hover:bg-blue-500"
          >
            + Aggiungi IOU
          </Link>
          <Link
            href="/history"
            className="flex-1 rounded-xl bg-slate-800 px-4 py-3 text-center text-sm font-semibold text-slate-100 shadow-md shadow-black/40 transition hover:bg-slate-700"
          >
            📄 Storico IOU
          </Link>
        </section>

        {/* RICERCA & FILTRI */}
        <section className="space-y-3 rounded-2xl bg-slate-900/60 p-4 ring-1 ring-slate-800">
          <div className="relative">
            <input
              type="text"
              placeholder="Cerca per titolo o debitore…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 pr-9 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-500">
              🔎
            </span>
          </div>

          <div className="flex gap-2 text-xs font-medium">
            <FilterChip
              label="Attivi"
              active={filter === "active"}
              onClick={() => setFilter("active")}
            />
            <FilterChip
              label="Tutti"
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            <FilterChip
              label="Pagati"
              active={filter === "paid"}
              onClick={() => setFilter("paid")}
            />
          </div>
        </section>

        {/* STATISTICHE */}
        <section className="grid gap-4 sm:grid-cols-2">
          {/* Owed to me */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/90 to-emerald-400 text-emerald-950 shadow-lg shadow-emerald-900/50">
            <div className="flex flex-col gap-1 p-4">
              <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                Owed to Me
              </span>
              <span className="text-2xl font-bold">
                € {totalOwedToMe.toFixed(2)}
              </span>
              <span className="text-xs opacity-80">
                {activeCount} IOU attivi
              </span>
            </div>
          </div>

          {/* I Owe (per ora sempre 0, in futuro potremo usare la direzione) */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-400 to-amber-300 text-amber-950 shadow-lg shadow-amber-900/40">
            <div className="flex flex-col gap-1 p-4">
              <span className="text-xs font-semibold uppercase tracking-wide opacity-80">
                I Owe
              </span>
              <span className="text-2xl font-bold">€ 0.00</span>
              <span className="text-xs opacity-80">0 IOU attivi</span>
            </div>
          </div>
        </section>

        {/* INFO RIASSUNTIVE */}
        <section className="rounded-2xl bg-slate-900/70 p-4 text-xs text-slate-300 ring-1 ring-slate-800">
          <div className="flex flex-wrap gap-3">
            <span>
              Totale IOU:{" "}
              <span className="font-semibold text-slate-100">
                {totalCount}
              </span>
            </span>
            <span>
              Attivi:{" "}
              <span className="font-semibold text-emerald-300">
                {activeCount}
              </span>
            </span>
            <span>
              Pagati:{" "}
              <span className="font-semibold text-slate-300">
                {paidCount}
              </span>
            </span>
            <span>
              Somma attiva:{" "}
              <span className="font-semibold text-emerald-300">
                € {totalActive.toFixed(2)}
              </span>
            </span>
          </div>
        </section>

        {/* ERROR / LOADING */}
        {error && (
          <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-300">
            Errore nel caricamento dei dati: {error}
          </div>
        )}

        {/* LISTA IOU */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-200">
            {filter === "paid" ? "IOU pagati" : "Active IOUs"}
          </h2>

          {loading && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-6 text-center text-xs text-slate-400">
              Caricamento IOU in corso…
            </div>
          )}

          {!loading && filteredIous.length === 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-6 text-center text-xs text-slate-400">
              Nessun IOU trovato. Prova a cambiare filtro o aggiungerne uno
              nuovo.
            </div>
          )}

          <ul className="space-y-3">
            {filteredIous.map((iou) => {
              const date = iou.date
                ? new Date(iou.date)
                : iou.created_at
                ? new Date(iou.created_at)
                : null;

              const dateLabel = date
                ? date.toLocaleDateString("it-IT")
                : "-";

              return (
                <li
                  key={iou.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-slate-900/80 p-4 ring-1 ring-slate-800"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-100">
                      {iou.title}
                    </div>
                    <div className="text-xs text-slate-400">
                      Debitore:{" "}
                      <span className="font-medium text-slate-200">
                        {iou.debtor}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {dateLabel}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-slate-50">
                      € {Number(iou.amount).toFixed(2)}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        iou.paid
                          ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40"
                          : "bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/40"
                      }`}
                    >
                      {iou.paid ? "Pagato" : "Da pagare"}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-full px-3 py-1 text-center transition ${
        active
          ? "bg-slate-100 text-slate-900"
          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );
}
