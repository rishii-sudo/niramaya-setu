export type ConsultationMode = "In-person" | "Video" | "Audio";
export type AppointmentStatus = "Confirmed" | "Completed" | "Cancelled" | "Rescheduled";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  facility: string;
  facilityLocation: string;
  availableDays: string[];
  timeSlots: string[];
  consultationModes: ConsultationMode[];
  languages: string[];
  rating: number;
  about: string;
  avatarInitial: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientMobileMasked: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  facilityName: string;
  date: string;
  timeSlot: string;
  mode: ConsultationMode;
  status: AppointmentStatus;
  consultationSessionId: string;
  temporaryPatientId: string;
  temporaryDoctorId: string;
  reason: string;
  createdAt: string;
}

export const CURRENT_TEST_DATE_STR = "05 Sep 2026";

export const doctorsList: Doctor[] = [
  {
    id: "DOC-2048",
    name: "Dr. Rajesh Sharma",
    specialty: "Cardiology",
    qualification: "MBBS, MD (General Medicine), DM (Cardiology)",
    experienceYears: 14,
    facility: "SMS Hospital",
    facilityLocation: "Jaipur, Rajasthan",
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    timeSlots: ["09:00 AM", "10:30 AM", "11:45 AM", "02:30 PM", "04:00 PM"],
    consultationModes: ["Video", "In-person", "Audio"],
    languages: ["English", "हिन्दी (Hindi)"],
    rating: 4.9,
    about: "Senior Interventional Cardiologist specializing in rural hypertension management, coronary care, and tele-cardiology consultations.",
    avatarInitial: "RS",
  },
  {
    id: "DOC-2055",
    name: "Dr. Priya Verma",
    specialty: "Maternal & Child Health",
    qualification: "MBBS, MS (Obstetrics & Gynecology)",
    experienceYears: 11,
    facility: "District Hospital Jaipur",
    facilityLocation: "Jaipur, Rajasthan",
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timeSlots: ["10:00 AM", "11:30 AM", "01:00 PM", "03:30 PM"],
    consultationModes: ["Video", "In-person", "Audio"],
    languages: ["English", "हिन्दी (Hindi)", "मराठी (Marathi)"],
    rating: 4.8,
    about: "Dedicated OB-GYN consultant supporting high-risk pregnancy screening and antenatal care guidance for rural primary health centers.",
    avatarInitial: "PV",
  },
  {
    id: "DOC-2062",
    name: "Dr. Amit Patel",
    specialty: "General Medicine",
    qualification: "MBBS, MD (Internal Medicine)",
    experienceYears: 9,
    facility: "CHC Chomu",
    facilityLocation: "Chomu, Jaipur",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    timeSlots: ["09:30 AM", "11:00 AM", "02:00 PM", "04:30 PM"],
    consultationModes: ["In-person", "Video"],
    languages: ["English", "हिन्दी (Hindi)", "ગુજરાતી (Gujarati)"],
    rating: 4.7,
    about: "Physician focused on chronic diabetes, vector-borne diseases, geriatric primary care, and integrated tele-triage.",
    avatarInitial: "AP",
  },
  {
    id: "DOC-2079",
    name: "Dr. Sunita Deshmukh",
    specialty: "Pediatrics",
    qualification: "MBBS, DNB (Pediatrics)",
    experienceYears: 12,
    facility: "PHC Bassi",
    facilityLocation: "Bassi, Jaipur",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timeSlots: ["10:00 AM", "12:00 PM", "03:00 PM"],
    consultationModes: ["Video", "In-person", "Audio"],
    languages: ["English", "हिन्दी (Hindi)", "मराठी (Marathi)"],
    rating: 4.9,
    about: "Pediatric care specialist leading immunization outreach, neonatal nutrition guidance, and childhood illness monitoring.",
    avatarInitial: "SD",
  },
];

const APPOINTMENTS_STORAGE_KEY = "niramaya-appointments";

export const initialAppointments: Appointment[] = [
  {
    id: "APT-9102",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    patientMobileMasked: "+91 98XXXXXX21",
    doctorId: "DOC-2048",
    doctorName: "Dr. Rajesh Sharma",
    doctorSpecialty: "Cardiology",
    facilityName: "SMS Hospital",
    date: "05 Sep 2026",
    timeSlot: "10:30 AM",
    mode: "Video",
    status: "Confirmed",
    consultationSessionId: "NIR-CON-8F31A2",
    temporaryPatientId: "NIR-P-7A29C1",
    temporaryDoctorId: "NIR-D-4K81P2",
    reason: "Hypertension review & post-referral ECG check",
    createdAt: "05 Sep 2026",
  },
  {
    id: "APT-8941",
    patientId: "NS-10263",
    patientName: "Kamla Devi",
    patientMobileMasked: "+91 97XXXXXX54",
    doctorId: "DOC-2055",
    doctorName: "Dr. Priya Verma",
    doctorSpecialty: "Maternal & Child Health",
    facilityName: "District Hospital Jaipur",
    date: "06 Sep 2026",
    timeSlot: "11:30 AM",
    mode: "Video",
    status: "Confirmed",
    consultationSessionId: "NIR-CON-5E92B1",
    temporaryPatientId: "NIR-P-3C84X7",
    temporaryDoctorId: "NIR-D-9M12T4",
    reason: "Antenatal routine screening follow-up",
    createdAt: "02 Sep 2026",
  },
  {
    id: "APT-7820",
    patientId: "NS-10284",
    patientName: "Ramesh Kumar",
    patientMobileMasked: "+91 98XXXXXX21",
    doctorId: "DOC-2062",
    doctorName: "Dr. Amit Patel",
    doctorSpecialty: "General Medicine",
    facilityName: "CHC Chomu",
    date: "28 Aug 2026",
    timeSlot: "02:00 PM",
    mode: "In-person",
    status: "Completed",
    consultationSessionId: "NIR-CON-1A24C9",
    temporaryPatientId: "NIR-P-1B90Y2",
    temporaryDoctorId: "NIR-D-6H73R8",
    reason: "Preliminary vitals and medication assessment",
    createdAt: "27 Aug 2026",
  },
  {
    id: "APT-6430",
    patientId: "NS-10112",
    patientName: "Sohan Lal",
    patientMobileMasked: "+91 94XXXXXX18",
    doctorId: "DOC-2079",
    doctorName: "Dr. Sunita Deshmukh",
    doctorSpecialty: "Pediatrics",
    facilityName: "PHC Bassi",
    date: "04 Sep 2026",
    timeSlot: "12:00 PM",
    mode: "In-person",
    status: "Completed",
    consultationSessionId: "NIR-CON-3D18F9",
    temporaryPatientId: "NIR-P-9B41V5",
    temporaryDoctorId: "NIR-D-2J66W1",
    reason: "Pediatric wellness examination",
    createdAt: "03 Sep 2026",
  },
];

export function parseCustomDate(dateStr: string): Date {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = dateStr.trim().split(" ");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = months[parts[1]] ?? 8;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr);
}

export function isSameDay(d1: string, d2: string = CURRENT_TEST_DATE_STR): boolean {
  return d1.trim() === d2.trim();
}

export function isFutureDay(dateStr: string, baseDateStr: string = CURRENT_TEST_DATE_STR): boolean {
  const d = parseCustomDate(dateStr);
  const base = parseCustomDate(baseDateStr);
  return d.getTime() > base.getTime();
}

export function isPastDay(dateStr: string, baseDateStr: string = CURRENT_TEST_DATE_STR): boolean {
  const d = parseCustomDate(dateStr);
  const base = parseCustomDate(baseDateStr);
  return d.getTime() < base.getTime();
}

export function getStoredAppointments(): Appointment[] {
  if (typeof window === "undefined") return initialAppointments;
  try {
    const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(initialAppointments));
      return initialAppointments;
    }
    return JSON.parse(stored) as Appointment[];
  } catch {
    return initialAppointments;
  }
}

export function saveAppointment(appointment: Appointment) {
  if (typeof window === "undefined") return;
  const current = getStoredAppointments();
  const existingIdx = current.findIndex((a) => a.id === appointment.id);
  let updated: Appointment[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = appointment;
  } else {
    updated = [appointment, ...current];
  }
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
}

export function updateAppointmentStatus(appointmentId: string, status: AppointmentStatus) {
  if (typeof window === "undefined") return;
  const current = getStoredAppointments();
  const updated = current.map((a) => (a.id === appointmentId ? { ...a, status } : a));
  localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
}

export function generateSessionId(): string {
  const chars = "0123456789ABCDEF";
  let hex = "";
  for (let i = 0; i < 6; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)];
  }
  return `NIR-CON-${hex}`;
}

export function generateTempPatientId(): string {
  const chars = "0123456789ABCDEF";
  let hex = "";
  for (let i = 0; i < 6; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)];
  }
  return `NIR-P-${hex}`;
}

export function generateTempDoctorId(): string {
  const chars = "0123456789ABCDEF";
  let hex = "";
  for (let i = 0; i < 6; i++) {
    hex += chars[Math.floor(Math.random() * chars.length)];
  }
  return `NIR-D-${hex}`;
}
