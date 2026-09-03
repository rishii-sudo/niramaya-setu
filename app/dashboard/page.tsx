"use client";

import Link from "next/link";
import {
  Bell,
  HeartPulse,
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock3,
  MapPin,
  Activity,
  Plus,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    href: "/patients",
    icon: Users,
  },
  {
    label: "Referrals",
    href: "/referrals",
    icon: FileText,
  },
  {
    label: "Follow-ups",
    href: "/asha/follow-ups",
    icon: ClipboardList,
  },
  {
    label: "Sync Center",
    href: "/sync",
    icon: RefreshCw,
  },
];

const stats = [
  {
    label: "My Patients",
    value: "128",
    description: "Registered patients",
    icon: Users,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Active Referrals",
    value: "12",
    description: "Currently in care journey",
    icon: FileText,
    iconClass: "bg-teal-50 text-teal-700",
  },
  {
    label: "Follow-ups Due",
    value: "7",
    description: "Need attention",
    icon: Clock3,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    label: "Completed Today",
    value: "24",
    description: "Visits and activities",
    icon: CheckCircle2,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
];

const referrals = [
  {
    name: "Ramesh Kumar",
    id: "NS-10284",
    referral: "NS-28491",
    department: "Cardiology",
    facility: "District Hospital Jaipur",
    status: "Discharged",
    statusClass: "bg-emerald-50 text-emerald-700",
  },
  {
    name: "Sunita Devi",
    id: "NS-10279",
    referral: "NS-28478",
    department: "General Medicine",
    facility: "CHC Chomu",
    status: "Follow-up Due",
    statusClass: "bg-amber-50 text-amber-700",
  },
  {
    name: "Kamla Devi",
    id: "NS-10263",
    referral: "NS-28432",
    department: "General Medicine",
    facility: "PHC Bassi",
    status: "Ready to Close",
    statusClass: "bg-teal-50 text-teal-700",
  },
];

const activities = [
  {
    title: "Patient follow-up recorded",
    patient: "Ramesh Kumar",
    time: "11:42 AM",
    icon: CheckCircle2,
  },
  {
    title: "Referral marked for follow-up",
    patient: "Sunita Devi",
    time: "10:56 AM",
    icon: ClipboardList,
  },
  {
    title: "Patient registration completed",
    patient: "Kamla Devi",
    time: "09:15 AM",
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3fbfa] text-slate-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
              <HeartPulse size={21} />
            </div>

            <div>
              <p className="text-sm font-bold tracking-wide text-slate-900">
                NIRAMAYA-SETU
              </p>
              <p className="text-[11px] text-slate-500">
                ASHA / ANM Field Work
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 sm:block">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Online
            </div>

            <button
              type="button"
              className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <Bell size={20} />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-800">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-slate-200 bg-white md:block">
          <div className="flex h-full flex-col p-4">
            <div className="mb-6 px-3 pt-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Field Work
              </p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.href === "/dashboard";

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                      active
                        ? "bg-teal-50 font-semibold text-teal-800"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>

                    {item.label === "Follow-ups" && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700">
                        7
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="my-6 border-t border-slate-100" />

            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Quick Actions
            </p>

            <Link
              href="/referrals/create"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <Plus size={18} />
              Create Referral
            </Link>

            <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">
                  A
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    ASHA / ANM
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Field Care Worker
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Session Active
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="w-full px-5 py-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-[1400px]">
            {/* Page Heading */}
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                  ASHA / ANM Dashboard
                </p>

                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                  Good morning
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-500">
                  Manage patients, referrals and follow-up activities from one
                  place.
                </p>
              </div>

              <Link
                href="/referrals/create"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Plus size={17} />
                Create Referral
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">
                          {stat.label}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-950">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {stat.description}
                        </p>
                      </div>

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                      >
                        <Icon size={19} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alert */}
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <AlertCircle size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    7 follow-ups require attention
                  </p>
                  <p className="mt-1 text-xs text-amber-700">
                    Some patients have reached their scheduled follow-up
                    window.
                  </p>
                </div>
              </div>

              <Link
                href="/asha/follow-ups"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 hover:text-amber-950"
              >
                Open follow-ups
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Main Grid */}
            <div className="mt-6 grid gap-6 xl:grid-cols-[1.65fr_1fr]">
              {/* Current Care Journey */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  <div>
                    <h2 className="font-semibold text-slate-950">
                      Current Care Journey
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Patients currently requiring attention
                    </p>
                  </div>

                  <Link
                    href="/referrals"
                    className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-900"
                  >
                    View all
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {referrals.map((referral) => (
                    <div
                      key={referral.referral}
                      className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-700">
                          {referral.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-slate-900">
                              {referral.name}
                            </p>

                            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                              {referral.id}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            Referral #{referral.referral} ·{" "}
                            {referral.department}
                          </p>

                          <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={13} />
                            {referral.facility}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${referral.statusClass}`}
                      >
                        {referral.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Activity */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-slate-950">
                        Today&apos;s Activity
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Recent field activities
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Activity size={18} />
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                      <div
                        key={`${activity.patient}-${activity.time}`}
                        className="flex gap-3 p-5"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-slate-900">
                            {activity.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {activity.patient}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-slate-100 p-4">
                  <Link
                    href="/asha/follow-ups"
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    View activity
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="mt-6">
              <div className="mb-3">
                <h2 className="font-semibold text-slate-950">
                  Quick Access
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Frequently used workspace modules
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  href="/patients"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
                >
                  <Users
                    size={21}
                    className="text-teal-700 transition group-hover:scale-105"
                  />
                  <p className="mt-4 font-semibold text-slate-900">
                    Patients
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Search and manage patient records
                  </p>
                </Link>

                <Link
                  href="/referrals"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
                >
                  <FileText
                    size={21}
                    className="text-teal-700 transition group-hover:scale-105"
                  />
                  <p className="mt-4 font-semibold text-slate-900">
                    Referrals
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Track the complete care journey
                  </p>
                </Link>

                <Link
                  href="/asha/follow-ups"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
                >
                  <ClipboardList
                    size={21}
                    className="text-teal-700 transition group-hover:scale-105"
                  />
                  <p className="mt-4 font-semibold text-slate-900">
                    Follow-ups
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Contact patients and record outcomes
                  </p>
                </Link>

                <Link
                  href="/sync"
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
                >
                  <RefreshCw
                    size={21}
                    className="text-teal-700 transition group-hover:scale-105"
                  />
                  <p className="mt-4 font-semibold text-slate-900">
                    Sync Center
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Synchronize locally captured records
                  </p>
                </Link>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <AlertCircle size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-blue-900">
                    Dashboard workflow is prototype data
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-blue-700">
                    Patient counts, referral states and activity shown here
                    are frontend demo data. Production implementation should
                    connect these values to authenticated backend APIs,
                    authorization rules and audit logging.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}