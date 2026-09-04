"use client";

import Link from "next/link";
import {
  Activity,
  HeartPulse,
  Users,
  Stethoscope,
  Building2,
  ShieldCheck,
  WifiOff,
  ArrowRight,
  CheckCircle2,
  Share2,
  Sparkles,
  Award,
  Globe,
  Lock,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.15),transparent_60%)] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Rural Healthcare Continuity Platform
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Bridging Rural Health to Specialized Care
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg leading-relaxed">
            NIRAMAYA-SETU (निरामय-सेतु) is a digital public health initiative engineered to eliminate lost-to-follow-up rural referrals, connect ASHA field workers with secondary and tertiary hospitals, and protect patient care continuity.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#role-selection"
              className="rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-900/40 transition hover:bg-teal-500"
            >
              Get Started with NIRAMAYA-SETU
            </Link>
            <Link
              href="/facilities"
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              Find Nearby Healthcare
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM WE SOLVE */}
      <section className="border-b border-slate-100 py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">The Problem</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The Broken Rural Referral Chain
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              In traditional rural healthcare, over 40% of referred patients drop out of care before reaching destination facilities due to lack of tracking, paper slip losses, travel confusion, and absent hospital coordination.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-red-100 bg-red-50/40 p-6">
              <span className="text-2xl font-black text-red-600">40%+</span>
              <h3 className="mt-2 text-base font-bold text-slate-900">Lost to Follow-up</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Rural patients receive paper slips from primary centers but never arrive at district hospitals due to guidance gaps.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-6">
              <span className="text-2xl font-black text-amber-600">0%</span>
              <h3 className="mt-2 text-base font-bold text-slate-900">Zero In-Transit Visibility</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                ASHA field workers and primary doctors have no way to know if their critical patient ever reached emergency care.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
              <span className="text-2xl font-black text-teal-700">100%</span>
              <h3 className="mt-2 text-base font-bold text-slate-900">Privacy & Consent Gaps</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Sensitive health data and raw phone numbers are leaked on open physical paper slips without patient consent controls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 & 4. HOW IT WORKS: ACCESS → RECORD → REFER → FOLLOW */}
      <section className="bg-slate-50/70 py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Our Solution</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              ACCESS → RECORD → REFER → FOLLOW
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              A continuous closed-loop healthcare delivery workflow designed for rural field realties.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                01
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">ACCESS</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Village-level healthcare access via ASHA field visits, rural sub-centers, or self-service patient portal with multi-language support.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                02
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">RECORD</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Offline-capable clinical recording of vitals, symptoms, maternal health metrics, and verified ABDM/ABHA identity without data loss.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                03
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">REFER</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Digital referral generation with facility capacity matching, specialist triage, priority routing, and privacy-preserving QR verification.
              </p>
            </div>

            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                04
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">FOLLOW</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Automated 48-hour no-show escalation alerts, post-discharge rehabilitation tasks, and continuous community health worker follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CLOSED-LOOP REFERRAL LIFECYCLE */}
      <section className="py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Lifecycle</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              The Closed-Loop Referral Lifecycle
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Every referral moves through deterministic, verifiable states to guarantee care continuity.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 text-center">
              <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400">STATE 1</span>
                <p className="mt-1 text-xs font-bold text-slate-900">Created</p>
                <p className="mt-1 text-[10px] text-slate-500">Initiated by ASHA / PHC</p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 shadow-sm">
                <span className="text-[10px] font-bold text-amber-600">STATE 2</span>
                <p className="mt-1 text-xs font-bold text-amber-900">In Transit</p>
                <p className="mt-1 text-[10px] text-amber-700">Patient en-route</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 shadow-sm">
                <span className="text-[10px] font-bold text-blue-600">STATE 3</span>
                <p className="mt-1 text-xs font-bold text-blue-900">Received</p>
                <p className="mt-1 text-[10px] text-blue-700">Confirmed at Hospital</p>
              </div>
              <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 shadow-sm">
                <span className="text-[10px] font-bold text-violet-600">STATE 4</span>
                <p className="mt-1 text-xs font-bold text-violet-900">Under Treatment</p>
                <p className="mt-1 text-[10px] text-violet-700">Doctor care active</p>
              </div>
              <div className="rounded-xl border border-teal-200 bg-teal-50 p-3 shadow-sm">
                <span className="text-[10px] font-bold text-teal-600">STATE 5</span>
                <p className="mt-1 text-xs font-bold text-teal-900">Discharged</p>
                <p className="mt-1 text-[10px] text-teal-700">Summary sent to field</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 shadow-sm">
                <span className="text-[10px] font-bold text-emerald-600">STATE 6</span>
                <p className="mt-1 text-xs font-bold text-emerald-900">Closed</p>
                <p className="mt-1 text-[10px] text-emerald-700">Follow-up verified</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 to 9. STAKEHOLDER BENEFITS */}
      <section className="bg-slate-50/70 py-16 px-5 sm:px-8 lg:px-12 border-t border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Value Proposition</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Empowering Every Stakeholder in the Ecosystem
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* Patients */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                  <HeartPulse size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">For Patients</h3>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-teal-600 shrink-0" />
                  Direct access to personal health records, vitals history, and PDF summaries.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-teal-600 shrink-0" />
                  Real-time referral progress tracking so families know where to go.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-teal-600 shrink-0" />
                  Tele-consultation booking with specialists without expensive bus travel.
                </li>
              </ul>
            </div>

            {/* ASHA / ANM */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-800">
                  <Users size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">For ASHA / ANM Field Workers</h3>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-violet-600 shrink-0" />
                  Offline visit recording that works seamlessly in zero-connectivity villages.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-violet-600 shrink-0" />
                  Automatic follow-up reminders and 48-hour missed appointment alerts.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-violet-600 shrink-0" />
                  Instant digital feedback from hospital doctors post-discharge.
                </li>
              </ul>
            </div>

            {/* Doctors */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Stethoscope size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">For Doctors & Clinicians</h3>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                  Complete longitudinal vitals and clinical history upon QR token scan.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                  Structured tele-consultation queue with integrated patient triage.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                  Direct assignment of post-discharge recovery tasks to village health workers.
                </li>
              </ul>
            </div>

            {/* Hospitals / Facilities */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                  <Building2 size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">For Hospitals & Clinics</h3>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-blue-600 shrink-0" />
                  Live bed capacity management and specialist availability broadcast.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-blue-600 shrink-0" />
                  Incoming referral pipeline predictability to optimize triage and ICU prep.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-blue-600 shrink-0" />
                  Full audit compliance and reduced emergency ward overcrowding.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 14 to 17. PRIVACY, OFFLINE & ECOSYSTEM */}
      <section className="py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 p-5">
              <Lock className="text-teal-700" size={24} />
              <h3 className="mt-3 text-sm font-bold text-slate-900">Consent & Privacy Guardrails</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Raw Aadhaar and personal mobile numbers are never exposed. Temporary session tokens and consent agreements protect patient autonomy.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <WifiOff className="text-teal-700" size={24} />
              <h3 className="mt-3 text-sm font-bold text-slate-900">Offline-First Architecture</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                ASHA field workflows cache data locally using browser storage with production sync and backend validation planned for rollout.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5">
              <Globe className="text-teal-700" size={24} />
              <h3 className="mt-3 text-sm font-bold text-slate-900">ABDM & Public Health Interoperable</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Built to align with Ayushman Bharat Digital Mission (ABDM), FHIR schemas, and state healthcare health registries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 18. ROLE SELECTION CALL-TO-ACTION */}
      <section id="role-selection" className="border-t border-slate-200 bg-slate-900 py-20 px-5 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Join the Network</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl">
              How are you connected with NIRAMAYA-SETU?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs text-slate-400">
              Select your role to access your dedicated workspace, register your facility, or view your care records.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/login"
              className="group rounded-2xl border border-slate-800 bg-slate-800/60 p-6 transition hover:border-teal-500 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-teal-500/20 px-2.5 py-1 text-[10px] font-bold text-teal-300">
                  PATIENT PORTAL
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-teal-400 transition" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">I am a Patient / Family</h3>
              <p className="mt-1 text-xs text-slate-400">
                View health records, track referrals, and consult doctors online.
              </p>
            </Link>

            <Link
              href="/asha/login"
              className="group rounded-2xl border border-slate-800 bg-slate-800/60 p-6 transition hover:border-violet-500 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-violet-500/20 px-2.5 py-1 text-[10px] font-bold text-violet-300">
                  ASHA / ANM
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-violet-400 transition" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">I am an ASHA / ANM Worker</h3>
              <p className="mt-1 text-xs text-slate-400">
                Record village visits, initiate referrals, and manage offline follow-ups.
              </p>
            </Link>

            <Link
              href="/doctor/login"
              className="group rounded-2xl border border-slate-800 bg-slate-800/60 p-6 transition hover:border-emerald-500 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                  DOCTOR WORKSPACE
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-400 transition" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">I am a Doctor / Clinician</h3>
              <p className="mt-1 text-xs text-slate-400">
                Review referrals, verify QR tokens, and conduct tele-consultations.
              </p>
            </Link>

            <Link
              href="/facility/login"
              className="group rounded-2xl border border-slate-800 bg-slate-800/60 p-6 transition hover:border-blue-500 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-blue-500/20 px-2.5 py-1 text-[10px] font-bold text-blue-300">
                  HOSPITAL / CLINIC
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-400 transition" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">I represent a Facility</h3>
              <p className="mt-1 text-xs text-slate-400">
                Manage incoming emergency cases, bed capacity, and diagnostic queues.
              </p>
            </Link>

            <Link
              href="/dashboard"
              className="group rounded-2xl border border-slate-800 bg-slate-800/60 p-6 transition hover:border-amber-500 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold text-amber-300">
                  ADMINISTRATION
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-amber-400 transition" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">I am a Program Admin</h3>
              <p className="mt-1 text-xs text-slate-400">
                Access district health analytics, system audit logs, and user policies.
              </p>
            </Link>

            <Link
              href="/facilities"
              className="group rounded-2xl border border-slate-800 bg-slate-800/60 p-6 transition hover:border-teal-500 hover:bg-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-teal-500/20 px-2.5 py-1 text-[10px] font-bold text-teal-300">
                  DISCOVERY
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-teal-400 transition" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Find Nearby Healthcare</h3>
              <p className="mt-1 text-xs text-slate-400">
                Locate nearest PHCs, CHCs, and district hospitals using geolocation.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
