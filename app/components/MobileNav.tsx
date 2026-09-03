"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const operationsNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "⌂",
  },
  {
    label: "Patients",
    href: "/patients",
    icon: "◉",
  },
  {
    label: "Referrals",
    href: "/referrals",
    icon: "↗",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: "!",
  },
];

const facilityNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/facility/dashboard",
    icon: "⌂",
  },
  {
    label: "Referrals",
    href: "/facility/incoming-referrals",
    icon: "↗",
  },
  {
    label: "Admissions",
    href: "/facility/admissions",
    icon: "▣",
  },
  {
    label: "Capacity",
    href: "/facility/capacity",
    icon: "▤",
  },
];

const doctorNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/doctor",
    icon: "⌂",
  },
  {
    label: "Referrals",
    href: "/doctor/referrals",
    icon: "↗",
  },
  {
    label: "Patients",
    href: "/patients",
    icon: "◉",
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: "!",
  },
];

const ashaNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/asha",
    icon: "⌂",
  },
  {
    label: "Visits",
    href: "/asha/visits",
    icon: "◉",
  },
  {
    label: "Follow-ups",
    href: "/asha/follow-ups",
    icon: "✓",
  },
  {
    label: "Sync",
    href: "/sync",
    icon: "↻",
  },
];

function getRole(
  pathname: string
): "facility" | "doctor" | "asha" | "operations" {
  if (pathname.startsWith("/facility")) {
    return "facility";
  }

  if (pathname.startsWith("/doctor")) {
    return "doctor";
  }

  if (pathname.startsWith("/asha")) {
    return "asha";
  }

  return "operations";
}

function getNavItems(pathname: string) {
  const role = getRole(pathname);

  if (role === "facility") {
    return facilityNav;
  }

  if (role === "doctor") {
    return doctorNav;
  }

  if (role === "asha") {
    return ashaNav;
  }

  return operationsNav;
}

function isItemActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  if (href === "/patients") {
    return (
      pathname === "/patients" ||
      pathname.startsWith("/patients/")
    );
  }

  if (href === "/referrals") {
    return (
      pathname === "/referrals" ||
      pathname.startsWith("/referrals/")
    );
  }

  if (href === "/facility/dashboard") {
    return pathname === "/facility/dashboard";
  }

  if (href === "/facility/incoming-referrals") {
    return (
      pathname === "/facility/incoming-referrals" ||
      pathname.startsWith("/facility/incoming-referrals/")
    );
  }

  if (href === "/doctor") {
    return pathname === "/doctor";
  }

  if (href === "/doctor/referrals") {
    return (
      pathname === "/doctor/referrals" ||
      pathname.startsWith("/doctor/referrals/")
    );
  }

  if (href === "/asha") {
    return pathname === "/asha";
  }

  if (href === "/asha/visits") {
    return (
      pathname === "/asha/visits" ||
      pathname.startsWith("/asha/visits/")
    );
  }

  if (href === "/asha/follow-ups") {
    return (
      pathname === "/asha/follow-ups" ||
      pathname.startsWith("/asha/follow-ups/")
    );
  }

  return pathname === href;
}

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const role = getRole(pathname);
  const navItems = getNavItems(pathname);

  const roleName =
    role === "facility"
      ? "Facility"
      : role === "doctor"
        ? "Doctor"
        : role === "asha"
          ? "ASHA"
          : "Operations";

  const roleBadgeClass =
    role === "facility"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : role === "doctor"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : role === "asha"
          ? "bg-violet-50 text-violet-700 border-violet-200"
          : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <Link
            href={
              role === "facility"
                ? "/facility/dashboard"
                : role === "doctor"
                  ? "/doctor"
                  : role === "asha"
                    ? "/asha"
                    : "/"
            }
            className="flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
              NS
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                NIRAMAYA-SETU
              </p>

              <span
                className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-semibold ${roleBadgeClass}`}
              >
                {roleName}
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-slate-700 shadow-sm"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 pb-4">
            <nav className="grid grid-cols-2 gap-2 pt-3">
              {navItems.map((item) => {
                const active = isItemActive(
                  pathname,
                  item.href
                );

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 text-sm">
                      {item.icon}
                    </span>

                    <span className="text-xs font-semibold">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Role shortcuts */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Quick Access
              </p>

              <div className="mt-2 grid grid-cols-2 gap-2">
                {role === "facility" && (
                  <>
                    <Link
                      href="/facility/specialists"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Specialists
                    </Link>

                    <Link
                      href="/facility/diagnostics"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Diagnostics
                    </Link>

                    <Link
                      href="/facility/medicines"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Medicines
                    </Link>

                    <Link
                      href="/facility/discharge"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Discharge
                    </Link>

                    <Link
                      href="/facility/audit"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Audit Trail
                    </Link>

                    <Link
                      href="/consent"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Consent
                    </Link>
                  </>
                )}

                {role === "doctor" && (
                  <>
                    <Link
                      href="/patients"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Patients
                    </Link>

                    <Link
                      href="/notifications"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Alerts
                    </Link>
                  </>
                )}

                {role === "asha" && (
                  <>
                    <Link
                      href="/asha/follow-ups"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Follow-ups
                    </Link>

                    <Link
                      href="/sync"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Sync Center
                    </Link>
                  </>
                )}

                {role === "operations" && (
                  <>
                    <Link
                      href="/facilities"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Facilities
                    </Link>

                    <Link
                      href="/sync"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-white px-3 py-2.5 text-center text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      Sync
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {navItems.map((item) => {
            const active = isItemActive(
              pathname,
              item.href
            );

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center rounded-xl px-2 py-2 transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <span className="text-base leading-none">
                  {item.icon}
                </span>

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