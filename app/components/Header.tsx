"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Activity, LogOut } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { logoutUser } from "../utils/auth";
import LanguageSelector from "./LanguageSelector";

export default function Header() {
  const router = useRouter();
  const { activeRole, roleDisplayName, roleSubtitle, roleDashboardPath } = useRole();

  const handleLogout = () => {
    if (confirm("Sign out of current session?")) {
      const target = logoutUser(activeRole);
      router.push(target);
    }
  };

  const getAvatarLetter = () => {
    switch (activeRole) {
      case "asha":
        return "A";
      case "doctor":
        return "D";
      case "facility":
        return "F";
      case "admin":
        return "HQ";
      default:
        return "NS";
    }
  };

  return (
    <header className="hidden md:block sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Active Context */}
        <Link href={roleDashboardPath} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm font-bold text-xs">
            <Activity size={19} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">
              NIRAMAYA-SETU
            </span>
            <span className="text-slate-300">|</span>
            <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800 border border-teal-200">
              {roleSubtitle}
            </span>
          </div>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Online Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-emerald-700">
              Online
            </span>
          </div>

          {/* Notification */}
          <Link
            href="/notifications"
            className="relative rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 border border-slate-200"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-500" />
          </Link>

          {/* Profile Avatar */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-xs font-bold text-teal-800"
            title={roleDisplayName}
          >
            {getAvatarLetter()}
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}