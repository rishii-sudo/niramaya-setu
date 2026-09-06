"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../services/apiClient";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Wifi,
} from "lucide-react";

export default function FacilityLoginPage() {
  const router = useRouter();

  const [facilityId, setFacilityId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [remember, setRemember] =
    useState(true);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    const normalizedFacilityId =
      facilityId.trim().toUpperCase();

    if (!normalizedFacilityId) {
      setError("Enter your facility ID.");
      return;
    }

    if (!password) {
      setError("Enter your password.");
      return;
    }

    if (
      normalizedFacilityId !==
        "FAC-JPR-204" ||
      password !== "facility123"
    ) {
      setError(
        "Invalid facility ID or password.",
      );
      return;
    }

    setLoading(true);

    localStorage.setItem(
      "niramaya-facility-id",
      normalizedFacilityId,
    );

    localStorage.setItem(
      "niramaya-facility-role",
      "facility",
    );

    localStorage.setItem(
      "niramaya-facility-remember",
      remember
        ? "true"
        : "false",
    );

    window.setTimeout(() => {
      router.push("/facility/verify");
    }, 350);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full border border-teal-100 bg-teal-50/60" />

        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full border border-blue-100 bg-blue-50/40" />

        <div className="absolute left-[8%] top-[22%] h-28 w-28 rounded-full border border-teal-100" />

        <div className="absolute bottom-[18%] left-[14%] h-40 w-40 rounded-full border border-slate-200" />

        <div className="absolute right-[12%] top-[16%] h-24 w-24 rounded-full border border-blue-100" />

        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-teal-50/70 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[1fr_1.1fr]">
          {/* Left */}
          <section className="relative hidden overflow-hidden bg-slate-900 p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-600">
                  <Building2 size={22} />
                </div>

                <div>
                  <p className="text-lg font-bold">
                    NIRAMAYA-SETU
                  </p>

                  <p className="text-xs text-slate-300">
                    Care Continuity Platform
                  </p>
                </div>
              </div>

              <div className="mt-14 max-w-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">
                  Facility Portal
                </p>

                <h1 className="mt-3 text-4xl font-bold leading-tight">
                  Receive patients.
                  <br />
                  Continue care.
                </h1>

                <p className="mt-5 text-sm leading-7 text-slate-300">
                  Secure workspace for hospitals and receiving
                  facilities to manage referrals, patient intake,
                  treatment and discharge.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InfoCard
                icon={<ShieldCheck size={17} />}
                title="Consent-aware"
                text="Role-based clinical access"
              />

              <InfoCard
                icon={<Wifi size={17} />}
                title="Connected"
                text="Referral workflow support"
              />

              <InfoCard
                icon={<MapPin size={17} />}
                title="Facility"
                text="Location-linked referrals"
              />

              <InfoCard
                icon={<LockKeyhole size={17} />}
                title="Protected"
                text="Secure clinical workspace"
              />
            </div>
          </section>

          {/* Right */}
          <section className="flex items-center p-6 sm:p-10 lg:p-12">
            <div className="mx-auto w-full max-w-md">
              {/* Mobile logo */}
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white">
                  <Building2 size={21} />
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-900">
                    NIRAMAYA-SETU
                  </p>

                  <p className="text-xs text-slate-500">
                    Facility Portal
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                  Facility Authentication
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  Sign in to Facility Portal
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Use your registered facility credentials to
                  continue to secure verification.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Facility ID */}
                <div>
                  <label
                    htmlFor="facility-id"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Facility ID
                  </label>

                  <div className="relative mt-2">
                    <Building2
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="facility-id"
                      type="text"
                      value={facilityId}
                      onChange={(event) =>
                        setFacilityId(
                          event.target.value,
                        )
                      }
                      placeholder="FAC-JPR-204"
                      autoComplete="username"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm font-medium uppercase text-slate-900 outline-none placeholder:normal-case placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="facility-password"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative mt-2">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="facility-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value,
                        )
                      }
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) =>
                            !current,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between gap-4">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) =>
                        setRemember(
                          event.target.checked,
                        )
                      }
                      className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
                    />

                    <span className="text-xs font-medium text-slate-600">
                      Remember this facility
                    </span>
                  </label>

                  <span className="text-xs font-medium text-slate-400">
                    Secure access
                  </span>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Signing in..."
                    : "Continue to Verification"}

                  {!loading && (
                    <ArrowRight size={17} />
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                  Demo Credentials
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Credential
                    label="Facility ID"
                    value="FAC-JPR-204"
                  />

                  <Credential
                    label="Password"
                    value="facility123"
                  />
                </div>
              </div>

              {/* Security notice */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 p-4">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-teal-700"
                />

                <div>
                  <p className="text-xs font-semibold text-teal-900">
                    Protected clinical workspace
                  </p>

                  <p className="mt-1 text-xs leading-5 text-teal-800">
                    Production authentication will use backend
                    sessions, RBAC, audit logs and secure credential
                    storage.
                  </p>
                </div>
              </div>

              {/* Prototype */}
              <p className="mt-6 text-center text-[10px] leading-5 text-slate-400">
                Prototype authentication for NIRAMAYA-SETU demo.
                Do not use real patient or facility credentials.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Small components                                                           */
/* -------------------------------------------------------------------------- */

function InfoCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-teal-300">
        {icon}

        <span className="text-xs font-semibold">
          {title}
        </span>
      </div>

      <p className="mt-2 text-[11px] leading-5 text-slate-400">
        {text}
      </p>
    </div>
  );
}

function Credential({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-blue-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}
