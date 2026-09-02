"use client";

import Link from "next/link";
import {
  ArrowRight,
  Filter,
  FileText,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

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
  from: string;
  to: string;
  department: string;
  priority: "Routine" | "Urgent" | "Emergency";
  status: ReferralStatus;
  created: string;
};

const referrals: Referral[] = [
  {
    id: "NS-28491",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    from: "PHC Bassi",
    to: "District Hospital Jaipur",
    department: "Cardiology",
    priority: "Routine",
    status: "In Transit",
    created: "28 Aug 2026",
  },
  {
    id: "NS-28478",
    patientId: "NS-10279",
    patientName: "Sunita Devi",
    from: "PHC Chomu",
    to: "District Hospital Jaipur",
    department: "General Medicine",
    priority: "Urgent",
    status: "Received",
    created: "27 Aug 2026",
  },
  {
    id: "NS-28461",
    patientId: "NS-10271",
    patientName: "Mohan Lal",
    from: "PHC Bagru",
    to: "District Hospital Jaipur",
    department: "General Medicine",
    priority: "Routine",
    status: "Closed",
    created: "25 Aug 2026",
  },
  {
    id: "NS-28432",
    patientId: "NS-10263",
    patientName: "Kamla Devi",
    from: "PHC Sanganer",
    to: "District Hospital Jaipur",
    department: "Orthopedics",
    priority: "Urgent",
    status: "Discharged",
    created: "22 Aug 2026",
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

export default function ReferralsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<"All" | ReferralStatus>("All");

  const filteredReferrals = useMemo(() => {
    const query = search.trim().toLowerCase();

    return referrals.filter((referral) => {
      const matchesSearch =
        query === "" ||
        referral.id.toLowerCase().includes(query) ||
        referral.patientId.toLowerCase().includes(query) ||
        referral.patientName.toLowerCase().includes(query) ||
        referral.from.toLowerCase().includes(query) ||
        referral.to.toLowerCase().includes(query) ||
        referral.department.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || referral.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Referrals
            </h1>

            <p className="text-xs text-slate-500">
              NIRAMAYA-SETU / ASHA & ANM
            </p>
          </div>

          <Link
            href="/referrals/create"
            className="flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
          >
            <Plus size={17} />
            Create Referral
          </Link>
        </div>
      </header>

      <section className="p-6 lg:p-8">
        {/* Heading */}
        <div>
          <p className="text-sm font-medium text-teal-700">
            REFERRAL MANAGEMENT
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Care Referrals
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Track referred patients across facilities and care stages.
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by referral ID, patient, facility or department..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={17} className="text-slate-400" />

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "All"
                    | ReferralStatus,
                )
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "All"
                    ? "All statuses"
                    : option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Referrals"
            value={referrals.length.toString()}
          />

          <StatCard
            label="In Transit"
            value={
              referrals.filter(
                (item) => item.status === "In Transit",
              ).length.toString()
            }
          />

          <StatCard
            label="Received"
            value={
              referrals.filter(
                (item) => item.status === "Received",
              ).length.toString()
            }
          />

          <StatCard
            label="Closed"
            value={
              referrals.filter(
                (item) => item.status === "Closed",
              ).length.toString()
            }
          />
        </div>

        {/* Results */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredReferrals.length}
            </span>{" "}
            of {referrals.length} referrals
          </p>
        </div>

        {/* Referral table */}
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {filteredReferrals.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Referral</th>
                    <th className="px-5 py-4">Patient</th>
                    <th className="px-5 py-4">Destination</th>
                    <th className="px-5 py-4">Department</th>
                    <th className="px-5 py-4">Priority</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Created</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredReferrals.map((referral) => (
                    <tr
                      key={referral.id}
                      className="hover:bg-slate-50"
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
                              {referral.from}
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
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {referral.to}
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
                        <StatusBadge status={referral.status} />
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {referral.created}
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          href={`/referrals/${referral.id}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                        >
                          View
                          <ArrowRight size={15} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="font-semibold text-slate-900">
                No referrals found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try another search or status filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: Referral["priority"];
}) {
  const styles = {
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