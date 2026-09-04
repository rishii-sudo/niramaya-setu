"use client";

import Link from "next/link";
import LanguageSelector from "../../components/LanguageSelector";
import { useState } from "react";

type DocumentType =
  | "Health Summary"
  | "Medical Records"
  | "Referral Summary"
  | "Treatment Summary"
  | "Visit History";

type DocumentItem = {
  id: string;
  type: DocumentType;
  title: string;
  description: string;
  updated: string;
  pages: string;
  available: boolean;
};

const documents: DocumentItem[] = [
  {
    id: "DOC-1001",
    type: "Health Summary",
    title: "Patient Health Summary",
    description:
      "Personal health overview including identity, current care status, recent vitals and active referral.",
    updated: "03 Sep 2026",
    pages: "2 pages",
    available: true,
  },
  {
    id: "DOC-1002",
    type: "Medical Records",
    title: "Medical Records",
    description:
      "Recorded visits, diagnoses, medicines and recent health measurements.",
    updated: "03 Sep 2026",
    pages: "4 pages",
    available: true,
  },
  {
    id: "DOC-1003",
    type: "Referral Summary",
    title: "Referral Summary",
    description:
      "Current referral ID, destination facility, department and referral status.",
    updated: "02 Sep 2026",
    pages: "1 page",
    available: true,
  },
  {
    id: "DOC-1004",
    type: "Treatment Summary",
    title: "Treatment Summary",
    description:
      "Treatment information recorded by the authorized clinical workspace.",
    updated: "Pending",
    pages: "—",
    available: false,
  },
  {
    id: "DOC-1005",
    type: "Visit History",
    title: "Visit History",
    description:
      "Chronological summary of recorded field visits and care interactions.",
    updated: "03 Sep 2026",
    pages: "3 pages",
    available: true,
  },
];

const patient = {
  name: "Ramesh Kumar",
  id: "NS-10284",
  age: 54,
  gender: "Male",
  village: "Rampura",
  referralId: "REF-24017",
  facility: "SMS Hospital",
  department: "Cardiology",
  referralStatus: "In-Transit",
  nextFollowUp: "08 Sep 2026",
};

export default function PatientDocumentsPage() {
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentItem | null>(null);

  const [printing, setPrinting] = useState(false);

  const handlePrint = (document: DocumentItem) => {
    if (!document.available) return;

    setSelectedDocument(document);
    setPrinting(true);

    setTimeout(() => {
      window.print();

      setPrinting(false);
    }, 150);
  };

  const handlePreview = (document: DocumentItem) => {
    if (!document.available) return;
    setSelectedDocument(document);
  };

  const closePreview = () => {
    setSelectedDocument(null);
  };

  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* =====================================================
            HEADER
           ===================================================== */}
        <header className="mb-6 rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl print:hidden">
          <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/patient"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                aria-label="Back to patient portal"
              >
                ←
              </Link>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  NIRAMAYA-SETU
                </p>

                <p className="text-[10px] text-slate-500">
                  Patient Health Portal
                </p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              <PatientNav
                href="/patient"
                label="My Health"
              />

              <PatientNav
                href="/patient/records"
                label="Records"
              />

              <PatientNav
                href="/patient/progress"
                label="Progress"
              />

              <PatientNav
                href="/patient/documents"
                label="Documents"
                active
              />

              <LanguageSelector className="ml-1" />

              <Link
                href="/login"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Sign out
              </Link>
            </nav>
          </div>
        </header>

        {/* =====================================================
            PRINT HEADER
           ===================================================== */}
        <section className="hidden print:block">
          <div className="border-b-2 border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">
                  NIRAMAYA-SETU
                </h1>

                <p className="text-xs text-slate-500">
                  Patient Health Document
                </p>
              </div>

              <p className="text-xs text-slate-500">
                {selectedDocument?.title ?? "Health Document"}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            TITLE
           ===================================================== */}
        <section className="mb-6 print:hidden">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700">
                My Health
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                My Documents
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                View, preview and print your authorized health documents.
                Use your browser&apos;s print dialog to save a document as
                PDF.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 px-4 py-3">
              <p className="text-[9px] font-bold uppercase tracking-wide text-teal-700">
                Document access
              </p>

              <p className="mt-1 text-xs font-semibold text-teal-900">
                {documents.filter((doc) => doc.available).length} available
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            PATIENT INFO
           ===================================================== */}
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white/90 shadow-sm print:block">
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-sm font-bold text-teal-700">
                RK
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
                  Patient
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {patient.name}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {patient.id} • {patient.age} yrs • {patient.gender} •{" "}
                  {patient.village}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <InfoMini
                label="Referral"
                value={patient.referralId}
              />

              <InfoMini
                label="Facility"
                value={patient.facility}
              />

              <InfoMini
                label="Department"
                value={patient.department}
              />

              <InfoMini
                label="Status"
                value={patient.referralStatus}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            DOCUMENT LIST
           ===================================================== */}
        <section className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm print:hidden">
          <div className="border-b border-slate-100 px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Available Documents
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Documents generated from your authorized patient record.
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-bold text-slate-500">
                {documents.length} DOCUMENTS
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {documents.map((document) => (
              <DocumentRow
                key={document.id}
                document={document}
                onPreview={() => handlePreview(document)}
                onPrint={() => handlePrint(document)}
              />
            ))}
          </div>
        </section>

        {/* =====================================================
            QUICK DOWNLOAD
           ===================================================== */}
        <section className="mt-6 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 shadow-sm print:hidden">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
                Quick access
              </p>

              <h2 className="mt-1 text-lg font-bold text-teal-950">
                Need a complete health summary?
              </h2>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-teal-800">
                Generate a printable patient health summary containing your
                current care status, referral information and recent
                measurements.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handlePrint(documents[0])}
              className="rounded-xl bg-teal-700 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-800"
            >
              Print Health Summary
            </button>
          </div>
        </section>

        {/* =====================================================
            PRIVACY
           ===================================================== */}
        <section className="mt-6 grid gap-4 md:grid-cols-3 print:hidden">
          <PrivacyCard
            title="Patient-owned documents"
            text="Documents shown here are intended for the authorized patient view."
          />

          <PrivacyCard
            title="Consent-aware"
            text="Sensitive information should only be shared according to the patient's recorded consent."
            amber
          />

          <PrivacyCard
            title="Save as PDF"
            text="Use the browser print dialog and choose Save as PDF to keep a local copy."
            blue
          />
        </section>

        {/* =====================================================
            PROTOTYPE NOTE
           ===================================================== */}
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 print:hidden">
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
              Prototype document center: document contents and availability
              currently use frontend demonstration data. Production
              documents should be generated from verified records and
              protected by authenticated patient access and authorization.
            </p>
          </div>
        </div>

        {/* =====================================================
            PRINTABLE DOCUMENT
           ===================================================== */}
        {selectedDocument && printing && (
          <PrintableDocument document={selectedDocument} />
        )}

        {/* =====================================================
            PREVIEW MODAL
           ===================================================== */}
        {selectedDocument && !printing && (
          <DocumentPreview
            document={selectedDocument}
            onClose={closePreview}
            onPrint={() => handlePrint(selectedDocument)}
          />
        )}
      </div>
    </main>
  );
}

/* =========================================================
   DOCUMENT ROW
   ========================================================= */

function DocumentRow({
  document,
  onPreview,
  onPrint,
}: {
  document: DocumentItem;
  onPreview: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-5 transition hover:bg-slate-50/60 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            document.available
              ? "bg-teal-50 text-teal-700"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <DocumentIcon />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-slate-900">
              {document.title}
            </p>

            <span
              className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                document.available
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {document.available ? "Available" : "Pending"}
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {document.description}
          </p>

          <p className="mt-2 text-[10px] text-slate-400">
            {document.id} • Updated: {document.updated} •{" "}
            {document.pages}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onPreview}
          disabled={!document.available}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Preview
        </button>

        <button
          type="button"
          onClick={onPrint}
          disabled={!document.available}
          className="rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   PREVIEW
   ========================================================= */

function DocumentPreview({
  document,
  onClose,
  onPrint,
}: {
  document: DocumentItem;
  onClose: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
              Document Preview
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {document.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            aria-label="Close preview"
          >
            ×
          </button>
        </div>

        {/* Preview body */}
        <div className="overflow-y-auto bg-slate-100 p-5 sm:p-8">
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm sm:p-8">
            <div className="border-b-2 border-slate-900 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    NIRAMAYA-SETU
                  </p>

                  <p className="text-[10px] text-slate-500">
                    Patient Health Document
                  </p>
                </div>

                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[9px] font-bold text-teal-700">
                  PATIENT COPY
                </span>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Document
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {document.title}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Generated from the current authorized patient record.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PreviewField
                label="Patient"
                value={patient.name}
              />

              <PreviewField
                label="Patient ID"
                value={patient.id}
              />

              <PreviewField
                label="Referral"
                value={patient.referralId}
              />

              <PreviewField
                label="Destination"
                value={`${patient.facility} • ${patient.department}`}
              />
            </div>

            <div className="mt-6 rounded-xl border border-teal-100 bg-teal-50/60 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-teal-700">
                Document Summary
              </p>

              <p className="mt-2 text-xs leading-6 text-slate-600">
                {document.description}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Current Care Status
              </p>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <PreviewField
                  label="Referral Status"
                  value={patient.referralStatus}
                />

                <PreviewField
                  label="Department"
                  value={patient.department}
                />

                <PreviewField
                  label="Next Follow-up"
                  value={patient.nextFollowUp}
                />
              </div>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-4">
              <p className="text-[9px] leading-5 text-slate-400">
                Confidential patient document. Access and sharing should
                follow applicable patient consent and authorization controls.
              </p>
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-teal-800"
          >
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PRINTABLE DOCUMENT
   ========================================================= */

function PrintableDocument({
  document,
}: {
  document: DocumentItem;
}) {
  return (
    <section className="hidden print:block">
      <div className="mx-auto max-w-4xl px-8 py-8">
        <div className="border-b-2 border-slate-900 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                NIRAMAYA-SETU
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                Patient Health Document
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">
                {document.title}
              </p>

              <p className="mt-1 text-[10px] text-slate-500">
                Patient Copy
              </p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4">
          <PrintField
            label="Patient"
            value={patient.name}
          />

          <PrintField
            label="Patient ID"
            value={patient.id}
          />

          <PrintField
            label="Age / Gender"
            value={`${patient.age} yrs / ${patient.gender}`}
          />

          <PrintField
            label="Village"
            value={patient.village}
          />

          <PrintField
            label="Referral ID"
            value={patient.referralId}
          />

          <PrintField
            label="Destination"
            value={patient.facility}
          />

          <PrintField
            label="Department"
            value={patient.department}
          />

          <PrintField
            label="Referral Status"
            value={patient.referralStatus}
          />
        </div>

        <div className="mt-7 rounded-lg border border-slate-300 p-4">
          <h2 className="text-sm font-bold text-slate-900">
            Document Summary
          </h2>

          <p className="mt-2 text-xs leading-6 text-slate-600">
            {document.description}
          </p>
        </div>

        <div className="mt-7">
          <h2 className="text-sm font-bold text-slate-900">
            Current Care Status
          </h2>

          <div className="mt-3 grid grid-cols-3 gap-4">
            <PrintField
              label="Referral"
              value={patient.referralId}
            />

            <PrintField
              label="Status"
              value={patient.referralStatus}
            />

            <PrintField
              label="Next Follow-up"
              value={patient.nextFollowUp}
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-bold text-slate-900">
            Recent Health Measurements
          </h2>

          <table className="mt-3 w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-slate-300 px-3 py-2 text-left text-xs font-semibold">
                  Measurement
                </th>

                <th className="border border-slate-300 px-3 py-2 text-left text-xs font-semibold">
                  Result
                </th>

                <th className="border border-slate-300 px-3 py-2 text-left text-xs font-semibold">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border border-slate-300 px-3 py-2 text-xs">
                  Blood Pressure
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  128/82 mmHg
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  03 Sep 2026
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300 px-3 py-2 text-xs">
                  SpO₂
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  98%
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  03 Sep 2026
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300 px-3 py-2 text-xs">
                  Pulse
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  78 bpm
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  03 Sep 2026
                </td>
              </tr>

              <tr>
                <td className="border border-slate-300 px-3 py-2 text-xs">
                  Temperature
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  98.4 °F
                </td>

                <td className="border border-slate-300 px-3 py-2 text-xs">
                  03 Sep 2026
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 border-t border-slate-300 pt-4">
          <p className="text-[9px] leading-5 text-slate-500">
            Confidential patient document. Generated for the authorized
            patient view from prototype data. Production documents should be
            generated from verified clinical records.
          </p>

          <div className="mt-2 flex justify-between text-[9px] text-slate-400">
            <span>{document.id}</span>

            <span>
              NIRAMAYA-SETU • Patient Health Portal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COMPONENTS
   ========================================================= */

function PatientNav({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
        active
          ? "bg-teal-50 text-teal-800"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </Link>
  );
}

function InfoMini({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5">
      <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-[10px] font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function PreviewField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2.5">
      <p className="text-[8px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function PrintField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-300 pb-2">
      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function PrivacyCard({
  title,
  text,
  amber = false,
  blue = false,
}: {
  title: string;
  text: string;
  amber?: boolean;
  blue?: boolean;
}) {
  const wrapper = amber
    ? "border-amber-200 bg-amber-50/70"
    : blue
    ? "border-blue-200 bg-blue-50/70"
    : "border-slate-200 bg-white/90";

  const label = amber
    ? "text-amber-700"
    : blue
    ? "text-blue-700"
    : "text-teal-700";

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${wrapper}`}>
      <p
        className={`text-[10px] font-bold uppercase tracking-wide ${label}`}
      >
        Patient Access
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-900">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {text}
      </p>
    </div>
  );
}

function DocumentIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}