"use client";

import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
  UserRound,
  Users,
} from "lucide-react";

type Priority = "Routine" | "Urgent" | "Emergency";

type Referral = {
  id: string;
  patientId: string;
  patient: string;
  age: number;
  gender: string;
  from: string;
  department: string;
  priority: Priority;
  status: string;
  time: string;
};

type ActivityItem = {
  title: string;
  description: string;
  time: string;
};

const referrals: Referral[] = [
  {
    id: "NS-28491",
    patientId: "NS-10284",
    patient: "Ramesh Kumar",
    age: 52,
    gender: "Male",
    from: "PHC Bassi",
    department: "Cardiology",
    priority: "Routine",
    status: "In Transit",
    time: "10 min ago",
  },
  {
    id: "NS-28478",
    patientId: "NS-10279",
    patient: "Sunita Devi",
    age: 46,
    gender: "Female",
    from: "PHC Chomu",
    department: "General Medicine",
    priority: "Urgent",
    status: "Received",
    time: "25 min ago",
  },
  {
    id: "NS-28467",
    patientId: "NS-10268",
    patient: "Arjun Meena",
    age: 34,
    gender: "Male",
    from: "PHC Amer",
    department: "General Medicine",
    priority: "Routine",
    status: "Received",
    time: "42 min ago",
  },
  {
    id: "NS-28454",
    patientId: "NS-10255",
    patient: "Sita Devi",
    age: 63,
    gender: "Female",
    from: "CHC Chomu",
    department: "Orthopedics",
    priority: "Emergency",
    status: "Under Treatment",
    time: "1 hr ago",
  },
];

const activity: ActivityItem[] = [
  {
    title: "Referral received",
    description: "Sunita Devi • General Medicine",
    time: "10:35 AM",
  },
  {
    title: "Patient treatment updated",
    description: "Sita Devi • Orthopedics",
    time: "10:12 AM",
  },
  {
    title: "Referral closed",
    description: "Mohan Lal • General Medicine",
    time: "09:40 AM",
  },
];

export default function DoctorDashboardPage() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* Doctor header */}
      <header className="border-b border-slate-200 bg-white/85 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white shadow-sm">
              <HeartPulse size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                NIRAMAYA-SETU
              </p>

              <p className="text-[10px] text-slate-500">
                Doctor Workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Dr. Priya Singh
              </p>

              <p className="text-xs text-slate-500">
                Cardiology • District Hospital Jaipur
              </p>
            </div>

            <button
              type="button"
              className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              aria-label="Notifications"
              onClick={() => {}}
            >
              <Bell size={20} />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <section className="min-w-0 p-5 sm:p-6 lg:p-8">
        {/* Page heading */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              DOCTOR DASHBOARD
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Good morning, Dr. Priya
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Review incoming referrals, patient records and active
              treatment journeys from one place.
            </p>
          </div>

          <div className="w-fit rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
            <p className="text-xs text-slate-400">
              Facility
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              District Hospital Jaipur
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FileText}
            label="Incoming Referrals"
            value="8"
            tone="teal"
          />

          <StatCard
            icon={AlertCircle}
            label="Urgent"
            value="2"
            tone="amber"
          />

          <StatCard
            icon={Activity}
            label="Under Treatment"
            value="5"
            tone="blue"
          />

          <StatCard
            icon={CheckCircle2}
            label="Completed Today"
            value="11"
            tone="slate"
          />
        </div>

        {/* Primary content */}
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          {/* Incoming referrals */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Incoming Referrals
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Patients referred to your facility
                </p>
              </div>

              <Link
                href="/doctor/referrals"
                className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                View all
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="p-5 transition hover:bg-slate-50/80"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex min-w-0 items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                        <UserRound size={20} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate font-semibold text-slate-900">
                            {referral.patient}
                          </p>

                          <span className="text-xs text-slate-400">
                            {referral.patientId}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-slate-600">
                          {referral.age} years • {referral.gender} •{" "}
                          {referral.department}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {referral.from} • {referral.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                      <PriorityBadge
                        priority={referral.priority}
                      />

                      <StatusBadge
                        status={referral.status}
                      />

                      <Link
                        href={`/doctor/patients/${referral.patientId}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-slate-50"
                      >
                        Review
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pending actions */}
          <section className="rounded-2xl border border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
            <div className="border-b border-slate-100 p-5">
              <h2 className="font-semibold text-slate-900">
                Pending Actions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Items requiring your attention
              </p>
            </div>

            <div className="space-y-4 p-5">
              <ActionCard
                title="Review urgent referral"
                patient="Sunita Devi"
                meta="General Medicine • Urgent"
                tone="amber"
                href="/doctor/patients/NS-10279"
              />

              <ActionCard
                title="Update treatment status"
                patient="Sita Devi"
                meta="Orthopedics • Under Treatment"
                tone="blue"
                href="/doctor/patients/NS-10255"
              />

              <ActionCard
                title="Complete discharge note"
                patient="Mohan Lal"
                meta="General Medicine"
                tone="teal"
                href="/facility/discharge"
              />
            </div>
          </section>
        </div>

        {/* Secondary content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Today's Care */}
          <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <CalendarDays size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Today&apos;s Care
                </h2>

                <p className="text-xs text-slate-500">
                  Current workload
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <MiniMetric
                label="Appointments"
                value="14"
              />

              <MiniMetric
                label="Referrals"
                value="8"
              />

              <MiniMetric
                label="Follow-ups"
                value="6"
              />

              <MiniMetric
                label="Discharges"
                value="3"
              />
            </div>
          </section>

          {/* Recent activity */}
          <section className="rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Clock3 size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Recent Activity
                </h2>

                <p className="text-xs text-slate-500">
                  Latest updates
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {activity.map((item) => (
                <div
                  key={`${item.title}-${item.time}`}
                  className="border-l-2 border-slate-200 pl-4"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.title}
                    </p>

                    <span className="text-xs text-slate-400">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-6 rounded-xl border border-teal-100 bg-white/80 p-4 backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <ShieldIcon />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Consent-based clinical access
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Patient records are displayed only within the
                authorized doctor workspace. Production data will be
                loaded through the authenticated backend service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  label: string;
  value: string;
  tone: "teal" | "amber" | "blue" | "slate";
}) {
  const iconStyles = {
    teal: "bg-teal-50 text-teal-700",
    amber: "bg-amber-50 text-amber-700",
    blue: "bg-blue-50 text-blue-700",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {label}
        </p>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconStyles[tone]}`}
        >
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: Priority;
}) {
  const styles: Record<Priority, string> = {
    Routine: "bg-slate-100 text-slate-600",
    Urgent: "bg-amber-50 text-amber-700",
    Emergency: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    "In Transit": "bg-blue-50 text-blue-700",
    Received: "bg-teal-50 text-teal-700",
    "Under Treatment": "bg-purple-50 text-purple-700",
    Discharged: "bg-amber-50 text-amber-700",
    Closed: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function ActionCard({
  title,
  patient,
  meta,
  tone,
  href,
}: {
  title: string;
  patient: string;
  meta: string;
  tone: "amber" | "blue" | "teal";
  href: string;
}) {
  const styles = {
    amber: "border-amber-100 bg-amber-50/70",
    blue: "border-blue-100 bg-blue-50/70",
    teal: "border-teal-100 bg-teal-50/70",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${styles[tone]}`}
    >
      <p className="text-sm font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-sm text-slate-700">
        {patient}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {meta}
      </p>

      <Link
        href={href}
        className="mt-3 inline-block text-xs font-semibold text-teal-700 hover:text-teal-800"
      >
        Open task →
      </Link>
    </div>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50/90 p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-teal-700"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}