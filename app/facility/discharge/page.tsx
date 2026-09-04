"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getAllReferralStates,
  setReferralStatus,
} from "@/app/data/referralState";

type DischargeStage =
  | "Ready for Review"
  | "Doctor Review"
  | "Pending Documents"
  | "Ready to Close"
  | "Closed";

type ReferralStatus =
  | "Created"
  | "In Transit"
  | "Received"
  | "Under Treatment"
  | "Discharged"
  | "Closed";

type DischargePatient = {
  referralId: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  department: string;
  diagnosis: string;
  admissionDate: string;
  expectedDischarge: string;
  doctor: string;
  stage: DischargeStage;
  medications: number;
  followUp: string;
  priority: "Routine" | "Urgent" | "Emergency";
};

const demoPatients: DischargePatient[] = [
  {
    referralId: "NS-28491",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    department: "Cardiology",
    diagnosis: "Acute chest discomfort / cardiac observation",
    admissionDate: "02 Sep 2026",
    expectedDischarge: "04 Sep 2026",
    doctor: "Dr. Meera Sharma",
    stage: "Doctor Review",
    medications: 4,
    followUp: "Cardiology — 7 days",
    priority: "Urgent",
  },
  {
    referralId: "NS-28478",
    patientId: "NS-10279",
    patientName: "Sunita Devi",
    age: 47,
    gender: "Female",
    department: "General Medicine",
    diagnosis: "Hypertension with uncontrolled blood pressure",
    admissionDate: "01 Sep 2026",
    expectedDischarge: "04 Sep 2026",
    doctor: "Dr. Arjun Verma",
    stage: "Pending Documents",
    medications: 3,
    followUp: "Medicine — 14 days",
    priority: "Urgent",
  },
  {
    referralId: "NS-28432",
    patientId: "NS-10263",
    patientName: "Kamla Devi",
    age: 61,
    gender: "Female",
    department: "General Medicine",
    diagnosis: "Dehydration and weakness",
    admissionDate: "30 Aug 2026",
    expectedDischarge: "03 Sep 2026",
    doctor: "Dr. Nisha Kapoor",
    stage: "Ready to Close",
    medications: 2,
    followUp: "ASHA visit — 3 days",
    priority: "Routine",
  },
  {
    referralId: "NS-28461",
    patientId: "NS-10271",
    patientName: "Mohan Lal",
    age: 58,
    gender: "Male",
    department: "Orthopedics",
    diagnosis: "Lower limb injury",
    admissionDate: "29 Aug 2026",
    expectedDischarge: "03 Sep 2026",
    doctor: "Dr. Kavita Joshi",
    stage: "Closed",
    medications: 3,
    followUp: "Orthopedics — 10 days",
    priority: "Routine",
  },
];

const stages: Array<"All" | DischargeStage> = [
  "All",
  "Ready for Review",
  "Doctor Review",
  "Pending Documents",
  "Ready to Close",
  "Closed",
];

function stageClass(stage: DischargeStage) {
  if (stage === "Ready to Close") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (stage === "Closed") {
    return "border-slate-200 bg-slate-100 text-slate-600";
  }

  if (stage === "Doctor Review") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (stage === "Pending Documents") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function priorityClass(
  priority: "Routine" | "Urgent" | "Emergency"
) {
  if (priority === "Emergency") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (priority === "Urgent") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-600";
}

const DISCHARGE_STAGES_KEY = "niramaya-discharge-stages";

function loadDischargeStages(): Record<string, DischargeStage> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(DISCHARGE_STAGES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDischargeStages(stages: Record<string, DischargeStage>) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(DISCHARGE_STAGES_KEY, JSON.stringify(stages));
  } catch {}
}

function getSharedReferralStatus(
  patient: DischargePatient,
  referralStates: Record<string, string>
): string | undefined {
  return (
    referralStates[patient.patientId] ??
    referralStates[patient.referralId]
  );
}

function getStageFromState(
  patient: DischargePatient,
  referralStates: Record<string, string>,
  localStages: Record<string, DischargeStage>
): DischargeStage {
  const sharedStatus = getSharedReferralStatus(
    patient,
    referralStates
  );

  /*
   * Shared referral state is always the source of truth
   * for terminal statuses.
   */
  if (sharedStatus === "Closed" || localStages[patient.referralId] === "Closed") {
    return "Closed";
  }

  if (sharedStatus === "Discharged") {
    return "Ready to Close";
  }

  /*
   * For non-terminal statuses, use the local discharge
   * workflow stage when the user is progressing through
   * the checklist.
   */
  return (
    localStages[patient.referralId] ??
    patient.stage
  );
}

export default function FacilityDischargePage() {
  const [referralStates, setReferralStates] = useState<
    Record<string, string>
  >({});

  const [localStages, setLocalStages] = useState<
    Record<string, DischargeStage>
  >({});

  const [search, setSearch] = useState("");

  const [stageFilter, setStageFilter] = useState<
    "All" | DischargeStage
  >("All");

  const [selectedPatient, setSelectedPatient] =
    useState<DischargePatient | null>(null);

  const [toast, setToast] = useState("");

  /*
   * Read the shared referral state and local discharge stages.
   */
  useEffect(() => {
    const syncState = () => {
      const states = getAllReferralStates();
      setReferralStates(states);
      setLocalStages(loadDischargeStages());
    };

    syncState();

    /*
     * Keep the page in sync when the user returns to the tab or storage updates.
     */
    window.addEventListener("focus", syncState);
    window.addEventListener("storage", syncState);

    document.addEventListener(
      "visibilitychange",
      syncState
    );

    return () => {
      window.removeEventListener(
        "focus",
        syncState
      );

      window.removeEventListener(
        "storage",
        syncState
      );

      document.removeEventListener(
        "visibilitychange",
        syncState
      );
    };
  }, []);

  /*
   * Build the visible discharge list.
   */
  const patients = useMemo(() => {
    return demoPatients.map((patient) => ({
      ...patient,
      stage: getStageFromState(
        patient,
        referralStates,
        localStages
      ),
    }));
  }, [referralStates, localStages]);

  /*
   * Search + stage filter.
   */
  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.patientName
          .toLowerCase()
          .includes(query) ||
        patient.patientId
          .toLowerCase()
          .includes(query) ||
        patient.referralId
          .toLowerCase()
          .includes(query) ||
        patient.department
          .toLowerCase()
          .includes(query) ||
        patient.diagnosis
          .toLowerCase()
          .includes(query);

      const matchesStage =
        stageFilter === "All" ||
        patient.stage === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [patients, search, stageFilter]);

  /*
   * Statistics.
   */
  const readyForReview = patients.filter(
    (patient) => patient.stage === "Ready for Review"
  ).length;

  const doctorReview = patients.filter(
    (patient) => patient.stage === "Doctor Review"
  ).length;

  const pendingDocuments = patients.filter(
    (patient) => patient.stage === "Pending Documents"
  ).length;

  const readyToClose = patients.filter(
    (patient) => patient.stage === "Ready to Close"
  ).length;

  const closedPatients = patients.filter(
    (patient) => patient.stage === "Closed"
  ).length;

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function updateLocalStage(referralId: string, stage: DischargeStage) {
    setLocalStages((current) => {
      const updated = {
        ...current,
        [referralId]: stage,
      };
      saveDischargeStages(updated);
      return updated;
    });
  }

  /*
   * Progress discharge workflow or close referral.
   */
  function moveToNextStage(
    patient: DischargePatient
  ) {
    /*
     * Already closed.
     */
    if (patient.stage === "Closed") {
      showToast(
        `${patient.patientName} referral is already closed.`
      );

      return;
    }

    /*
     * Once the patient is discharged,
     * the only remaining step is closing the referral.
     */
    if (patient.stage === "Ready to Close") {
      setReferralStatus(
        patient.referralId,
        "Closed"
      );

      if (patient.patientId) {
        setReferralStatus(
          patient.patientId,
          "Closed"
        );
      }

      /*
       * Update shared state immediately.
       */
      setReferralStates((current) => ({
        ...current,
        [patient.referralId]: "Closed",
        [patient.patientId]: "Closed",
      }));

      /*
       * IMPORTANT:
       * Local stage must also become Closed and persist.
       */
      updateLocalStage(patient.referralId, "Closed");

      showToast(
        `${patient.patientName} referral closed successfully.`
      );

      setSelectedPatient(null);

      return;
    }

    let nextStage: DischargeStage;

    if (patient.stage === "Ready for Review") {
      nextStage = "Doctor Review";
    } else if (patient.stage === "Doctor Review") {
      nextStage = "Pending Documents";
    } else if (patient.stage === "Pending Documents") {
      nextStage = "Ready to Close";
    } else {
      nextStage = "Ready for Review";
    }

    /*
     * When reaching Ready to Close, sync shared referral state to Discharged
     * so it is not a local-only change.
     */
    if (nextStage === "Ready to Close") {
      setReferralStatus(
        patient.referralId,
        "Discharged"
      );

      if (patient.patientId) {
        setReferralStatus(
          patient.patientId,
          "Discharged"
        );
      }

      setReferralStates((current) => ({
        ...current,
        [patient.referralId]: "Discharged",
        [patient.patientId]: "Discharged",
      }));
    }

    updateLocalStage(patient.referralId, nextStage);

    showToast(
      `${patient.patientName} moved to "${nextStage}".`
    );

    setSelectedPatient(null);
  }

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Facility Clinical Operations
                </span>

                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                  District Hospital Jaipur
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Discharge Queue
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Review patients nearing discharge, complete required
                documents and close the referral loop safely.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/facility/admissions"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Admissions
              </Link>

              <Link
                href="/doctor"
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Treatment Queue
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Ready for Review
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {readyForReview}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Clinical review pending
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-blue-700">
              Doctor Review
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-800">
              {doctorReview}
            </p>

            <p className="mt-1 text-xs text-blue-700">
              Final clinical assessment
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-amber-700">
              Documents
            </p>

            <p className="mt-1 text-2xl font-bold text-amber-800">
              {pendingDocuments}
            </p>

            <p className="mt-1 text-xs text-amber-700">
              Pending discharge docs
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
            <p className="text-xs font-medium text-emerald-700">
              Ready to Close
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-800">
              {readyToClose}
            </p>

            <p className="mt-1 text-xs text-emerald-700">
              Closure available
            </p>
          </div>

          <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm md:col-span-1">
            <p className="text-xs font-medium text-slate-500">
              Closed
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-800">
              {closedPatients}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Completed referrals
            </p>
          </div>
        </section>

        {/* Discharge Queue */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Discharge Patients
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Complete each step before closing the referral.
                </p>
              </div>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search patient or referral..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white lg:w-72"
              />
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {stages.map((stage) => (
                <button
                  key={stage}
                  type="button"
                  onClick={() =>
                    setStageFilter(stage)
                  }
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    stageFilter === stage
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredPatients.map((patient) => (
              <div
                key={patient.referralId}
                className="p-5 transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                  {/* Patient information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {patient.patientName}
                      </h3>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                        {patient.patientId}
                      </span>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${priorityClass(
                          patient.priority
                        )}`}
                      >
                        {patient.priority}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-600">
                      {patient.age} yrs · {patient.gender} ·{" "}
                      {patient.department}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {patient.diagnosis}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                      <span>
                        Referral: {patient.referralId}
                      </span>

                      <span>
                        Admission: {patient.admissionDate}
                      </span>

                      <span>
                        Expected: {patient.expectedDischarge}
                      </span>

                      <span>
                        Doctor: {patient.doctor}
                      </span>
                    </div>
                  </div>

                  {/* Stage */}
                  <div className="xl:w-[430px]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${stageClass(
                          patient.stage
                        )}`}
                      >
                        {patient.stage}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPatient(patient)
                        }
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-white"
                      >
                        Review
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-[10px] text-slate-400">
                          Medicines
                        </p>

                        <p className="mt-1 font-bold text-slate-800">
                          {patient.medications}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-[10px] text-slate-400">
                          Follow-up
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-800">
                          {patient.followUp}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-[10px] text-slate-400">
                          Referral
                        </p>

                        <p
                          className={`mt-1 text-xs font-semibold ${
                            patient.stage === "Closed"
                              ? "text-slate-500"
                              : patient.stage === "Ready to Close"
                                ? "text-emerald-700"
                                : "text-amber-700"
                          }`}
                        >
                          {patient.stage === "Closed"
                            ? "Closed"
                            : patient.stage === "Ready to Close"
                              ? "Ready"
                              : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredPatients.length === 0 && (
              <div className="px-5 py-14 text-center">
                <p className="font-semibold text-slate-800">
                  No discharge patient found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try another search or stage filter.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Safe Closure Workflow */}
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Safe Closure Workflow
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Each discharge should pass through the following checks.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-700 shadow-sm">
                1
              </div>

              <p className="mt-3 font-semibold text-slate-900">
                Clinical Review
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Doctor confirms treatment completion and stability.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-700 shadow-sm">
                2
              </div>

              <p className="mt-3 font-semibold text-slate-900">
                Documents
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Discharge summary, prescription and follow-up plan.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-700 shadow-sm">
                3
              </div>

              <p className="mt-3 font-semibold text-slate-900">
                Patient Handover
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Explain medicines, warning signs and follow-up.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-sm font-bold text-emerald-700 shadow-sm">
                4
              </div>

              <p className="mt-3 font-semibold text-emerald-900">
                Close Referral
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-700">
                Mark referral closed and continue community follow-up.
              </p>
            </div>
          </div>
        </section>

        {/* Prototype notice */}
        <section className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <div className="flex gap-3">
            <div className="mt-0.5 rounded-lg bg-blue-100 px-2.5 py-2 text-blue-700">
              ⓘ
            </div>

            <div>
              <p className="font-semibold text-blue-900">
                Discharge workflow is prototype data
              </p>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                The screen demonstrates the intended discharge and
                referral-closure workflow. Production implementation
                should enforce doctor authorization, document
                validation, consent rules, audit logging and
                server-side status transitions.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Review Modal */}
      {selectedPatient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedPatient(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                  Discharge Review
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedPatient.patientName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedPatient.patientId} ·{" "}
                  {selectedPatient.referralId}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedPatient(null)
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            {/* Current stage */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">
                    Current stage
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {selectedPatient.stage}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${stageClass(
                    selectedPatient.stage
                  )}`}
                >
                  {selectedPatient.stage}
                </span>
              </div>
            </div>

            {/* Clinical details */}
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Diagnosis
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedPatient.diagnosis}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Treating Doctor
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedPatient.doctor}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Medicines
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedPatient.medications} prescribed items
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">
                  Follow-up
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {selectedPatient.followUp}
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-5 rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">
                Discharge Checklist
              </p>

              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    defaultChecked
                    disabled={
                      selectedPatient.stage === "Closed"
                    }
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Clinical treatment completed
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    defaultChecked={
                      selectedPatient.stage !==
                      "Pending Documents"
                    }
                    disabled={
                      selectedPatient.stage === "Closed"
                    }
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Discharge summary prepared
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    defaultChecked={
                      selectedPatient.stage ===
                        "Ready to Close" ||
                      selectedPatient.stage === "Closed"
                    }
                    disabled={
                      selectedPatient.stage === "Closed"
                    }
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Follow-up and medicines explained
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    defaultChecked={
                      selectedPatient.stage ===
                        "Ready to Close" ||
                      selectedPatient.stage === "Closed"
                    }
                    disabled={
                      selectedPatient.stage === "Closed"
                    }
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Patient handover completed
                </label>
              </div>
            </div>

            {/* Modal actions */}
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/patients/${selectedPatient.patientId}`}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Open Patient
              </Link>

              {selectedPatient.stage === "Closed" ? (
                <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-500">
                  Referral Already Closed
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    moveToNextStage(selectedPatient)
                  }
                  className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
                    selectedPatient.stage === "Ready to Close"
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  {selectedPatient.stage === "Ready to Close"
                    ? "Close Referral"
                    : "Complete Next Step"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2">
          <div className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">
            {toast}
          </div>
        </div>
      )}
    </main>
  );
}