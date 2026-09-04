"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  User,
  CheckCircle2,
  XCircle,
  PlayCircle,
  FileText,
  Filter,
  Stethoscope,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  Appointment,
  AppointmentStatus,
  getStoredAppointments,
  updateAppointmentStatus,
  isSameDay,
  isFutureDay,
} from "../../data/doctorData";

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tab, setTab] = useState<"Today" | "Upcoming" | "Completed" | "All">("Today");

  useEffect(() => {
    setAppointments(getStoredAppointments());
  }, []);

  const handleComplete = (id: string) => {
    updateAppointmentStatus(id, "Completed");
    setAppointments(getStoredAppointments());
  };

  const filtered = appointments.filter((apt) => {
    if (tab === "Today") return apt.status === "Confirmed" && isSameDay(apt.date);
    if (tab === "Upcoming") return apt.status === "Confirmed" && isFutureDay(apt.date);
    if (tab === "Completed") return apt.status === "Completed";
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/doctor" className="hover:text-teal-700">
                Doctor Workspace
              </Link>
              <span>/</span>
              <span className="text-slate-800">Appointments</span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Doctor Consultation Schedule
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Review assigned patient tele-consultations, launch video sessions, and record clinical recommendations.
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm text-xs font-semibold">
            {(["Today", "Upcoming", "Completed", "All"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-xl px-3.5 py-2 transition ${
                  tab === t
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments Queue Table / Cards */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition hover:shadow-md md:flex-row md:items-center gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        apt.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : apt.status === "Completed"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {apt.status}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {apt.mode}
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      {apt.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 font-bold text-teal-800 text-sm">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {apt.patientName}{" "}
                        <span className="font-mono text-xs font-normal text-slate-400">
                          ({apt.temporaryPatientId})
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Masked Contact: {apt.patientMobileMasked} • Reason: {apt.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-slate-400" />
                      {apt.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-400" />
                      {apt.timeSlot}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-teal-800">
                      Session: {apt.consultationSessionId}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 md:pt-0 shrink-0">
                  <Link
                    href={`/patients/${apt.patientId}`}
                    className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    View Record
                  </Link>

                  {apt.status === "Confirmed" && (
                    <>
                      <Link
                        href={`/consultations/${apt.consultationSessionId}`}
                        className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-teal-800 transition"
                      >
                        <Video size={14} />
                        Start Session
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleComplete(apt.id)}
                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
                      >
                        Complete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Calendar size={36} className="mx-auto text-slate-300" />
            <h3 className="mt-3 text-base font-bold text-slate-700">No appointments found in this view</h3>
            <p className="mt-1 text-xs text-slate-400">Scheduled consultations from patients will appear here.</p>
          </div>
        )}

        {/* Privacy Note */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-800">
          <p className="font-semibold">Privacy & Phone Masking Guarantee</p>
          <p className="mt-0.5 text-[11px] text-blue-700">
            Doctors and patients interact using temporary communication IDs (<code className="font-mono">NIR-P-XXXXXX</code> and <code className="font-mono">NIR-D-XXXXXX</code>) to protect personal numbers.
          </p>
        </div>
      </div>
    </main>
  );
}
