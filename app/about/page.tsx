"use client";

import Link from "next/link";
import {
  ArrowRight,
  Share2,
  Lock,
  ShieldCheck,
  Clock,
  UserCheck,
  AlertCircle,
  Building2,
  Users,
  Stethoscope,
  MapPin,
  Cpu,
} from "lucide-react";
import { teamMembers, projectCreators } from "../data/teamData";
import LanguageSelector from "../components/LanguageSelector";

export default function AboutPage() {
  // 17 Capabilities (strictly matching Prompt Requirements)
  const capabilities = [
    {
      id: "cap-1",
      title: "Patient Registration",
      desc: "Village & self-service registration with privacy-first identity masking and SEVA ID generation.",
      visual: "patient-registration",
      badge: "Active",
      category: "Identity & Access",
    },
    {
      id: "cap-2",
      title: "Digital Patient Records",
      desc: "Longitudinal health records, diagnostic summaries, vital trends, and printable clinical sheets.",
      visual: "digital-records",
      badge: "Active",
      category: "Clinical Data",
    },
    {
      id: "cap-3",
      title: "ASHA / ANM Field Support",
      desc: "Offline-capable visit recording, maternal-child screening, and post-discharge recovery monitoring.",
      visual: "asha-support",
      badge: "Active",
      category: "Field Operations",
    },
    {
      id: "cap-4",
      title: "Referral Management",
      desc: "Structured clinical transfer routing from rural sub-centers to secondary and tertiary hospitals.",
      visual: "referral-management",
      badge: "Active",
      category: "Referral Network",
    },
    {
      id: "cap-5",
      title: "Closed-Loop Referral Tracking",
      desc: "End-to-end lifecycle visibility across 6 milestones from initiation to recovery confirmation.",
      visual: "closed-loop",
      badge: "Active",
      category: "Continuity Care",
    },
    {
      id: "cap-6",
      title: "Follow-up Tracking",
      desc: "Proactive 48-hour missed appointment alerts and front-line worker action queues.",
      visual: "follow-up",
      badge: "Active",
      category: "Continuity Care",
    },
    {
      id: "cap-7",
      title: "Nearby Hospital / Clinic Discovery",
      desc: "Geolocation-based nearest PHC, CHC, and district hospital mapping with travel distance calculation.",
      visual: "nearby-healthcare",
      badge: "Active",
      category: "Care Navigation",
    },
    {
      id: "cap-8",
      title: "Doctor Discovery",
      desc: "Specialist directory with department filters, qualifications, and consultation mode options.",
      visual: "doctor-discovery",
      badge: "Active",
      category: "Care Navigation",
    },
    {
      id: "cap-9",
      title: "Online Appointment Booking",
      desc: "Step-by-step specialist scheduling with date selection, time slots, and patient context preservation.",
      visual: "appointment",
      badge: "Active",
      category: "Care Navigation",
    },
    {
      id: "cap-10",
      title: "Video Consultation Prototype",
      desc: "Frontend video consultation preview with privacy session identifiers and in-call clinical notes.",
      visual: "video-consultation",
      badge: "Prototype",
      category: "Tele-Health",
    },
    {
      id: "cap-11",
      title: "Audio Consultation Prototype",
      desc: "Low-bandwidth audio consultation interface designed for remote rural connectivity environments.",
      visual: "audio-consultation",
      badge: "Prototype",
      category: "Tele-Health",
    },
    {
      id: "cap-12",
      title: "Clinical Summary / Documents",
      desc: "Standardized A4 clinical summary and referral discharge documentation ready for medical records.",
      visual: "clinical-summary",
      badge: "Active",
      category: "Clinical Data",
    },
    {
      id: "cap-13",
      title: "Medicine Discovery / Ordering Prototype",
      desc: "Essential medicine dispensary with prescription validation checks and sub-center delivery coordination.",
      visual: "medicine-support",
      badge: "Prototype",
      category: "Pharmacy Care",
    },
    {
      id: "cap-14",
      title: "Multilingual Support",
      desc: "Native English, हिन्दी (Hindi), and मराठी (Marathi) interfaces with persistent language memory.",
      visual: "multilingual",
      badge: "Active",
      category: "Accessibility",
    },
    {
      id: "cap-15",
      title: "Voice & Text Assistance",
      desc: "Prototype voice and text guidance supporting multilingual query matching and patient navigation.",
      visual: "voice-assistance",
      badge: "Prototype",
      category: "Accessibility",
    },
    {
      id: "cap-16",
      title: "Consent & Privacy",
      desc: "Granular patient consent management with masked identity and tokenized QR verification payloads.",
      visual: "privacy-consent",
      badge: "Active",
      category: "Security & Trust",
    },
    {
      id: "cap-17",
      title: "Offline-first Rural Workflow",
      desc: "Browser-local caching designed for low-connectivity rural health outposts with planned background sync.",
      visual: "offline-workflow",
      badge: "Prototype",
      category: "Rural Reliability",
    },
  ];

  // 6 Stakeholders (strictly matching Prompt Requirements)
  const stakeholders = [
    {
      title: "Patients & Families",
      roleBadge: "Citizen Centric",
      visual: "patients",
      problem: "Families frequently struggle with lost paper records, travel confusion, and disconnected follow-up care when traveling to unfamiliar regional hospitals.",
      benefit: "Access unified longitudinal records, track referral status in real time, discover nearby clinics, and book specialist consultations without losing history.",
      workflow: "Registration → Discover Care → Schedule / Teleconsult → Track Referral → Coordinated Follow-up",
    },
    {
      title: "ASHA / ANM Workers",
      roleBadge: "Frontline Community",
      visual: "asha-workers",
      problem: "Heavy paper registers, lack of connectivity in remote hamlets, and zero visibility into referred patients once they leave the village boundary.",
      benefit: "Offline-first visit recording, automated 48-hour follow-up reminders, and post-discharge instructions directly relayed from specialist doctors.",
      workflow: "Home Visit → Record Vitals Offline → Initiate Referral → Receive Hospital Discharge Alert → Home Follow-up",
    },
    {
      title: "Doctors & Clinicians",
      roleBadge: "Clinical Care",
      visual: "doctors",
      problem: "Receiving transfer patients without baseline vital trends, preliminary medications, or clear primary triage reason from rural health centers.",
      benefit: "Instant verified medical history upon scanning referral QR tokens, structured tele-consultation queues, and direct assignment of recovery tasks.",
      workflow: "Review Referral Queue → Verify QR Token → Conduct Examination / Teleconsult → Log Diagnosis → Issue Discharge Orders",
    },
    {
      title: "Hospitals & Clinics",
      roleBadge: "Institutional Care",
      visual: "hospitals",
      problem: "Unpredictable emergency surges, overcrowded triage wards, and lack of pre-arrival patient notifications from referring primary clinics.",
      benefit: "Incoming referral pipeline predictability, real-time bed capacity broadcast, coordinated departmental handoffs, and audit compliance.",
      workflow: "Intake Notification → Bed Allocation → Emergency / OPD Admission → Treatment Coordination → Discharge Summary",
    },
    {
      title: "Administrators & Health Officials",
      roleBadge: "Public Health Governance",
      visual: "administrators",
      problem: "Lagging public health surveillance data, undocumented lost-to-follow-up cases, and opaque referral resource allocation across districts.",
      benefit: "Consolidated district referral metrics, facility load balancing, closed-loop resolution tracking, and role-based operational audit trails.",
      workflow: "District Analytics → Resource Triage → Incident Review → Policy Optimization → Compliance Audit",
    },
    {
      title: "Healthcare Partners & Organizations",
      roleBadge: "Ecosystem Collaboration",
      visual: "partners",
      problem: "Fragmented NGO and corporate health initiatives operating in silos without interoperable standards or measurable care continuum metrics.",
      benefit: "Standardized FHIR R4-ready data models, aligned ABDM integration pathways, and verifiable closed-loop public health outcomes.",
      workflow: "Protocol Alignment → Sandbox Interoperability → Program Deployment → Population Continuity Metrics",
    },
  ];

  // Discovery & Access 4 Steps
  const discoverySteps = [
    {
      step: "1",
      title: "Find Nearby Care",
      visual: "find-care",
      desc: "Search nearby Sub-centers, PHCs, CHCs, and District Hospitals by travel distance and emergency capability.",
      linkHref: "/facilities",
      linkText: "Explore Facilities →",
    },
    {
      step: "2",
      title: "Discover Doctors",
      visual: "discover-doctors",
      desc: "Filter verified medical specialists by clinical department, experience, qualifications, and consultation modes.",
      linkHref: "/doctors",
      linkText: "Browse Doctors →",
    },
    {
      step: "3",
      title: "Book Appointment",
      visual: "book-appointment",
      desc: "Select preferred date, time slot, and reason for visit with automated booking confirmation.",
      linkHref: "/appointments",
      linkText: "Book Online →",
    },
    {
      step: "4",
      title: "Continue Care",
      visual: "continue-care",
      desc: "Seamless transition to teleconsultation or hospital referral with longitudinal records preserved.",
      linkHref: "/patient/progress",
      linkText: "Track Journey →",
    },
  ];

  // Ecosystem Integrations
  const ecosystemItems = [
    {
      name: "Ayushman Bharat Digital Mission (ABDM)",
      organization: "National Health Authority",
      status: "Future Backend Integration",
      statusType: "future",
      desc: "Architectural alignment with ABHA ID generation, Health Facility Registry (HFR), and Health Professional Registry (HPR).",
    },
    {
      name: "FHIR R4 Interoperability Schema",
      organization: "HL7 International Standard",
      status: "Schema Aligned Prototype",
      statusType: "prototype",
      desc: "Standardized JSON health record structures for Patient, Encounter, Condition, and ServiceRequest exchange across facilities.",
    },
    {
      name: "Bhashini AI Language Platform",
      organization: "National Language Translation Mission",
      status: "Future Backend Integration",
      statusType: "future",
      desc: "Speech-to-text and vernacular translation pipeline planned for voice-guided rural healthcare navigation in 22 official languages.",
    },
    {
      name: "eSanjeevani Telemedicine Suite",
      organization: "Ministry of Health & Family Welfare",
      status: "Future Integration Planned",
      statusType: "planned",
      desc: "National teleconsultation service interoperability planned for secondary hospital specialist routing from primary wellness centers.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* CANONICAL PUBLIC HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/brand/logo.svg"
              alt="NIRAMAYA-SETU Official Brand Logo"
              className="h-9 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-teal-700 transition">
              Home
            </Link>
            <Link
              href="/about"
              className="text-teal-700 font-bold border-b-2 border-teal-700 pb-0.5"
            >
              About
            </Link>
            <Link href="/facilities" className="hover:text-teal-700 transition">
              Facilities
            </Link>
            <Link href="/doctors" className="hover:text-teal-700 transition">
              Doctors
            </Link>
            <Link href="/appointments" className="hover:text-teal-700 transition">
              Appointments
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="/get-started"
              className="rounded-xl bg-teal-700 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-teal-800 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-slate-900 text-white px-5 py-16 sm:py-20 sm:px-8 lg:px-12 border-b border-slate-800">
          <div className="relative mx-auto max-w-5xl text-center">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              Connected Rural Care • Closed-Loop Referral Platform
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              One Patient Journey. Connected Across Every Level of Care.
            </h1>

            {/* Mission Statement */}
            <p className="mx-auto mt-6 max-w-3xl text-base text-slate-300 sm:text-lg leading-relaxed">
              NIRAMAYA-SETU (निरामय-सेतु) is dedicated to bridging the gap between remote villages, primary health centers, and secondary hospitals through transparent referral tracking, privacy-first patient records, and front-line health worker empowerment.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-started"
                className="rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-teal-500 transition inline-flex items-center gap-2"
              >
                Continue to NIRAMAYA-SETU
                <ArrowRight size={16} />
              </Link>
              <a
                href="#what-we-offer"
                className="rounded-xl border border-slate-700 bg-slate-800/90 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition"
              >
                Explore Capabilities
              </a>
            </div>

            {/* Healthcare Network Visual Illustration */}
            <div className="mt-12 w-full max-w-4xl mx-auto rounded-3xl border border-slate-800/80 bg-slate-950 p-2 sm:p-4 shadow-2xl">
              <img
                src="/about/hero-care-network.svg"
                alt="NIRAMAYA-SETU Connected Care Network: Village Level, Referral Transit, Specialized Care, and Patient Follow-up"
                className="w-full h-auto block rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* 2. WHAT IS NIRAMAYA-SETU? */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Platform Definition</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              What is NIRAMAYA-SETU?
            </h2>
            <p className="mt-4 text-base text-slate-700 leading-relaxed sm:text-lg font-medium">
              NIRAMAYA-SETU is a rural healthcare care-continuity and closed-loop referral platform connecting patients, ASHA/ANM workers, doctors, facilities and care workflows.
            </p>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed text-left sm:text-center">
              Designed specifically for the ground realities of rural and semi-urban public health systems, NIRAMAYA-SETU replaces fragile paper slips and informal telephone calls with an integrated digital workflow. It ensures that whenever a patient is identified with high clinical risk in a village, their medical records, referral transit, hospital reception, treatment, and community rehabilitation follow a transparent, accountable care continuum.
            </p>
          </div>
        </section>

        {/* 3. THE PROBLEM WE SOLVE */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 bg-slate-50 border-b border-slate-200">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Systemic Challenges</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                The Problem We Solve
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Traditional rural healthcare delivery suffers from structural fragmentation between field workers and tertiary medical centers.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Share2 size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Referral Visibility Gaps</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  When a patient is referred from a primary health post, there is no shared mechanism to verify whether they successfully reached the secondary facility or turned back due to transport barriers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                  <Clock size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Missed Follow-up Care</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Post-discharge care and surgical reviews frequently lapse because community health workers receive no notification when patients are discharged from district medical centers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Building2 size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Fragmented Coordination</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Destination facilities receive sudden acute patient transfers without prior diagnostic data, bed availability matching, or specialist availability confirmation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Users size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Field Worker Disconnect</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  ASHA and ANM workers are the frontline guardians of village health, yet they lack digital tools to track their patients once higher-level medical care begins.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                  <Stethoscope size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Clinical Context Loss</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Specialist doctors receive transfer cases without historical vitals, previous treatment history, or documented drug allergies recorded during village visits.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <MapPin size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">Rural Access Barriers</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Citizens face immense difficulty locating appropriate nearby specialized facilities, finding verified doctors, or booking consultations in their native language.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS: ACCESS → RECORD → REFER → FOLLOW */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Continuous Continuum</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                How NIRAMAYA-SETU Works
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                A 4-step care-continuity architecture connecting rural doorsteps to specialized medical centers.
              </p>
            </div>

            {/* Architectural Continuum Diagram */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 shadow-sm">
              <img
                src="/about/continuity-flow.svg"
                alt="NIRAMAYA-SETU 4-Step Continuity Architecture: ACCESS, RECORD, REFER, FOLLOW"
                className="mx-auto w-full max-w-4xl"
              />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                    01
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Step 1</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">ACCESS</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Patient enters the healthcare continuum via ASHA doorstep screening, primary sub-center visit, or direct citizen self-service portal with privacy identity masking.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                    02
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Step 2</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">RECORD</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Frontline health workers capture longitudinal health vitals, symptoms, diagnostic notes, and maternal metrics with offline browser persistence.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                    03
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Step 3</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">REFER</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Structured referral generated with destination facility matching, specialist department triage, clinical urgency priority, and tokenized QR verification.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800">
                    04
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">Step 4</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">FOLLOW</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Automated 48-hour follow-up reminders, post-discharge rehabilitation tasks, and recovery verification by village health workers close the care loop.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. CLOSED-LOOP REFERRAL LIFECYCLE */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Accountability</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                6-Stage Closed-Loop Referral Lifecycle
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Closed-loop tracking guarantees that every referral has clear ownership from initial initiation to final community recovery verification.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 text-center">
              {[
                { num: "1", title: "Created", desc: "Referral drafted by ASHA or PHC Doctor with clinical priority and facility matching." },
                { num: "2", title: "In Transit", desc: "Patient en route to destination hospital; referral tracked in active transit." },
                { num: "3", title: "Received", desc: "Hospital scans referral QR token, verifies identity, and logs admission." },
                { num: "4", title: "Under Treatment", desc: "Specialist consultations, clinical notes, and inpatient procedures recorded." },
                { num: "5", title: "Discharged", desc: "Clinical discharge summary and recovery instructions issued." },
                { num: "6", title: "Closed", desc: "ASHA completes home visit, checks vitals, and confirms recovery." },
              ].map((st) => (
                <div key={st.num} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-white font-bold text-xs">
                      {st.num}
                    </span>
                    <h4 className="mt-3 text-sm font-bold text-slate-900">{st.title}</h4>
                    <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">{st.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-semibold text-teal-700">
                    Stage {st.num} of 6
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-teal-200 bg-teal-50/70 p-5 text-center text-xs text-teal-900">
              <strong>Why Closed-Loop Visibility Matters:</strong> Without closed-loop tracking, high-risk patients drop out of care unnoticed between facilities. NIRAMAYA-SETU creates a shared feedback loop where hospital discharge notices automatically trigger follow-up tasks for village health workers.
            </div>
          </div>
        </section>

        {/* 6. WHAT WE OFFER (17 Capabilities Catalog with Custom Visual System) */}
        <section id="what-we-offer" className="py-20 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Comprehensive Suite</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                What We Offer
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                17 specialized digital capabilities built for patients, frontline workers, clinicians, and health administrators.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {capabilities.map((cap) => {
                const isProto = cap.badge === "Prototype";
                return (
                  <div
                    key={cap.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-teal-300"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden shadow-xs">
                          <img
                            src={`/about/features/${cap.visual}.svg`}
                            alt=""
                            aria-hidden="true"
                            className="h-11 w-11 object-contain"
                          />
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            isProto
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {cap.badge}
                        </span>
                      </div>

                      <span className="mt-4 block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {cap.category}
                      </span>
                      <h3 className="mt-1 text-sm font-bold text-slate-900">{cap.title}</h3>
                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">{cap.desc}</p>
                    </div>

                    {isProto && (
                      <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-amber-700 italic">
                        Frontend prototype workflow
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. WHO WE SERVE (6 Distinct Stakeholders with Custom Visuals) */}
        <section className="py-20 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Ecosystem Value</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Who We Serve
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Tailored workflows addressing the unique operational needs of each healthcare participant.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stakeholders.map((sh) => {
                return (
                  <div
                    key={sh.title}
                    className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-slate-300"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-13 w-13 items-center justify-center rounded-2xl overflow-hidden shadow-xs">
                          <img
                            src={`/about/stakeholders/${sh.visual}.svg`}
                            alt=""
                            aria-hidden="true"
                            className="h-12 w-12 object-contain"
                          />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
                          {sh.roleBadge}
                        </span>
                      </div>

                      <h3 className="mt-4 text-base font-bold text-slate-900">{sh.title}</h3>

                      {/* Problem */}
                      <div className="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100">
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                          Operational Challenge
                        </span>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">{sh.problem}</p>
                      </div>

                      {/* Benefit */}
                      <div className="mt-3 rounded-xl bg-teal-50/60 p-3 border border-teal-100">
                        <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                          NIRAMAYA-SETU Benefit
                        </span>
                        <p className="mt-1 text-xs text-slate-700 leading-relaxed">{sh.benefit}</p>
                      </div>
                    </div>

                    {/* Relevant Workflow */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Care Workflow
                      </span>
                      <p className="mt-1 text-[11px] font-medium text-slate-700">{sh.workflow}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. DISCOVERY & ACCESS */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Citizen Journey</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Discovery &amp; Access
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Empowering rural citizens and families to navigate healthcare options independently.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-4 text-center">
              {discoverySteps.map((step) => (
                <div key={step.step} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-center mb-3">
                      <img
                        src={`/about/discovery/${step.visual}.svg`}
                        alt=""
                        aria-hidden="true"
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-teal-100 text-[10px] font-bold text-teal-800 uppercase tracking-wider">
                      Step {step.step}
                    </span>
                    <h4 className="mt-2 text-sm font-bold text-slate-900">{step.title}</h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <Link
                    href={step.linkHref}
                    className="mt-3 inline-block text-xs font-semibold text-teal-700 hover:underline"
                  >
                    {step.linkText}
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-slate-500 italic">
              Note: Current facility and doctor listings represent prototype demonstration catalogs. Live health registry telemetry planned for production deployment.
            </p>
          </div>
        </section>

        {/* 9. ONLINE CONSULTATION (PROTOTYPE) */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/about/features/video-consultation.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Online Consultation Prototype</h3>
                    <p className="text-xs text-slate-500">Virtual clinic interface for remote medical triage</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
                  Consultation Prototype
                </span>
              </div>

              {/* Visual Asset Illustration */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4">
                <img
                  src="/about/consultation-preview.svg"
                  alt="NIRAMAYA-SETU Online Consultation Interface Preview: Doctor Workspace, Ephemeral Session ID, and Patient Stream"
                  className="mx-auto w-full max-w-2xl rounded-xl"
                />
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="space-y-3 text-xs text-slate-600">
                  <p>
                    NIRAMAYA-SETU provides a frontend consultation prototype that allows patients and doctors to preview remote virtual care appointments:
                  </p>
                  <ul className="space-y-2 list-disc pl-4">
                    <li><strong>Video Consultation Interface:</strong> Interactive call window preview with microphone and camera toggles.</li>
                    <li><strong>Low-Bandwidth Audio Mode:</strong> Voice-focused consultation preview optimized for rural cellular networks.</li>
                    <li><strong>Session Workflow:</strong> Seamless handoff from appointment booking to live clinical session and summary notes.</li>
                    <li><strong>Temporary Session Identifiers:</strong> Ephemeral session tokens protect caller identity without persistent connection exposure.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 text-xs text-amber-900 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-amber-900">
                      <AlertCircle size={16} />
                      Prototype Implementation Notice
                    </div>
                    <p className="mt-2 leading-relaxed">
                      This application contains a frontend tele-consultation preview. Live WebRTC peer connections, turn relay servers, and production telemedicine infrastructure are planned for future deployment phases.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-200/60 font-semibold text-[11px]">
                    Production WebRTC integration planned
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. MEDICINE SUPPORT (PROTOTYPE) */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/about/features/medicine-support.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Medicine Discovery &amp; Ordering Prototype</h3>
                    <p className="text-xs text-slate-500">Essential pharmaceutical catalog &amp; sub-center fulfillment workflow</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
                  Dispensary Prototype
                </span>
              </div>

              {/* Medicine Fulfillment Visual Workflow */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 sm:p-4">
                <img
                  src="/about/medicine-fulfillment.svg"
                  alt="Medicine Ordering Workflow: Formulary Search, Prescription Verification Gate, and Sub-Center Pickup"
                  className="mx-auto w-full max-w-2xl rounded-xl"
                />
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-3 text-center">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="text-xs font-bold text-teal-700">STEP 1</span>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">Browse &amp; Search</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Search common medicines by generic salt name, category, or dosage format.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="text-xs font-bold text-teal-700">STEP 2</span>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">Prescription Check</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    System verifies required prescription flag for regulated medications.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <span className="text-xs font-bold text-teal-700">STEP 3</span>
                  <h4 className="mt-1 text-sm font-bold text-slate-900">Sub-Center Pickup</h4>
                  <p className="mt-1 text-xs text-slate-600">
                    Request dispatched to village sub-center or ASHA worker for community distribution.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50/60 p-4 text-xs text-rose-900">
                <strong>Regulatory Notice:</strong> Prescription required before fulfillment for regulated medicines. This is a prototype workflow demonstrating dispensary logistics; live commercial pharmacy networks are not connected.
              </div>
            </div>
          </div>
        </section>

        {/* 11. MULTILINGUAL + VOICE */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Inclusion &amp; Accessibility</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Multilingual Support &amp; Voice Assistance
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Overcoming literacy and linguistic hurdles in rural healthcare delivery.
              </p>
            </div>

            {/* Multilingual Voice Visual Asset */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 sm:p-4 shadow-sm">
              <img
                src="/about/multilingual-voice.svg"
                alt="Multilingual Native Support (English, Hindi, Marathi) and Voice-Assisted Interaction Architecture"
                className="mx-auto w-full max-w-2xl rounded-xl"
              />
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src="/about/features/multilingual.svg"
                    alt=""
                    aria-hidden="true"
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Supported Languages</h3>
                    <p className="text-xs text-slate-500">Native language interfaces across all screens</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className="text-sm font-bold text-slate-900">English</span>
                    <span className="mt-1 block text-[10px] text-slate-500">Global Standard</span>
                  </div>
                  <div className="rounded-xl border border-teal-200 bg-teal-50 p-3">
                    <span className="text-sm font-bold text-teal-900">हिन्दी</span>
                    <span className="mt-1 block text-[10px] text-teal-700">Hindi</span>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <span className="text-sm font-bold text-emerald-900">मराठी</span>
                    <span className="mt-1 block text-[10px] text-emerald-700">Marathi</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  Persistent language preferences stored locally ensure that front-line workers and patients interact with forms, vital alerts, and instructions in their preferred dialect.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <img
                      src="/about/features/voice-assistance.svg"
                      alt=""
                      aria-hidden="true"
                      className="h-10 w-10 object-contain"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Voice &amp; Text Assistance</h3>
                      <p className="text-xs text-slate-500">Prototype speech interaction</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                    NIRAMAYA-SETU includes prototype voice assistance using the browser Web Speech Recognition API where supported, backed by instant text search and FAQ matching.
                  </p>

                  <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 text-xs text-indigo-900">
                    <strong>Status:</strong> Prototype Voice Assistance. Production deep-learning speech recognition via the National Language Translation Mission (Bhashini) is planned for future backend releases.
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  Full text fallback available for all browsers and low-resource devices.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12. PRIVACY & CONSENT */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Trust &amp; Security</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Privacy &amp; Consent Guardrails
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
                Architectural principles designed to protect citizen dignity and healthcare autonomy.
              </p>
            </div>

            {/* Privacy Architecture Diagram */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4 shadow-sm">
              <img
                src="/about/privacy-guardrails.svg"
                alt="NIRAMAYA-SETU Privacy Guardrails: Masked Identity, Consent Shield, and Tokenized QR Payloads"
                className="mx-auto w-full max-w-2xl rounded-xl"
              />
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Lock className="text-teal-700" size={22} />
                <h4 className="mt-3 text-sm font-bold text-slate-900">Consent-Aware Sharing</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Patients maintain explicit ownership of their longitudinal health records. Clinical sharing requires patient consent, with revocation possible at any milestone.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <ShieldCheck className="text-teal-700" size={22} />
                <h4 className="mt-3 text-sm font-bold text-slate-900">Role-Based Access Control</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Strict cryptographic boundaries prevent unauthorized cross-role data access. ASHA workers, doctors, hospital staff, and administrators access only role-scoped data.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Clock className="text-teal-700" size={22} />
                <h4 className="mt-3 text-sm font-bold text-slate-900">Temporary Consultation IDs</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Virtual consultations use ephemeral session tokens that expire immediately upon call termination, preventing unauthorized link re-use.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <UserCheck className="text-teal-700" size={22} />
                <h4 className="mt-3 text-sm font-bold text-slate-900">Masked Identity Display</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Raw Aadhaar and personal phone numbers are never rendered in full on screens or printed referral slips. Identifiers are masked (e.g. XXXX-XXXX-1284).
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Share2 className="text-teal-700" size={22} />
                <h4 className="mt-3 text-sm font-bold text-slate-900">Privacy QR Payloads</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Referral QR codes do not carry plaintext sensitive medical conditions. They contain opaque cryptographic lookup tokens verifiable only by authorized hospital intake staff.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <Cpu className="text-teal-700" size={22} />
                <h4 className="mt-3 text-sm font-bold text-slate-900">Planned Backend Security</h4>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Full TLS 1.3 in-transit encryption, AES-256 rest encryption, and OAuth2 JWT authentication gateways are specified for production backend deployment.
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-slate-500 italic">
              Disclaimer: The current system is a prototype implementing frontend security and architectural safeguards. Formal statutory compliance certifications (such as ISO 27001 or DISHA) apply to production deployments.
            </p>
          </div>
        </section>

        {/* 13. OFFLINE-FIRST RURAL DESIGN */}
        <section className="py-16 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src="/about/features/offline-workflow.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Offline-First Rural Design</h3>
                  <p className="text-xs text-slate-500">Uninterrupted field healthcare in remote terrains</p>
                </div>
              </div>

              {/* Offline Resilience Diagram */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4">
                <img
                  src="/about/offline-resilience.svg"
                  alt="NIRAMAYA-SETU Offline Resilience: Zero-Connectivity Field Entry, Local Storage Cache, and Auto Background Sync"
                  className="mx-auto w-full max-w-2xl rounded-xl"
                />
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="space-y-3 text-xs text-slate-600">
                  <p>
                    Rural health sub-centers often face intermittent cellular coverage. NIRAMAYA-SETU is engineered with an offline-first architectural mindset:
                  </p>
                  <ul className="space-y-2 list-disc pl-4">
                    <li><strong>Current Prototype:</strong> Local browser storage (<code className="font-mono text-teal-800">localStorage</code>) captures patient registrations, visit notes, and referral drafts when offline.</li>
                    <li><strong>Field Resilience:</strong> ASHA workers can conduct door-to-door screenings in connectivity dead zones without application crashes.</li>
                    <li><strong>Seamless Local Cache:</strong> Records are preserved across page reloads and tab closures on the worker’s device.</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-700 space-y-3">
                  <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                    Production Roadmap
                  </span>
                  <p>
                    Production rollout specifies background Service Worker synchronization, IndexedDB persistent storage, and automatic conflict-resolution protocols once cellular connectivity is regained.
                  </p>
                  <div className="text-[11px] text-slate-500 italic">
                    Prototype utilizes browser storage; multi-device cloud synchronization planned for production.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 14. ECOSYSTEM & FUTURE INTEGRATIONS */}
        <section className="py-20 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Standards Alignment</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Healthcare Ecosystem &amp; Future Integrations
              </h2>
              <p className="mx-auto mt-2 text-xs text-slate-500">
                Architected to interoperate with national digital health infrastructure and open standards.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {ecosystemItems.map((eco) => (
                <div key={eco.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{eco.organization}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        eco.statusType === "prototype"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : eco.statusType === "planned"
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : "bg-slate-200/70 text-slate-800 border border-slate-300"
                      }`}
                    >
                      {eco.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{eco.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{eco.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-400 italic">
              All ecosystem entities are listed for architectural alignment planning; active external connections are established during formal institutional rollout.
            </p>
          </div>
        </section>

        {/* 15. MEET THE TEAM / PROJECT CREATORS */}
        <section className="py-20 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Initiative Architecture</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Meet the Initiative Team
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-xs text-slate-600">
                {projectCreators.missionStatement}
              </p>
              <div className="inline-block mt-3 rounded-full bg-slate-200/80 px-4 py-1 text-[11px] font-medium text-slate-700 border border-slate-300">
                Core architectural roles &amp; contributor specifications — centralized in <code className="font-mono text-teal-800">teamData.ts</code>
              </div>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between transition hover:shadow-md hover:border-slate-300">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-800 font-bold text-sm text-white shadow-sm overflow-hidden">
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
                    <span className="font-medium text-slate-600">{member.category}</span>
                    <span className="font-mono">{member.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 16. HOW CAN YOU JOIN NIRAMAYA-SETU? */}
        <section className="py-20 px-5 sm:px-8 lg:px-12 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">Get Involved</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                How Can You Join NIRAMAYA-SETU?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-xs text-slate-500">
                Whether you are a citizen seeking care, a frontline health worker, a specialist clinician, or a healthcare institution, there is a dedicated portal for you.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Patient */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="rounded-md bg-teal-100 px-2 py-0.5 text-[10px] font-bold text-teal-800">
                    PATIENT / FAMILY
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">Seek Care &amp; View Records</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Create a masked health identity, access past diagnostic sheets, check active referrals, and schedule doctor appointments.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
                >
                  Patient Portal Login <ArrowRight size={14} />
                </Link>
              </div>

              {/* ASHA */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                    ASHA / ANM WORKER
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">Conduct Field Health Work</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Log village visits offline, screen high-risk maternal patients, initiate emergency transfers, and handle follow-up alerts.
                  </p>
                </div>
                <Link
                  href="/asha/login"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                >
                  Field Worker Login <ArrowRight size={14} />
                </Link>
              </div>

              {/* Doctor */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="rounded-md bg-cyan-100 px-2 py-0.5 text-[10px] font-bold text-cyan-800">
                    DOCTOR / CLINICIAN
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">Provide Specialist Care</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Review incoming transfer queues, verify patient referral QR tokens, conduct teleconsultations, and prescribe follow-up regimens.
                  </p>
                </div>
                <Link
                  href="/doctor/login"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-800"
                >
                  Clinical Workspace Login <ArrowRight size={14} />
                </Link>
              </div>

              {/* Facility */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                    HOSPITAL / CLINIC
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">Participate as a Facility</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Broadcast bed availability, manage triage receptions, handle emergency admissions, and standardize discharge workflows.
                  </p>
                </div>
                <Link
                  href="/facility/login"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800"
                >
                  Facility Operations Login <ArrowRight size={14} />
                </Link>
              </div>

              {/* Administrator */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-800">
                    ADMINISTRATION
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">Governance &amp; Audit</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Inspect district health referral metrics, resolve lost-to-follow-up alerts, and manage system security policies.
                  </p>
                </div>
                <Link
                  href="/admin/login"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-800"
                >
                  Administrator Login <ArrowRight size={14} />
                </Link>
              </div>

              {/* Partner */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
                <div>
                  <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800">
                    PARTNERS &amp; NGOS
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">Collaborate with Us</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Partner with our initiative to deploy closed-loop referral protocols in target rural blocks and community health programs.
                  </p>
                </div>
                <Link
                  href="/get-started"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800"
                >
                  Explore Onboarding <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 17. FINAL CTA */}
        <section className="bg-slate-900 py-16 px-5 text-white sm:px-8 lg:px-12 border-t border-slate-800">
          <div className="mx-auto max-w-5xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Join the Continuum</span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-4xl text-white">
              Be Part of Better Healthcare Continuity
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
              How are you connected with NIRAMAYA-SETU? Select your entry point to access your dedicated workspace or learn more.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                Patient
              </Link>
              <Link
                href="/asha/login"
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                ASHA / ANM
              </Link>
              <Link
                href="/doctor/login"
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                Doctor
              </Link>
              <Link
                href="/facility/login"
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition"
              >
                Hospital / Clinic
              </Link>
              <Link
                href="/get-started"
                className="rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-500 transition"
              >
                Continue to NIRAMAYA-SETU
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* CANONICAL PUBLIC FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12 px-5 text-xs text-slate-500 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="/brand/logo.svg"
                  alt="NIRAMAYA-SETU"
                  className="h-7 w-auto"
                />
              </div>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                Connected Rural Care &amp; Closed-Loop Referral Platform. Empowering frontline workers, patients, and healthcare facilities.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Public Portals</h4>
              <ul className="mt-3 space-y-2">
                <li><Link href="/" className="hover:text-teal-700 transition">Platform Home</Link></li>
                <li><Link href="/about" className="text-teal-700 font-semibold">About NIRAMAYA-SETU</Link></li>
                <li><Link href="/get-started" className="hover:text-teal-700 transition">Get Started / Role Select</Link></li>
                <li><Link href="/facilities" className="hover:text-teal-700 transition">Nearby Healthcare Facilities</Link></li>
                <li><Link href="/doctors" className="hover:text-teal-700 transition">Doctor Directory</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Staff Portals</h4>
              <ul className="mt-3 space-y-2">
                <li><Link href="/asha/login" className="hover:text-teal-700 transition">ASHA / ANM Workspace</Link></li>
                <li><Link href="/doctor/login" className="hover:text-teal-700 transition">Doctor Workspace</Link></li>
                <li><Link href="/facility/login" className="hover:text-teal-700 transition">Hospital Operations</Link></li>
                <li><Link href="/admin/login" className="hover:text-teal-700 transition">System Administration</Link></li>
                <li><Link href="/login" className="hover:text-teal-700 transition">Patient Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Open Source &amp; Standards</h4>
              <p className="mt-3 leading-relaxed">
                NIRAMAYA-SETU is developed as an open digital health prototype aligned with ABDM and FHIR R4 specifications.
              </p>
              <div className="mt-3">
                <a
                  href="https://github.com/rishii-sudo/niramaya-setu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-700 font-semibold hover:underline"
                >
                  GitHub Repository →
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} NIRAMAYA-SETU. Open Public Health Initiative.</p>
            <div className="flex items-center gap-4">
              <span>Privacy-Preserving Prototype</span>
              <span>•</span>
              <span>English / हिन्दी / मराठी</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
