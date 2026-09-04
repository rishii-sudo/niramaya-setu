"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Settings,
  Shield,
  RefreshCw,
  Bell,
  Database,
  Lock,
  Wifi,
  Globe,
  CheckCircle2,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [offlineSyncInterval, setOfflineSyncInterval] = useState("15");
  const [maxOfflineQueue, setMaxOfflineQueue] = useState("200");
  const [autoRetryFailed, setAutoRetryFailed] = useState(true);
  const [consentExpiryDays, setConsentExpiryDays] = useState("30");
  const [maskAadhaarNumbers, setMaskAadhaarNumbers] = useState(true);
  const [enforceTokenExpiry, setEnforceTokenExpiry] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsGateway, setSmsGateway] = useState("Prototype Mock Gateway");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/dashboard" className="hover:text-teal-700">
                Administration
              </Link>
              <span>/</span>
              <span className="text-slate-800">System Settings</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              System Configuration & Policies
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Manage offline synchronization parameters, privacy guardrails, notification channels, and interoperability endpoints.
            </p>
          </div>

          {saved && (
            <span className="flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
              <CheckCircle2 size={16} />
              Settings Saved Successfully
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Offline Synchronization Policy */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <RefreshCw size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Offline-First & Synchronization</h2>
                <p className="text-[11px] text-slate-500">Configure client offline caching and background reconciliation parameters (production backend sync planned).</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-slate-700">Background Sync Interval (Minutes)</label>
                <select
                  value={offlineSyncInterval}
                  onChange={(e) => setOfflineSyncInterval(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600 bg-white"
                >
                  <option value="5">Every 5 minutes</option>
                  <option value="15">Every 15 minutes (Default)</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Hourly</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700">Max Offline Storage Queue Size</label>
                <select
                  value={maxOfflineQueue}
                  onChange={(e) => setMaxOfflineQueue(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600 bg-white"
                >
                  <option value="100">100 Records</option>
                  <option value="200">200 Records (Standard)</option>
                  <option value="500">500 Records (High Capacity)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={autoRetryFailed}
                    onChange={(e) => setAutoRetryFailed(e.target.checked)}
                    className="h-4 w-4 accent-teal-700"
                  />
                  <span className="font-semibold text-slate-700">Enable automatic exponential-backoff retry for failed packets</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Privacy & Data Protection */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Shield size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Privacy & Consent Guardrails</h2>
                <p className="text-[11px] text-slate-500">Enforce patient data confidentiality and temporary session token lifecycle.</p>
              </div>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-slate-700">Default Consent Validity Duration</label>
                  <select
                    value={consentExpiryDays}
                    onChange={(e) => setConsentExpiryDays(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600 bg-white"
                  >
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days (Standard Care Period)</option>
                    <option value="90">90 Days (Chronic Care)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-700">Identity Number Masking</label>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5 text-emerald-800 font-medium">
                    Strict Masking Enforced (XXXX-XXXX-1234)
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maskAadhaarNumbers}
                    onChange={(e) => setMaskAadhaarNumbers(e.target.checked)}
                    className="h-4 w-4 accent-teal-700"
                  />
                  <span className="font-semibold text-slate-700">Prevent raw Aadhaar/ABHA storage in local browser memory and QR payloads</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enforceTokenExpiry}
                    onChange={(e) => setEnforceTokenExpiry(e.target.checked)}
                    className="h-4 w-4 accent-teal-700"
                  />
                  <span className="font-semibold text-slate-700">Enforce 15-minute expiration on temporary referral QR verification tokens</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Notification & Messaging Gateway */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <Bell size={18} />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Alerts & Messaging Gateway</h2>
                <p className="text-[11px] text-slate-500">Configure 48-hour referral no-show alerts and SMS notification channels.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-slate-700">SMS Gateway Provider</label>
                <select
                  value={smsGateway}
                  onChange={(e) => setSmsGateway(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-teal-600 bg-white"
                >
                  <option value="Prototype Mock Gateway">Prototype Mock Gateway (Active)</option>
                  <option value="NIC SMS Gateway">NIC SMS Gateway (Government Sandbox)</option>
                  <option value="CDAC Mobile Seva">CDAC Mobile Seva (State Health API)</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700">Care Escalation</label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-600">
                  48-Hour Auto-Escalation to ASHA Field Queue
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="rounded-xl bg-teal-700 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-teal-800"
            >
              Save Configuration Changes
            </button>
          </div>
        </form>

        {/* Integration Points Note */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-800">
          <p className="font-semibold">Backend Integration Boundary</p>
          <p className="mt-0.5 text-[11px] text-blue-700">
            Settings saved in this prototype are preserved in frontend configuration state. Production deployment connects to Kubernetes ConfigMaps and microservice environment variables.
          </p>
        </div>
      </div>
    </main>
  );
}
