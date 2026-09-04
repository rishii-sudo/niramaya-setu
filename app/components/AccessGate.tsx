"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight, Lock, Sparkles, Activity } from "lucide-react";
import { Role } from "../context/RoleContext";
import { setDemoAuthForRole } from "../utils/auth";
import LanguageSelector from "./LanguageSelector";

interface AccessGateProps {
  requiredRole: Role;
  currentRole?: Role;
  pathname: string;
}

export default function AccessGate({ requiredRole, currentRole, pathname }: AccessGateProps) {
  const router = useRouter();

  const getRoleDetails = (role: Role) => {
    switch (role) {
      case "doctor":
        return {
          title: "Doctor / Clinician Workspace",
          loginPath: "/doctor/login",
          roleLabel: "Doctor",
          dashboardPath: "/doctor",
          desc: "Clinical patient records, referral verification, and tele-consultation workflows.",
        };
      case "asha":
        return {
          title: "ASHA / ANM Field Portal",
          loginPath: "/asha/login",
          roleLabel: "ASHA / ANM",
          dashboardPath: "/asha",
          desc: "Village home visits, maternal-child care records, and offline referral creation.",
        };
      case "facility":
        return {
          title: "Facility Operations Workspace",
          loginPath: "/facility/login",
          roleLabel: "Facility Staff",
          dashboardPath: "/facility/dashboard",
          desc: "Emergency admissions, incoming transfer queues, specialist rosters, and bed capacity.",
        };
      case "admin":
        return {
          title: "System Administration & Governance",
          loginPath: "/admin/login",
          roleLabel: "Administrator",
          dashboardPath: "/dashboard",
          desc: "District health metrics, security audit trails, user access control, and platform settings.",
        };
      case "patient":
        return {
          title: "Personal Patient Health Portal",
          loginPath: "/login",
          roleLabel: "Patient",
          dashboardPath: "/patient",
          desc: "Personal health records, referral timeline tracking, and doctor appointment booking.",
        };
      default:
        return {
          title: "Protected Health Workspace",
          loginPath: "/login",
          roleLabel: "Authorized User",
          dashboardPath: "/",
          desc: "Restricted healthcare continuum workflows.",
        };
    }
  };

  const details = getRoleDetails(requiredRole);
  const isCrossRoleContamination = currentRole && currentRole !== "public" && currentRole !== requiredRole;
  const currentDetails = currentRole ? getRoleDetails(currentRole) : null;

  const handleQuickDemoSignIn = () => {
    setDemoAuthForRole(requiredRole);
    if (typeof window !== "undefined") {
      localStorage.setItem("niramaya-active-role", requiredRole);
    }
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
              {isCrossRoleContamination ? "Access Boundary Check" : "Authentication Required"}
            </span>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {isCrossRoleContamination ? `${details.roleLabel} Access Required` : "Access Restricted"}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              {isCrossRoleContamination ? (
                <>
                  You are currently active in <strong className="text-slate-700">{currentDetails?.title}</strong>. This route requires {details.roleLabel} permissions:
                </>
              ) : (
                <>You are navigating to a protected route:</>
              )}{" "}
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
              <span>
                {isCrossRoleContamination
                  ? `Role isolation active. Return to your active workspace or sign in as ${details.roleLabel}.`
                  : "Fresh browser sessions must sign in before accessing protected health data."}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {isCrossRoleContamination && currentDetails ? (
              <Link
                href={currentDetails.dashboardPath}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-xs font-bold text-white transition hover:bg-teal-800 shadow-sm"
              >
                ← Return to {currentDetails.roleLabel} Workspace
              </Link>
            ) : null}

            <Link
              href={details.loginPath}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition shadow-sm ${
                isCrossRoleContamination
                  ? "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  : "bg-teal-700 text-white hover:bg-teal-800"
              }`}
            >
              Sign In as {details.roleLabel}
              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              onClick={handleQuickDemoSignIn}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 py-3 text-xs font-bold text-teal-900 transition hover:bg-teal-100"
            >
              <Sparkles size={14} className="text-teal-700" />
              Switch Session to {details.roleLabel}
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
