"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  BarChart3,
  BedDouble,
  Building2,
  CalendarCheck,
  ClipboardCheck,
  FileCheck2,
  FileClock,
  FileText,
  FlaskConical,
  Hospital,
  LayoutDashboard,
  Pill,
  RefreshCw,
  Settings,
  ShieldCheck,
  Stethoscope,
  UserCog,
  UserRound,
  Users,
} from "lucide-react";

type Role = "asha" | "doctor" | "facility" | "admin" | "operations";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

function getRole(pathname: string): Role {
  if (pathname === "/asha" || pathname.startsWith("/asha/")) {
    return "asha";
  }

  if (pathname === "/doctor" || pathname.startsWith("/doctor/")) {
    return "doctor";
  }

  if (
    pathname === "/facility" ||
    pathname.startsWith("/facility/")
  ) {
    return "facility";
  }

  if (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/dashboard"
  ) {
    return "admin";
  }

  return "operations";
}

function getRoleConfig(role: Role) {
  switch (role) {
    /* =========================================================
       ASHA / ANM
    ========================================================= */

    case "asha":
      return {
        subtitle: "ASHA / ANM Field Work",

        sections: [
          {
            title: "Field Work",
            items: [
              {
                label: "Dashboard",
                href: "/asha",
                icon: <LayoutDashboard size={18} />,
              },
              {
                label: "Record Visit",
                href: "/asha/visits",
                icon: <ClipboardCheck size={18} />,
              },
              {
                label: "Patients",
                href: "/patients",
                icon: <Users size={18} />,
              },
              {
                label: "Register Patient",
                href: "/patients/register",
                icon: <UserRound size={18} />,
              },
            ],
          },

          {
            title: "Referral",
            items: [
              {
                label: "Referrals",
                href: "/referrals",
                icon: <FileText size={18} />,
              },
              {
                label: "Create Referral",
                href: "/referrals/create",
                icon: <FileCheck2 size={18} />,
              },
              {
                label: "Follow-ups",
                href: "/asha/follow-ups",
                icon: <CalendarCheck size={18} />,
                badge: "7",
              },
            ],
          },

          {
            title: "Offline",
            items: [
              {
                label: "Sync Center",
                href: "/sync",
                icon: <RefreshCw size={18} />,
              },
              {
                label: "Offline Queue",
                href: "/sync",
                icon: <FileClock size={18} />,
              },
            ],
          },

          {
            title: "Security",
            items: [
              {
                label: "Consent",
                href: "/consent",
                icon: <ShieldCheck size={18} />,
              },
              {
                label: "Notifications",
                href: "/notifications",
                icon: <Bell size={18} />,
                badge: "4",
              },
            ],
          },
        ],
      };

    /* =========================================================
       DOCTOR
    ========================================================= */

    case "doctor":
      return {
        subtitle: "Clinical Workspace",

        sections: [
          {
            title: "Main",
            items: [
              {
                label: "Dashboard",
                href: "/doctor",
                icon: <LayoutDashboard size={18} />,
              },
              {
                label: "Patients",
                href: "/patients",
                icon: <Users size={18} />,
              },
              {
                label: "Referrals",
                href: "/doctor/referrals",
                icon: <FileText size={18} />,
              },
            ],
          },

          {
            title: "Clinical",
            items: [
              {
                label: "Medical Records",
                href: "/patients",
                icon: <FileText size={18} />,
              },
              {
                label: "Treatment Queue",
                href: "/doctor",
                icon: <Activity size={18} />,
              },
              {
                label: "Discharge",
                href: "/facility/discharge",
                icon: <FileCheck2 size={18} />,
              },
            ],
          },

          {
            title: "Security",
            items: [
              {
                label: "Consent",
                href: "/consent",
                icon: <ShieldCheck size={18} />,
              },
              {
                label: "Notifications",
                href: "/notifications",
                icon: <Bell size={18} />,
                badge: "4",
              },
            ],
          },
        ],
      };

    /* =========================================================
       FACILITY
    ========================================================= */

    case "facility":
      return {
        subtitle: "Facility Operations",

        sections: [
          {
            title: "Facility",
            items: [
              {
                label: "Dashboard",
                href: "/facility/dashboard",
                icon: <LayoutDashboard size={18} />,
              },
              {
                label: "Incoming Referrals",
                href: "/referrals",
                icon: <FileText size={18} />,
              },
              {
                label: "Patients",
                href: "/patients",
                icon: <Users size={18} />,
              },
              {
                label: "Admissions",
                href: "/facility/admissions",
                icon: <Hospital size={18} />,
              },
            ],
          },

          {
            title: "Capacity",
            items: [
              {
                label: "Beds & Capacity",
                href: "/facility/capacity",
                icon: <BedDouble size={18} />,
              },
              {
                label: "Doctors & Specialists",
                href: "/facility/specialists",
                icon: <Stethoscope size={18} />,
              },
              {
                label: "Labs & Diagnostics",
                href: "/facility/diagnostics",
                icon: <FlaskConical size={18} />,
              },
              {
                label: "Medicine Stock",
                href: "/facility/medicines",
                icon: <Pill size={18} />,
              },
            ],
          },

          {
            title: "Clinical",
            items: [
              {
                label: "Treatment Queue",
                href: "/doctor",
                icon: <Activity size={18} />,
              },
              {
                label: "Discharge Queue",
                href: "/facility/discharge",
                icon: <ClipboardCheck size={18} />,
              },
              {
                label: "Alerts",
                href: "/notifications",
                icon: <Bell size={18} />,
                badge: "4",
              },
            ],
          },

          {
            title: "Security",
            items: [
              {
                label: "Consent",
                href: "/consent",
                icon: <ShieldCheck size={18} />,
              },
              {
                label: "Audit Trail",
                href: "/facility/audit",
                icon: <FileCheck2 size={18} />,
              },
            ],
          },
        ],
      };

    /* =========================================================
       ADMIN
    ========================================================= */

    case "admin":
      return {
        subtitle: "Administration",

        sections: [
          {
            title: "Overview",
            items: [
              {
                label: "Dashboard",
                href: "/dashboard",
                icon: <LayoutDashboard size={18} />,
              },
              {
                label: "Analytics",
                href: "/dashboard",
                icon: <BarChart3 size={18} />,
              },
            ],
          },

          {
            title: "Operations",
            items: [
              {
                label: "Facilities",
                href: "/facilities",
                icon: <Building2 size={18} />,
              },
              {
                label: "Patients",
                href: "/patients",
                icon: <Users size={18} />,
              },
              {
                label: "Referrals",
                href: "/referrals",
                icon: <FileText size={18} />,
              },
              {
                label: "Alerts",
                href: "/notifications",
                icon: <Bell size={18} />,
                badge: "4",
              },
            ],
          },

          {
            title: "Security",
            items: [
              {
                label: "Users & Roles",
                href: "/admin/users",
                icon: <UserCog size={18} />,
              },
              {
                label: "Consent",
                href: "/consent",
                icon: <ShieldCheck size={18} />,
              },
              {
                label: "Audit Logs",
                href: "/admin/audit",
                icon: <FileCheck2 size={18} />,
              },
              {
                label: "System Settings",
                href: "/admin/settings",
                icon: <Settings size={18} />,
              },
            ],
          },
        ],
      };

    /* =========================================================
       OPERATIONS
    ========================================================= */

    default:
      return {
        subtitle: "Care Coordination",

        sections: [
          {
            title: "Main",
            items: [
              {
                label: "Dashboard",
                href: "/dashboard",
                icon: <LayoutDashboard size={18} />,
              },
              {
                label: "Patients",
                href: "/patients",
                icon: <Users size={18} />,
              },
              {
                label: "Referrals",
                href: "/referrals",
                icon: <FileText size={18} />,
              },
              {
                label: "Facilities",
                href: "/facilities",
                icon: <Building2 size={18} />,
              },
            ],
          },

          {
            title: "Care",
            items: [
              {
                label: "Notifications",
                href: "/notifications",
                icon: <Bell size={18} />,
                badge: "4",
              },
              {
                label: "Consent",
                href: "/consent",
                icon: <ShieldCheck size={18} />,
              },
              {
                label: "Sync Center",
                href: "/sync",
                icon: <RefreshCw size={18} />,
              },
            ],
          },
        ],
      };
  }
}

/* =========================================================
   ACTIVE ROUTE
========================================================= */

function isActivePath(pathname: string, href: string) {
  if (href === "/asha") {
    return pathname === "/asha";
  }

  if (href === "/doctor") {
    return pathname === "/doctor";
  }

  if (href === "/facility/dashboard") {
    return pathname === "/facility/dashboard";
  }

  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

export default function Sidebar() {
  const pathname = usePathname();
  const role = getRole(pathname);
  const config = getRoleConfig(role);

  const homePath =
    role === "asha"
      ? "/asha"
      : role === "doctor"
        ? "/doctor"
        : role === "facility"
          ? "/facility/dashboard"
          : role === "admin"
            ? "/dashboard"
            : "/dashboard";

  return (
    <aside className="hidden h-screen w-60 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* BRAND */}

      <div className="flex h-20 shrink-0 items-center border-b border-slate-100 px-5">
        <Link
          href={homePath}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
            <Activity size={20} />
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">
              NIRAMAYA-SETU
            </p>

            <p className="mt-0.5 text-[10px] text-slate-500">
              {config.subtitle}
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-6">
          {config.sections.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {section.title}
              </p>

              <nav className="space-y-1">
                {section.items.map((item) => {
                  const active = isActivePath(
                    pathname,
                    item.href,
                  );

                  return (
                    <Link
                      key={`${section.title}-${item.label}`}
                      href={item.href}
                      className={[
                        "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition",
                        active
                          ? "bg-teal-50 font-semibold text-teal-800"
                          : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      ].join(" ")}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span
                          className={
                            active
                              ? "text-teal-700"
                              : "text-slate-400 group-hover:text-slate-600"
                          }
                        >
                          {item.icon}
                        </span>

                        <span className="truncate">
                          {item.label}
                        </span>
                      </span>

                      {item.badge && (
                        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* USER */}

      <div className="shrink-0 border-t border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {role === "asha"
                ? "ASHA / ANM"
                : role === "doctor"
                  ? "Doctor"
                  : role === "facility"
                    ? "Facility Staff"
                    : role === "admin"
                      ? "Administrator"
                      : "Operations"}
            </p>

            <p className="truncate text-[11px] text-slate-500">
              {role === "asha"
                ? "Field Care Worker"
                : role === "doctor"
                  ? "Clinical Workspace"
                  : role === "facility"
                    ? "Facility Operations"
                    : role === "admin"
                      ? "System Administration"
                      : "Care Coordination"}
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Session Active
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}