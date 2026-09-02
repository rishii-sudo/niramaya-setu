"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type SyncStatus = "Pending" | "Synced" | "Failed" | "Syncing";

type SyncItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  createdAt: string;
  status: SyncStatus;
  attempts: number;
};

const initialQueue: SyncItem[] = [
  {
    id: "SYNC-1041",
    type: "Field Visit",
    title: "Ramesh Kumar visit",
    description: "Vitals and referral follow-up recorded",
    createdAt: "03 Sep 2026, 11:42 PM",
    status: "Pending",
    attempts: 0,
  },
  {
    id: "SYNC-1038",
    type: "Referral Update",
    title: "REF-24017 status update",
    description: "Referral marked for field follow-up",
    createdAt: "03 Sep 2026, 10:56 PM",
    status: "Pending",
    attempts: 0,
  },
  {
    id: "SYNC-1035",
    type: "Follow-up",
    title: "Sunita Devi follow-up",
    description: "Patient contacted and next action recorded",
    createdAt: "03 Sep 2026, 08:24 PM",
    status: "Synced",
    attempts: 1,
  },
  {
    id: "SYNC-1031",
    type: "Patient Registration",
    title: "Kamla Devi registration",
    description: "New patient demographic record created",
    createdAt: "03 Sep 2026, 05:15 PM",
    status: "Synced",
    attempts: 1,
  },
  {
    id: "SYNC-1027",
    type: "Referral Update",
    title: "REF-24005 update",
    description: "Receiving facility status update",
    createdAt: "03 Sep 2026, 02:18 PM",
    status: "Failed",
    attempts: 2,
  },
];

export default function SyncPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [queue, setQueue] = useState<SyncItem[]>(initialQueue);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("03 Sep 2026, 08:30 AM");
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Synced" | "Failed"
  >("All");
  const [search, setSearch] = useState("");

  const pendingCount = queue.filter(
    (item) => item.status === "Pending"
  ).length;

  const syncedCount = queue.filter(
    (item) => item.status === "Synced"
  ).length;

  const failedCount = queue.filter(
    (item) => item.status === "Failed"
  ).length;

  const syncingCount = queue.filter(
    (item) => item.status === "Syncing"
  ).length;

  const filteredQueue = useMemo(() => {
    const query = search.trim().toLowerCase();

    return queue.filter((item) => {
      const matchesFilter =
        filter === "All" || item.status === filter;

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [queue, filter, search]);

  const runSync = (onlyFailed = false) => {
    if (syncing || !isOnline) return;

    const eligible = queue.filter((item) =>
      onlyFailed
        ? item.status === "Failed"
        : item.status === "Pending" || item.status === "Failed"
    );

    if (eligible.length === 0) return;

    setSyncing(true);

    setQueue((current) =>
      current.map((item) =>
        eligible.some((entry) => entry.id === item.id)
          ? {
              ...item,
              status: "Syncing",
            }
          : item
      )
    );

    setTimeout(() => {
      setQueue((current) =>
        current.map((item) => {
          if (item.status !== "Syncing") {
            return item;
          }

          return {
            ...item,
            status: "Synced",
            attempts: item.attempts + 1,
          };
        })
      );

      setLastSync(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      setSyncing(false);
    }, 1400);
  };

  const retrySingle = (id: string) => {
    if (!isOnline || syncing) return;

    setQueue((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Syncing",
            }
          : item
      )
    );

    setTimeout(() => {
      setQueue((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "Synced",
                attempts: item.attempts + 1,
              }
            : item
        )
      );

      setLastSync(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1100);
  };

  const toggleConnection = () => {
    setIsOnline((current) => !current);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/dashboard"
                className="transition hover:text-teal-700"
              >
                Dashboard
              </Link>

              <span>/</span>

              <span className="text-slate-700">Sync Center</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Offline Sync Center
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Manage locally captured records and synchronize them when
              connectivity is available.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Connection */}
            <button
              type="button"
              onClick={toggleConnection}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                isOnline
                  ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
                  : "border-amber-200 bg-amber-50 hover:bg-amber-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isOnline
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />

                <span
                  className={`text-sm font-semibold ${
                    isOnline
                      ? "text-emerald-900"
                      : "text-amber-900"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              <p
                className={`mt-1 text-[11px] ${
                  isOnline
                    ? "text-emerald-700"
                    : "text-amber-700"
                }`}
              >
                Click to simulate connection
              </p>
            </button>

            {/* Sync button */}
            <button
              type="button"
              onClick={() => runSync(false)}
              disabled={
                syncing || !isOnline || pendingCount + failedCount === 0
              }
              className="rounded-xl bg-teal-700 px-4 py-3 text-left text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <svg
                  className={`h-4 w-4 ${
                    syncing ? "animate-spin" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
                  <path d="M4 5v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
                  <path d="M20 19v-4h-4" />
                </svg>

                <span className="text-sm font-semibold">
                  {syncing ? "Syncing..." : "Sync Now"}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-white/80">
                {pendingCount + failedCount} records ready
              </p>
            </button>
          </div>
        </div>

        {/* Status banner */}
        <section
          className={`mb-6 rounded-2xl border p-4 shadow-sm ${
            isOnline
              ? "border-emerald-100 bg-white/90"
              : "border-amber-200 bg-amber-50/80"
          }`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  isOnline
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12.5a10 10 0 0 1 14 0" />
                  <path d="M8 15.5a6 6 0 0 1 8 0" />
                  <path d="M11 18.5a2 2 0 0 1 2 0" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  {isOnline
                    ? "Connectivity available"
                    : "Working offline"}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {isOnline
                    ? "Pending local records can now be synchronized."
                    : "Records remain available locally and can be synced when connectivity returns."}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Last successful sync
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {lastSync}
              </p>
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Offline-first data flow
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Capture locally → Queue → Connectivity → Sync → Confirm
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusLegend
                label="Pending"
                className="bg-amber-50 text-amber-700"
              />

              <StatusLegend
                label="Synced"
                className="bg-emerald-50 text-emerald-700"
              />

              <StatusLegend
                label="Failed"
                className="bg-red-50 text-red-700"
              />
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Pending"
            value={String(pendingCount)}
            detail="Waiting for synchronization"
            warning
          />

          <MetricCard
            label="Synced"
            value={String(syncedCount)}
            detail="Successfully uploaded"
          />

          <MetricCard
            label="Failed"
            value={String(failedCount)}
            detail="Requires retry"
            danger
          />

          <MetricCard
            label="Syncing"
            value={String(syncingCount)}
            detail="Currently processing"
            blue
          />
        </section>

        {/* Queue toolbar */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Sync Queue
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Review local records before they are synchronized.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search sync records..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 sm:w-72"
                />
              </div>

              <select
                value={filter}
                onChange={(event) =>
                  setFilter(
                    event.target.value as
                      | "All"
                      | "Pending"
                      | "Synced"
                      | "Failed"
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Synced</option>
                <option>Failed</option>
              </select>

              <button
                type="button"
                onClick={() => runSync(true)}
                disabled={
                  syncing || !isOnline || failedCount === 0
                }
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Retry Failed
              </button>
            </div>
          </div>
        </section>

        {/* Sync queue */}
        <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Local Record Queue
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredQueue.length} records shown
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                {queue.length} TOTAL
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredQueue.map((item) => (
              <div
                key={item.id}
                className="px-5 py-5 transition hover:bg-slate-50/60"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex min-w-0 items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        item.status === "Failed"
                          ? "bg-red-50 text-red-700"
                          : item.status === "Synced"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "Syncing"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.type === "Field Visit"
                        ? "FV"
                        : item.type === "Referral Update"
                        ? "RF"
                        : item.type === "Follow-up"
                        ? "FU"
                        : "PR"}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>

                        <SyncBadge status={item.status} />
                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.id} • {item.type}
                      </p>

                      <p className="mt-2 text-sm text-slate-700">
                        {item.description}
                      </p>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Captured: {item.createdAt} • Attempts:{" "}
                        {item.attempts}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    {item.status === "Failed" && (
                      <button
                        type="button"
                        onClick={() => retrySingle(item.id)}
                        disabled={!isOnline || syncing}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Retry
                      </button>
                    )}

                    {(item.status === "Pending" ||
                      item.status === "Failed") && (
                      <button
                        type="button"
                        onClick={() =>
                          item.status === "Failed"
                            ? retrySingle(item.id)
                            : runSync(false)
                        }
                        disabled={!isOnline || syncing}
                        className="rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Sync Record
                      </button>
                    )}

                    {item.status === "Synced" && (
                      <span className="rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700">
                        Successfully Synced ✓
                      </span>
                    )}

                    {item.status === "Syncing" && (
                      <span className="rounded-xl bg-blue-50 px-4 py-2.5 text-xs font-semibold text-blue-700">
                        Processing...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredQueue.length === 0 && (
              <div className="px-5 py-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  ✓
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-800">
                  No sync records found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try a different filter or search term.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Activity */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Sync Activity
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Recent local synchronization events.
            </p>
          </div>

          <div className="grid gap-3 p-4 md:grid-cols-3">
            <ActivityCard
              time="03 Sep, 08:30 AM"
              title="Sync completed"
              detail="12 records synchronized successfully"
            />

            <ActivityCard
              time="03 Sep, 07:12 AM"
              title="Offline capture"
              detail="Field visit stored locally"
            />

            <ActivityCard
              time="02 Sep, 11:48 PM"
              title="Sync failed"
              detail="Connection interrupted during upload"
              danger
            />
          </div>
        </section>

        {/* Bottom cards */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Offline-first"
            subtitle="Keep working without connectivity"
            text="Field workers can continue capturing required information even when the network is unavailable."
          />

          <InfoCard
            title="Safe synchronization"
            subtitle="Queue before upload"
            text="Local records remain queued until connectivity is available and synchronization can be attempted."
            amber
          />

          <InfoCard
            title="Failure recovery"
            subtitle="Retry failed records"
            text="Records that fail synchronization remain identifiable so they can be retried later."
            blue
          />
        </div>

        {/* Prototype note */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <path d="M12 7h.01" />
            </svg>

            <p className="text-xs leading-5 text-blue-800">
              Prototype sync center: queue state, connection switching,
              synchronization and retry behavior currently run in frontend
              demo state. Real offline storage, conflict handling and API
              synchronization should be implemented in the production data
              layer.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function MetricCard({
  label,
  value,
  detail,
  warning = false,
  danger = false,
  blue = false,
}: {
  label: string;
  value: string;
  detail: string;
  warning?: boolean;
  danger?: boolean;
  blue?: boolean;
}) {
  const border = danger
    ? "border-red-200"
    : warning
    ? "border-amber-200"
    : "border-slate-200";

  const valueColor = danger
    ? "text-red-700"
    : warning
    ? "text-amber-700"
    : blue
    ? "text-blue-700"
    : "text-slate-900";

  const iconBg = danger
    ? "bg-red-50 text-red-700"
    : warning
    ? "bg-amber-50 text-amber-700"
    : blue
    ? "bg-blue-50 text-blue-700"
    : "bg-teal-50 text-teal-700";

  return (
    <div
      className={`rounded-2xl border bg-white/90 p-5 shadow-sm ${border}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>

          <p className={`mt-3 text-3xl font-bold ${valueColor}`}>
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}
        >
          {danger || warning ? "!" : blue ? "↗" : "✓"}
        </div>
      </div>

      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function SyncBadge({
  status,
}: {
  status: SyncStatus;
}) {
  const styles: Record<SyncStatus, string> = {
    Pending: "bg-amber-50 text-amber-700",
    Synced: "bg-emerald-50 text-emerald-700",
    Failed: "bg-red-50 text-red-700",
    Syncing: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function StatusLegend({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

function ActivityCard({
  time,
  title,
  detail,
  danger = false,
}: {
  time: string;
  title: string;
  detail: string;
  danger?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        danger
          ? "border-red-100 bg-red-50/50"
          : "border-slate-100 bg-slate-50/60"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p
          className={`text-sm font-semibold ${
            danger ? "text-red-800" : "text-slate-800"
          }`}
        >
          {title}
        </p>

        <span className="text-[10px] text-slate-400">
          {time}
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {detail}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  subtitle,
  text,
  amber = false,
  blue = false,
}: {
  title: string;
  subtitle: string;
  text: string;
  amber?: boolean;
  blue?: boolean;
}) {
  const wrapper = amber
    ? "border-amber-200 bg-amber-50/80"
    : blue
    ? "border-blue-200 bg-blue-50/80"
    : "border-slate-200 bg-white/85";

  const label = amber
    ? "text-amber-700"
    : blue
    ? "text-blue-700"
    : "text-teal-700";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}>
      <p
        className={`text-[11px] font-bold uppercase tracking-wide ${label}`}
      >
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-900">
        {subtitle}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}