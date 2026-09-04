"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  RefreshCw,
  LogOut,
  Globe,
  Stethoscope,
  Building2,
  Calendar,
  ClipboardCheck,
  Hospital,
  BedDouble,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { useRole, Role } from "../context/RoleContext";
import { useLanguage } from "../context/LanguageContext";
import { logoutUser } from "../utils/auth";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const ashaNav: NavItem[] = [
  { label: "Dashboard", href: "/asha", icon: <LayoutDashboard size={16} /> },
  { label: "Visits", href: "/asha/visits", icon: <ClipboardCheck size={16} /> },
  { label: "Follow-ups", href: "/asha/follow-ups", icon: <Calendar size={16} /> },
  { label: "Sync", href: "/sync", icon: <RefreshCw size={16} /> },
];

const doctorNav: NavItem[] = [
  { label: "Dashboard", href: "/doctor", icon: <LayoutDashboard size={16} /> },
  { label: "Appointments", href: "/doctor/appointments", icon: <Calendar size={16} /> },
  { label: "Patients", href: "/patients", icon: <Users size={16} /> },
  { label: "Referrals", href: "/doctor/referrals", icon: <FileText size={16} /> },
];

const facilityNav: NavItem[] = [
  { label: "Dashboard", href: "/facility/dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "Referrals", href: "/facility/incoming-referrals", icon: <FileText size={16} /> },
  { label: "Admissions", href: "/facility/admissions", icon: <Hospital size={16} /> },
  { label: "Capacity", href: "/facility/capacity", icon: <BedDouble size={16} /> },
];

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "Facilities", href: "/facilities", icon: <Building2 size={16} /> },
  { label: "Users", href: "/admin/users", icon: <Users size={16} /> },
  { label: "Alerts", href: "/notifications", icon: <Bell size={16} /> },
];

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { activeRole, roleDisplayName, roleDashboardPath } = useRole();
  const { language, setLanguage, availableLanguages } = useLanguage();

  const handleLogout = () => {
    if (confirm("Sign out of current workspace?")) {
      const target = logoutUser(activeRole);
      router.push(target);
    }
  };

  const getNavItems = (): NavItem[] => {
    switch (activeRole) {
      case "asha":
        return ashaNav;
      case "doctor":
        return doctorNav;
      case "facility":
        return facilityNav;
      case "admin":
      default:
        return adminNav;
    }
  };

  const navItems = getNavItems();

  const isItemActive = (href: string) => {
    if (href === roleDashboardPath) return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href={roleDashboardPath}
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-sm font-bold text-white">
              NS
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">NIRAMAYA-SETU</p>
              <span className="inline-flex rounded-full bg-teal-50 px-2 py-0.2 text-[9px] font-bold text-teal-800 border border-teal-200">
                {roleDisplayName}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg font-bold text-slate-700 shadow-sm"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 pb-5 space-y-4">
            <nav className="grid grid-cols-2 gap-2 pt-3">
              {navItems.map((item) => {
                const active = isItemActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 transition ${
                      active
                        ? "border-teal-700 bg-teal-50 text-teal-900 font-bold"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-teal-700">{item.icon}</span>
                    <span className="text-xs">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Language & Actions */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Globe size={14} className="text-teal-700" />
                  Language
                </span>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs outline-none"
                >
                  {availableLanguages.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeLabel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <Link
                  href="/notifications"
                  onClick={() => setOpen(false)}
                  className="text-xs font-semibold text-slate-700 hover:text-teal-700 flex items-center gap-1.5"
                >
                  <Bell size={14} /> Alerts
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur md:hidden shadow-lg">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {navItems.map((item) => {
            const active = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center rounded-xl px-2 py-2 transition ${
                  active
                    ? "bg-teal-700 text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="mt-1 max-w-full truncate text-[10px] font-semibold">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}