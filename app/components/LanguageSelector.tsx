"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector({ className = "" }: { className?: string }) {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <div
      className={`flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 ${className}`}
    >
      <Globe size={14} className="text-teal-700 shrink-0" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as any)}
        className="bg-transparent text-slate-700 outline-none cursor-pointer text-xs font-medium"
        aria-label="Select Language"
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
