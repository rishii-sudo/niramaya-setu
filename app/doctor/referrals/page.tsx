"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  FileText,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { getAllReferralStates } from "@/app/data/referralState";

type Priority = "Routine" | "Urgent" | "Emergency";

type ReferralStatus =
  | "Created"
  | "In Transit"
  | "Received"
  | "Under Treatment"
  | "Discharged"
  | "Closed";

type Referral = {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  from: string;
  to: string;
  department: string;
  priority: Priority;
  status: ReferralStatus;
  created: string;
  reason: string;
};

const referrals: Referral[] = [
  {
    id: "NS-28491",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    age: 52,
    gender: "Male",
    from: "PHC Bassi",
    to: "District Hospital Jaipur",
    department: "Cardiology",
    priority: "Routine",
    status: "In Transit",
    created: "28 Aug 2026",
    reason: "Cardiology consultation",
  },
  {
    id: "NS-28478",
    patientId: "NS-10279",
    patientName: "Sunita Devi",
    age: 46,
    gender: "Female",
    from: "PHC Chomu",
    to: "District Hospital Jaipur",
    department: "General Medicine",
    priority: "Urgent",
    status: "Received",
    created: "27 Aug 2026",
    reason: "General medicine consultation",
  },
  {
    id: "NS-28461",
    patientId: "NS-10271",
    patientName: "Mohan Lal",
    age: 61,
    gender: "Male",
    from: "PHC Bagru",
    to: "District Hospital Jaipur",
    department: "General Medicine",
    priority: "Routine",
    status: "Closed",
    created: "25 Aug 2026",
    reason: "Routine specialist review",
  },
  {
    id: "NS-28432",
    patientId: "NS-10263",
    patientName: "Kamla Devi",
    age: 58,
    gender: "Female",
    from: "PHC Sanganer",
    to: "District Hospital Jaipur",
    department: "Orthopedics",
    priority: "Urgent",
    status: "Discharged",
    created: "22 Aug 2026",
    reason: "Orthopedic consultation",
  },
];

const statusOptions: Array<"All" | ReferralStatus> = [
  "All",
  "Created",
  "In Transit",
  "Received",
  "Under Treatment",
  "Discharged",
  "Closed",
];

const priorityOptions: Array<"All" | Priority> = [
  "All",
  "Routine",
  "Urgent",
  "Emergency",
];

const departmentOptions = [
  "All",
  "Cardiology",
  "General Medicine",
  "Orthopedics",
];

export default function DoctorReferralsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | ReferralStatus>("All");
  const [priority, setPriority] = useState<"All" | Priority>("All");
  const [department, setDepartment] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [referralStates, setReferralStates] = useState<Record<string, ReferralStatus>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setReferralStates(getAllReferralStates());
    setIsHydrated(true);

    const onStorage = () => setReferralStates(getAllReferralStates());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const liveReferrals = useMemo(() => {
    return referrals.map((r) => ({
      ...r,
      status: isHydrated && referralStates[r.id] ? referralStates[r.id] : r.status,
    }));
  }, [referralStates, isHydrated]);

  const filteredReferrals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return liveReferrals.filter((referral) => {
      const matchesSearch =
        query === "" ||
        referral.id.toLowerCase().includes(query) ||
        referral.patientId.toLowerCase().includes(query) ||
        referral.patientName.toLowerCase().includes(query) ||
        referral.from.toLowerCase().includes(query) ||
        referral.department.toLowerCase().includes(query) ||
        referral.reason.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || referral.status === status;

      const matchesPriority =
        priority === "All" || referral.priority === priority;

      const matchesDepartment =
        department === "All" ||
        referral.department === department;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesDepartment
      );
    });
  }, [liveReferrals, search, status, priority, department]);

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setDepartment("All");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Doctor Referrals
            </h1>

            <p className="text-xs text-slate-500">
              NIRAMAYA-SETU / Doctor Workspace
            </p>
          </div>

          <Link
            href="/doctor"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white p-4 md:block">
          <nav className="space-y-1">
            <NavItem
              href="/doctor"
              label="Dashboard"
            />

            <NavItem
              href="/doctor/referrals"
              label="Referrals"
              active
            />

            <NavItem
              label="Patients"
            />

            <NavItem
              label="Treatment"
            />

            <NavItem
              label="Appointments"
            />
          </nav>

          <div className="mt-8 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-700">
              Referral review
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Review referrals, inspect patient context and continue
              the care journey without losing the referral trail.
            </p>
          </div>
        </aside>

        {/* Main */}
        <section className="w-full p-6 lg:p-8">
          <div>
            <p className="text-sm font-medium text-teal-700">
              REFERRAL WORKSPACE
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Incoming Referrals
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Review patients referred to your facility and filter
              cases by status, priority and department.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by referral ID, patient, facility or reason..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setShowFilters((current) => !current)
              }
              className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${
                showFilters ||
                status !== "All" ||
                priority !== "All" ||
                department !== "All"
                  ? "border-teal-600 bg-teal-50 text-teal-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Filter
                    size={17}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Referral filters
                    </p>

                    <p className="text-xs text-slate-500">
                      Narrow down incoming referrals.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-fit text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  Clear filters
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <FilterField
                  label="Status"
                  value={status}
                  options={statusOptions}
                  onChange={(value) =>
                    setStatus(value as "All" | ReferralStatus)
                  }
                />

                <FilterField
                  label="Priority"
                  value={priority}
                  options={priorityOptions}
                  onChange={(value) =>
                    setPriority(value as "All" | Priority)
                  }
                />

                <FilterField
                  label="Department"
                  value={department}
                  options={departmentOptions}
                  onChange={setDepartment}
                />
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Total"
              value={liveReferrals.length.toString()}
            />

            <SummaryCard
              label="Received"
              value={liveReferrals
                .filter((item) => item.status === "Received")
                .length.toString()}
            />

            <SummaryCard
              label="Urgent"
              value={liveReferrals
                .filter(
                  (item) =>
                    item.priority === "Urgent" ||
                    item.priority === "Emergency",
                )
                .length.toString()}
            />

            <SummaryCard
              label="Under Treatment"
              value={liveReferrals
                .filter((item) => item.status === "Under Treatment")
                .length.toString()}
            />
          </div>

          {/* Result count */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {filteredReferrals.length}
                </span>{" "}
                of {liveReferrals.length} referrals
              </p>
            </div>

            {(search ||
              status !== "All" ||
              priority !== "All" ||
              department !== "All") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                Reset
              </button>
            )}
          </div>

          {/* Table */}
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {filteredReferrals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-4">
                        Referral
                      </th>

                      <th className="px-5 py-4">
                        Patient
                      </th>

                      <th className="px-5 py-4">
                        Source
                      </th>

                      <th className="px-5 py-4">
                        Department
                      </th>

                      <th className="px-5 py-4">
                        Priority
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>

                      <th className="px-5 py-4">
                        Created
                      </th>

                      <th className="px-5 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredReferrals.map((referral) => (
                      <tr
                        key={referral.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                              <FileText size={17} />
                            </div>

                            <div>
                              <p className="font-semibold text-slate-900">
                                #{referral.id}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {referral.reason}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-semibold text-slate-900">
                            {referral.patientName}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {referral.patientId}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {referral.age} / {referral.gender}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {referral.from}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {referral.department}
                        </td>

                        <td className="px-5 py-4">
                          <PriorityBadge
                            priority={referral.priority}
                          />
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            status={referral.status}
                          />
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {referral.created}
                        </td>

                        <td className="px-5 py-4">
                          <Link
                            href={`/referrals/${referral.id}`}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-teal-700 hover:bg-slate-50"
                          >
                            Review
                            <ArrowRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Search
                    size={22}
                    className="text-slate-500"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  No referrals found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Prototype note */}
          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs leading-5 text-slate-500">
              Referral records shown here are prototype data. In the
              production system, this list will be loaded from the
              authenticated doctor&apos;s assigned facility through the
              backend API.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function NavItem({
  href,
  label,
  active = false,
}: {
  href?: string;
  label: string;
  active?: boolean;
}) {
  const className = `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
    active
      ? "bg-teal-50 text-teal-800"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
  }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return <div className={className}>{label}</div>;
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function FilterField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All"
              ? `All ${label.toLowerCase()}`
              : option}
          </option>
        ))}
      </select>
    </div>
  );
}

const SelectField = FilterField;

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
  status: ReferralStatus;
}) {
  const styles: Record<ReferralStatus, string> = {
    Created: "bg-slate-100 text-slate-700",
    "In Transit": "bg-blue-50 text-blue-700",
    Received: "bg-teal-50 text-teal-700",
    "Under Treatment": "bg-purple-50 text-purple-700",
    Discharged: "bg-amber-50 text-amber-700",
    Closed: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}