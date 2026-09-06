"use client";

import Link from "next/link";
import { apiClient } from "../../services/apiClient";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  Users,
  MapPin,
  Phone,
  CalendarDays,
  ChevronRight,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

type PatientStatus = "Active" | "Follow-up Due" | "Discharged";
type PatientGender = "Male" | "Female" | "Other";

type Patient = {
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: PatientGender;
  phone: string;
  village: string;
  address?: string;
  lastVisit: string;
  condition: string;
  status: PatientStatus;
  referralId?: string;
};

const STORAGE_KEY = "niramaya_asha_patients";

const demoPatients: Patient[] = [
  {
    id: "NS-10284",
    name: "Ramesh Kumar",
    initials: "RK",
    age: 54,
    gender: "Male",
    phone: "+91 98765 43210",
    village: "Jaipur",
    lastVisit: "03 Sep 2026",
    condition: "Cardiology",
    status: "Discharged",
    referralId: "NS-28491",
  },
  {
    id: "NS-10279",
    name: "Sunita Devi",
    initials: "SD",
    age: 47,
    gender: "Female",
    phone: "+91 98765 12345",
    village: "Chomu",
    lastVisit: "02 Sep 2026",
    condition: "General Medicine",
    status: "Follow-up Due",
    referralId: "NS-28478",
  },
  {
    id: "NS-10263",
    name: "Kamla Devi",
    initials: "KD",
    age: 61,
    gender: "Female",
    phone: "+91 99887 66554",
    village: "Bassi",
    lastVisit: "01 Sep 2026",
    condition: "General Medicine",
    status: "Active",
    referralId: "NS-28432",
  },
  {
    id: "NS-10251",
    name: "Mohan Lal",
    initials: "ML",
    age: 58,
    gender: "Male",
    phone: "+91 97654 32109",
    village: "Sanganer",
    lastVisit: "31 Aug 2026",
    condition: "Diabetes",
    status: "Active",
  },
  {
    id: "NS-10242",
    name: "Rekha Sharma",
    initials: "RS",
    age: 42,
    gender: "Female",
    phone: "+91 98989 76767",
    village: "Bagru",
    lastVisit: "30 Aug 2026",
    condition: "Hypertension",
    status: "Active",
  },
  {
    id: "NS-10231",
    name: "Rajesh Meena",
    initials: "RM",
    age: 66,
    gender: "Male",
    phone: "+91 98123 45678",
    village: "Chaksu",
    lastVisit: "28 Aug 2026",
    condition: "Cardiology",
    status: "Follow-up Due",
    referralId: "NS-28391",
  },
  {
    id: "NS-10218",
    name: "Pooja Devi",
    initials: "PD",
    age: 35,
    gender: "Female",
    phone: "+91 99001 22334",
    village: "Dudu",
    lastVisit: "27 Aug 2026",
    condition: "General Medicine",
    status: "Active",
  },
  {
    id: "NS-10207",
    name: "Gopal Singh",
    initials: "GS",
    age: 70,
    gender: "Male",
    phone: "+91 97555 88776",
    village: "Phulera",
    lastVisit: "25 Aug 2026",
    condition: "Orthopedics",
    status: "Discharged",
  },
];

const statusOptions = [
  "All",
  "Active",
  "Follow-up Due",
  "Discharged",
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(demoPatients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setPatients(parsed);
        }
      } else {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(demoPatients)
        );
      }
    } catch (error) {
      console.error("Failed to load patients:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.phone.toLowerCase().includes(query) ||
        patient.condition.toLowerCase().includes(query) ||
        patient.village.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  const activeCount = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const followUpCount = patients.filter(
    (patient) => patient.status === "Follow-up Due"
  ).length;

  const dischargedCount = patients.filter(
    (patient) => patient.status === "Discharged"
  ).length;

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#f5fbfa] px-5 py-6 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex min-h-[500px] items-center justify-center">
            <p className="text-sm text-slate-500">
              Loading patients...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5fbfa] px-5 py-6 sm:px-7 lg:px-8">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.24em] text-teal-700">
              ASHA / ANM
            </p>

            <h1 className="text-[30px] font-bold tracking-tight text-slate-950">
              Patients
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Search and manage registered patient records.
            </p>
          </div>

          <Link
            href="/asha/register-patient"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#071226] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#101d35]"
          >
            <UserPlus size={17} strokeWidth={2} />
            Register Patient
          </Link>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={<Users size={19} />}
            label="Total Patients"
            value={patients.length}
            description="Registered in your care"
            iconClass="bg-blue-50 text-blue-600"
          />

          <SummaryCard
            icon={<CheckCircle2 size={19} />}
            label="Active"
            value={activeCount}
            description="Currently under care"
            iconClass="bg-teal-50 text-teal-600"
          />

          <SummaryCard
            icon={<Clock3 size={19} />}
            label="Follow-up Due"
            value={followUpCount}
            description="Need attention"
            iconClass="bg-amber-50 text-amber-600"
          />

          <SummaryCard
            icon={<FileText size={19} />}
            label="Discharged"
            value={dischargedCount}
            description="Care completed"
            iconClass="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Search / filters */}
        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

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
                placeholder="Search by patient name, ID, phone, village..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm text-slate-500 sm:flex">
                <SlidersHorizontal size={16} />
                Status
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="h-11 min-w-[150px] rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {filteredPatients.length}
            </span>{" "}
            of {patients.length} patients
          </div>
        </section>

        {/* Patient table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.05)]">

          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-bold text-slate-900">
              Patient Records
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Registered patients assigned to your field-work area.
            </p>
          </div>

          {filteredPatients.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Users size={22} />
              </div>

              <h3 className="text-sm font-semibold text-slate-800">
                No patients found
              </h3>

              <p className="mt-1 max-w-sm text-xs text-slate-500">
                Try changing your search or status filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                }}
                className="mt-4 text-xs font-semibold text-teal-700 hover:text-teal-800"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full min-w-[900px]">

                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70 text-left">

                      <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Patient
                      </th>

                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Contact
                      </th>

                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Location
                      </th>

                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Last Visit
                      </th>

                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Condition
                      </th>

                      <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>

                      <th className="px-5 py-3" />
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPatients.map((patient) => (
                      <PatientRow
                        key={patient.id}
                        patient={patient}
                      />
                    ))}
                  </tbody>

                </table>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-slate-100 lg:hidden">
                {filteredPatients.map((patient) => (
                  <PatientMobileCard
                    key={patient.id}
                    patient={patient}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Bottom info */}
        <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3.5">
          <div className="flex gap-3">

            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <FileText size={16} />
            </div>

            <div>
              <p className="text-xs font-semibold text-blue-800">
                Patient data is stored locally
              </p>

              <p className="mt-1 text-[11px] leading-5 text-blue-700">
                Newly registered patients are currently stored in
                browser localStorage. Backend API integration can
                replace this storage later.
              </p>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

/* Summary Card */

function SummaryCard({
  icon,
  label,
  value,
  description,
  iconClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-[27px] font-bold leading-none tracking-tight text-slate-950">
            {value}
          </p>

          <p className="mt-2 text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

/* Desktop Row */

function PatientRow({ patient }: { patient: Patient }) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50/60">

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">

          <Avatar initials={patient.initials} />

          <div>
            <div className="flex items-center gap-2">

              <p className="text-sm font-semibold text-slate-900">
                {patient.name}
              </p>

              <span className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-medium text-slate-500">
                {patient.id}
              </span>

            </div>

            <p className="mt-1 text-xs text-slate-500">
              {patient.age} years â€¢ {patient.gender}
            </p>
          </div>

        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Phone size={14} className="text-slate-400" />
          {patient.phone}
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <MapPin size={14} className="text-slate-400" />
          {patient.village}
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <CalendarDays size={14} className="text-slate-400" />
          {patient.lastVisit}
        </div>
      </td>

      <td className="px-4 py-4">
        <span className="text-xs font-medium text-slate-700">
          {patient.condition}
        </span>
      </td>

      <td className="px-4 py-4">
        <StatusBadge status={patient.status} />
      </td>

      <td className="px-5 py-4 text-right">
        <Link
          href={`/asha/patients/${patient.id}`}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
        >
          View
          <ChevronRight size={14} />
        </Link>
      </td>

    </tr>
  );
}

/* Mobile Card */

function PatientMobileCard({
  patient,
}: {
  patient: Patient;
}) {
  return (
    <div className="p-4">

      <div className="flex items-start justify-between gap-3">

        <div className="flex min-w-0 items-center gap-3">

          <Avatar initials={patient.initials} />

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-slate-900">
              {patient.name}
            </p>

            <p className="mt-0.5 text-[11px] text-slate-500">
              {patient.id} â€¢ {patient.age} years â€¢ {patient.gender}
            </p>

          </div>

        </div>

        <StatusBadge status={patient.status} />

      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">

        <InfoItem
          icon={<Phone size={13} />}
          label="Phone"
          value={patient.phone}
        />

        <InfoItem
          icon={<MapPin size={13} />}
          label="Location"
          value={patient.village}
        />

        <InfoItem
          icon={<CalendarDays size={13} />}
          label="Last visit"
          value={patient.lastVisit}
        />

        <InfoItem
          icon={<FileText size={13} />}
          label="Condition"
          value={patient.condition}
        />

      </div>

      <Link
        href={`/asha/patients/${patient.id}`}
        className="mt-4 flex h-10 w-full items-center justify-center gap-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
      >
        View Patient
        <ChevronRight size={14} />
      </Link>

    </div>
  );
}

/* Avatar */

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
      {initials}
    </div>
  );
}

/* Status */

function StatusBadge({
  status,
}: {
  status: PatientStatus;
}) {
  const styles = {
    Active: "bg-teal-50 text-teal-700 border-teal-100",
    "Follow-up Due":
      "bg-amber-50 text-amber-700 border-amber-100",
    Discharged:
      "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* Info */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-3 py-2.5">

      <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
        {icon}
        {label}
      </div>

      <p className="mt-1 truncate text-xs font-medium text-slate-700">
        {value}
      </p>

    </div>
  );
}
