"use client";

import { useState } from "react";
import {
  HeartPulse,
  ShieldCheck,
  UserRound,
  Stethoscope,
  UsersRound,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";

const roles = [
  {
    id: "patient",
    title: "Patient",
    description: "View your health records and referrals",
    icon: UserRound,
  },
  {
    id: "asha",
    title: "ASHA / ANM",
    description: "Manage patients and community care",
    icon: UsersRound,
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Review patients and manage referrals",
    icon: Stethoscope,
  },
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("asha");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
              <HeartPulse size={23} strokeWidth={2.2} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                NIRAMAYA-SETU
              </h1>
              <p className="text-[11px] font-medium text-slate-500">
                Care Continuity Platform
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
            <ShieldCheck size={17} />
            Secure Healthcare Access
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl items-center px-6 py-12 lg:px-8">
        <div className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          
          {/* Left content */}
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800">
              <span className="h-2 w-2 rounded-full bg-teal-600" />
              Connected Care • Better Continuity
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              One patient journey.
              <span className="block text-teal-700">
                Connected across care.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">
              NIRAMAYA-SETU helps connect patients, frontline health workers,
              doctors and healthcare facilities through a continuous care and
              referral journey.
            </p>

            {/* Journey */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-sm font-medium">
              <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                Access
              </span>

              <ArrowRight size={16} className="text-slate-400" />

              <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                Record
              </span>

              <ArrowRight size={16} className="text-slate-400" />

              <span className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-2 text-teal-800 shadow-sm">
                Refer
              </span>

              <ArrowRight size={16} className="text-slate-400" />

              <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
                Follow
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <LockKeyhole size={17} className="text-teal-700" />
              <span>Secure, consent-based healthcare access</span>
            </div>
          </div>

          {/* Login card */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-7">
                <h3 className="text-2xl font-bold text-slate-900">
                  Welcome back
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Select your role to continue to NIRAMAYA-SETU.
                </p>
              </div>

              {/* Role selection */}
              <div className="space-y-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;

                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? "border-teal-600 bg-teal-50"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-teal-700 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon size={21} />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                          {role.title}
                        </p>

                        <p className="mt-0.5 text-xs leading-5 text-slate-500">
                          {role.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Continue */}
              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800">
                Continue as{" "}
                {roles.find((role) => role.id === selectedRole)?.title}
                <ArrowRight size={17} />
              </button>

              <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                Your access is protected using role-based authentication and
                consent controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-xs text-slate-400 lg:px-8">
          <span>© 2026 NIRAMAYA-SETU</span>
          <span>Digital Healthcare • Care Continuity</span>
        </div>
      </footer>
    </main>
  );
}