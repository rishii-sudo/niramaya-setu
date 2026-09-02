"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
};

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    if (href === "/asha") {
      return pathname === "/asha" || pathname.startsWith("/asha/");
    }

    if (href === "/doctor") {
      return pathname === "/doctor" || pathname.startsWith("/doctor/");
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const mainNavigation: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      label: "Patients",
      href: "/patients",
      icon: <PatientsIcon />,
    },
    {
      label: "Referrals",
      href: "/referrals",
      icon: <ReferralIcon />,
    },
    {
      label: "Facilities",
      href: "/facilities",
      icon: <FacilityIcon />,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: <BellIcon />,
      badge: "4",
    },
  ];

  const fieldNavigation: NavItem[] = [
    {
      label: "ASHA / ANM",
      href: "/asha",
      icon: <FieldIcon />,
    },
    {
      label: "Record Visit",
      href: "/asha/visits",
      icon: <VisitIcon />,
    },
    {
      label: "Follow-ups",
      href: "/asha/follow-ups",
      icon: <FollowUpIcon />,
    },
    {
      label: "Sync Center",
      href: "/sync",
      icon: <SyncIcon />,
    },
  ];

  const clinicalNavigation: NavItem[] = [
    {
      label: "Doctor Workspace",
      href: "/doctor",
      icon: <DoctorIcon />,
    },
    {
      label: "Doctor Referrals",
      href: "/doctor/referrals",
      icon: <ReferralIcon />,
    },
  ];

  const securityNavigation: NavItem[] = [
    {
      label: "Consent",
      href: "/consent",
      icon: <ConsentIcon />,
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-[270px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white/82 backdrop-blur-xl lg:block">
      <div className="flex min-h-full flex-col">
        {/* Brand */}
        <div className="border-b border-slate-100 px-5 py-5">
          <Link href="/dashboard" className="group block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-sm">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3v18" />
                  <path d="M3 12h18" />
                  <path d="M5.5 5.5l13 13" />
                  <path d="M18.5 5.5l-13 13" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="truncate text-base font-bold tracking-tight text-slate-900">
                  NIRAMAYA-SETU
                </p>

                <p className="mt-0.5 text-[11px] text-slate-500">
                  Care Continuity Platform
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <NavSection title="Main">
            {mainNavigation.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ))}
          </NavSection>

          <NavSection title="Field Work">
            {fieldNavigation.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ))}
          </NavSection>

          <NavSection title="Clinical">
            {clinicalNavigation.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ))}
          </NavSection>

          <NavSection title="Security">
            {securityNavigation.map((item) => (
              <SidebarItem
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ))}
          </NavSection>
        </nav>

        {/* Bottom status */}
        <div className="border-t border-slate-100 p-3">
          <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <p className="text-xs font-semibold text-slate-800">
                System Ready
              </p>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              Referral, field and care-continuity workflows are available.
            </p>

            <div className="mt-3 flex items-center justify-between">
              <Link
                href="/sync"
                className="text-[11px] font-semibold text-teal-700 hover:text-teal-800"
              >
                Sync Center →
              </Link>

              <span className="rounded-full bg-white px-2 py-1 text-[9px] font-bold text-slate-500">
                DEMO
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   NAV SECTION
   ========================================================= */

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
        {title}
      </p>

      <div className="space-y-1">{children}</div>
    </div>
  );
}

/* =========================================================
   SIDEBAR ITEM
   ========================================================= */

function SidebarItem({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
        active
          ? "bg-teal-50 text-teal-800 shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
          active
            ? "bg-white text-teal-700 shadow-sm"
            : "bg-transparent text-slate-400 group-hover:text-slate-700"
        }`}
      >
        {item.icon}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
        {item.label}
      </span>

      {item.badge && (
        <span
          className={`min-w-5 rounded-full px-1.5 py-0.5 text-center text-[10px] font-bold ${
            active
              ? "bg-white text-teal-700"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {item.badge}
        </span>
      )}

      {active && (
        <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
      )}
    </Link>
  );
}

/* =========================================================
   ICONS
   ========================================================= */

function DashboardIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function PatientsIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M15.5 15.5a5 5 0 0 1 5 4.5" />
    </svg>
  );
}

function ReferralIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12h13" />
      <path d="M13 6l6 6-6 6" />
      <path d="M5 6v12" />
    </svg>
  );
}

function FacilityIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 21V9l9-6 9 6v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M7 11h2M15 11h2M7 14h2M15 14h2" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function FieldIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="7" r="3.5" />
      <path d="M4 21a8 8 0 0 1 16 0" />
      <path d="M7 12h10" />
    </svg>
  );
}

function VisitIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 9h18" />
      <path d="M8 14l2 2 5-5" />
    </svg>
  );
}

function FollowUpIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 11a8 8 0 0 0-15.5-2" />
      <path d="M4 5v4h4" />
      <path d="M4 13a8 8 0 0 0 15.5 2" />
      <path d="M20 19v-4h-4" />
    </svg>
  );
}

function DoctorIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
      <path d="M18 4v6M15 7h6" />
    </svg>
  );
}

function ConsentIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}