"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, ShieldCheck, Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import LanguageSelector from "../../components/LanguageSelector";

export default function AdminLoginPage() {
  const router = useRouter();

  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const cleanAdminId = adminId.trim();

    if (!cleanAdminId) {
      setError("Enter your Administrator ID or official email.");
      return;
    }

    if (!password.trim()) {
      setError("Enter your password.");
      return;
    }

    if (password.trim().length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("niramaya-admin-id", cleanAdminId);
      localStorage.setItem("niramaya-admin-role", "Administrator");
      localStorage.setItem("niramaya-admin-auth", "demo-authenticated");
      localStorage.setItem("niramaya-active-role", "admin");

      if (remember) {
        localStorage.setItem("niramaya-admin-remember", "true");
      } else {
        localStorage.removeItem("niramaya-admin-remember");
      }

      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  const fillDemo = () => {
    setAdminId("ADMIN-101");
    setPassword("admin123");
    setError("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Bar */}
      <header className="mx-auto flex max-w-5xl items-center justify-between pb-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm font-bold text-xs">
            <Activity size={20} />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">NIRAMAYA-SETU</p>
            <p className="text-[10px] text-slate-500 font-medium">Health Administration Portal</p>
          </div>
        </Link>

        <LanguageSelector />
      </header>

      {/* Main Container */}
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-5xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Left Hero */}
          <div className="border-b border-slate-100 bg-slate-900 p-8 text-white lg:border-b-0 lg:border-r lg:p-12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-xs font-semibold text-teal-300">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                Administrative Access
              </div>

              <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl text-white">
                District Operations & Health Governance
              </h1>

              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                Authorized access for health administrators, district program officers, and system auditors to oversee rural care continuity, facility capacity, and closed-loop referrals.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/60 p-3 text-xs">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <span>District-wide referral status monitoring</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/60 p-3 text-xs">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <span>Facility bed & resource capacity oversight</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/60 p-3 text-xs">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <span>Immutable audit logs & consent tracking</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-500">
              NIRAMAYA-SETU Prototype Governance Console
            </div>
          </div>

          {/* Right Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                Sign In
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Admin Authentication
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter your system administrator credentials to proceed.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Admin ID / Official Email
                </label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. ADMIN-101"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs text-slate-900 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded accent-teal-700"
                  />
                  Remember device
                </label>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-xs font-bold text-white transition hover:bg-teal-800 disabled:opacity-60 shadow-sm"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Access Admin Console
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Prototype Demo Fill */}
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">Demo Administrator</p>
                  <p className="text-[10px] text-slate-500">Auto-fill prototype credentials</p>
                </div>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm"
                >
                  Fill Demo
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-xs font-medium text-slate-500 hover:text-slate-700">
                ← Return to Platform Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
