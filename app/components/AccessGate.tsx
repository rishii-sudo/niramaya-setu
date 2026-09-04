"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight, Lock, Sparkles, Activity } from "lucide-react";
import { Role } from "../context/RoleContext";
import { setDemoAuthForRole } from "../utils/auth";
import LanguageSelector from "./LanguageSelector";

interface AccessGateProps {
  requiredRole: Role;
  pathname: string;
}

export default function AccessGate({ requiredRole, pathname }: AccessGateProps) {
  const router = useRouter();

  const getRoleDetails = (role: Role) => {
    switch (role) {
      case "doctor":
        return {
          title: "Doctor / Clinician Workspace",
          loginPath: "/doctor/login",
          roleLabel: "Doctor",
          desc: "Clinical patient records, referral verification, and tele-consultation workflows.",
        };
      case "asha":
        return {
          title: "ASHA / ANM Field Portal",
          loginPath: "/asha/login",
          roleLabel: "ASHA / ANM",
          desc: "Village home visits, maternal-child care records, and offline referral creation.",
        };
      case "facility":
        return {
          title: "Facility Operations Workspace",
          loginPath: "/facility/login",
          roleLabel: "Facility Staff",
          desc: "Emergency admissions, incoming transfer queues, specialist rosters, and bed capacity.",
        };
      case "admin":
        return {
          title: "System Administration & Governance",
          loginPath: "/admin/login",
          roleLabel: "Administrator",
          desc: "District health metrics, security audit trails, user access control, and platform settings.",
        };
      case "patient":
        return {
          title: "Personal Patient Health Portal",
          loginPath: "/login",
          roleLabel: "Patient",
          desc: "Personal health records, referral timeline tracking, and doctor appointment booking.",
        };
      default:
        return {
          title: "Protected Health Workspace",
          loginPath: "/login",
          roleLabel: "Authorized User",
          desc: "Restricted healthcare continuum workflows.",
        };
    }
  };

  const details = getRoleDetails(requiredRole);

  const handleQuickDemoSignIn = () => {
    setDemoAuthForRole(requiredRole);
    // Reload to re-initialize RoleContext and AppShell with newly set session
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white font-bold text-xs shadow-sm">
              <Activity size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">NIRAMAYA-SETU</p>
              <p className="text-[10px] text-slate-500 font-medium">Rural Healthcare Platform</p>
            </div>
          </Link>

          <LanguageSelector />
        </div>
      </header>

      {/* Access Gate Card */}
      <div className="mx-auto my-auto w-full max-w-md p-4 sm:p-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-sm">
            <ShieldAlert size={28} />
          </div>

          <div className="mt-5 text-center">
            <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 border border-amber-200">
              Authentication Required
            </span>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Access Restricted
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              You are navigating to a protected route:{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-800 text-[11px]">
                {pathname}
              </code>
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-xs">
            <p className="font-bold text-slate-800">{details.title}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              {details.desc}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-amber-700">
              <Lock size={12} className="shrink-0" />
              <span>Fresh browser sessions must sign in before accessing protected health data.</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href={details.loginPath}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-xs font-bold text-white transition hover:bg-teal-800 shadow-sm"
            >
              Sign In to {details.roleLabel} Portal
              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              onClick={handleQuickDemoSignIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 py-3 text-xs font-bold text-teal-900 transition hover:bg-teal-100"
            >
              <Sparkles size={14} className="text-teal-700" />
              Quick Prototype Demo Sign-In ({details.roleLabel})
            </button>

            <Link
              href="/"
              className="flex w-full items-center justify-center py-2 text-xs font-semibold text-slate-500 transition hover:text-slate-800"
            >
              ← Return to Platform Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer disclaimer */}
      <footer className="py-4 text-center text-[10px] text-slate-400">
        NIRAMAYA-SETU • Prototype Security & Role Boundary Gate
      </footer>
    </main>
  );
}
