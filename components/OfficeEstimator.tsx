"use client";

import { useState } from "react";
import { fmt } from "@/lib/format";

const MONTHLY_HT = 700;

/** Simple budget estimate for the private offices: months x monthly price, excl. VAT. */
export default function OfficeEstimator() {
  const [months, setMonths] = useState(6);
  return (
    <div className="rounded-3xl bg-navy-900 p-6 text-white sm:p-10">
      <h3 className="text-2xl font-bold tracking-tight">Estimez votre budget bureaux</h3>
      <p className="mt-2 max-w-md text-sm text-navy-200">
        Choisissez une durée pour voir le montant HT correspondant à {fmt(MONTHLY_HT)} DT par mois.
      </p>
      <div className="mt-8 grid items-center gap-8 sm:grid-cols-[1fr_auto]">
        <div>
          <label htmlFor="months" className="flex justify-between text-sm font-semibold">
            <span>Durée</span>
            <span>{months} mois</span>
          </label>
          <input
            id="months"
            type="range"
            min={1}
            max={12}
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="mt-4 w-full accent-crimson-400"
          />
        </div>
        <p className="sm:text-right" aria-live="polite">
          <span className="block text-4xl font-extrabold text-crimson-400">{fmt(MONTHLY_HT * months)} DT</span>
          <span className="text-sm text-navy-200">HT au total</span>
        </p>
      </div>
    </div>
  );
}
