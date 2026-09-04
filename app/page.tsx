"use client";

import Link from "next/link";
import {
  HeartPulse,
  Activity,
  ArrowRight,
  ShieldCheck,
  UsersRound,
  Stethoscope,
  Building2,
  FileText,
  MapPin,
  Calendar,
  Mic,
  Globe,
  Lock,
  Clock3,
  CheckCircle2,
  TrendingUp,
  Share2,
  AlertTriangle,
  QrCode,
  Sparkles,
  Smartphone,
  Hospital,
  Layers,
  Award,
} from "lucide-react";
import { useLanguage } from "./context/LanguageContext";
import LanguageSelector from "./components/LanguageSelector";

export default function WelcomePage() {
  const { t } = useLanguage();

  const pipelineSteps = [
    {
      step: "01",
      tag: "ACCESS",
      title: "Village-Level Intake",
      desc: "Patients access care via local ASHA workers or self-register at village sub-centers with ABHA-aligned privacy masking.",
      icon: UsersRound,
      color: "border-teal-200 bg-teal-50 text-teal-800",
    },
    {
      step: "02",
      tag: "RECORD",
      title: "Digital Health Vitals",
      desc: "Clinical history, vitals, and screening notes are logged digitally—with full offline synchronization during rural blackouts.",
      icon: FileText,
      color: "border-blue-200 bg-blue-50 text-blue-800",
    },
    {
      step: "03",
      tag: "REFER",
      title: "Tokenized Specialist Transfer",
      desc: "Automated triage generates QR referral tokens, reserving specialist slots and beds at destination PHC, CHC, or District Hospitals.",
      icon: Share2,
      color: "border-purple-200 bg-purple-50 text-purple-800",
    },
    {
      step: "04",
      tag: "FOLLOW",
      title: "Closed-Loop Recovery",
      desc: "Hospital admissions and discharge summaries sync back to ASHA workers with automated 48-hour follow-up alerts to prevent dropout.",
      icon: CheckCircle2,
      color: "border-emerald-200 bg-emerald-50 text-emerald-800",
    },
  ];

  const roleBenefits = [
    {
      role: "Patients & Citizens",
      badge: "Citizen Centric",
      icon: HeartPulse,
      color: "text-rose-600 bg-rose-50 border-rose-200",
      benefits: [
        "Longitudinal digital health records accessible via tokenized QR",
        "Direct specialist appointment booking at district hospitals",
        "Nearest facility discovery with live travel distance & wait times",
        "Multilingual interface with prototype voice assistant guidance",
      ],
    },
    {
      role: "ASHA / ANM Field Workers",
      badge: "Frontline Care",
      icon: UsersRound,
      color: "text-violet-600 bg-violet-50 border-violet-200",
      benefits: [
        "Offline-capable visit recording and maternal-child screening",
        "Instant digital referral creation to higher medical centers",
        "Automated 48-hour follow-up reminders for missed hospital visits",
        "Zero paperwork loss with seamless cloud background sync",
      ],
    },
    {
      role: "Doctors & Clinicians",
      badge: "Clinical Precision",
      icon: Stethoscope,
      color: "text-teal-600 bg-teal-50 border-teal-200",
      benefits: [
        "Prioritized incoming referral queue (Emergency, Urgent, Routine)",
        "Pre-verified clinical history and past vitals before patient arrival",
        "Standardized digital discharge summaries & recovery instructions",
        "Low-bandwidth telemedicine consultation preview tools",
      ],
    },
    {
      role: "Hospitals & Facilities",
      badge: "Operational Visibility",
      icon: Building2,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      benefits: [
        "Real-time inpatient and emergency bed occupancy monitoring",
        "Specialist duty roster management across key clinical departments",
        "Streamlined patient intake reducing emergency overcrowding",
        "Closed-loop feedback confirmation sent to referring sub-centers",
      ],
    },
    {
      role: "Health Administrators",
      badge: "System Governance",
      icon: Activity,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      benefits: [
        "District-wide referral completion rate metrics (91.4% continuum rate)",
        "Zero-knowledge audit logs protecting patient identity and privacy",
        "Capacity utilization analytics for evidence-based resource planning",
        "Standardized compliance with national public health guidelines",
      ],
    },
  ];

  const platformFeatures = [
    {
      title: "Multilingual By Design",
      desc: "Native English, हिन्दी (Hindi), and मराठी (Marathi) localized UI with automatic language preference persistence across sessions.",
      icon: Globe,
    },
    {
      title: "Prototype Voice Assistant",
      desc: "Hands-free voice query guidance designed for low-literacy rural patients and busy frontline community health workers.",
      icon: Mic,
    },
    {
      title: "Geolocation Facility Discovery",
      desc: "Interactive map and distance locator for nearest PHCs, CHCs, and district hospitals with live service availability badges.",
      icon: MapPin,
    },
    {
      title: "Specialist Appointment Booking",
      desc: "Structured scheduling preserving clinical referral context so specialists have patient medical notes prior to visits.",
      icon: Calendar,
    },
    {
      title: "Offline-First Sync Engine",
      desc: "Built-in IndexedDB queue stores village records locally and automatically syncs when mobile data connectivity resumes.",
      icon: Smartphone,
    },
    {
      title: "Privacy & Consent Guardrails",
      desc: "Tokenized referral payloads, masked Aadhaar / mobile identifiers, and granular patient-authorized clinical data sharing.",
      icon: Lock,
    },
  ];

  const ecosystemIntegrations = [
    {
      name: "Ayushman Bharat Digital Mission (ABDM)",
      category: "National Digital Health",
      desc: "Architected for integration with ABHA (Ayushman Bharat Health Account) IDs, Health Facility Registry (HFR), and Health Professional Registry (HPR).",
    },
    {
      name: "FHIR R4 Interoperability Standard",
      category: "Clinical Data Schema",
      desc: "Clinical encounters, diagnostics, and prescriptions formatted following HL7 FHIR R4 schema for seamless interstate portability.",
    },
    {
      name: "Bhashini AI Language Platform",
      category: "Vernacular Speech AI",
      desc: "Planned backend integration with Digital India Bhashini automated speech recognition and translation across 22 scheduled Indian languages.",
    },
    {
      name: "eSanjeevani Teleconsultation Suite",
      category: "National Tele-health",
      desc: "Future pipeline hook into Ministry of Health & Family Welfare teleconsultation services for village primary care centers.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8 py-3.5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm transition group-hover:bg-teal-800">
              <HeartPulse size={23} strokeWidth={2.2} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  {t.appName}
                </span>
                <span className="hidden sm:inline-flex rounded-md bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
                  Public Health
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500">
                {t.tagline}
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Links */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-600">
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
              <span>•</span>
              <Link href="/appointments" className="hover:text-teal-700 transition">
                Book Appointment
              </Link>
            </div>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Primary Get Started CTA */}
            <Link
              href="/get-started"
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-800"
            >
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 px-5 py-20 sm:px-8 lg:px-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.18),transparent_65%)] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            Rural Healthcare Care Continuity Platform
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
            One Patient Journey.
            <span className="block text-teal-400 mt-1">
              Connected Across Every Level of Care.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            NIRAMAYA-SETU (निरामय-सेतु) bridges the critical divide between rural villages, primary health centers, and specialist hospitals. We eliminate lost-to-follow-up dropouts through a unified, privacy-protected closed-loop referral network.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-950/50 transition hover:bg-teal-500"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              Learn More
            </Link>

            <Link
              href="/facilities"
              className="rounded-xl border border-teal-500/30 bg-teal-500/10 px-5 py-3.5 text-sm font-semibold text-teal-300 transition hover:bg-teal-500/20"
            >
              Nearby Healthcare
            </Link>
          </div>

          {/* Metric Stats Banner */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-800 pt-8">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">91.4%</p>
              <p className="text-xs text-slate-400 mt-1">Closed-Loop Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-teal-400">14</p>
              <p className="text-xs text-slate-400 mt-1">Connected Facilities</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">100%</p>
              <p className="text-xs text-slate-400 mt-1">Offline Sync Support</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-white">48h</p>
              <p className="text-xs text-slate-400 mt-1">Guaranteed Follow-up</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SOLVED */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              The Critical Challenge
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Why the Rural Referral Chain Breaks
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 leading-relaxed">
              In traditional healthcare systems, rural patients face a disconnected maze between village health posts and district tertiary hospitals.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600 font-bold">
                <AlertTriangle size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">40%+ Lost-to-Follow-Up</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Referred patients carry handwritten slips that get lost or damaged, leading to fatal dropouts before hospital admission.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 font-bold">
                <Clock3 size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Absent Feedback Loop</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Village ASHA workers receive no confirmation if their referred patient ever arrived, was treated, or was discharged.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-teal-50/50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 font-bold">
                <CheckCircle2 size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">The Digital Safety Net</h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                NIRAMAYA-SETU creates a synchronized digital continuum connecting patient, worker, and doctor with zero data loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS: ACCESS -> RECORD -> REFER -> FOLLOW */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              The 4-Step Care Continuum
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How NIRAMAYA-SETU Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 leading-relaxed">
              Every referral flows through four interconnected milestones ensuring continuous oversight and timely clinical intervention.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pipelineSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.tag}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-teal-500"
                >
                  <div className="flex items-center justify-between">
                    <span className={`rounded-lg border px-2.5 py-1 text-xs font-black ${step.color}`}>
                      {step.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {step.step}
                    </span>
                  </div>

                  <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Visual Connector Bar */}
          <div className="mt-8 flex items-center justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-teal-800 transition"
            >
              Experience the Continuum Flow
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHO CAN USE NIRAMAYA-SETU & ROLE BENEFITS */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Stakeholders & Value
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Who Benefits from NIRAMAYA-SETU?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 leading-relaxed">
              Designed specifically for the multi-tier hierarchy of Indian public healthcare—from remote hamlets to district headquarters.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roleBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.role}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:bg-white hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${item.color}`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      {item.role}
                    </h3>

                    <ul className="mt-3 space-y-2 text-xs text-slate-600">
                      {item.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-teal-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <Link
                      href="/get-started"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 transition"
                    >
                      Access as {item.role.split(" ")[0]}
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SERVICES & INNOVATION */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Platform Capabilities
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Core Services & Technological Innovations
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 leading-relaxed">
              Engineered to operate reliably in low-resource rural settings with modern digital public infrastructure standards.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow transition"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-slate-900">
                    {feat.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ECOSYSTEM INTEGRATION */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
              Future-Ready Standards
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              National Healthcare Ecosystem Alignment
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 leading-relaxed">
              NIRAMAYA-SETU conforms to Indian national health digital infrastructure schemas and international interoperability protocols.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {ecosystemIntegrations.map((eco) => (
              <div
                key={eco.name}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 transition hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-teal-100 px-2.5 py-1 text-[10px] font-bold text-teal-800">
                    {eco.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Standard Aligned
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-slate-900">
                  {eco.name}
                </h3>

                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {eco.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 text-xs font-semibold text-teal-300">
            <Sparkles size={14} />
            Care Continuity Guaranteed
          </div>

          <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl tracking-tight">
            Ready to Experience Connected Healthcare?
          </h2>

          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Select your workspace to view personal medical history, record village field visits, manage hospital admissions, or govern district healthcare analytics.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-teal-900 shadow-xl transition hover:bg-teal-50"
            >
              Continue to NIRAMAYA-SETU
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/about"
              className="rounded-2xl border border-slate-700 bg-slate-800/80 px-6 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Full Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-slate-700 font-bold">
            <HeartPulse size={16} className="text-teal-700" />
            <span>NIRAMAYA-SETU</span>
            <span className="text-slate-400 font-normal">© 2026 • Rural Healthcare Care Continuity Platform</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal-700">Welcome</Link>
            <Link href="/about" className="hover:text-teal-700">About Platform</Link>
            <Link href="/get-started" className="hover:text-teal-700">Get Started</Link>
            <Link href="/facilities" className="hover:text-teal-700">Nearby Facilities</Link>
            <Link href="/doctors" className="hover:text-teal-700">Doctors</Link>
            <Link href="/appointments" className="hover:text-teal-700">Appointments</Link>
            <Link href="/consent" className="hover:text-teal-700">Privacy & Consent</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}