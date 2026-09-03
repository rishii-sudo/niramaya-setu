import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  FileText,
  Plus,
  RefreshCw,
  Users,
} from "lucide-react";

const careJourney = [
  {
    initials: "RK",
    name: "Ramesh Kumar",
    id: "NS-10284",
    referral: "#NS-28491",
    department: "Cardiology",
    location: "District Hospital Jaipur",
    status: "Discharged",
    statusClass: "bg-emerald-50 text-emerald-700",
    href: "/patients/NS-10284",
  },
  {
    initials: "SD",
    name: "Sunita Devi",
    id: "NS-10279",
    referral: "#NS-28478",
    department: "General Medicine",
    location: "CHC Chomu",
    status: "Follow-up Due",
    statusClass: "bg-amber-50 text-amber-700",
    href: "/patients/NS-10279",
  },
  {
    initials: "KD",
    name: "Kamla Devi",
    id: "NS-10263",
    referral: "#NS-28432",
    department: "General Medicine",
    location: "PHC Bassi",
    status: "Ready to Close",
    statusClass: "bg-teal-50 text-teal-700",
    href: "/patients/NS-10263",
  },
];

const activities = [
  {
    title: "Patient follow-up recorded",
    name: "Ramesh Kumar",
    time: "11:42 AM",
  },
  {
    title: "Referral marked for follow-up",
    name: "Sunita Devi",
    time: "10:56 AM",
  },
  {
    title: "Patient registration completed",
    name: "Kamla Devi",
    time: "09:15 AM",
  },
];

export default function AshaDashboard() {
  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-teal-700">
              ASHA / ANM DASHBOARD
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Good morning
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage patients, referrals and follow-up activities from one
              place.
            </p>
          </div>

          <Link
            href="/referrals/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            <Plus size={17} />
            Create Referral
          </Link>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="My Patients"
            value="128"
            description="Registered patients"
            icon={<Users size={20} />}
            iconClass="bg-blue-50 text-blue-600"
          />

          <StatCard
            label="Active Referrals"
            value="12"
            description="Currently in care journey"
            icon={<FileText size={20} />}
            iconClass="bg-teal-50 text-teal-600"
          />

          <StatCard
            label="Follow-ups Due"
            value="7"
            description="Need attention"
            icon={<CalendarCheck size={20} />}
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            label="Completed Today"
            value="24"
            description="Visits and activities"
            icon={<CheckCircle2 size={20} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* FOLLOW-UP ALERT */}
        <Link
          href="/asha/follow-ups"
          className="mt-5 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/70 px-5 py-4 transition hover:border-amber-300 hover:bg-amber-50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <CalendarCheck size={21} />
            </div>

            <div>
              <p className="text-sm font-bold text-amber-900">
                7 follow-ups require attention
              </p>
              <p className="mt-0.5 text-xs text-amber-700">
                Some patients have reached their scheduled follow-up window.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800">
            Open follow-ups
            <ArrowRight size={17} />
          </span>
        </Link>

        {/* MAIN CONTENT */}
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_370px]">
          {/* CARE JOURNEY */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Current Care Journey
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Patients currently requiring attention
                </p>
              </div>

              <Link
                href="/asha/follow-ups"
                className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 transition hover:text-teal-800"
              >
                View all
                <ArrowRight size={16} />
              </Link>
            </div>

            <div>
              {careJourney.map((patient) => (
                <Link
                  key={patient.id}
                  href={patient.href}
                  className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 transition last:border-b-0 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
                      {patient.initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-900">
                          {patient.name}
                        </h3>

                        <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                          {patient.id}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Referral {patient.referral} • {patient.department}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        📍 {patient.location}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold ${patient.statusClass}`}
                  >
                    {patient.status}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* TODAY'S ACTIVITY */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Today&apos;s Activity
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Recent field activities
                </p>
              </div>

              <Link
                href="/notifications"
                aria-label="Refresh activity"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition hover:bg-teal-100"
              >
                <RefreshCw size={17} />
              </Link>
            </div>

            <div>
              {activities.map((activity) => (
                <div
                  key={`${activity.title}-${activity.time}`}
                  className="flex gap-4 border-b border-slate-100 px-5 py-5"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {activity.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {activity.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <Link
                href="/notifications"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              >
                View activity
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </div>

        {/* QUICK ACCESS */}
        <section className="mt-6">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-900">
              Quick Access
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Frequently used workspace modules
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <QuickAccessCard
              href="/patients"
              title="Patients"
              description="Search and manage patient records"
              icon={<Users size={20} />}
            />

            <QuickAccessCard
              href="/referrals"
              title="Referrals"
              description="Track the complete care journey"
              icon={<FileText size={20} />}
            />

            <QuickAccessCard
              href="/asha/follow-ups"
              title="Follow-ups"
              description="Contact patients and record outcomes"
              icon={<ClipboardList size={20} />}
            />

            <QuickAccessCard
              href="/sync"
              title="Sync Center"
              description="Synchronize locally captured records"
              icon={<RefreshCw size={20} />}
            />
          </div>
        </section>

        {/* PROTOTYPE NOTICE */}
        <div className="mt-5 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50/70 px-4 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Activity size={17} />
          </div>

          <div>
            <p className="text-xs font-bold text-blue-800">
              Dashboard workflow is prototype data
            </p>
            <p className="mt-1 text-[11px] leading-5 text-blue-700">
              Patient counts, referral states and activity shown here are
              frontend demo data. Production implementation should connect
              these values to authenticated backend APIs, authorization rules
              and audit logging.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  description,
  icon,
  iconClass,
}: {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function QuickAccessCard({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
    >
      <div className="mb-5 text-teal-600">{icon}</div>

      <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>

      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-teal-700 opacity-0 transition group-hover:opacity-100">
        Open
        <ArrowRight size={14} />
      </div>
    </Link>
  );
}