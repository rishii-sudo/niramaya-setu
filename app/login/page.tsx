"use client";

import { ArrowLeft, HeartPulse, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <div className="ml-6 h-5 w-px bg-slate-200" />

          <div className="ml-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
              <HeartPulse size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                NIRAMAYA-SETU
              </p>
              <p className="text-[10px] text-slate-500">
                Care Continuity Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-semibold text-teal-700">
              ASHA / ANM ACCESS
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Sign in to continue
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Access patient records, referrals and follow-up tasks securely.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="mobile"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Registered mobile number
              </label>

              <input
                id="mobile"
                type="tel"
                placeholder="Enter mobile number"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              Sign in
            </Link>
          </form>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
            <LockKeyhole
              size={18}
              className="mt-0.5 shrink-0 text-teal-700"
            />

            <p className="text-xs leading-5 text-slate-500">
              Your access is protected using role-based authentication and
              consent controls.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}