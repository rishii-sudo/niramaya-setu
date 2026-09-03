export type ReferralStatus =
  | "Created"
  | "In Transit"
  | "Received"
  | "Under Treatment"
  | "Discharged"
  | "Closed";

export type ReferralPriority =
  | "Routine"
  | "Urgent"
  | "Emergency";

export type Allergy = {
  name: string;
  reaction: string;
  severity: "Mild" | "Moderate" | "Severe";
};

export type ChronicCondition = {
  name: string;
  status: string;
  since: string;
};

export type Vital = {
  label: string;
  value: string;
  unit: string;
  note: string;
};

export type Diagnosis = {
  name: string;
  status: string;
  date: string;
  type?: string;
};

export type Medication = {
  name: string;
  dose: string;
  frequency: string;
  route?: string;
  duration?: string;
  instructions?: string;
};

export type LabReport = {
  test: string;
  result: string;
  unit?: string;
  status: string;
  date: string;
  reference?: string;
};

export type DiagnosticReport = {
  test: string;
  result: string;
  status: string;
  date: string;
  type: "ECG" | "X-Ray" | "CT" | "MRI" | "Ultrasound" | "Echo";
};

export type Admission = {
  id: string;
  facility: string;
  reason: string;
  admissionDate: string;
  dischargeDate: string;
  ward: string;
  outcome: string;
};

export type Surgery = {
  procedure: string;
  date: string;
  hospital: string;
  surgeon: string;
  anesthesia: string;
  indication: string;
  outcome: string;
};

export type MedicalHistory = {
  condition: string;
  details: string;
  date: string;
};

export type PatientRecord = {
  name: string;
  patientId: string;
  age: number;
  gender: string;
  bloodGroup: string;
  village: string;

  mobile: string;
  aadhaar: string;
  abhaId: string;

  allergies: Allergy[];

  chronicConditions: ChronicCondition[];

  emergencyContact: {
    name: string;
    relation: string;
    mobile: string;
  };

  medicalHistory: MedicalHistory[];

  referralId: string;
  referralReason: string;
  referralFrom: string;
  referralTo: string;
  referralPriority: ReferralPriority;

  referralStatus: ReferralStatus;

  vitals: Vital[];

  diagnoses: Diagnosis[];

  medications: Medication[];

  labs: LabReport[];

  diagnostics: DiagnosticReport[];

  admissions: Admission[];

  surgeries: Surgery[];

  clinicalNote: string;
};

/*
|--------------------------------------------------------------------------
| Demo Patient Data
|--------------------------------------------------------------------------
| Prototype-only data for NIRAMAYA-SETU.
| In production this will come from the backend/database.
|--------------------------------------------------------------------------
*/

export const patients: Record<string, PatientRecord> = {
  "NS-10284": {
    name: "Ramesh Kumar",
    patientId: "NS-10284",
    age: 52,
    gender: "Male",
    bloodGroup: "B+",
    village: "Bassi, Jaipur",

    mobile: "+91 98••••••42",
    aadhaar: "•••• •••• 4821",
    abhaId: "91-24XX-XXXX-7812",

    allergies: [
      {
        name: "Penicillin",
        reaction: "Skin rash",
        severity: "Severe",
      },
    ],

    chronicConditions: [
      {
        name: "Hypertension",
        status: "Under monitoring",
        since: "Aug 2026",
      },
    ],

    emergencyContact: {
      name: "Sunita Kumar",
      relation: "Spouse",
      mobile: "+91 97••••••18",
    },

    medicalHistory: [
      {
        condition: "Hypertension",
        details:
          "Previously recorded elevated blood pressure.",
        date: "15 Aug 2026",
      },
      {
        condition: "Recurrent Headache",
        details:
          "Intermittent headache reported during previous visits.",
        date: "20 Aug 2026",
      },
    ],

    referralId: "NS-28491",
    referralReason: "Cardiology consultation",
    referralFrom: "PHC Bassi",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Routine",

    referralStatus: "In Transit",

    vitals: [
      {
        label: "Blood Pressure",
        value: "148/92",
        unit: "mmHg",
        note: "Above target",
      },
      {
        label: "Heart Rate",
        value: "82",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "97",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "71",
        unit: "kg",
        note: "Recorded",
      },
      {
        label: "Temperature",
        value: "98.4",
        unit: "°F",
        note: "Normal",
      },
      {
        label: "Respiratory Rate",
        value: "18",
        unit: "/min",
        note: "Normal",
      },
    ],

    diagnoses: [
      {
        name: "Hypertension",
        status: "Under monitoring",
        date: "28 Aug 2026",
        type: "Primary",
      },
      {
        name: "Recurrent Headache",
        status: "Under evaluation",
        date: "20 Aug 2026",
        type: "Secondary",
      },
    ],

    medications: [
      {
        name: "Amlodipine",
        dose: "5 mg",
        frequency: "Once daily",
        route: "Oral",
        duration: "30 days",
        instructions: "Take after breakfast.",
      },
      {
        name: "Atorvastatin",
        dose: "10 mg",
        frequency: "Once at night",
        route: "Oral",
        duration: "30 days",
        instructions: "Take after dinner.",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "126",
        unit: "mg/dL",
        status: "Reviewed",
        date: "28 Aug 2026",
        reference: "70–99 fasting",
      },
      {
        test: "Hemoglobin",
        result: "13.8",
        unit: "g/dL",
        status: "Normal",
        date: "28 Aug 2026",
        reference: "13–17",
      },
      {
        test: "Serum Creatinine",
        result: "1.0",
        unit: "mg/dL",
        status: "Normal",
        date: "28 Aug 2026",
        reference: "0.7–1.3",
      },
    ],

    diagnostics: [
      {
        test: "12-Lead ECG",
        result:
          "Sinus rhythm, no acute abnormality noted.",
        status: "Normal",
        date: "05 Sep 2026",
        type: "ECG",
      },
      {
        test: "Chest X-Ray",
        result: "Radiology review pending.",
        status: "Pending",
        date: "06 Sep 2026",
        type: "X-Ray",
      },
    ],

    admissions: [
      {
        id: "ADM-24017",
        facility: "District Hospital Jaipur",
        reason:
          "Evaluation of uncontrolled blood pressure.",
        admissionDate: "07 Sep 2026",
        dischargeDate: "09 Sep 2026",
        ward: "Cardiology Observation",
        outcome: "Stable on medical management.",
      },
    ],

    surgeries: [
      {
        procedure: "No surgery recorded",
        date: "—",
        hospital: "—",
        surgeon: "—",
        anesthesia: "—",
        indication:
          "No operative indication in current episode.",
        outcome: "Medical management continued.",
      },
    ],

    clinicalNote:
      "Patient assessed at PHC Bassi and referred for specialist cardiology consultation.",
  },

  "NS-10279": {
    name: "Sunita Devi",
    patientId: "NS-10279",
    age: 46,
    gender: "Female",
    bloodGroup: "A+",
    village: "Chomu, Jaipur",

    mobile: "+91 97••••••21",
    aadhaar: "•••• •••• 6134",
    abhaId: "91-24XX-XXXX-4913",

    allergies: [],

    chronicConditions: [
      {
        name: "Type 2 Diabetes",
        status: "Under treatment",
        since: "Jul 2026",
      },
      {
        name: "Hypertension",
        status: "Under monitoring",
        since: "Aug 2026",
      },
    ],

    emergencyContact: {
      name: "Raj Kumar",
      relation: "Spouse",
      mobile: "+91 96••••••73",
    },

    medicalHistory: [
      {
        condition: "Type 2 Diabetes",
        details:
          "Ongoing diabetes management and glucose monitoring.",
        date: "27 Aug 2026",
      },
      {
        condition: "Hypertension",
        details:
          "Blood pressure monitoring recommended.",
        date: "12 Aug 2026",
      },
    ],

    referralId: "NS-28478",
    referralReason: "General medicine consultation",
    referralFrom: "PHC Chomu",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Urgent",

    referralStatus: "Received",

    vitals: [
      {
        label: "Blood Pressure",
        value: "136/86",
        unit: "mmHg",
        note: "Monitoring",
      },
      {
        label: "Heart Rate",
        value: "78",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "98",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "64",
        unit: "kg",
        note: "Recorded",
      },
    ],

    diagnoses: [
      {
        name: "Type 2 Diabetes",
        status: "Under treatment",
        date: "27 Aug 2026",
        type: "Primary",
      },
      {
        name: "Hypertension",
        status: "Under monitoring",
        date: "12 Aug 2026",
        type: "Secondary",
      },
    ],

    medications: [
      {
        name: "Metformin",
        dose: "500 mg",
        frequency: "Twice daily",
        route: "Oral",
        duration: "90 days",
        instructions: "Take with meals.",
      },
      {
        name: "Losartan",
        dose: "50 mg",
        frequency: "Once daily",
        route: "Oral",
        duration: "30 days",
        instructions: "Monitor blood pressure.",
      },
    ],

    labs: [
      {
        test: "HbA1c",
        result: "7.2",
        unit: "%",
        status: "Reviewed",
        date: "27 Aug 2026",
        reference: "< 5.7",
      },
      {
        test: "Blood Glucose",
        result: "142",
        unit: "mg/dL",
        status: "Monitoring",
        date: "27 Aug 2026",
        reference: "70–99 fasting",
      },
      {
        test: "Hemoglobin",
        result: "12.9",
        unit: "g/dL",
        status: "Normal",
        date: "12 Aug 2026",
        reference: "12–16",
      },
    ],

    diagnostics: [
      {
        test: "ECG",
        result: "Sinus rhythm.",
        status: "Normal",
        date: "27 Aug 2026",
        type: "ECG",
      },
    ],

    admissions: [],

    surgeries: [
      {
        procedure: "No surgery recorded",
        date: "—",
        hospital: "—",
        surgeon: "—",
        anesthesia: "—",
        indication: "No operative history available.",
        outcome: "Medical management.",
      },
    ],

    clinicalNote:
      "Follow-up required for diabetes and hypertension management.",
  },

  "NS-10271": {
    name: "Mohan Lal",
    patientId: "NS-10271",
    age: 61,
    gender: "Male",
    bloodGroup: "O+",
    village: "Bagru, Jaipur",

    mobile: "+91 95••••••48",
    aadhaar: "•••• •••• 2847",
    abhaId: "91-24XX-XXXX-6314",

    allergies: [],

    chronicConditions: [
      {
        name: "Hypertension",
        status: "Controlled",
        since: "2025",
      },
    ],

    emergencyContact: {
      name: "Geeta Lal",
      relation: "Spouse",
      mobile: "+91 94••••••21",
    },

    medicalHistory: [
      {
        condition: "Hypertension",
        details:
          "Controlled on current medication plan.",
        date: "25 Aug 2026",
      },
    ],

    referralId: "NS-28461",
    referralReason: "Routine specialist review",
    referralFrom: "PHC Bagru",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Routine",

    referralStatus: "Closed",

    vitals: [
      {
        label: "Blood Pressure",
        value: "128/82",
        unit: "mmHg",
        note: "Controlled",
      },
      {
        label: "Heart Rate",
        value: "74",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "98",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "69",
        unit: "kg",
        note: "Recorded",
      },
    ],

    diagnoses: [
      {
        name: "Hypertension",
        status: "Controlled",
        date: "25 Aug 2026",
        type: "Primary",
      },
    ],

    medications: [
      {
        name: "Amlodipine",
        dose: "5 mg",
        frequency: "Once daily",
        route: "Oral",
        duration: "30 days",
        instructions: "Continue as prescribed.",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "104",
        unit: "mg/dL",
        status: "Normal",
        date: "25 Aug 2026",
        reference: "70–99 fasting",
      },
      {
        test: "Serum Creatinine",
        result: "0.9",
        unit: "mg/dL",
        status: "Normal",
        date: "25 Aug 2026",
        reference: "0.7–1.3",
      },
    ],

    diagnostics: [],

    admissions: [],

    surgeries: [
      {
        procedure: "No surgery recorded",
        date: "—",
        hospital: "—",
        surgeon: "—",
        anesthesia: "—",
        indication: "No operative history available.",
        outcome: "Routine medical follow-up.",
      },
    ],

    clinicalNote:
      "Routine review completed and care plan communicated back to the referring facility.",
  },

  "NS-10263": {
    name: "Kamla Devi",
    patientId: "NS-10263",
    age: 58,
    gender: "Female",
    bloodGroup: "B-",
    village: "Sanganer, Jaipur",

    mobile: "+91 93••••••62",
    aadhaar: "•••• •••• 9126",
    abhaId: "91-24XX-XXXX-2840",

    allergies: [
      {
        name: "Diclofenac",
        reaction: "Gastric discomfort",
        severity: "Moderate",
      },
    ],

    chronicConditions: [
      {
        name: "Knee Osteoarthritis",
        status: "Under treatment",
        since: "2026",
      },
    ],

    emergencyContact: {
      name: "Mahesh Devi",
      relation: "Son",
      mobile: "+91 92••••••17",
    },

    medicalHistory: [
      {
        condition: "Knee Osteoarthritis",
        details:
          "Chronic bilateral knee pain affecting mobility.",
        date: "22 Aug 2026",
      },
    ],

    referralId: "NS-28432",
    referralReason: "Orthopedic consultation",
    referralFrom: "PHC Sanganer",
    referralTo: "District Hospital Jaipur",
    referralPriority: "Urgent",

    referralStatus: "Discharged",

    vitals: [
      {
        label: "Blood Pressure",
        value: "130/84",
        unit: "mmHg",
        note: "Controlled",
      },
      {
        label: "Heart Rate",
        value: "76",
        unit: "bpm",
        note: "Normal",
      },
      {
        label: "SpO₂",
        value: "97",
        unit: "%",
        note: "Normal",
      },
      {
        label: "Weight",
        value: "66",
        unit: "kg",
        note: "Recorded",
      },
    ],

    diagnoses: [
      {
        name: "Knee Osteoarthritis",
        status: "Specialist consultation completed",
        date: "22 Aug 2026",
        type: "Primary",
      },
    ],

    medications: [
      {
        name: "Pain management",
        dose: "As prescribed",
        frequency: "As directed",
        route: "Oral",
        duration: "14 days",
        instructions: "Use according to specialist instructions.",
      },
    ],

    labs: [
      {
        test: "Blood Glucose",
        result: "110",
        unit: "mg/dL",
        status: "Normal",
        date: "22 Aug 2026",
        reference: "70–99 fasting",
      },
    ],

    diagnostics: [
      {
        test: "Knee X-Ray",
        result: "Degenerative changes noted.",
        status: "Reviewed",
        date: "22 Aug 2026",
        type: "X-Ray",
      },
    ],

    admissions: [],

    surgeries: [
      {
        procedure: "No surgery recorded",
        date: "—",
        hospital: "—",
        surgeon: "—",
        anesthesia: "—",
        indication:
          "Conservative treatment selected.",
        outcome: "Treatment plan issued.",
      },
    ],

    clinicalNote:
      "Orthopedic consultation completed and treatment plan issued.",
  },
};

export function getPatient(id: string) {
  return patients[id];
}

export function getReferralStatusLabel(
  status: ReferralStatus,
) {
  switch (status) {
    case "Created":
      return "Referral created";

    case "In Transit":
      return "Patient in transit";

    case "Received":
      return "Referral received";

    case "Under Treatment":
      return "Treatment in progress";

    case "Discharged":
      return "Patient discharged";

    case "Closed":
      return "Referral closed";

    default:
      return status;
  }
}