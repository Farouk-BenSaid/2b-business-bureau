"use client";

import { useState } from "react";
import { FAQ, FAQ_CATEGORIES, type FaqCategory } from "@/lib/data";
import AccordionItem from "./AccordionItem";

export default function FaqList() {
  const [category, setCategory] = useState<FaqCategory>("legal");
  const [openId, setOpenId] = useState<string | null>(null);

  const select = (id: FaqCategory) => {
    setCategory(id);
    setOpenId(null);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
      <div role="group" aria-label="Thèmes" className="flex flex-wrap gap-2 lg:flex-col">
        {FAQ_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={category === c.id}
            onClick={() => select(c.id)}
            className={`rounded-xl px-5 py-3 text-left text-sm font-semibold transition-colors ${
              category === c.id ? "bg-navy-900 text-white" : "bg-slate-100 text-navy-900 hover:bg-slate-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* key remounts the list on topic change so every panel starts closed */}
      <div key={category} className="border-t border-slate-200">
        {FAQ.filter((f) => f.category === category).map((f) => (
          <AccordionItem
            key={f.id}
            id={f.id}
            question={f.q}
            answer={f.a}
            open={openId === f.id}
            onToggle={() => setOpenId(openId === f.id ? null : f.id)}
          />
        ))}
      </div>
    </div>
  );
}
