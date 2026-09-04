"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type TestStatus = "Available" | "Limited" | "Unavailable";
type Priority = "Routine" | "Urgent" | "Emergency";
type ReportStatus = "Pending" | "Processing" | "Ready";

type DiagnosticTest = {
  id: string;
  name: string;
  category: string;
  modality: string;
  status: TestStatus;
  queue: number;
  tat: string;
  price: string;
  lastUpdated: string;
};

type PendingReport = {
  id: string;
  patient: string;
  patientId: string;
  test: string;
  department: string;
  priority: Priority;
  status: ReportStatus;
  orderedAt: string;
  expectedBy: string;
};

const diagnostics: DiagnosticTest[] = [
  {
    id: "DX-001",
    name: "Complete Blood Count",
    category: "Laboratory",
    modality: "CBC",
    status: "Available",
    queue: 4,
    tat: "45 min",
    price: "₹180",
    lastUpdated: "8 min ago",
  },
  {
    id: "DX-002",
    name: "Blood Glucose",
    category: "Laboratory",
    modality: "Biochemistry",
    status: "Available",
    queue: 2,
    tat: "20 min",
    price: "₹90",
    lastUpdated: "5 min ago",
  },
  {
    id: "DX-003",
    name: "Liver Function Test",
    category: "Laboratory",
    modality: "LFT",
    status: "Limited",
    queue: 7,
    tat: "2 hrs",
    price: "₹420",
    lastUpdated: "12 min ago",
  },
  {
    id: "DX-004",
    name: "ECG",
    category: "Cardiology",
    modality: "ECG",
    status: "Available",
    queue: 1,
    tat: "15 min",
    price: "₹150",
    lastUpdated: "3 min ago",
  },
  {
    id: "DX-005",
    name: "Chest X-Ray",
    category: "Radiology",
    modality: "X-Ray",
    status: "Available",
    queue: 3,
    tat: "30 min",
    price: "₹250",
    lastUpdated: "10 min ago",
  },
  {
    id: "DX-006",
    name: "Ultrasound Abdomen",
    category: "Radiology",
    modality: "Ultrasound",
    status: "Limited",
    queue: 9,
    tat: "3 hrs",
    price: "₹800",
    lastUpdated: "16 min ago",
  },
  {
    id: "DX-007",
    name: "CT Head",
    category: "Radiology",
    modality: "CT",
    status: "Available",
    queue: 2,
    tat: "60 min",
    price: "₹1,800",
    lastUpdated: "6 min ago",
  },
  {
    id: "DX-008",
    name: "MRI Brain",
    category: "Radiology",
    modality: "MRI",
    status: "Unavailable",
    queue: 0,
    tat: "External",
    price: "Referral",
    lastUpdated: "25 min ago",
  },
  {
    id: "DX-009",
    name: "Troponin-I",
    category: "Laboratory",
    modality: "Cardiac Marker",
    status: "Available",
    queue: 1,
    tat: "35 min",
    price: "₹650",
    lastUpdated: "4 min ago",
  },
  {
    id: "DX-010",
    name: "Kidney Function Test",
    category: "Laboratory",
    modality: "KFT",
    status: "Available",
    queue: 5,
    tat: "90 min",
    price: "₹350",
    lastUpdated: "9 min ago",
  },
];

const pendingReports: PendingReport[] = [
  {
    id: "REP-28491",
    patient: "Ramesh Kumar",
    patientId: "NS-10284",
    test: "ECG",
    department: "Cardiology",
    priority: "Emergency",
    status: "Ready",
    orderedAt: "10:25 AM",
    expectedBy: "10:40 AM",
  },
  {
    id: "REP-28492",
    patient: "Sunita Devi",
    patientId: "NS-10279",
    test: "Complete Blood Count",
    department: "Medicine",
    priority: "Urgent",
    status: "Processing",
    orderedAt: "10:42 AM",
    expectedBy: "11:27 AM",
  },
  {
    id: "REP-28493",
    patient: "Mohan Lal",
    patientId: "NS-10271",
    test: "Chest X-Ray",
    department: "General Medicine",
    priority: "Routine",
    status: "Pending",
    orderedAt: "10:55 AM",
    expectedBy: "11:25 AM",
  },
  {
    id: "REP-28494",
    patient: "Kamla Devi",
    patientId: "NS-10263",
    test: "Ultrasound Abdomen",
    department: "General Medicine",
    priority: "Urgent",
    status: "Processing",
    orderedAt: "11:05 AM",
    expectedBy: "2:05 PM",
  },
];

const categoryOptions = [
  "All",
  "Laboratory",
  "Cardiology",
  "Radiology",
];

const statusOptions = [
  "All",
  "Available",
  "Limited",
  "Unavailable",
];

function statusClasses(status: TestStatus) {
  if (status === "Available") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "Limited") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-rose-50 text-rose-700 border-rose-200";
}

function reportStatusClasses(status: ReportStatus) {
  if (status === "Ready") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "Processing") {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }

  return "bg-slate-50 text-slate-700 border-slate-200";
}

function priorityClasses(priority: Priority) {
  if (priority === "Emergency") {
    return "bg-rose-50 text-rose-700 border-rose-200";
  }

  if (priority === "Urgent") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }

  return "bg-slate-50 text-slate-700 border-slate-200";
}

export default function DiagnosticsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedTest, setSelectedTest] =
    useState<DiagnosticTest | null>(null);

  const filteredTests = useMemo(() => {
    const query = search.trim().toLowerCase();

    return diagnostics.filter((test) => {
      const matchesSearch =
        !query ||
        test.name.toLowerCase().includes(query) ||
        test.category.toLowerCase().includes(query) ||
        test.modality.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || test.category === category;

      const matchesStatus =
        status === "All" || test.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const totalTests = diagnostics.length;
  const availableTests = diagnostics.filter(
    (test) => test.status === "Available"
  ).length;
  const limitedTests = diagnostics.filter(
    (test) => test.status === "Limited"
  ).length;
  const unavailableTests = diagnostics.filter(
    (test) => test.status === "Unavailable"
  ).length;

  const readyReports = pendingReports.filter(
    (report) => report.status === "Ready"
  ).length;

  const processingReports = pendingReports.filter(
    (report) => report.status === "Processing"
  ).length;

  const totalQueue = diagnostics.reduce(
    (sum, test) => sum + test.queue,
    0
  );

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Facility Operations
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  District Hospital Jaipur
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Labs & Diagnostics
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Monitor diagnostic availability, queues, turnaround time
                and pending patient reports from one facility workspace.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/facility/dashboard"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Facility Dashboard
              </Link>

              <Link
                href="/facility/admissions"
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Admissions
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Tests</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {totalTests}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Diagnostics catalog
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-emerald-700">
              Available
            </p>
            <p className="mt-1 text-2xl font-bold text-emerald-800">
              {availableTests}
            </p>
            <p className="mt-1 text-xs text-emerald-700">
              Running normally
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-amber-700">
              Limited
            </p>
            <p className="mt-1 text-2xl font-bold text-amber-800">
              {limitedTests}
            </p>
            <p className="mt-1 text-xs text-amber-700">
              Queue or capacity
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-rose-700">
              Unavailable
            </p>
            <p className="mt-1 text-2xl font-bold text-rose-800">
              {unavailableTests}
            </p>
            <p className="mt-1 text-xs text-rose-700">
              External referral
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm md:col-span-1">
            <p className="text-xs font-medium text-blue-700">
              Queue
            </p>
            <p className="mt-1 text-2xl font-bold text-blue-800">
              {totalQueue}
            </p>
            <p className="mt-1 text-xs text-blue-700">
              Total waiting samples
            </p>
          </div>
        </section>

        {/* Main grid */}
        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
          {/* Diagnostic catalog */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Diagnostic Services
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Service availability and expected turnaround time.
                  </p>
                </div>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tests..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:bg-white lg:w-64"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categoryOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      category === item
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {statusOptions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setStatus(item)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      status === item
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredTests.map((test) => (
                <button
                  key={test.id}
                  onClick={() => setSelectedTest(test)}
                  className="block w-full px-5 py-4 text-left transition hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {test.name}
                        </h3>

                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClasses(
                            test.status
                          )}`}
                        >
                          {test.status}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                        <span>{test.category}</span>
                        <span>{test.modality}</span>
                        <span>Updated {test.lastUpdated}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-right md:min-w-[320px]">
                      <div>
                        <p className="text-[11px] text-slate-400">
                          Queue
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {test.queue}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-400">
                          TAT
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {test.tat}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] text-slate-400">
                          Cost
                        </p>
                        <p className="mt-1 font-semibold text-slate-800">
                          {test.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {filteredTests.length === 0 && (
                <div className="px-5 py-12 text-center">
                  <p className="font-semibold text-slate-800">
                    No diagnostic service found
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Try another search or filter.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Reports */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Report Queue
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Patient investigation results.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 px-3 py-2 text-right">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Ready
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    {readyReports}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-xs font-medium text-emerald-700">
                    Ready Reports
                  </p>
                  <p className="mt-1 text-xl font-bold text-emerald-800">
                    {readyReports}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3">
                  <p className="text-xs font-medium text-blue-700">
                    Processing
                  </p>
                  <p className="mt-1 text-xl font-bold text-blue-800">
                    {processingReports}
                  </p>
                </div>
              </div>

              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {report.test}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {report.patient}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {report.patientId} · {report.department}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${reportStatusClasses(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${priorityClasses(
                        report.priority
                      )}`}
                    >
                      {report.priority}
                    </span>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600">
                      Ordered {report.orderedAt}
                    </span>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600">
                      ETA {report.expectedBy}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <Link
                      href={`/patients/${report.patientId}`}
                      className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Open Patient
                    </Link>

                    {report.status === "Ready" ? (
                      <Link
                        href={`/patients/${report.patientId}/records`}
                        className="flex-1 rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-slate-800"
                      >
                        View Report
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex-1 cursor-not-allowed rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-400"
                      >
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diagnostic coverage */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Laboratory
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: "88%" }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Service coverage
              </span>
              <span className="font-semibold text-slate-800">
                88%
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Routine blood and biochemistry tests are currently
              available.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Cardiology
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: "94%" }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Service coverage
              </span>
              <span className="font-semibold text-slate-800">
                94%
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              ECG and cardiac marker testing available for urgent
              referrals.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Radiology
            </p>

            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-amber-500"
                style={{ width: "71%" }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Service coverage
              </span>
              <span className="font-semibold text-slate-800">
                71%
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              MRI currently routed externally while CT and X-Ray
              remain available.
            </p>
          </div>
        </section>

        {/* Subtle note */}
        <p className="mt-4 text-[11px] text-slate-400">
          Demo data • LIS/RIS/PACS integrations, machine results and signed clinical reports planned for backend implementation.
        </p>
      </div>

      {/* Test detail modal */}
      {selectedTest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedTest(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Diagnostic Service
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedTest.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedTest.category} ·{" "}
                  {selectedTest.modality}
                </p>
              </div>

              <button
                onClick={() => setSelectedTest(null)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Service Status
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses(
                    selectedTest.status
                  )}`}
                >
                  {selectedTest.status}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Queue
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {selectedTest.queue}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Turnaround Time
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {selectedTest.tat}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">
                  Demo Cost
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">
                  {selectedTest.price}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Operational Note
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Current queue and turnaround values are prototype
                facility data. In the production workflow these
                values should come from the connected diagnostic
                service or LIS.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}