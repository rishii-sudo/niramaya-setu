"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Activity, Globe, LogOut } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { useLanguage } from "../context/LanguageContext";
import { logoutUser } from "../utils/auth";

export default function Header() {
  const router = useRouter();
  const { activeRole, roleDisplayName, roleSubtitle, roleDashboardPath } = useRole();
  const { language, setLanguage, availableLanguages } = useLanguage();

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
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Active Context */}
        <Link href={roleDashboardPath} className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm font-bold text-xs">
            <Activity size={19} />
          </div>

          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900">
              NIRAMAYA-SETU
            </p>
            <p className="text-[10px] font-semibold text-teal-800">
              {roleSubtitle}
            </p>
          </div>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold">
            <Globe size={13} className="text-teal-700" />
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
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-xs font-bold text-teal-800">
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