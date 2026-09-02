"use client";

import { ChangeEvent, useMemo, useState } from "react";
import Link from "next/link";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  mobile: string;
  referralStatus: string;
};

const patients: Patient[] = [
  {
    id: "NS-10284",
    name: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    village: "Rampura",
    mobile: "98XXXXXX21",
    referralStatus: "In-Transit",
  },
  {
    id: "NS-10279",
    name: "Sunita Devi",
    age: 46,
    gender: "Female",
    village: "Khejroli",
    mobile: "97XXXXXX64",
    referralStatus: "Follow-up Due",
  },
  {
    id: "NS-10271",
    name: "Mohan Lal",
    age: 62,
    gender: "Male",
    village: "Chomu",
    mobile: "96XXXXXX18",
    referralStatus: "Under Treatment",
  },
  {
    id: "NS-10263",
    name: "Kamla Devi",
    age: 39,
    gender: "Female",
    village: "Dhani",
    mobile: "95XXXXXX47",
    referralStatus: "Referral Closed",
  },
];

const visitTypes = [
  "Home Visit",
  "Follow-up",
  "Referral Check",
  "Medication Check",
];

export default function ASHAVisitsPage() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
    null
  );

  const [visitType, setVisitType] = useState("Home Visit");

  const [visitDate, setVisitDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [visitTime, setVisitTime] = useState(
    new Date().toTimeString().slice(0, 5)
  );

  const [symptoms, setSymptoms] = useState("");

  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [spo2, setSpo2] = useState("");
  const [temperature, setTemperature] = useState("");

  const [medicationAdherence, setMedicationAdherence] = useState("");
  const [instructionsFollowed, setInstructionsFollowed] = useState("");

  const [referralStatus, setReferralStatus] = useState("");
  const [reachedFacility, setReachedFacility] = useState("");
  const [treatmentStarted, setTreatmentStarted] = useState("");
  const [noShowReason, setNoShowReason] = useState("");

  const [notes, setNotes] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");

  const [saved, setSaved] = useState(false);
  const [savedAndSynced, setSavedAndSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [pendingSync, setPendingSync] = useState(2);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return patients;

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.village.toLowerCase().includes(query)
    );
  }, [search]);

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearch(`${patient.name} (${patient.id})`);
    setSaved(false);
    setSavedAndSynced(false);
  };

  /*
   * ------------------------------------------------------
   * INPUT FILTERS
   * ------------------------------------------------------
   */

  const onlyNumbers = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const onlyDecimal = (value: string) => {
    let cleaned = value.replace(/[^0-9.]/g, "");

    const firstDot = cleaned.indexOf(".");

    if (firstDot !== -1) {
      cleaned =
        cleaned.slice(0, firstDot + 1) +
        cleaned.slice(firstDot + 1).replace(/\./g, "");
    }

    return cleaned;
  };

  const onlyBloodPressure = (value: string) => {
    return value.replace(/[^0-9/]/g, "");
  };

  const handlePulseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = onlyNumbers(event.target.value).slice(0, 3);
    setPulse(value);

    setErrors((prev) => ({
      ...prev,
      pulse: "",
    }));
  };

  const handleSpo2Change = (event: ChangeEvent<HTMLInputElement>) => {
    const value = onlyNumbers(event.target.value).slice(0, 3);
    setSpo2(value);

    setErrors((prev) => ({
      ...prev,
      spo2: "",
    }));
  };

  const handleTemperatureChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = onlyDecimal(event.target.value).slice(0, 5);
    setTemperature(value);

    setErrors((prev) => ({
      ...prev,
      temperature: "",
    }));
  };

  const handleBpChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = onlyBloodPressure(event.target.value).slice(0, 7);
    setBp(value);

    setErrors((prev) => ({
      ...prev,
      bp: "",
    }));
  };

  /*
   * ------------------------------------------------------
   * VALIDATION
   * ------------------------------------------------------
   */

  const validateVitals = () => {
    const newErrors: Record<string, string> = {};

    // BP format
    if (bp.trim()) {
      const bpMatch = bp.match(/^(\d{2,3})\/(\d{2,3})$/);

      if (!bpMatch) {
        newErrors.bp = "Use format like 120/80";
      } else {
        const systolic = Number(bpMatch[1]);
        const diastolic = Number(bpMatch[2]);

        if (systolic < 50 || systolic > 250) {
          newErrors.bp = "Systolic should be 50–250";
        } else if (diastolic < 30 || diastolic > 150) {
          newErrors.bp = "Diastolic should be 30–150";
        }
      }
    }

    // Pulse
    if (pulse.trim()) {
      const pulseValue = Number(pulse);

      if (pulseValue < 30 || pulseValue > 220) {
        newErrors.pulse = "Pulse should be 30–220 bpm";
      }
    }

    // SpO2
    if (spo2.trim()) {
      const spo2Value = Number(spo2);

      if (spo2Value < 50 || spo2Value > 100) {
        newErrors.spo2 = "SpO₂ should be 50–100%";
      }
    }

    // Temperature
    if (temperature.trim()) {
      const tempValue = Number(temperature);

      if (tempValue < 80 || tempValue > 115) {
        newErrors.temperature = "Temperature should be 80–115 °F";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveVisit = (syncAfterSave = false) => {
    if (!selectedPatient) return;

    const vitalsValid = validateVitals();

    if (!vitalsValid) {
      return;
    }

    setSaved(true);
    setSavedAndSynced(false);

    if (syncAfterSave) {
      setSyncing(true);

      setTimeout(() => {
        setSyncing(false);
        setPendingSync((value) => Math.max(0, value - 1));
        setSavedAndSynced(true);
      }, 1200);

      return;
    }

    setPendingSync((value) => value + 1);
  };

  const syncPendingData = () => {
    if (pendingSync === 0 || syncing) return;

    setSyncing(true);

    setTimeout(() => {
      setPendingSync(0);
      setSyncing(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/asha"
                className="transition hover:text-teal-700"
              >
                ASHA / ANM
              </Link>

              <span>/</span>

              <span className="text-slate-700">Record Visit</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Record Field Visit
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Record patient condition, field observations and referral
              follow-up details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />

                <span className="text-sm font-semibold text-amber-900">
                  Offline Mode
                </span>
              </div>

              <p className="mt-1 text-[11px] text-amber-700">
                Local capture enabled
              </p>
            </div>

            <button
              type="button"
              onClick={syncPendingData}
              className="rounded-xl border border-slate-200 bg-white/90 px-4 py-3 text-left shadow-sm transition hover:border-teal-200 hover:bg-teal-50/50"
            >
              <div className="flex items-center gap-2">
                <svg
                  className={`h-4 w-4 text-teal-700 ${
                    syncing ? "animate-spin" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
                  <path d="M4 5v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2" />
                  <path d="M20 19v-4h-4" />
                </svg>

                <span className="text-sm font-semibold text-slate-800">
                  {syncing ? "Syncing..." : "Sync Now"}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-slate-500">
                Pending: {pendingSync}
              </p>
            </button>
          </div>
        </div>

        {/* WORKFLOW */}
        <div className="mb-6 rounded-2xl border border-teal-100 bg-white/90 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Field Visit Workflow
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Patient → Visit → Vitals → Referral → Save → Sync
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Ready for field entry
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.55fr]">
          {/* PATIENT */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                1. Select Patient
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search by name, patient ID or village.
              </p>
            </div>

            <div className="p-5">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-4-4" />
                </svg>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search patient..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="mt-4 space-y-2">
                {filteredPatients.map((patient) => {
                  const active = selectedPatient?.id === patient.id;

                  return (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => selectPatient(patient)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        active
                          ? "border-teal-300 bg-teal-50"
                          : "border-slate-100 bg-white hover:border-teal-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">
                            {patient.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {patient.id} • {patient.age} yrs •{" "}
                            {patient.gender}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {patient.village}
                          </p>
                        </div>

                        <ReferralStatus
                          status={patient.referralStatus}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredPatients.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm font-semibold text-slate-800">
                    No patient found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Try another name, ID or village.
                  </p>
                </div>
              )}

              {!selectedPatient ? (
                <div className="mt-5 rounded-xl border border-dashed border-teal-200 bg-teal-50/70 p-4">
                  <p className="text-sm font-semibold text-teal-900">
                    New patient?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-teal-800">
                    Register the patient first, then record the field visit.
                  </p>

                  <Link
                    href="/patients/register"
                    className="mt-3 inline-flex rounded-lg bg-teal-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-teal-800"
                  >
                    Register Patient
                  </Link>
                </div>
              ) : (
                <div className="mt-5 rounded-xl border border-teal-200 bg-teal-50 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
                    Selected Patient
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-teal-950">
                        {selectedPatient.name}
                      </p>

                      <p className="text-xs text-teal-800">
                        {selectedPatient.id}
                      </p>
                    </div>

                    <Link
                      href={`/patients/${selectedPatient.id}`}
                      className="rounded-lg border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-teal-800 hover:bg-teal-50"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* VISIT FORM */}
          <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                2. Visit Details
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Capture the field visit information.
              </p>
            </div>

            <div className="p-5">
              {!selectedPatient ? (
                <div className="flex min-h-[540px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
                  <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <svg
                        className="h-7 w-7"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 21a8 8 0 0 1 16 0" />
                      </svg>
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                      Select a patient
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                      Select a patient from the left panel to start recording
                      the visit.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* VISIT INFO */}
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Visit Information
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                      <Field label="Visit Type">
                        <select
                          value={visitType}
                          onChange={(e) =>
                            setVisitType(e.target.value)
                          }
                          className="input-style"
                        >
                          {visitTypes.map((type) => (
                            <option key={type}>{type}</option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Visit Date">
                        <input
                          type="date"
                          value={visitDate}
                          onChange={(e) =>
                            setVisitDate(e.target.value)
                          }
                          className="input-style"
                        />
                      </Field>

                      <Field label="Visit Time">
                        <input
                          type="time"
                          value={visitTime}
                          onChange={(e) =>
                            setVisitTime(e.target.value)
                          }
                          className="input-style"
                        />
                      </Field>
                    </div>
                  </div>

                  {/* SYMPTOMS */}
                  <Field label="Symptoms / Patient Complaint">
                    <textarea
                      rows={3}
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="Describe current symptoms or patient complaint..."
                      className="input-style resize-none"
                    />
                  </Field>

                  {/* VITALS */}
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Vitals
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <Field
                        label="Blood Pressure"
                        error={errors.bp}
                      >
                        <input
                          inputMode="numeric"
                          value={bp}
                          onChange={handleBpChange}
                          placeholder="120/80"
                          maxLength={7}
                          className="input-style"
                        />
                      </Field>

                      <Field
                        label="Pulse"
                        error={errors.pulse}
                      >
                        <div className="relative">
                          <input
                            inputMode="numeric"
                            value={pulse}
                            onChange={handlePulseChange}
                            placeholder="72"
                            maxLength={3}
                            className="input-style pr-12"
                          />

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
                            bpm
                          </span>
                        </div>
                      </Field>

                      <Field
                        label="SpO₂"
                        error={errors.spo2}
                      >
                        <div className="relative">
                          <input
                            inputMode="numeric"
                            value={spo2}
                            onChange={handleSpo2Change}
                            placeholder="98"
                            maxLength={3}
                            className="input-style pr-8"
                          />

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
                            %
                          </span>
                        </div>
                      </Field>

                      <Field
                        label="Temperature"
                        error={errors.temperature}
                      >
                        <div className="relative">
                          <input
                            inputMode="decimal"
                            value={temperature}
                            onChange={handleTemperatureChange}
                            placeholder="98.6"
                            maxLength={5}
                            className="input-style pr-10"
                          />

                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
                            °F
                          </span>
                        </div>
                      </Field>
                    </div>
                  </div>

                  {/* MEDICATION */}
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Medication & Instructions
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Medication Adherence">
                        <select
                          value={medicationAdherence}
                          onChange={(e) =>
                            setMedicationAdherence(e.target.value)
                          }
                          className="input-style"
                        >
                          <option value="">Select</option>
                          <option>Taking as prescribed</option>
                          <option>Partially following</option>
                          <option>Not taking</option>
                          <option>Not applicable</option>
                        </select>
                      </Field>

                      <Field label="Referral Instructions Followed?">
                        <select
                          value={instructionsFollowed}
                          onChange={(e) =>
                            setInstructionsFollowed(e.target.value)
                          }
                          className="input-style"
                        >
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>Partially</option>
                          <option>No</option>
                          <option>Not applicable</option>
                        </select>
                      </Field>
                    </div>
                  </div>

                  {/* REFERRAL */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Referral Follow-up
                    </p>

                    <p className="mb-4 text-xs text-slate-500">
                      Update referral progress for a referred patient.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Current Referral Status">
                        <select
                          value={referralStatus}
                          onChange={(e) =>
                            setReferralStatus(e.target.value)
                          }
                          className="input-style"
                        >
                          <option value="">Select</option>
                          <option>Created</option>
                          <option>In-Transit</option>
                          <option>Received</option>
                          <option>Under Treatment</option>
                          <option>Discharged</option>
                          <option>Closed</option>
                        </select>
                      </Field>

                      <Field label="Patient Reached Facility?">
                        <select
                          value={reachedFacility}
                          onChange={(e) =>
                            setReachedFacility(e.target.value)
                          }
                          className="input-style"
                        >
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Unknown</option>
                        </select>
                      </Field>

                      <Field label="Treatment Started?">
                        <select
                          value={treatmentStarted}
                          onChange={(e) =>
                            setTreatmentStarted(e.target.value)
                          }
                          className="input-style"
                        >
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>Not applicable</option>
                        </select>
                      </Field>

                      <Field label="No-show Reason">
                        <select
                          value={noShowReason}
                          onChange={(e) =>
                            setNoShowReason(e.target.value)
                          }
                          className="input-style"
                        >
                          <option value="">Select</option>
                          <option>Transport issue</option>
                          <option>Cost concern</option>
                          <option>Family not available</option>
                          <option>Patient refused</option>
                          <option>Could not contact</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    </div>
                  </div>

                  {/* NOTES */}
                  <div className="grid gap-4 md:grid-cols-[1fr_220px]">
                    <Field label="ASHA / ANM Notes">
                      <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add field observations, counselling notes or follow-up details..."
                        className="input-style resize-none"
                      />
                    </Field>

                    <Field label="Next Follow-up">
                      <input
                        type="date"
                        value={nextFollowUp}
                        onChange={(e) =>
                          setNextFollowUp(e.target.value)
                        }
                        className="input-style"
                      />
                    </Field>
                  </div>

                  {/* SAVE */}
                  <div className="border-t border-slate-100 pt-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        {savedAndSynced ? (
                          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                              ✓
                            </span>
                            Visit saved and synced
                          </div>
                        ) : saved ? (
                          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                              ✓
                            </span>
                            Visit saved locally
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500">
                            Invalid vital values will be highlighted before
                            saving.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => saveVisit(false)}
                          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          Save Visit
                        </button>

                        <button
                          type="button"
                          onClick={() => saveVisit(true)}
                          disabled={syncing}
                          className="rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {syncing
                            ? "Saving & Syncing..."
                            : "Save & Sync"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* INFO CARDS */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Care Continuity"
            subtitle="Close the loop"
            text="Record what happened after a referral so the patient journey remains visible."
          />

          <InfoCard
            title="48h Follow-up"
            subtitle="No-show escalation"
            text="Patients who fail to reach a referred facility can be flagged for field follow-up."
            amber
          />

          <InfoCard
            title="Offline Capture"
            subtitle="Sync later"
            text="Field data can be captured locally and synchronized when connectivity is available."
            blue
          />
        </div>

        {/* NOTE */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 10v6" />
              <path d="M12 7h.01" />
            </svg>

            <p className="text-xs leading-5 text-blue-800">
              Prototype workflow: patient records, offline state and sync
              actions currently use demo frontend data. Backend storage and
              real synchronization are not connected yet.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-[11px] font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function ReferralStatus({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "In-Transit": "bg-blue-50 text-blue-700",
    "Follow-up Due": "bg-amber-50 text-amber-700",
    "Under Treatment": "bg-violet-50 text-violet-700",
    "Referral Closed": "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function InfoCard({
  title,
  subtitle,
  text,
  amber = false,
  blue = false,
}: {
  title: string;
  subtitle: string;
  text: string;
  amber?: boolean;
  blue?: boolean;
}) {
  const wrapper = amber
    ? "border-amber-200 bg-amber-50/80"
    : blue
    ? "border-blue-200 bg-blue-50/80"
    : "border-slate-200 bg-white/85";

  const label = amber
    ? "text-amber-700"
    : blue
    ? "text-blue-700"
    : "text-teal-700";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}>
      <p
        className={`text-[11px] font-bold uppercase tracking-wide ${label}`}
      >
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-900">
        {subtitle}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}