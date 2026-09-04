"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type NotificationType =
  | "Referral"
  | "Follow-up"
  | "Sync"
  | "Consent"
  | "Patient"
  | "System";

type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  urgent?: boolean;
  actionLabel?: string;
  actionHref?: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "NTF-1001",
    type: "Follow-up",
    title: "48-hour no-show alert",
    message:
      "Ramesh Kumar has not yet been confirmed at SMS Hospital after referral.",
    time: "10 min ago",
    date: "03 Sep 2026",
    read: false,
    urgent: true,
    actionLabel: "Open Follow-up",
    actionHref: "/asha/follow-ups",
  },
  {
    id: "NTF-1002",
    type: "Referral",
    title: "Urgent referral in transit",
    message:
      "NS-28491 for Ramesh Kumar is currently marked In Transit.",
    time: "28 min ago",
    date: "03 Sep 2026",
    read: false,
    urgent: true,
    actionLabel: "View Referral",
    actionHref: "/referrals/NS-28491",
  },
  {
    id: "NTF-1003",
    type: "Follow-up",
    title: "Follow-up due today",
    message:
      "Sunita Devi requires medication adherence follow-up today.",
    time: "1 hour ago",
    date: "03 Sep 2026",
    read: false,
    actionLabel: "Record Visit",
    actionHref: "/asha/visits",
  },
  {
    id: "NTF-1004",
    type: "Sync",
    title: "Sync failed",
    message:
      "NS-28461 update could not be synchronized. Retry is available.",
    time: "2 hours ago",
    date: "03 Sep 2026",
    read: false,
    actionLabel: "Open Sync Center",
    actionHref: "/sync",
  },
  {
    id: "NTF-1005",
    type: "Referral",
    title: "Referral received",
    message:
      "District Hospital has received NS-28461 for Mohan Lal.",
    time: "Yesterday",
    date: "02 Sep 2026",
    read: true,
    actionLabel: "View Referral",
    actionHref: "/referrals/NS-28461",
  },
  {
    id: "NTF-1006",
    type: "Consent",
    title: "Consent updated",
    message:
      "Consent information for Ramesh Kumar was updated successfully.",
    time: "Yesterday",
    date: "02 Sep 2026",
    read: true,
    actionLabel: "View Consent",
    actionHref: "/consent",
  },
  {
    id: "NTF-1007",
    type: "Patient",
    title: "New patient registered",
    message:
      "Kamla Devi was added to the patient registry.",
    time: "2 days ago",
    date: "01 Sep 2026",
    read: true,
    actionLabel: "View Patient",
    actionHref: "/patients/NS-10263",
  },
  {
    id: "NTF-1008",
    type: "Sync",
    title: "12 records synchronized",
    message:
      "The latest offline records were synchronized successfully.",
    time: "2 days ago",
    date: "01 Sep 2026",
    read: true,
    actionLabel: "Open Sync Center",
    actionHref: "/sync",
  },
];

const filterOptions: Array<"All" | NotificationType> = [
  "All",
  "Referral",
  "Follow-up",
  "Sync",
  "Consent",
  "Patient",
  "System",
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    initialNotifications
  );

  const [filter, setFilter] = useState<"All" | NotificationType>("All");
  const [search, setSearch] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const urgentCount = notifications.filter(
    (notification) => notification.urgent && !notification.read
  ).length;

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesFilter =
        filter === "All" || notification.type === filter;

      const matchesUnread =
        !showUnreadOnly || !notification.read;

      const matchesSearch =
        !query ||
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.type.toLowerCase().includes(query);

      return (
        matchesFilter &&
        matchesUnread &&
        matchesSearch
      );
    });
  }, [notifications, filter, search, showUnreadOnly]);

  const markAsRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: false,
            }
          : notification
      )
    );
  };

  const toggleRead = (id: string) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: !notification.read,
            }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const clearReadNotifications = () => {
    setNotifications((current) =>
      current.filter((notification) => !notification.read)
    );
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
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

              <span className="text-slate-700">
                Notifications
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Notifications & Alerts
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Review referral alerts, follow-up reminders, sync events and
              important patient activity.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                <span className="text-sm font-semibold text-red-900">
                  Urgent
                </span>
              </div>

              <p className="mt-1 text-[11px] text-red-700">
                {urgentCount} requiring attention
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Unread
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {unreadCount}
              </p>
            </div>
          </div>
        </div>

        {/* ALERT SUMMARY */}
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Care continuity alerts
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Important events from referrals, field follow-ups,
                  consent and synchronization are surfaced here.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-800 transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Mark All as Read
            </button>
          </div>
        </section>

        {/* METRICS */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total"
            value={String(notifications.length)}
            detail="All notifications"
          />

          <MetricCard
            label="Unread"
            value={String(unreadCount)}
            detail="Need review"
            warning
          />

          <MetricCard
            label="Urgent"
            value={String(urgentCount)}
            detail="Priority attention"
            danger
          />

          <MetricCard
            label="Read"
            value={String(
              notifications.filter(
                (notification) => notification.read
              ).length
            )}
            detail="Already reviewed"
            blue
          />
        </section>

        {/* TOOLBAR */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Notification Center
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Filter alerts by type or search the message content.
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
                    placeholder="Search notifications..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100 sm:w-80"
                  />
                </div>

                <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={showUnreadOnly}
                    onChange={(event) =>
                      setShowUnreadOnly(event.target.checked)
                    }
                    className="h-4 w-4 accent-teal-700"
                  />
                  Unread only
                </label>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {filterOptions.map((option) => {
                const active = filter === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFilter(option)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-teal-700 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={clearReadNotifications}
                className="ml-auto whitespace-nowrap rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
              >
                Clear Read
              </button>
            </div>
          </div>
        </section>

        {/* LIST */}
        <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Alerts & Notifications
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {filteredNotifications.length} notifications shown
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                LIVE QUEUE
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                onToggleRead={toggleRead}
                onMarkRead={markAsRead}
                onMarkUnread={markAsUnread}
              />
            ))}

            {filteredNotifications.length === 0 && (
              <div className="px-5 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  ✓
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-800">
                  No notifications found
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Try a different search or filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CHANNELS */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">
              Alert Categories
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Notifications generated from key NIRAMAYA-SETU workflows.
            </p>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <CategoryCard
              title="Referral Alerts"
              value="02"
              detail="Referral created, received or delayed"
              type="Referral"
            />

            <CategoryCard
              title="Follow-up Alerts"
              value="02"
              detail="48-hour no-show and follow-up reminders"
              type="Follow-up"
              amber
            />

            <CategoryCard
              title="Sync Alerts"
              value="02"
              detail="Pending, failed or completed synchronization"
              type="Sync"
              danger
            />

            <CategoryCard
              title="Consent Alerts"
              value="01"
              detail="Consent changes and access events"
              type="Consent"
              blue
            />
          </div>
        </section>

        {/* PROTOTYPE NOTE */}
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
              Prototype notification center: notification generation,
              persistence and delivery currently use frontend demo data.
              Production alerts should be generated by the backend and
              delivered according to role, consent and authorization rules.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   NOTIFICATION ROW
   ========================================================= */

function NotificationRow({
  notification,
  onToggleRead,
  onMarkRead,
  onMarkUnread,
}: {
  notification: NotificationItem;
  onToggleRead: (id: string) => void;
  onMarkRead: (id: string) => void;
  onMarkUnread: (id: string) => void;
}) {
  return (
    <div
      className={`px-5 py-5 transition ${
        notification.read
          ? "bg-white"
          : notification.urgent
          ? "bg-amber-50/30"
          : "bg-teal-50/20"
      } hover:bg-slate-50/70`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getTypeIconStyle(
              notification.type,
              notification.urgent
            )}`}
          >
            <NotificationIcon type={notification.type} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {!notification.read && (
                <span className="h-2 w-2 rounded-full bg-teal-600" />
              )}

              <p className="font-semibold text-slate-900">
                {notification.title}
              </p>

              <TypeBadge type={notification.type} />

              {notification.urgent && (
                <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-bold text-red-700">
                  URGENT
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-slate-400">
              {notification.id} • {notification.date} •{" "}
              {notification.time}
            </p>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">
              {notification.message}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0 lg:items-center">
          {notification.actionHref && (
            <Link
              href={notification.actionHref}
              onClick={() => onMarkRead(notification.id)}
              className="rounded-xl bg-teal-700 px-4 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-teal-800"
            >
              {notification.actionLabel}
            </Link>
          )}

          <button
            type="button"
            onClick={() => onToggleRead(notification.id)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            {notification.read ? "Mark Unread" : "Mark Read"}
          </button>

          {!notification.read && (
            <button
              type="button"
              onClick={() => onMarkRead(notification.id)}
              className="hidden rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-xs font-semibold text-teal-800 sm:block"
            >
              ✓
            </button>
          )}

          {notification.read && (
            <button
              type="button"
              onClick={() => onMarkUnread(notification.id)}
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-500 sm:block"
            >
              •
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   METRIC
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

      <p className="mt-2 text-xs text-slate-500">
        {detail}
      </p>
    </div>
  );
}

/* =========================================================
   CATEGORY CARD
   ========================================================= */

function CategoryCard({
  title,
  value,
  detail,
  type,
  amber = false,
  danger = false,
  blue = false,
}: {
  title: string;
  value: string;
  detail: string;
  type: NotificationType;
  amber?: boolean;
  danger?: boolean;
  blue?: boolean;
}) {
  const wrapper = danger
    ? "border-red-200 bg-red-50/60"
    : amber
    ? "border-amber-200 bg-amber-50/60"
    : blue
    ? "border-blue-200 bg-blue-50/60"
    : "border-slate-200 bg-white/80";

  const icon = danger
    ? "bg-red-100 text-red-700"
    : amber
    ? "bg-amber-100 text-amber-700"
    : blue
    ? "bg-blue-100 text-blue-700"
    : "bg-teal-50 text-teal-700";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}>
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${icon}`}
        >
          <NotificationIcon type={type} />
        </div>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {detail}
      </p>
    </div>
  );
}

/* =========================================================
   TYPE BADGE
   ========================================================= */

function TypeBadge({
  type,
}: {
  type: NotificationType;
}) {
  const styles: Record<NotificationType, string> = {
    Referral: "bg-blue-50 text-blue-700",
    "Follow-up": "bg-amber-50 text-amber-700",
    Sync: "bg-violet-50 text-violet-700",
    Consent: "bg-emerald-50 text-emerald-700",
    Patient: "bg-teal-50 text-teal-700",
    System: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${styles[type]}`}
    >
      {type}
    </span>
  );
}

/* =========================================================
   ICON STYLE
   ========================================================= */

function getTypeIconStyle(
  type: NotificationType,
  urgent?: boolean
) {
  if (urgent) {
    return "bg-red-50 text-red-700";
  }

  const styles: Record<NotificationType, string> = {
    Referral: "bg-blue-50 text-blue-700",
    "Follow-up": "bg-amber-50 text-amber-700",
    Sync: "bg-violet-50 text-violet-700",
    Consent: "bg-emerald-50 text-emerald-700",
    Patient: "bg-teal-50 text-teal-700",
    System: "bg-slate-100 text-slate-600",
  };

  return styles[type];
}

/* =========================================================
   ICON
   ========================================================= */

function NotificationIcon({
  type,
}: {
  type: NotificationType;
}) {
  if (type === "Referral") {
    return (
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
    );
  }

  if (type === "Follow-up") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "Sync") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20 11a8 8 0 0 0-15.4-2" />
        <path d="M4 5v4h4" />
        <path d="M4 13a8 8 0 0 0 15.4 2" />
        <path d="M20 19v-4h-4" />
      </svg>
    );
  }

  if (type === "Consent") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  }

  if (type === "Patient") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    );
  }

  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}