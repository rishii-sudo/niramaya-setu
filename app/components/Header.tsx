
"use client";

import { Bell, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-5 lg:px-7">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white">
            <Activity size={19} />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900">
              NIRAMAYA-SETU
            </p>

            <p className="text-[10px] text-slate-500">
              ASHA / ANM Field Work
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Online */}
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-emerald-700">
              Online
            </span>
          </div>

          {/* Notification */}
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Notifications"
          >
            <Bell size={19} />
          </button>

          {/* Profile */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
            A
          </div>
        </div>
      </div>
    </header>
  );
}