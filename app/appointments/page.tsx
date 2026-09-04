"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  User,
  Building2,
  Stethoscope,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Plus,
  ShieldCheck,
  Phone,
  Filter,
  UserCheck,
} from "lucide-react";
import {
  doctorsList,
  Doctor,
  Appointment,
  ConsultationMode,
  AppointmentStatus,
  getStoredAppointments,
  saveAppointment,
  updateAppointmentStatus,
  generateSessionId,
  generateTempPatientId,
  generateTempDoctorId,
  isSameDay,
  isFutureDay,
  CURRENT_TEST_DATE_STR,
} from "../data/doctorData";
import LanguageSelector from "../components/LanguageSelector";

const CANONICAL_DEMO_PATIENTS = [
  { name: "Ramesh Kumar", id: "NS-10284", age: 54, mobile: "9876543210" },
  { name: "Sunita Devi", id: "NS-10279", age: 47, mobile: "9876543211" },
  { name: "Mohan Lal", id: "NS-10271", age: 58, mobile: "9876543212" },
  { name: "Kamla Devi", id: "NS-10263", age: 61, mobile: "9876543213" },
];

function AppointmentsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<AppointmentStatus | "All">("Confirmed");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Booking Form State
  const initialDoctorId = searchParams.get("doctorId") || doctorsList[0].id;
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [selectedDate, setSelectedDate] = useState("05 Sep 2026");
  const [selectedSlot, setSelectedSlot] = useState("10:30 AM");
  const [selectedMode, setSelectedMode] = useState<ConsultationMode>("Video");
  const [patientName, setPatientName] = useState("");
  const [patientMobile, setPatientMobile] = useState("");
  const [activePatientId, setActivePatientId] = useState("");
  const [hasPatientSession, setHasPatientSession] = useState(false);
  const [formError, setFormError] = useState("");
  const [reason, setReason] = useState("Routine specialist consultation and clinical follow-up");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setAppointments(getStoredAppointments());

    // Check active authenticated patient or stored demo patient context
    const storedMobile = localStorage.getItem("niramaya-patient-mobile");
    const storedAuth = localStorage.getItem("niramaya-patient-auth");
    const registeredPatients = JSON.parse(localStorage.getItem("niramaya_patients") || "[]");

    if (storedAuth || storedMobile) {
      if (storedMobile) {
        const match = registeredPatients.find(
          (p: { mobile?: string; phone?: string; name?: string; id?: string }) =>
            p.mobile === storedMobile || p.phone === storedMobile
        );
        if (match) {
          setPatientName(match.name || "Demo Patient");
          setPatientMobile(storedMobile);
          setActivePatientId(match.id || "NS-10284");
          setHasPatientSession(true);
        } else {
          setPatientName("Verified Patient");
          setPatientMobile(storedMobile);
          setActivePatientId("NS-10284");
          setHasPatientSession(true);
        }
      } else {
        // Auth flag present without mobile
        setPatientName("Verified Patient");
        setPatientMobile("9876543210");
        setActivePatientId("NS-10284");
        setHasPatientSession(true);
      }
    } else {
      // No active patient session - require explicit demo selection or manual input
      setHasPatientSession(false);
      setPatientName("");
      setPatientMobile("");
      setActivePatientId("");
    }

    if (searchParams.get("doctorId")) {
      setShowBookingModal(true);
    }
  }, [searchParams]);

  const selectedDoctor = doctorsList.find((d) => d.id === selectedDoctorId) || doctorsList[0];

  const handleSelectDemoPatient = (p: typeof CANONICAL_DEMO_PATIENTS[0]) => {
    setPatientName(p.name);
    setPatientMobile(p.mobile);
    setActivePatientId(p.id);
    setFormError("");
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      setFormError("Please select a verified patient profile or enter patient name.");
      return;
    }
    if (!patientMobile.trim()) {
      setFormError("Please provide a valid registered mobile number.");
      return;
    }

    const assignedPatientId = activePatientId || `NS-${Math.floor(10000 + Math.random() * 90000)}`;
    const finalPatientName = patientName.trim();

    const newAppointment: Appointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: assignedPatientId,
      patientName: finalPatientName,
      patientMobileMasked: patientMobile.startsWith("+91") ? patientMobile : `+91 ${patientMobile}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      doctorSpecialty: selectedDoctor.specialty,
      facilityName: selectedDoctor.facility,
      date: selectedDate,
      timeSlot: selectedSlot,
      mode: selectedMode,
      status: "Confirmed",
      consultationSessionId: generateSessionId(),
      temporaryPatientId: generateTempPatientId(),
      temporaryDoctorId: generateTempDoctorId(),
      reason: reason.trim(),
      createdAt: "05 Sep 2026",
    };

    saveAppointment(newAppointment);
    setAppointments(getStoredAppointments());
    setBookingSuccess(true);
    setFormError("");

    setTimeout(() => {
      setBookingSuccess(false);
      setShowBookingModal(false);
    }, 1500);
  };

  const handleCancel = (id: string) => {
    updateAppointmentStatus(id, "Cancelled");
    setAppointments(getStoredAppointments());
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === "All") return true;
    if (activeTab === "Confirmed") {
      return apt.status === "Confirmed" && (isSameDay(apt.date) || isFutureDay(apt.date));
    }
    if (activeTab === "Completed") return apt.status === "Completed";
    if (activeTab === "Cancelled") return apt.status === "Cancelled";
    return apt.status === activeTab;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="flex h-16 items-center justify-between px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white font-bold text-xs">
              NS
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">Patient Appointments</h1>
              <p className="text-[10px] text-slate-500">Tele-Health & In-Person Specialist Care</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => {
                setFormError("");
                setShowBookingModal(true);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-800 transition"
            >
              <Plus size={15} />
              Book Appointment
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Top Intro */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Appointments & Consultations
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage scheduled tele-consultations, join secure virtual rooms, or view hospital clinic visits.
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm text-xs font-semibold">
            {(["Confirmed", "Completed", "Cancelled", "All"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-3.5 py-2 transition ${
                  activeTab === tab
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {tab === "Confirmed" ? "Upcoming" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  {/* Top Status & Date */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
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
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                        {apt.mode}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                        <Calendar size={13} className="text-teal-600" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 justify-end">
                        <Clock size={11} />
                        <span>{apt.timeSlot}</span>
                      </div>
                    </div>
                  </div>

                  {/* Doctor & Facility */}
                  <div className="mt-4 flex items-start gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 font-bold border border-teal-100">
                      <Stethoscope size={22} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{apt.doctorName}</h3>
                      <p className="text-xs font-semibold text-teal-700">{apt.doctorSpecialty}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                        <Building2 size={12} />
                        {apt.facilityName}
                      </p>
                    </div>
                  </div>

                  {/* Patient Info Card */}
                  <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-3 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Patient:</span>
                      <span className="font-semibold text-slate-800">{apt.patientName}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px]">
                      <span className="text-slate-500">Patient ID:</span>
                      <span className="text-slate-700">{apt.patientId}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Reason:</span>
                      <span className="text-slate-700 italic truncate max-w-[200px]">{apt.reason}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  {apt.status === "Confirmed" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCancel(apt.id)}
                        className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                      >
                        Cancel
                      </button>

                      {apt.consultationSessionId && (
                        <Link
                          href={`/consultations/${apt.consultationSessionId}`}
                          className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-teal-800 transition"
                        >
                          <Video size={14} />
                          Enter Consultation Room
                        </Link>
                      )}
                    </>
                  )}

                  {apt.status === "Completed" && (
                    <span className="text-xs font-medium text-slate-400 self-center">
                      Consultation completed • Clinical record updated
                    </span>
                  )}
                  {apt.status === "Cancelled" && (
                    <span className="text-xs font-medium text-rose-400 self-center">
                      Appointment cancelled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Calendar size={36} className="mx-auto text-slate-300" />
            <h3 className="mt-3 text-base font-bold text-slate-700">No appointments in this category</h3>
            <p className="mt-1 text-xs text-slate-400">Schedule your consultation with a verified medical specialist.</p>
            <button
              type="button"
              onClick={() => {
                setFormError("");
                setShowBookingModal(true);
              }}
              className="mt-4 rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-800"
            >
              Book New Appointment
            </button>
          </div>
        )}

        {/* Subtle Demo Note */}
        <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600">
          <ShieldCheck size={16} className="text-teal-600 shrink-0" />
          <span>
            Privacy-Preserving Tele-Consultation: Appointments generate temporary session IDs (<code className="font-mono text-teal-800 bg-slate-100 px-1.5 py-0.5 rounded">NIR-CON-XXXXXX</code>) to protect patient phone privacy.
          </span>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl my-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Book Doctor Appointment</h3>
                  <p className="text-xs text-slate-500">Select specialist, mode, and patient details</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              {bookingSuccess ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-slate-900">Appointment Confirmed!</h4>
                  <p className="mt-1 text-xs text-slate-500">
                    Temporary consultation session ID generated. Updating your appointments...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookAppointment} className="mt-5 space-y-4 text-xs">
                  {formError && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs font-semibold text-rose-700">
                      {formError}
                    </div>
                  )}

                  {/* Patient Profile Selection Block */}
                  {hasPatientSession ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserCheck size={16} className="text-emerald-700 shrink-0" />
                        <div>
                          <div className="font-bold text-emerald-900">{patientName}</div>
                          <div className="text-[10px] text-emerald-700 font-mono">
                            ID: {activePatientId} • {patientMobile}
                          </div>
                        </div>
                      </div>
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        Active Profile
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 text-xs">Patient Context Required</span>
                        <Link
                          href="/patient/login"
                          className="text-[11px] font-bold text-teal-800 hover:underline"
                        >
                          Sign in with OTP →
                        </Link>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        No active session detected. Select a verified demo patient or fill in applicant details below:
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {CANONICAL_DEMO_PATIENTS.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleSelectDemoPatient(p)}
                            className={`rounded-xl border p-2 text-left transition ${
                              activePatientId === p.id
                                ? "border-teal-700 bg-teal-100/70 text-teal-900 font-bold"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <div className="text-xs font-semibold">{p.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {p.id} • {p.age} yrs
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Select Doctor */}
                  <div>
                    <label className="mb-1.5 block font-semibold text-slate-700">Select Doctor / Specialist</label>
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600 bg-white"
                    >
                      {doctorsList.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.specialty} ({doc.facility})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block font-semibold text-slate-700">Consultation Date</label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600 bg-white"
                      >
                        <option value="05 Sep 2026">Today (05 Sep 2026)</option>
                        <option value="06 Sep 2026">Tomorrow (06 Sep 2026)</option>
                        <option value="07 Sep 2026">07 Sep 2026</option>
                        <option value="08 Sep 2026">08 Sep 2026</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block font-semibold text-slate-700">Time Slot</label>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600 bg-white"
                      >
                        {selectedDoctor.timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Consultation Mode */}
                  <div>
                    <label className="mb-1.5 block font-semibold text-slate-700">Consultation Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Video", "Audio", "In-person"].map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setSelectedMode(mode as ConsultationMode)}
                          className={`rounded-xl border p-2.5 text-center font-semibold transition ${
                            selectedMode === mode
                              ? "border-teal-600 bg-teal-50 text-teal-800"
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1.5 block font-semibold text-slate-700">Patient Name</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          setFormError("");
                        }}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-semibold text-slate-700">Registered Mobile</label>
                      <input
                        type="text"
                        required
                        value={patientMobile}
                        onChange={(e) => {
                          setPatientMobile(e.target.value);
                          setFormError("");
                        }}
                        placeholder="e.g. 9876543210"
                        className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600"
                      />
                    </div>
                  </div>

                  {/* Reason */}
                  <div>
                    <label className="mb-1.5 block font-semibold text-slate-700">Reason / Symptoms</label>
                    <textarea
                      rows={2}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-teal-600"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 rounded-xl bg-teal-700 py-3 font-bold text-white hover:bg-teal-800 shadow-sm"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default function AppointmentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-700 border-t-transparent" />
        </div>
      }
    >
      <AppointmentsPageContent />
    </Suspense>
  );
}
