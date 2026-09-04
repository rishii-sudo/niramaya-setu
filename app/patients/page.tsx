"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Filter,
  MoreHorizontal,
  Search,
  UserPlus,
  X,
} from "lucide-react";

type StatusType = "active" | "warning" | "stable" | "closed";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  status: string;
  statusType: StatusType;
  lastVisit: string;
  mobile: string;
};

const patients: Patient[] = [
  {
    id: "NS-10284",
    name: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    village: "Bassi",
    status: "Active Referral",
    statusType: "active",
    lastVisit: "28 Aug 2026",
    mobile: "98XXXXXX42",
  },
  {
    id: "NS-10279",
    name: "Sunita Devi",
    age: 47,
    gender: "Female",
    village: "Chomu",
    status: "Follow-up Due",
    statusType: "warning",
    lastVisit: "27 Aug 2026",
    mobile: "97XXXXXX18",
  },
  {
    id: "NS-10271",
    name: "Mohan Lal",
    age: 58,
    gender: "Male",
    village: "Bagru",
    status: "Stable",
    statusType: "stable",
    lastVisit: "25 Aug 2026",
    mobile: "96XXXXXX73",
  },
  {
    id: "NS-10263",
    name: "Kamla Devi",
    age: 61,
    gender: "Female",
    village: "Sanganer",
    status: "Referral Closed",
    statusType: "closed",
    lastVisit: "22 Aug 2026",
    mobile: "95XXXXXX26",
  },
];

const filterOptions: {
  label: string;
  value: StatusType | "all";
}[] = [
  { label: "All patients", value: "all" },
  { label: "Active Referral", value: "active" },
  { label: "Follow-up Due", value: "warning" },
  { label: "Stable", value: "stable" },
  { label: "Referral Closed", value: "closed" },
];

export default function PatientsPage() {
  const [patientList, setPatientList] = useState<Patient[]>(patients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("niramaya_patients");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const formatted: Patient[] = parsed.map((p: any) => ({
            id: p.id || `NS-${Math.floor(10000 + Math.random() * 90000)}`,
            name: p.name || "Unknown Patient",
            age: Number(p.age) || 40,
            gender: p.gender || "Other",
            village: p.village || p.address || "Jaipur",
            status:
              p.status === "Active"
                ? "Active Referral"
                : p.status || "Active Referral",
            statusType:
              p.status === "Closed"
                ? "closed"
                : p.status === "Follow-up Due"
                  ? "warning"
                  : "active",
            lastVisit: p.lastVisit || "Today",
            mobile: p.phone || p.mobile || "98XXXXXX00",
          }));
          const existingIds = new Set(patients.map((p) => p.id));
          const newUnique = formatted.filter((p) => !existingIds.has(p.id));
          setPatientList([...newUnique, ...patients]);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patientList.filter((patient) => {
      const matchesSearch =
        query === "" ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.mobile.toLowerCase().includes(query) ||
        patient.village.toLowerCase().includes(query);

      const matchesFilter =
        statusFilter === "all" ||
        patient.statusType === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Patients
            </h1>

            <p className="text-xs text-slate-500">
              NIRAMAYA-SETU / ASHA & ANM
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="More options"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <section className="p-6 lg:p-8">
        {/* Heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              PATIENT MANAGEMENT
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              My Patients
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Search and manage patients assigned to your care area.
            </p>
          </div>

          <Link
            href="/patients/register"
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <UserPlus size={18} />
            Register Patient
          </Link>
        </div>

        {/* Search + filter */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by patient name, ID, village or mobile..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Clear search"
              >
                <X size={17} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${
              showFilters || statusFilter !== "all"
                ? "border-teal-600 bg-teal-50 text-teal-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Filter size={17} />
            Filters

            {statusFilter !== "all" && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1.5 text-[10px] font-bold text-white">
                1
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Filter by status
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Show patients based on their current care status.
                </p>
              </div>

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-teal-700 hover:text-teal-800"
              >
                Clear filters
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {filterOptions.map((option) => {
                const isSelected = statusFilter === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setStatusFilter(option.value)
                    }
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      isSelected
                        ? "border-teal-600 bg-teal-700 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results info */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredPatients.length}
            </span>{" "}
            of {patients.length} patients
          </p>

          {(search || statusFilter !== "all") && (
            <button
              type="button"
              onClick={clearFilters}
              className="w-fit text-sm font-medium text-teal-700 hover:text-teal-800"
            >
              Reset search & filters
            </button>
          )}
        </div>

        {/* Table */}
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {filteredPatients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Patient</th>
                    <th className="px-5 py-4">Age / Gender</th>
                    <th className="px-5 py-4">Village</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Last Visit</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Patient */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {patient.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {patient.id}
                          </p>
                        </div>
                      </td>

                      {/* Age / Gender */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {patient.age} / {patient.gender}
                      </td>

                      {/* Village */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {patient.village}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={patient.status}
                          type={patient.statusType}
                        />
                      </td>

                      {/* Last Visit */}
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {patient.lastVisit}
                      </td>

                      {/* View */}
                      <td className="px-5 py-4">
                        <Link
                          href={`/patients/${patient.id}`}
                          className="font-semibold text-teal-700 transition hover:text-teal-800"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <Search size={22} className="text-slate-500" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No patients found
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-500">
                Try a different patient name, ID, village or status filter.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Bottom note */}
        <div className="mt-4 flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Patient data is accessed with appropriate consent.</span>

          <span>
            {filteredPatients.length} matching patient
            {filteredPatients.length === 1 ? "" : "s"}
          </span>
        </div>
      </section>
    </main>
  );
}

function StatusBadge({
  status,
  type,
}: {
  status: string;
  type: StatusType;
}) {
  const styles: Record<StatusType, string> = {
    active: "bg-teal-50 text-teal-700",
    warning: "bg-amber-50 text-amber-700",
    stable: "bg-blue-50 text-blue-700",
    closed: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[type]}`}
    >
      {status}
    </span>
  );
}