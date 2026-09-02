"use client";

import Link from "next/link";
import {
  Filter,
  MoreHorizontal,
  Search,
  UserPlus,
} from "lucide-react";

const patients = [
  {
    id: "NS-10284",
    name: "Ramesh Kumar",
    age: 52,
    gender: "Male",
    village: "Bassi",
    status: "Active Referral",
    statusType: "active",
    lastVisit: "28 Aug 2026",
  },
  {
    id: "NS-10279",
    name: "Sunita Devi",
    age: 46,
    gender: "Female",
    village: "Chomu",
    status: "Follow-up Due",
    statusType: "warning",
    lastVisit: "27 Aug 2026",
  },
  {
    id: "NS-10271",
    name: "Mohan Lal",
    age: 61,
    gender: "Male",
    village: "Bagru",
    status: "Stable",
    statusType: "stable",
    lastVisit: "25 Aug 2026",
  },
  {
    id: "NS-10263",
    name: "Kamla Devi",
    age: 58,
    gender: "Female",
    village: "Sanganer",
    status: "Referral Closed",
    statusType: "closed",
    lastVisit: "22 Aug 2026",
  },
];

export default function PatientsPage() {
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

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <UserPlus size={18} />
            Register Patient
          </button>
        </div>

        {/* Search */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by patient name, ID or mobile number..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
            />
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Filter size={17} />
            Filters
          </button>
        </div>

        {/* Patient Table */}
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
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
                {patients.map((patient) => (
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
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          patient.statusType === "active"
                            ? "bg-teal-50 text-teal-700"
                            : patient.statusType === "warning"
                              ? "bg-amber-50 text-amber-700"
                              : patient.statusType === "stable"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {patient.status}
                      </span>
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
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Showing 4 of 128 patients</span>

          <span className="hidden sm:block">
            Patient data is accessed with appropriate consent.
          </span>
        </div>
      </section>
    </main>
  );
}