"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  ShieldCheck,
  Lock,
  Clock,
  User,
  Stethoscope,
  FileText,
  AlertTriangle,
  ArrowLeft,
  Volume2,
} from "lucide-react";
import {
  getStoredAppointments,
  Appointment,
  generateTempPatientId,
  generateTempDoctorId,
} from "../../data/doctorData";
import LanguageSelector from "../../components/LanguageSelector";
import { useLanguage } from "../../context/LanguageContext";

export default function ConsultationRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const sessionId = resolvedParams.id;
  const { t } = useLanguage();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activeMode, setActiveMode] = useState<"Video" | "Audio">("Video");
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    const all = getStoredAppointments();
    const match = all.find(
      (a) => a.consultationSessionId === sessionId || a.id === sessionId
    );
    if (match) {
      setAppointment(match);
      if (match.mode === "Audio") setActiveMode("Audio");
      setNotes(
        `Consultation reason: ${match.reason || "Specialist clinical consultation"}\nInitial assessment:`
      );
    }
    setIsLoaded(true);
  }, [sessionId]);

  // Consultation timer
  useEffect(() => {
    if (!appointment) return;
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [appointment]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndCall = () => {
    if (confirm("End consultation session and return to appointments?")) {
      router.push("/appointments");
    }
  };

  // If page is loaded and no appointment matches this session ID
  if (isLoaded && !appointment) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <header className="border-b border-slate-800/80 bg-slate-900/90 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-xs">
                NS
              </div>
              <div>
                <h1 className="text-xs font-bold tracking-tight text-white sm:text-sm">
                  NIRAMAYA-SETU
                </h1>
                <p className="text-[10px] text-slate-400">Tele-Health Consultation Portal</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Link
                href="/appointments"
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                <ArrowLeft size={13} />
                Appointments
              </Link>
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-lg p-6 my-auto text-center">
          <div className="rounded-3xl border border-rose-900/40 bg-slate-900/90 p-8 shadow-2xl backdrop-blur">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-lg font-bold text-white">Invalid or Expired Consultation Session</h2>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              The consultation session identifier <code className="font-mono text-rose-300 bg-slate-950 px-2 py-0.5 rounded border border-rose-900/50">{sessionId}</code> does not correspond to an active appointment or has expired.
            </p>
            <p className="mt-2 text-[11px] text-slate-400">
              To protect patient privacy, no clinical records or tele-consultation data are exposed for invalid sessions.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/appointments"
                className="rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-teal-700 transition"
              >
                View Active Appointments
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-800 bg-slate-900/80 py-3 text-center text-[10px] text-slate-500">
          NIRAMAYA-SETU Privacy Guard • Real session authorization and token validation handled on backend
        </footer>
      </main>
    );
  }

  const patientName = appointment?.patientName || "Patient";
  const doctorName = appointment?.doctorName || "Doctor";
  const doctorSpecialty = appointment?.doctorSpecialty || "Specialist";
  const tempPatientId = appointment?.temporaryPatientId || generateTempPatientId();
  const tempDoctorId = appointment?.temporaryDoctorId || generateTempDoctorId();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white font-bold text-xs">
              NS
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <h1 className="text-xs font-bold tracking-tight text-white sm:text-sm">
                  Consultation Prototype
                </h1>
                <span className="rounded bg-teal-900/80 px-2 py-0.5 font-mono text-[10px] text-teal-300 border border-teal-700">
                  {sessionId}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Simulated Video Preview • Temporary Privacy Identifiers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />

            {/* Timer */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono font-bold text-slate-200">
              <Clock size={13} className="text-teal-400" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
                showNotes
                  ? "border-teal-500 bg-teal-950 text-teal-300"
                  : "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <FileText size={14} className="inline mr-1" />
              Notes
            </button>
          </div>
        </div>
      </header>

      {/* Main Video & Canvas Grid */}
      <section className="mx-auto flex-1 w-full max-w-7xl p-4 sm:p-6 grid gap-4 lg:grid-cols-[1fr_340px] items-center">
        {/* Video Canvas Area */}
        <div className="relative flex flex-col items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 min-h-[440px] sm:min-h-[520px] overflow-hidden shadow-2xl p-6">
          
          {/* Simulated Doctor Video Stream */}
          {videoEnabled && activeMode === "Video" ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
              {/* Doctor Avatar / Clean Video Stream Placeholder */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-md text-teal-400">
                <Stethoscope size={48} />
              </div>
              <h2 className="mt-4 text-lg font-bold text-white">{doctorName}</h2>
              <p className="text-xs font-semibold text-teal-400">{doctorSpecialty}</p>
              <p className="mt-1 font-mono text-[11px] text-slate-400">
                Doctor Temporary ID: {tempDoctorId}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[10px] font-medium text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Simulated Video Preview • Connection Stable
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                {activeMode === "Audio" ? <Volume2 size={36} /> : <VideoOff size={36} />}
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-200">
                {activeMode === "Audio" ? "Audio Only Consultation" : "Camera Disabled"}
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                {doctorName} ({doctorSpecialty}) • Audio connection active
              </p>
            </div>
          )}

          {/* Picture-in-Picture Patient Stream */}
          <div className="absolute bottom-4 right-4 h-28 w-36 sm:h-36 sm:w-48 rounded-2xl border border-slate-700 bg-slate-800/90 backdrop-blur p-2 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-300">
              <span>You (Patient)</span>
              <span className="text-teal-400">{tempPatientId}</span>
            </div>
            <div className="flex items-center justify-center flex-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-800 font-bold text-xs text-white">
                {patientName.charAt(0)}
              </div>
            </div>
            <p className="text-center text-[10px] font-semibold text-slate-300 truncate">
              {patientName}
            </p>
          </div>

          {/* Privacy Session Notice Overlay */}
          <div className="absolute top-4 left-4 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-[10px] text-slate-400 backdrop-blur">
            <Lock size={11} className="inline mr-1 text-teal-400" />
            Temporary IDs Active • No Phone Numbers Exposed
          </div>
        </div>

        {/* Right: In-Call Clinical Notes & Details */}
        {showNotes && (
          <div className="flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900 p-5 min-h-[440px] sm:min-h-[520px] shadow-xl">
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">In-Call Clinical Notes</h3>
                <p className="text-[10px] text-slate-400">Real-time doctor assessment & recommendations</p>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Doctor Clinical Observation
                </label>
                <textarea
                  rows={6}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-200 outline-none focus:border-teal-500"
                  placeholder="Record diagnosis, prescription, follow-up instructions..."
                />
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-[11px] space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Patient Identity:</span>
                  <span className="text-white font-medium">{patientName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Assigned Clinician:</span>
                  <span className="text-teal-400 font-medium">{doctorName}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                  <span>Session:</span>
                  <span>{sessionId}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <ShieldCheck size={12} className="text-teal-400" />
                Production WebRTC integration required • Backend authorization planned
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Bottom Controls Bar */}
      <footer className="border-t border-slate-800 bg-slate-900/95 py-4 px-4 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-center gap-4 sm:gap-6">
          {/* Audio Toggle */}
          <button
            type="button"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition shadow-lg ${
              audioEnabled
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            title={audioEnabled ? "Mute Microphone" : "Unmute Microphone"}
          >
            {audioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
          </button>

          {/* Video Toggle */}
          <button
            type="button"
            onClick={() => setVideoEnabled(!videoEnabled)}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition shadow-lg ${
              videoEnabled
                ? "bg-slate-800 text-white hover:bg-slate-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
            title={videoEnabled ? "Turn Off Camera" : "Turn On Camera"}
          >
            {videoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          {/* Mode Switch (Video / Audio) */}
          <button
            type="button"
            onClick={() => setActiveMode(activeMode === "Video" ? "Audio" : "Video")}
            className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
          >
            Mode: {activeMode}
          </button>

          {/* End Call Button */}
          <button
            type="button"
            onClick={handleEndCall}
            className="flex h-12 w-14 items-center justify-center rounded-2xl bg-red-600 text-white transition hover:bg-red-700 shadow-lg shadow-red-900/40"
            title="End Consultation"
          >
            <PhoneOff size={22} />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-3 text-center text-[10px] text-slate-500">
          Consultation Prototype • Production WebRTC integration required • Real session authorization and token validation handled on backend
        </p>
      </footer>
    </main>
  );
}
