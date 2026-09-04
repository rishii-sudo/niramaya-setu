"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HeartPulse,
  UserRound,
  Stethoscope,
  UsersRound,
  Building2,
  ArrowRight,
  LockKeyhole,
  MapPin,
  Info,
  Activity,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";

const roles = [
  {
    id: "patient",
    title: "Patient / Citizen",
    description: "Access personal health records, track referrals, and consult doctors online",
    icon: UserRound,
    path: "/login",
  },
  {
    id: "asha",
    title: "ASHA / ANM Field Worker",
    description: "Record village visits, initiate emergency referrals, and manage offline follow-ups",
    icon: UsersRound,
    path: "/asha/login",
  },
  {
    id: "doctor",
    title: "Doctor / Clinician",
    description: "Review clinical records, verify referral tokens, and conduct tele-consultations",
    icon: Stethoscope,
    path: "/doctor/login",
  },
  {
    id: "facility",
    title: "Facility Staff / Hospital",
    description: "Manage admissions, incoming referrals, specialist rosters, and bed capacity",
    icon: Building2,
    path: "/facility/login",
  },
  {
    id: "admin",
    title: "Health Administrator / Partner",
    description: "Monitor district-level referral analytics, security audit trails, and system policies",
    icon: Activity,
    path: "/admin/login",
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("asha");
  const { t } = useLanguage();

  const handleContinue = () => {
    const roleObj = roles.find((r) => r.id === selectedRole);
    if (roleObj) {
      router.push(roleObj.path);
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 py-3.5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm transition group-hover:bg-teal-800">
              <HeartPulse size={23} strokeWidth={2.2} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-slate-900">
                  {t.appName}
                </h1>
                <span className="hidden sm:inline-flex rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
                  Access Portal
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500">
                {t.tagline}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Links */}
            <div className="hidden md:flex items-center gap-3 text-xs font-semibold text-slate-600">
              <Link href="/" className="hover:text-teal-700 transition">
                Home
              </Link>
              <span>•</span>
              <Link href="/about" className="hover:text-teal-700 transition">
                {t.aboutUs}
              </Link>
              <span>•</span>
              <Link href="/facilities" className="hover:text-teal-700 transition">
                {t.findNearbyHealthcare}
              </Link>
              <span>•</span>
              <Link href="/doctors" className="hover:text-teal-700 transition">
                {t.doctorDirectory}
              </Link>
            </div>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Hero & Role Selection */}
      <section className="mx-auto flex-1 w-full max-w-7xl items-center px-5 py-8 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-700 transition"
          >
            <ArrowLeft size={14} />
            Back to Welcome
          </Link>
        </div>

        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Hero Content */}
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-800">
              <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
              Role-Based Care Access
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Select your workspace.
              <span className="block text-teal-700">
                Continue your care journey.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
              NIRAMAYA-SETU connects patients, front-line village workers, clinicians, and facility administrators in a synchronized, privacy-protected workflow.
            </p>

            {/* ACCESS -> RECORD -> REFER -> FOLLOW Pipeline */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Care Continuity Pipeline
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs font-bold">
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700">
                  1. ACCESS
                </span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-slate-700">
                  2. RECORD
                </span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-1.5 text-teal-800">
                  3. REFER
                </span>
                <ArrowRight size={14} className="text-slate-400" />
                <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-emerald-800">
                  4. FOLLOW
                </span>
              </div>
            </div>

            {/* Feature quick links */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Link
                href="/facilities"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-teal-500 hover:text-teal-700"
              >
                <MapPin size={16} className="text-teal-600" />
                <span>Nearby Facilities</span>
              </Link>
              <Link
                href="/doctors"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-teal-500 hover:text-teal-700"
              >
                <Stethoscope size={16} className="text-teal-600" />
                <span>Doctor Directory</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-teal-500 hover:text-teal-700"
              >
                <Info size={16} className="text-teal-600" />
                <span>About Platform</span>
              </Link>
            </div>
          </div>

          {/* Right: Role Selection Card */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl shadow-slate-200/50">
              <div className="mb-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Secure Access
                </span>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  What best describes you?
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Select your role to access your dedicated workspace or health records.
                </p>
              </div>

              {/* Role List */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex w-full items-center gap-3.5 rounded-2xl border p-3.5 text-left transition ${
                        isSelected
                          ? "border-teal-600 bg-teal-50/70 shadow-sm ring-1 ring-teal-600"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isSelected
                            ? "bg-teal-700 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <Icon size={19} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {role.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-4 text-slate-500 line-clamp-2">
                          {role.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-teal-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Continue CTA */}
              <button
                type="button"
                onClick={handleContinue}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-700 px-4 py-3.5 text-xs font-bold text-white shadow-md shadow-teal-900/10 transition hover:bg-teal-800"
              >
                Continue as {roles.find((r) => r.id === selectedRole)?.title.split(" ")[0]}
                <ArrowRight size={15} />
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <LockKeyhole size={12} className="text-teal-700" />
                <span>Role selection proceeds to secure verification • No auto-login</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 NIRAMAYA-SETU • Rural Healthcare Care Continuity Platform</p>
          <div className="flex justify-center gap-4 text-[11px] font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal-700">Home</Link>
            <Link href="/about" className="hover:text-teal-700">About</Link>
            <Link href="/facilities" className="hover:text-teal-700">Nearby Facilities</Link>
            <Link href="/doctors" className="hover:text-teal-700">Doctors</Link>
            <Link href="/consent" className="hover:text-teal-700">Privacy & Consent</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
