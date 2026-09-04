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
  Calendar,
  Video,
  Mic,
  FileText,
  Pill,
  MapPin,
  Clock,
  PhoneCall,
  UserCheck,
  Search,
  ExternalLink,
} from "lucide-react";
import { teamMembers, projectCreators } from "../data/teamData";
import LanguageSelector from "../components/LanguageSelector";

export default function AboutPage() {
  const capabilities = [
    {
      title: "Patient Registration",
      desc: "Village & self-service registration with privacy-first identity masking and SEVA ID generation.",
      icon: UserCheck,
      badge: "Active",
    },
    {
      title: "Digital Patient Records",
      desc: "Longitudinal health records, diagnostic test results, vital trends, and printable summaries.",
      icon: FileText,
      badge: "Active",
    },
    {
      title: "ASHA / ANM Field Work",
      desc: "Offline visit recording, maternal-child screening, and post-discharge recovery monitoring.",
      icon: Users,
      badge: "Active",
    },
    {
      title: "Referral Management",
      desc: "Structured clinical transfer routing from rural sub-centers to secondary and tertiary hospitals.",
      icon: Share2,
      badge: "Active",
    },
    {
      title: "Closed-Loop Tracking",
      desc: "End-to-end lifecycle visibility across 6 milestones from initiation to recovery confirmation.",
      icon: Activity,
      badge: "Active",
    },
    {
      title: "Follow-up Reminders",
      desc: "Automated 48-hour missed appointment alerts and front-line worker action queues.",
      icon: Clock,
      badge: "Active",
    },
    {
      title: "Nearby Healthcare Discovery",
      desc: "Geolocation-based nearest PHC, CHC, and district hospital mapping with travel distance calculation.",
      icon: MapPin,
      badge: "Active",
    },
    {
      title: "Doctor Directory",
      desc: "Specialist directory with department filters, qualifications, and consultation mode options.",
      icon: Stethoscope,
      badge: "Active",
    },
    {
      title: "Online Appointment Booking",
      desc: "Step-by-step specialist scheduling with date selection, time slots, and patient context preservation.",
      icon: Calendar,
      badge: "Active",
    },
    {
      title: "Video Consultation Prototype",
      desc: "Simulated WebRTC tele-consultation preview with privacy session identifiers and in-call clinical notes.",
      icon: Video,
      badge: "Prototype",
    },
    {
      title: "Audio Consultation Prototype",
      desc: "Low-bandwidth voice consultation mode for remote rural connectivity environments.",
      icon: PhoneCall,
      badge: "Prototype",
    },
    {
      title: "Clinical Summary & Print",
      desc: "Standardized A4 clinical summary and referral discharge documentation ready for medical records.",
      icon: FileText,
      badge: "Active",
    },
    {
      title: "Medicine Ordering Prototype",
      desc: "Essential medicine dispensary with prescription validation checks and sub-center delivery coordination.",
      icon: Pill,
      badge: "Prototype",
    },
    {
      title: "Multilingual Support",
      desc: "Native English, हिन्दी (Hindi), and मराठी (Marathi) interfaces with persistent language memory.",
      icon: Globe,
      badge: "Active",
    },
    {
      title: "Voice & Text Assistance",
      desc: "Prototype voice-guided assistance supporting multilingual query matching and patient navigation.",
      icon: Mic,
      badge: "Prototype",
    },
    {
      title: "Consent & Privacy Guardrails",
      desc: "Granular patient consent management with masked Aadhaar and tokenized QR verification payloads.",
      icon: Lock,
      badge: "Active",
    },
  ];

  const ecosystemItems = [
    {
      name: "Ayushman Bharat Digital Mission (ABDM)",
      category: "National Health Authority",
      status: "Future Backend Integration",
      desc: "Alignment with ABHA ID generation, Health Facility Registry (HFR), and Health Professional Registry (HPR).",
    },
    {
      name: "FHIR R4 Schema Standard",
      category: "Interoperability",
      status: "Schema Aligned",
      desc: "Standardized health record resources ensuring cross-hospital and cross-state clinical data portability.",
    },
    {
      name: "Bhashini AI Language Platform",
      category: "Vernacular AI",
      status: "Future Backend Integration",
      desc: "Government of India National Language Translation Mission for automatic speech recognition in 22 scheduled languages.",
    },
    {
      name: "eSanjeevani Telemedicine Suite",
      category: "National Tele-health",
      status: "Future Integration Planned",
      desc: "Integration with Ministry of Health & Family Welfare teleconsultation services for primary health centers.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Top Sticky Header with Language Selector */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-xs">
              NS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">NIRAMAYA-SETU</span>
                <span className="rounded bg-teal-900/80 px-2 py-0.5 text-[10px] text-teal-300 font-semibold border border-teal-700">About</span>
              </div>
              <p className="text-[10px] text-slate-400">Rural Healthcare Continuity Platform</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-300 mr-2">
              <Link href="/facilities" className="hover:text-teal-400 transition">Facilities</Link>
              <Link href="/doctors" className="hover:text-teal-400 transition">Doctors</Link>
              <Link href="/appointments" className="hover:text-teal-400 transition">Appointments</Link>
            </div>
            <LanguageSelector />
            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
            >
              Home
            </Link>
          </div>
        </div>
      </header>

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
            NIRAMAYA-SETU (निरामय-सेतु) is an open digital public health platform engineered to eliminate lost-to-follow-up rural referrals, connect ASHA field workers with secondary and tertiary hospitals, and protect continuous patient care.
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

      {/* 2 & 3. WHAT IS NIRAMAYA-SETU & THE PROBLEM WE SOLVE */}
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

      {/* 4 & 5. OUR APPROACH: ACCESS → RECORD → REFER → FOLLOW */}
      <section className="bg-slate-50/70 py-16 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Our Solution</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              ACCESS → RECORD → REFER → FOLLOW
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              A continuous closed-loop healthcare delivery workflow designed for rural field realities.
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
                Offline-capable clinical recording of vitals, symptoms, maternal health metrics, and verified identity without data loss.
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

      {/* 6. CLOSED-LOOP REFERRAL LIFECYCLE */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-100">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Lifecycle</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              6-Stage Closed-Loop Referral Lifecycle
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Every patient journey is tracked through verified digital transitions, guaranteeing zero patients disappear in transit.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 text-center">
            {[
              { num: "1", title: "Created", desc: "Initiated by ASHA or PHC Doctor" },
              { num: "2", title: "In Transit", desc: "Patient en route to specialist hospital" },
              { num: "3", title: "Received", desc: "Hospital scans QR & registers admission" },
              { num: "4", title: "Under Treatment", desc: "Clinical procedures & care logged" },
              { num: "5", title: "Discharged", desc: "Discharge summary & instructions issued" },
              { num: "6", title: "Closed", desc: "ASHA completes recovery verification" },
            ].map((st) => (
              <div key={st.num} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-white font-bold text-xs">
                  {st.num}
                </span>
                <h4 className="mt-3 text-sm font-bold text-slate-900">{st.title}</h4>
                <p className="mt-1 text-[11px] text-slate-500">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHAT WE OFFER (16 Capability Cards) */}
      <section className="bg-slate-50/70 py-20 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Platform Features</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              What We Offer
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              A cohesive suite of digital tools connecting citizens, field health workers, and specialist hospitals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                        <Icon size={20} />
                      </div>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                          cap.badge === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {cap.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-900">{cap.title}</h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 to 11. STAKEHOLDER BENEFITS */}
      <section className="py-20 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Value Proposition</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Empowering Every Stakeholder in the Ecosystem
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {/* Patients */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                  <HeartPulse size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">For Patients & Families</h3>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-teal-600 shrink-0" />
                  Direct access to personal health records, vitals history, and PDF summaries.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-teal-600 shrink-0" />
                  Real-time referral progress tracking so families know where to travel.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="mt-0.5 text-teal-600 shrink-0" />
                  Online tele-consultation booking and essential medicine requests.
                </li>
              </ul>
            </div>

            {/* ASHA / ANM */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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

      {/* 16 & 17. PRIVACY, OFFLINE & RURAL SUPPORT */}
      <section className="bg-slate-50/70 py-16 px-5 sm:px-8 lg:px-12 border-t border-slate-200">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Architecture</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Privacy-First & Rural Offline Reliability
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Lock className="text-teal-700" size={24} />
              <h3 className="mt-3 text-sm font-bold text-slate-900">Consent & Privacy Guardrails</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Raw Aadhaar and personal phone numbers are never stored or exposed. Temporary session tokens and consent agreements protect patient autonomy.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <WifiOff className="text-teal-700" size={24} />
              <h3 className="mt-3 text-sm font-bold text-slate-900">Offline-First Design</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                ASHA field workflows cache data locally using browser storage with production sync and backend validation planned for rollout.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Globe className="text-teal-700" size={24} />
              <h3 className="mt-3 text-sm font-bold text-slate-900">Multilingual & Voice Accessible</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Native interface in English, Hindi, and Marathi with voice assistant support for low-literacy rural citizens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 18. HEALTHCARE ECOSYSTEM & FUTURE INTEGRATIONS */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 border-t border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Standards & Roadmaps</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Healthcare Ecosystem & Future Integrations
            </h2>
            <p className="mx-auto mt-2 text-xs text-slate-500">
              Designed to connect with national digital health standards and open public infrastructure.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {ecosystemItems.map((eco) => (
              <div key={eco.name} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{eco.category}</span>
                  <span className="rounded-full bg-teal-50 border border-teal-200 px-2 py-0.5 text-[9px] font-bold text-teal-800">
                    {eco.status}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{eco.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{eco.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. MEET THE TEAM / PROJECT CREATORS */}
      <section className="bg-slate-50/70 py-20 px-5 sm:px-8 lg:px-12 border-t border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Initiative Structure</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Meet the Initiative Team
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500">
              {projectCreators.missionStatement}
            </p>
            <p className="mx-auto mt-1 max-w-xl text-[11px] text-slate-400 italic">
              (Core architectural roles & contributor specifications — centralized editable placeholders)
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-700 to-emerald-600 font-bold text-sm text-white shadow-sm">
                      {member.initials}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{member.name}</h4>
                      <p className="text-[11px] font-semibold text-teal-700">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-600 leading-relaxed">{member.contribution}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{member.category}</span>
                  <span className="font-mono">{member.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 20 & 21. ROLE SELECTION CALL-TO-ACTION & HOW TO JOIN */}
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
              href="/admin/login"
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
