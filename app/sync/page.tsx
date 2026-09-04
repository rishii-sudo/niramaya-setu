"use client";

import { useMemo, useState } from "react";

type SyncStatus = "pending" | "synced" | "failed" | "syncing";

type SyncRecord = {
  id: string;
  title: string;
  code: string;
  type: string;
  description: string;
  captured: string;
  attempts: number;
  status: SyncStatus;
};

const initialRecords: SyncRecord[] = [
  {
    id: "SYNC-1041",
    title: "Ramesh Kumar visit",
    code: "SYNC-1041",
    type: "Field Visit",
    description: "Vitals and referral follow-up recorded",
    captured: "03 Sep 2026, 11:42 PM",
    attempts: 1,
    status: "synced",
  },
  {
    id: "SYNC-1038",
    title: "REF-24017 status update",
    code: "SYNC-1038",
    type: "Referral Update",
    description: "Referral marked for field follow-up",
    captured: "03 Sep 2026, 10:56 PM",
    attempts: 1,
    status: "synced",
  },
  {
    id: "SYNC-1035",
    title: "Sunita Devi follow-up",
    code: "SYNC-1035",
    type: "Follow-up",
    description: "Patient contacted and next action recorded",
    captured: "03 Sep 2026, 08:24 PM",
    attempts: 1,
    status: "synced",
  },
  {
    id: "SYNC-1031",
    title: "Kamla Devi registration",
    code: "SYNC-1031",
    type: "Patient Registration",
    description: "New patient demographic record created",
    captured: "03 Sep 2026, 06:15 PM",
    attempts: 1,
    status: "synced",
  },
  {
    id: "SYNC-1027",
    title: "REF-24005 update",
    code: "SYNC-1027",
    type: "Referral Update",
    description: "Receiving facility status update",
    captured: "03 Sep 2026, 02:18 PM",
    attempts: 3,
    status: "synced",
  },
];

const activities = [
  {
    title: "Sync completed",
    time: "03 Sep, 09:30 AM",
    description: "12 records synchronized successfully",
    type: "success",
  },
  {
    title: "Offline capture",
    time: "03 Sep, 07:12 AM",
    description: "Field visit stored locally",
    type: "normal",
  },
  {
    title: "Sync failed",
    time: "02 Sep, 11:48 PM",
    description: "Connection interrupted during upload",
    type: "failed",
  },
];

function Icon({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: SyncStatus }) {
  const config = {
    pending: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700 border-amber-100",
    },
    synced: {
      label: "Synced",
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    failed: {
      label: "Failed",
      className: "bg-red-50 text-red-600 border-red-100",
    },
    syncing: {
      label: "Syncing",
      className: "bg-blue-50 text-blue-700 border-blue-100",
    },
  };

  const item = config[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${item.className}`}
    >
      {item.label}
    </span>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon,
  variant,
}: {
  label: string;
  value: number;
  description: string;
  icon: string;
  variant: "pending" | "synced" | "failed" | "syncing";
}) {
  const styles = {
    pending: {
      border: "border-amber-200",
      value: "text-amber-700",
      icon: "bg-amber-50 text-amber-600",
    },
    synced: {
      border: "border-slate-200",
      value: "text-slate-900",
      icon: "bg-emerald-50 text-emerald-600",
    },
    failed: {
      border: "border-red-200",
      value: "text-red-600",
      icon: "bg-red-50 text-red-500",
    },
    syncing: {
      border: "border-slate-200",
      value: "text-blue-700",
      icon: "bg-blue-50 text-blue-600",
    },
  };

  const style = styles[variant];

  return (
    <div
      className={`relative rounded-2xl border ${style.border} bg-white px-5 py-5 shadow-sm`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>

          <p className={`mt-2 text-3xl font-semibold ${style.value}`}>
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-500">{description}</p>
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${style.icon}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function SyncCenterPage() {
  const [records, setRecords] = useState<SyncRecord[]>(initialRecords);
  const [online, setOnline] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | SyncStatus>("all");
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("03 Sep 2026, 01:04 PM");

  const pendingCount = records.filter(
    (record) => record.status === "pending"
  ).length;

  const syncedCount = records.filter(
    (record) => record.status === "synced"
  ).length;

  const failedCount = records.filter(
    (record) => record.status === "failed"
  ).length;

  const syncingCount = records.filter(
    (record) => record.status === "syncing"
  ).length;

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        record.title.toLowerCase().includes(search.toLowerCase()) ||
        record.code.toLowerCase().includes(search.toLowerCase()) ||
        record.type.toLowerCase().includes(search.toLowerCase()) ||
        record.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || record.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [records, search, filter]);

  function handleSync() {
    if (!online || syncing) return;

    const hasPending = records.some(
      (record) =>
        record.status === "pending" || record.status === "failed"
    );

    if (!hasPending) {
      return;
    }

    setSyncing(true);

    setRecords((current) =>
      current.map((record) =>
        record.status === "pending" || record.status === "failed"
          ? { ...record, status: "syncing" }
          : record
      )
    );

    setTimeout(() => {
      setRecords((current) =>
        current.map((record) =>
          record.status === "syncing"
            ? {
                ...record,
                status: "synced",
                attempts: record.attempts + 1,
              }
            : record
        )
      );

      setLastSync("03 Sep 2026, 02:15 PM");
      setSyncing(false);
    }, 1500);
  }

  function simulateOfflineCapture() {
    const newRecord: SyncRecord = {
      id: `SYNC-${Math.floor(1000 + Math.random() * 8999)}`,
      title: "New field visit",
      code: `SYNC-${Math.floor(1000 + Math.random() * 8999)}`,
      type: "Field Visit",
      description: "Field visit captured while working offline",
      captured: "03 Sep 2026, 02:21 PM",
      attempts: 0,
      status: "pending",
    };

    setRecords((current) => [newRecord, ...current]);
  }

  function retryFailed() {
    if (!online || failedCount === 0) return;

    setRecords((current) =>
      current.map((record) =>
        record.status === "failed"
          ? { ...record, status: "pending" }
          : record
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#f3fafa] text-slate-900">
      <div className="mx-auto max-w-[1180px] px-5 py-5 lg:px-0">
        {/* HEADER */}
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-2 text-xs text-slate-500">
              Dashboard&nbsp;&nbsp;/&nbsp;&nbsp;
              <span className="text-slate-700">Sync Center</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Offline Sync Center
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage locally captured records and synchronize them when
              connectivity is available.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* ONLINE */}
            <button
              onClick={() => setOnline((value) => !value)}
              className={`rounded-xl border px-5 py-3 text-left transition ${
                online
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div
                className={`flex items-center gap-2 text-sm font-semibold ${
                  online ? "text-emerald-700" : "text-red-600"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    online ? "bg-emerald-500" : "bg-red-500"
                  }`}
                />
                {online ? "Online" : "Offline"}
              </div>

              <p className="mt-1 text-[10px] text-slate-500">
                Click to simulate connection
              </p>
            </button>

            {/* SYNC */}
            <button
              onClick={handleSync}
              disabled={!online || syncing || (pendingCount === 0 && failedCount === 0)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                online && !syncing && (pendingCount > 0 || failedCount > 0)
                  ? "bg-[#008f82] hover:bg-[#00796f]"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              <span className="mr-2">
                {syncing ? "↻" : "⟳"}
              </span>

              {syncing ? "Syncing..." : "Sync Now"}

              <span className="ml-2 rounded-md bg-white/15 px-2 py-0.5 text-xs">
                {pendingCount + failedCount}
              </span>
            </button>
          </div>
        </div>

        {/* CONNECTIVITY */}
        <section className="mt-5 rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                {online ? "⌁" : "×"}
              </div>

              <div>
                <h2 className="font-semibold">
                  {online
                    ? "Connectivity available"
                    : "No connectivity"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {online
                    ? "Pending local records can now be synchronized."
                    : "Records will remain safely stored locally."}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                Last successful sync
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-700">
                {lastSync}
              </p>
            </div>
          </div>
        </section>

        {/* FLOW */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
                →
              </div>

              <div>
                <h2 className="font-semibold">Offline-first data flow</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Capture locally → Queue → Connectivity → Sync → Confirm
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <StatusBadge status="pending" />
              <StatusBadge status="synced" />
              <StatusBadge status="failed" />
            </div>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Pending"
            value={pendingCount}
            description="Waiting for synchronization"
            icon="!"
            variant="pending"
          />

          <SummaryCard
            label="Synced"
            value={syncedCount}
            description="Successfully uploaded"
            icon="✓"
            variant="synced"
          />

          <SummaryCard
            label="Failed"
            value={failedCount}
            description="Requires retry"
            icon="⊗"
            variant="failed"
          />

          <SummaryCard
            label="Syncing"
            value={syncingCount}
            description="Currently processing"
            icon="⟳"
            variant="syncing"
          />
        </section>

        {/* SEARCH / FILTER */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sync records..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-50"
              />
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | SyncStatus)
              }
              className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-300"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="synced">Synced</option>
              <option value="failed">Failed</option>
              <option value="syncing">Syncing</option>
            </select>

            <button
              onClick={retryFailed}
              disabled={!online || failedCount === 0}
              className="h-11 rounded-xl border border-red-100 bg-red-50 px-5 text-sm font-semibold text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Retry Failed
            </button>
          </div>
        </section>

        {/* QUEUE */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
            <div>
              <h2 className="font-semibold">Sync Queue</h2>
              <p className="mt-1 text-xs text-slate-500">
                Review local records before they are synchronized.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-600">
              {records.length} TOTAL
            </span>
          </div>

          {filteredRecords.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <p className="font-semibold text-slate-700">
                No sync records found
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            filteredRecords.map((record, index) => (
              <div
                key={record.id}
                className={`flex flex-col gap-5 px-5 py-5 lg:flex-row lg:items-center lg:justify-between ${
                  index !== filteredRecords.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xs font-bold text-emerald-700">
                    {record.type === "Field Visit"
                      ? "FV"
                      : record.type === "Follow-up"
                      ? "FU"
                      : record.type === "Patient Registration"
                      ? "PR"
                      : "RU"}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {record.title}
                      </h3>

                      <StatusBadge status={record.status} />
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      {record.code} • {record.type}
                    </p>

                    <p className="mt-2 text-sm text-slate-700">
                      {record.description}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Captured: {record.captured} • Attempts:{" "}
                      {record.attempts}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 lg:w-[170px]">
                  {record.status === "synced" ? (
                    <div className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-xs font-semibold text-emerald-700">
                      ⊙ Successfully Synced ✓
                    </div>
                  ) : record.status === "failed" ? (
                    <button
                      onClick={retryFailed}
                      className="w-full rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-600"
                    >
                      Retry Sync
                    </button>
                  ) : record.status === "syncing" ? (
                    <div className="rounded-xl bg-blue-50 px-4 py-3 text-center text-xs font-semibold text-blue-700">
                      ⟳ Synchronizing...
                    </div>
                  ) : (
                    <div className="rounded-xl bg-amber-50 px-4 py-3 text-center text-xs font-semibold text-amber-700">
                      Waiting to Sync
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </section>

        {/* ACTIVITY */}
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5">
            <h2 className="font-semibold">Sync Activity</h2>
            <p className="mt-1 text-xs text-slate-500">
              Recent local synchronization events.
            </p>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-3">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className={`rounded-xl border p-4 ${
                  activity.type === "failed"
                    ? "border-red-100 bg-red-50/30"
                    : "border-slate-100 bg-slate-50/30"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className={`text-sm font-semibold ${
                      activity.type === "failed"
                        ? "text-red-600"
                        : "text-slate-800"
                    }`}
                  >
                    {activity.title}
                  </h3>

                  <span className="text-[9px] text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURE CARDS */}
        <section className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
              Offline-first
            </p>

            <h3 className="mt-3 font-semibold">
              Keep working without connectivity
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Field workers can continue capturing required information even
              when the network is unavailable.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
              Safe synchronization
            </p>

            <h3 className="mt-3 font-semibold">
              Queue before upload
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Local records remain queued until connectivity is available and
              synchronization can be attempted.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
              Failure recovery
            </p>

            <h3 className="mt-3 font-semibold">
              Retry failed records
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Records that fail synchronization remain identifiable so they
              can be retried later.
            </p>
          </div>
        </section>

        {/* SIMULATE */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={simulateOfflineCapture}
            className="rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
          >
            ☁ &nbsp; Simulate Offline Capture
          </button>
        </div>

        {/* NOTICE */}
        <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              ⓘ
            </div>

            <div>
              <h3 className="text-xs font-semibold text-blue-800">
                Prototype sync center
              </h3>

              <p className="mt-1 text-[11px] leading-5 text-blue-700">
                Queue state, connection switching, synchronization and retry
                behavior currently run in frontend demo state. Real offline
                storage, conflict handling and API synchronization should be
                implemented in the production data layer.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}