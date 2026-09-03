"use client";

import {
  ChangeEvent,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type PatientStatus =
  | "Active"
  | "Follow-up Due"
  | "Discharged"
  | "Under Treatment"
  | "Referral Closed"
  | "In-Transit";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  mobile: string;
  phone?: string;
  address?: string;
  condition?: string;
  status: PatientStatus;
  referralStatus?: string;
  lastVisit?: string;
};

type VisitRecord = {
  id: string;
  patientId: string;
  patientName: string;
  visitType: string;
  visitDate: string;
  visitTime: string;
  symptoms: string;
  bp: string;
  pulse: string;
  spo2: string;
  temperature: string;
  medicationAdherence: string;
  instructionsFollowed: string;
  referralStatus: string;
  reachedFacility: string;
  treatmentStarted: string;
  noShowReason: string;
  notes: string;
  nextFollowUp: string;
  createdAt: string;
  synced: boolean;
};

const DEMO_PATIENTS: Patient[] = [
  {
    id: "NS-10284",
    name: "Ramesh Kumar",
    age: 54,
    gender: "Male",
    village: "Jaipur",
    mobile: "+91 98765 43210",
    phone: "+91 98765 43210",
    condition: "Cardiology",
    status: "Discharged",
    referralStatus: "Discharged",
    lastVisit: "03 Sep 2026",
  },
  {
    id: "NS-10279",
    name: "Sunita Devi",
    age: 47,
    gender: "Female",
    village: "Chomu",
    mobile: "+91 98765 12345",
    phone: "+91 98765 12345",
    condition: "General Medicine",
    status: "Follow-up Due",
    referralStatus: "Follow-up Due",
    lastVisit: "02 Sep 2026",
  },
  {
    id: "NS-10263",
    name: "Kamla Devi",
    age: 61,
    gender: "Female",
    village: "Bassi",
    mobile: "+91 99887 66554",
    phone: "+91 99887 66554",
    condition: "General Medicine",
    status: "Active",
    referralStatus: "Under Treatment",
    lastVisit: "01 Sep 2026",
  },
  {
    id: "NS-10251",
    name: "Mohan Lal",
    age: 58,
    gender: "Male",
    village: "Sanganer",
    mobile: "+91 97654 32109",
    phone: "+91 97654 32109",
    condition: "Diabetes",
    status: "Active",
    referralStatus: "Under Treatment",
    lastVisit: "31 Aug 2026",
  },
];

const visitTypes = [
  "Home Visit",
  "Follow-up",
  "Referral Check",
  "Medication Check",
];

const symptomsList = [
  "Fever",
  "Cough",
  "Breathing difficulty",
  "Chest pain",
  "Weakness",
  "Dizziness",
  "Pain",
  "No symptoms",
];

const PATIENT_STORAGE_KEYS = [
  "niramaya-patients",
  "niramaya_patients",
  "niramayaPatients",
  "registeredPatients",
  "registered-patients",
  "ashaPatients",
  "asha-patients",
  "patientRecords",
  "patient-records",
  "patients",
];

const VISIT_STORAGE_KEYS = [
  "niramaya-visits",
  "niramaya_visits",
  "ashaVisits",
  "asha-visits",
  "visitRecords",
  "visit-records",
];

function getToday() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCurrentTime() {
  const now = new Date();

  return `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes(),
  ).padStart(2, "0")}`;
}

function makeInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function normalizePatient(raw: unknown): Patient | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const item = raw as Record<string, unknown>;

  const id = String(
    item.id ??
      item.patientId ??
      item.patient_id ??
      item.patientID ??
      "",
  ).trim();

  const name = String(item.name ?? item.patientName ?? "").trim();

  if (!id || !name) {
    return null;
  }

  const ageNumber = Number(item.age ?? 0);

  const gender = String(item.gender ?? "Not specified").trim();

  const village = String(
    item.village ??
      item.location ??
      item.city ??
      item.address ??
      "Not specified",
  ).trim();

  const mobile = String(
    item.mobile ?? item.phone ?? item.phoneNumber ?? "",
  ).trim();

  const condition = String(
    item.condition ?? item.primaryCondition ?? "General Medicine",
  ).trim();

  const rawStatus = String(
    item.status ?? item.referralStatus ?? "Active",
  ).trim();

  let status: PatientStatus = "Active";

  if (
    rawStatus === "Discharged" ||
    rawStatus === "Referral Closed"
  ) {
    status = rawStatus as PatientStatus;
  } else if (
    rawStatus === "Follow-up Due" ||
    rawStatus === "In-Transit" ||
    rawStatus === "Under Treatment"
  ) {
    status = rawStatus as PatientStatus;
  }

  return {
    id,
    name,
    age: Number.isFinite(ageNumber) && ageNumber > 0 ? ageNumber : 0,
    gender,
    village,
    mobile,
    phone: mobile,
    address: String(item.address ?? ""),
    condition,
    status,
    referralStatus: String(item.referralStatus ?? rawStatus),
    lastVisit: String(item.lastVisit ?? item.registeredDate ?? ""),
  };
}

function extractPatients(value: unknown): Patient[] {
  if (Array.isArray(value)) {
    return value
      .map(normalizePatient)
      .filter((item): item is Patient => item !== null);
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  const object = value as Record<string, unknown>;

  const possibleArrays = [
    object.patients,
    object.patientRecords,
    object.records,
    object.data,
    object.items,
  ];

  for (const candidate of possibleArrays) {
    if (Array.isArray(candidate)) {
      const result = candidate
        .map(normalizePatient)
        .filter((item): item is Patient => item !== null);

      if (result.length > 0) {
        return result;
      }
    }
  }

  const directPatient = normalizePatient(value);

  if (directPatient) {
    return [directPatient];
  }

  const values = Object.values(object);

  return values
    .map(normalizePatient)
    .filter((item): item is Patient => item !== null);
}

function loadPatientsFromLocalStorage(): Patient[] {
  if (typeof window === "undefined") {
    return [];
  }

  const found: Patient[] = [];
  const seen = new Set<string>();

  const addPatients = (items: Patient[]) => {
    for (const patient of items) {
      const normalizedId = patient.id.trim().toLowerCase();

      if (!normalizedId || seen.has(normalizedId)) {
        continue;
      }

      seen.add(normalizedId);
      found.push(patient);
    }
  };

  for (const key of PATIENT_STORAGE_KEYS) {
    try {
      const raw = window.localStorage.getItem(key);

      if (!raw) {
        continue;
      }

      addPatients(extractPatients(JSON.parse(raw)));
    } catch {
      // Ignore invalid localStorage values.
    }
  }

  for (let index = 0; index < window.localStorage.length; index++) {
    const key = window.localStorage.key(index);

    if (!key || PATIENT_STORAGE_KEYS.includes(key)) {
      continue;
    }

    try {
      const raw = window.localStorage.getItem(key);

      if (!raw) {
        continue;
      }

      const parsed = JSON.parse(raw);
      addPatients(extractPatients(parsed));
    } catch {
      // Ignore unrelated or invalid localStorage entries.
    }
  }

  return found;
}

function loadVisits(): VisitRecord[] {
  if (typeof window === "undefined") {
    return [];
  }

  for (const key of VISIT_STORAGE_KEYS) {
    try {
      const raw = window.localStorage.getItem(key);

      if (!raw) {
        continue;
      }

      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) {
        return parsed as VisitRecord[];
      }

      if (
        parsed &&
        typeof parsed === "object" &&
        Array.isArray(parsed.visits)
      ) {
        return parsed.visits as VisitRecord[];
      }
    } catch {
      // Continue with next key.
    }
  }

  return [];
}

function saveVisits(visits: VisitRecord[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    "niramaya-visits",
    JSON.stringify(visits),
  );
}

function ASHAVisitsContent() {
  const searchParams = useSearchParams();

  const [patients, setPatients] = useState<Patient[]>(DEMO_PATIENTS);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [visitType, setVisitType] = useState("Home Visit");
  const [visitDate, setVisitDate] = useState(getToday());
  const [visitTime, setVisitTime] = useState(getCurrentTime());

  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    [],
  );

  const [symptoms, setSymptoms] = useState("");

  const [bp, setBp] = useState("");
  const [pulse, setPulse] = useState("");
  const [spo2, setSpo2] = useState("");
  const [temperature, setTemperature] = useState("");

  const [medicationAdherence, setMedicationAdherence] =
    useState("");

  const [instructionsFollowed, setInstructionsFollowed] =
    useState("");

  const [referralStatus, setReferralStatus] = useState("");
  const [reachedFacility, setReachedFacility] = useState("");
  const [treatmentStarted, setTreatmentStarted] = useState("");
  const [noShowReason, setNoShowReason] = useState("");

  const [notes, setNotes] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");

  const [saved, setSaved] = useState(false);
  const [savedAndSynced, setSavedAndSynced] = useState(false);

  const [syncing, setSyncing] = useState(false);

  const [pendingSync, setPendingSync] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }

    return loadVisits().filter((visit) => !visit.synced).length;
  });

  const [errors, setErrors] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    const storedPatients = loadPatientsFromLocalStorage();

    if (storedPatients.length > 0) {
      setPatients((current) => {
        const merged = [...storedPatients];

        for (const demoPatient of current) {
          if (
            !merged.some(
              (patient) => patient.id === demoPatient.id,
            )
          ) {
            merged.push(demoPatient);
          }
        }

        return merged;
      });
    }

    const handleStorage = () => {
      const refreshed = loadPatientsFromLocalStorage();

      if (refreshed.length > 0) {
        setPatients((current) => {
          const merged = [...refreshed];

          for (const demoPatient of current) {
            if (
              !merged.some(
                (patient) => patient.id === demoPatient.id,
              )
            ) {
              merged.push(demoPatient);
            }
          }

          return merged;
        });
      }

      setPendingSync(
        loadVisits().filter((visit) => !visit.synced).length,
      );
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    const patientId =
      searchParams.get("patientId") ??
      searchParams.get("id");

    if (!patientId) {
      return;
    }

    const patient = patients.find(
      (item) => item.id === patientId,
    );

    if (patient) {
      selectPatient(patient);
    }
  }, [searchParams, patients]);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return patients;
    }

    return patients.filter((patient) => {
      return (
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.village.toLowerCase().includes(query) ||
        patient.mobile.toLowerCase().includes(query) ||
        (patient.condition ?? "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [patients, search]);

  function selectPatient(patient: Patient) {
    setSelectedPatient(patient);
    setSearch(`${patient.name} (${patient.id})`);
    setSaved(false);
    setSavedAndSynced(false);
    setErrors({});
  }

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((current) => {
      if (symptom === "No symptoms") {
        return current.includes(symptom) ? [] : ["No symptoms"];
      }

      const withoutNone = current.filter(
        (item) => item !== "No symptoms",
      );

      if (withoutNone.includes(symptom)) {
        return withoutNone.filter((item) => item !== symptom);
      }

      return [...withoutNone, symptom];
    });
  }

  function onlyNumbers(value: string) {
    return value.replace(/\D/g, "");
  }

  function onlyDecimal(value: string) {
    let cleaned = value.replace(/[^0-9.]/g, "");

    const firstDot = cleaned.indexOf(".");

    if (firstDot !== -1) {
      cleaned =
        cleaned.slice(0, firstDot + 1) +
        cleaned.slice(firstDot + 1).replace(/\./g, "");
    }

    return cleaned;
  }

  function onlyBloodPressure(value: string) {
    return value.replace(/[^0-9/]/g, "");
  }

  function handleBpChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setBp(
      onlyBloodPressure(event.target.value).slice(0, 7),
    );

    setErrors((previous) => ({
      ...previous,
      bp: "",
    }));
  }

  function handlePulseChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setPulse(onlyNumbers(event.target.value).slice(0, 3));

    setErrors((previous) => ({
      ...previous,
      pulse: "",
    }));
  }

  function handleSpo2Change(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setSpo2(onlyNumbers(event.target.value).slice(0, 3));

    setErrors((previous) => ({
      ...previous,
      spo2: "",
    }));
  }

  function handleTemperatureChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setTemperature(
      onlyDecimal(event.target.value).slice(0, 5),
    );

    setErrors((previous) => ({
      ...previous,
      temperature: "",
    }));
  }

  function validateVitals() {
    const newErrors: Record<string, string> = {};

    if (bp.trim()) {
      const match = bp.match(/^(\d{2,3})\/(\d{2,3})$/);

      if (!match) {
        newErrors.bp = "Use format like 120/80";
      } else {
        const systolic = Number(match[1]);
        const diastolic = Number(match[2]);

        if (systolic < 50 || systolic > 250) {
          newErrors.bp = "Systolic should be 50–250";
        } else if (diastolic < 30 || diastolic > 150) {
          newErrors.bp = "Diastolic should be 30–150";
        }
      }
    }

    if (pulse.trim()) {
      const value = Number(pulse);

      if (value < 30 || value > 220) {
        newErrors.pulse = "Pulse should be 30–220 bpm";
      }
    }

    if (spo2.trim()) {
      const value = Number(spo2);

      if (value < 50 || value > 100) {
        newErrors.spo2 = "SpO₂ should be 50–100%";
      }
    }

    if (temperature.trim()) {
      const value = Number(temperature);

      if (value < 80 || value > 115) {
        newErrors.temperature =
          "Temperature should be 80–115 °F";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function buildVisit(): VisitRecord | null {
    if (!selectedPatient) {
      return null;
    }

    const symptomsValue =
      selectedSymptoms.length > 0
        ? selectedSymptoms.join(", ")
        : symptoms.trim();

    return {
      id: `VIS-${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      visitType,
      visitDate,
      visitTime,
      symptoms: symptomsValue,
      bp,
      pulse,
      spo2,
      temperature,
      medicationAdherence,
      instructionsFollowed,
      referralStatus,
      reachedFacility,
      treatmentStarted,
      noShowReason,
      notes,
      nextFollowUp,
      createdAt: new Date().toISOString(),
      synced: false,
    };
  }

  function saveVisit(syncAfterSave = false) {
    if (!selectedPatient) {
      setErrors({
        patient: "Please select a patient first.",
      });

      return;
    }

    if (!validateVitals()) {
      return;
    }

    const visit = buildVisit();

    if (!visit) {
      return;
    }

    const existingVisits = loadVisits();

    const visitToSave: VisitRecord = {
      ...visit,
      synced: syncAfterSave,
    };

    const updatedVisits = [
      ...existingVisits.filter(
        (item) => item.id !== visitToSave.id,
      ),
      visitToSave,
    ];

    saveVisits(updatedVisits);

    setSaved(true);
    setSavedAndSynced(false);

    if (syncAfterSave) {
      setSyncing(true);

      setTimeout(() => {
        const currentVisits = loadVisits();

        const syncedVisits = currentVisits.map((item) =>
          item.id === visit.id
            ? {
                ...item,
                synced: true,
              }
            : item,
        );

        saveVisits(syncedVisits);

        setSyncing(false);
        setPendingSync(
          syncedVisits.filter((item) => !item.synced).length,
        );
        setSavedAndSynced(true);
      }, 1000);

      return;
    }

    setPendingSync(
      updatedVisits.filter((item) => !item.synced).length,
    );
  }

  function syncPendingData() {
    if (syncing) {
      return;
    }

    const currentVisits = loadVisits();
    const pending = currentVisits.filter(
      (item) => !item.synced,
    );

    if (pending.length === 0) {
      setPendingSync(0);
      return;
    }

    setSyncing(true);

    setTimeout(() => {
      const synced = currentVisits.map((item) => ({
        ...item,
        synced: true,
      }));

      saveVisits(synced);

      setPendingSync(0);
      setSyncing(false);
    }, 1000);
  }

  function resetForm() {
    setSaved(false);
    setSavedAndSynced(false);
    setSelectedPatient(null);
    setSearch("");

    setVisitType("Home Visit");
    setVisitDate(getToday());
    setVisitTime(getCurrentTime());

    setSelectedSymptoms([]);
    setSymptoms("");

    setBp("");
    setPulse("");
    setSpo2("");
    setTemperature("");

    setMedicationAdherence("");
    setInstructionsFollowed("");

    setReferralStatus("");
    setReachedFacility("");
    setTreatmentStarted("");
    setNoShowReason("");

    setNotes("");
    setNextFollowUp("");

    setErrors({});
  }

  if (saved && selectedPatient) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[calc(100vh-20px)] max-w-3xl items-center justify-center px-5 py-10">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-2xl font-bold text-emerald-600">
              ✓
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
              Visit Recorded
            </p>

            <h1 className="mt-2 text-2xl font-bold text-slate-950">
              Visit saved successfully
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              The visit for {selectedPatient.name} has been
              recorded locally.
            </p>

            <div className="mx-auto mt-6 max-w-md rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-700">
                  {makeInitials(selectedPatient.name)}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedPatient.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {selectedPatient.id} • {visitType}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-white p-3">
                  <p className="text-slate-400">Date</p>
                  <p className="mt-1 font-semibold text-slate-700">
                    {visitDate}
                  </p>
                </div>

                <div className="rounded-lg bg-white p-3">
                  <p className="text-slate-400">Time</p>
                  <p className="mt-1 font-semibold text-slate-700">
                    {visitTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              {savedAndSynced ? (
                <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  ✓ Visit saved and synced
                </div>
              ) : (
                <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700">
                  Visit saved locally • Pending sync:{" "}
                  {pendingSync}
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Record Another Visit
              </button>

              <Link
                href="/asha"
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Back to Dashboard
              </Link>

              <Link
                href={`/asha/patients/${selectedPatient.id}`}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Patient
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-[1250px] px-5 py-6 lg:px-7 lg:py-7">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/asha"
                className="hover:text-teal-700"
              >
                ASHA / ANM
              </Link>

              <span>/</span>

              <span className="text-slate-700">
                Record Visit
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Record Field Visit
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Record patient observations, vitals and
              follow-up information.
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
              disabled={syncing}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-teal-200 hover:bg-teal-50/50 disabled:opacity-60"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-teal-700 ${
                    syncing ? "animate-spin" : ""
                  }`}
                >
                  ↻
                </span>

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

        <div className="mb-6 rounded-2xl border border-teal-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-lg text-teal-700">
                ✓
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Field Visit Workflow
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Patient → Visit → Vitals → Referral →
                  Save → Sync
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Ready for field entry
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.55fr]">
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">
                1. Select Patient
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search by name, patient ID, phone or village.
              </p>
            </div>

            <div className="p-5">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search patient..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-10 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              {errors.patient && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {errors.patient}
                </p>
              )}

              <div className="mt-4 max-h-[520px] space-y-2 overflow-y-auto pr-1">
                {filteredPatients.map((patient) => {
                  const active =
                    selectedPatient?.id === patient.id;

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
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xs font-bold text-teal-700">
                            {makeInitials(patient.name)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-900">
                              {patient.name}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {patient.id} • {patient.age} yrs •{" "}
                              {patient.gender}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {patient.village}
                            </p>
                          </div>
                        </div>

                        <ReferralStatus
                          status={
                            patient.referralStatus ??
                            patient.status
                          }
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
                    Try another name, ID, phone or village.
                  </p>
                </div>
              )}

              {!selectedPatient ? (
                <div className="mt-5 rounded-xl border border-dashed border-teal-200 bg-teal-50/70 p-4">
                  <p className="text-sm font-semibold text-teal-900">
                    New patient?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-teal-800">
                    Register the patient first, then record
                    the field visit.
                  </p>

                  <Link
                    href="/asha/register-patient"
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
                      href={`/asha/patients/${selectedPatient.id}`}
                      className="rounded-lg border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-teal-800 hover:bg-teal-50"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                <div className="flex min-h-[540px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <div>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-xl text-teal-700">
                      ♙
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                      Select a patient
                    </h3>

                    <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                      Select a patient from the left panel to
                      start recording the visit.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Visit Information
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                      <Field label="Visit Type">
                        <select
                          value={visitType}
                          onChange={(event) =>
                            setVisitType(event.target.value)
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
                          onChange={(event) =>
                            setVisitDate(event.target.value)
                          }
                          className="input-style"
                        />
                      </Field>

                      <Field label="Visit Time">
                        <input
                          type="time"
                          value={visitTime}
                          onChange={(event) =>
                            setVisitTime(event.target.value)
                          }
                          className="input-style"
                        />
                      </Field>
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Symptoms
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {symptomsList.map((symptom) => {
                        const active =
                          selectedSymptoms.includes(symptom);

                        return (
                          <button
                            key={symptom}
                            type="button"
                            onClick={() =>
                              toggleSymptom(symptom)
                            }
                            className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                              active
                                ? "border-teal-300 bg-teal-50 text-teal-700"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            {active ? "✓ " : ""}
                            {symptom}
                          </button>
                        );
                      })}
                    </div>

                    <textarea
                      rows={3}
                      value={symptoms}
                      onChange={(event) =>
                        setSymptoms(event.target.value)
                      }
                      placeholder="Additional symptoms or patient complaint..."
                      className="input-style mt-3 resize-none"
                    />
                  </div>

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

                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Medication & Instructions
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Medication Adherence">
                        <select
                          value={medicationAdherence}
                          onChange={(event) =>
                            setMedicationAdherence(
                              event.target.value,
                            )
                          }
                          className="input-style"
                        >
                          <option value="">Select</option>
                          <option>
                            Taking as prescribed
                          </option>
                          <option>
                            Partially following
                          </option>
                          <option>Not taking</option>
                          <option>Not applicable</option>
                        </select>
                      </Field>

                      <Field label="Referral Instructions Followed?">
                        <select
                          value={instructionsFollowed}
                          onChange={(event) =>
                            setInstructionsFollowed(
                              event.target.value,
                            )
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

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Referral Follow-up
                    </p>

                    <p className="mb-4 text-xs text-slate-500">
                      Update referral progress for a referred
                      patient.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Current Referral Status">
                        <select
                          value={referralStatus}
                          onChange={(event) =>
                            setReferralStatus(
                              event.target.value,
                            )
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
                          onChange={(event) =>
                            setReachedFacility(
                              event.target.value,
                            )
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
                          onChange={(event) =>
                            setTreatmentStarted(
                              event.target.value,
                            )
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
                          onChange={(event) =>
                            setNoShowReason(
                              event.target.value,
                            )
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

                  <div className="grid gap-4 md:grid-cols-[1fr_220px]">
                    <Field label="ASHA / ANM Notes">
                      <textarea
                        rows={4}
                        value={notes}
                        onChange={(event) =>
                          setNotes(event.target.value)
                        }
                        placeholder="Add field observations, counselling notes or follow-up details..."
                        className="input-style resize-none"
                      />
                    </Field>

                    <Field label="Next Follow-up">
                      <input
                        type="date"
                        value={nextFollowUp}
                        onChange={(event) =>
                          setNextFollowUp(event.target.value)
                        }
                        className="input-style"
                      />
                    </Field>
                  </div>

                  <div className="border-t border-slate-100 pt-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs text-slate-500">
                          Visit will be stored locally and can
                          be synced later.
                        </p>

                        {pendingSync > 0 && (
                          <p className="mt-1 text-xs font-medium text-amber-600">
                            {pendingSync} visit
                            {pendingSync !== 1 ? "s" : ""}{" "}
                            pending sync
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
            text="Field data is stored in browser localStorage and can be synchronized when connectivity is available."
            blue
          />
        </div>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-blue-600">
              i
            </div>

            <div>
              <p className="text-xs font-semibold text-blue-800">
                Offline-first patient visits
              </p>

              <p className="mt-1 text-[11px] leading-5 text-blue-700">
                Registered patients are loaded from browser
                localStorage. Visit records are also stored
                locally until backend synchronization is
                connected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
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

function ReferralStatus({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    Active: "bg-teal-50 text-teal-700",
    "Follow-up Due": "bg-amber-50 text-amber-700",
    Discharged: "bg-emerald-50 text-emerald-700",
    "In-Transit": "bg-blue-50 text-blue-700",
    "Under Treatment": "bg-violet-50 text-violet-700",
    "Referral Closed": "bg-slate-100 text-slate-600",
    Closed: "bg-slate-100 text-slate-600",
    Received: "bg-emerald-50 text-emerald-700",
    Created: "bg-blue-50 text-blue-700",
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
      : "border-slate-200 bg-white";

  const label = amber
    ? "text-amber-700"
    : blue
      ? "text-blue-700"
      : "text-teal-700";

  return (
    <div
      className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}
    >
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

export default function ASHAVisitsPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500 shadow-sm">
            Loading visit form...
          </div>
        </main>
      }
    >
      <ASHAVisitsContent />
    </Suspense>
  );
}