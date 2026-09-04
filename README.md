# NIRAMAYA-SETU

## Rural Healthcare Care Continuity & Closed-Loop Referral Platform

NIRAMAYA-SETU is a frontend prototype for a rural healthcare coordination platform designed to improve care continuity from community-level registration to facility treatment, discharge, and follow-up.

The platform connects **Patients, ASHA workers, Doctors, and Healthcare Facilities** through a structured referral workflow so that referrals can be tracked instead of becoming disconnected after the patient leaves the originating facility.

> **Project status:** Frontend completed and deployed. Backend/API/database integration is planned separately.

## Core Workflow

`ACCESS → RECORD → REFER → FOLLOW`

### Referral Lifecycle

`Created → In Transit → Received → Under Treatment → Discharged → Closed`

The prototype also supports follow-up handling for cases that do not complete the expected care journey.

## Key Features

- Patient registration and demographic records
- Patient record and document views
- ASHA patient management and follow-up workflows
- Referral creation and referral tracking
- Facility incoming-referral management
- Facility capacity, specialists, diagnostics, and medicines views
- Doctor referral and treatment workflows
- Admission and discharge workflows
- Referral QR slip / verification flow
- Notifications and referral status visibility
- Shared referral state across frontend workflows
- Browser-based persistence for prototype/demo workflows
- Responsive UI for desktop and mobile layouts

## User Roles

| Role | Main responsibilities |
|---|---|
| **Patient** | View records, referral progress, documents, and care status |
| **ASHA Worker** | Register patients, create referrals, record visits, and handle follow-ups |
| **Doctor** | Review referrals, access patient information, and manage treatment workflow |
| **Facility** | Receive referrals, manage capacity/resources, admissions, treatment flow, discharge, and audit views |

## Technology Stack

- **Next.js 16.3.4**
- **React**
- **TypeScript**
- **Tailwind CSS / project CSS**
- **Next.js App Router**
- **Vercel** for deployment
- **Local browser storage** for prototype persistence

## Project Structure

```text
app/
├── asha/                         # ASHA portal and workflows
├── doctor/                       # Doctor portal and treatment flow
├── facility/                     # Facility portal and operations
├── patient/                      # Patient self-service views
├── patients/                     # Patient management views
├── referrals/                    # Referral tracking and QR flow
├── facilities/                   # Facility discovery/details
├── notifications/                # Notification center
├── consent/                      # Consent workflow
├── dashboard/                    # Dashboard
├── sync/                         # Sync/offline prototype screen
└── components/                   # Shared UI components
```

## Important Routes

| Area | Route |
|---|---|
| Landing | `/` |
| Patient portal | `/patient` |
| ASHA portal | `/asha` |
| Doctor portal | `/doctor` |
| Facility portal | `/facility/dashboard` |
| Patients | `/patients` |
| Referrals | `/referrals` |
| Notifications | `/notifications` |
| Consent | `/consent` |
| Sync | `/sync` |

## Referral Tracking Model

A referral is intended to move through a common lifecycle so every participating role can understand the current state of care.

- **Created** — referral initiated
- **In Transit** — patient is travelling to the referred facility
- **Received** — facility has received the patient/referral
- **Under Treatment** — treatment is in progress
- **Discharged** — facility has completed treatment/discharge steps
- **Closed** — referral journey is completed

## Prototype Data & Persistence

The current frontend is a **working prototype**. Several workflows use browser `localStorage` and demo/mock data so the complete UI journey can be tested without the separate backend.

The prototype should not be treated as a production clinical data store. In the production architecture, persistence, authentication, authorization, auditability, referral state, and clinical records should be handled by the backend/API/database layer.

## QR Referral Flow

The frontend includes a QR-based referral slip and verification flow for demonstration. The current implementation uses demo/prototype token behavior.

For production, the QR should contain a **referral identifier and a short-lived, signed token**, not raw clinical information.

## Planned Production Integrations

- Backend APIs and persistent database
- Authentication and role-based authorization
- ABDM / FHIR R4 integration
- Bhashini / voice-assisted workflows
- Consent-aware health information sharing
- Secure, tamper-evident audit logging
- Signed short-lived QR verification tokens
- Reliable offline-first synchronization and conflict handling
- Real-time notifications and referral updates

## Local Development

### Prerequisites

- Node.js
- npm

### Install

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production build

```bash
npm run build
```

The current frontend build has been verified successfully with all application routes generated by Next.js.

## Deployment

Production frontend:

- https://niramaya-setu.vercel.app

The project is configured for Vercel deployment from the GitHub `main` branch.

## Repository

- GitHub: https://github.com/rishii-sudo/niramaya-setu

## Security & Privacy Note

NIRAMAYA-SETU is designed around consent-based information sharing and care continuity. The frontend prototype is for demonstration and development only. Do not enter real patient clinical data into the deployed prototype unless the backend, security controls, access policies, encryption, audit logging, and compliance requirements have been implemented and validated.

## License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE).

## Author / Project

**NIRAMAYA-SETU**

Built as a rural healthcare care-continuity and closed-loop referral platform prototype.
