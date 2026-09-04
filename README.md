# NIRAMAYA-SETU

**Rural Healthcare Care Continuity & Closed-Loop Referral Platform**

NIRAMAYA-SETU is a frontend healthcare workflow prototype designed to connect patients, ASHA/ANM workers, doctors, healthcare facilities, and administrative workflows around a continuous referral and follow-up journey.

> **Core model:** `ACCESS → RECORD → REFER → FOLLOW`

---

## 🌐 Public Experience

The public journey is designed for first-time visitors:

```text
/
  ↓
Welcome / Platform Overview
  ↓
Get Started
  ↓
/get-started
  ↓
Choose your role
  ↓
Patient / ASHA / Doctor / Facility / Administrator / Partner
  ↓
Login / Registration / Join flow
```

### Public routes

| Route | Purpose |
|---|---|
| `/` | Public welcome and platform overview |
| `/about` | Detailed NIRAMAYA-SETU information |
| `/get-started` | Role selection and entry point |
| `/facilities` | Nearby healthcare discovery |
| `/doctors` | Doctor discovery |
| `/appointments` | Appointment discovery/booking workflow |

Role selection does **not** authenticate a user automatically.

---

## 🎯 Problem We Address

Rural healthcare journeys can become fragmented between field workers, referral facilities, clinicians, and follow-up care. NIRAMAYA-SETU is designed around care continuity and referral visibility.

The platform focuses on:

- Referral visibility gaps
- Missed follow-up care
- Fragmented facility coordination
- Loss of patient/referral context
- Rural access challenges
- Better coordination between patients, field workers, doctors, and facilities

---

## 💡 Solution

NIRAMAYA-SETU connects the care journey:

```text
Patient
   ↓
ASHA / ANM
   ↓
Referral
   ↓
Healthcare Facility
   ↓
Doctor / Clinical Care
   ↓
Follow-up
   ↓
Closure
```

The referral lifecycle is represented as:

```text
Created
   ↓
In Transit
   ↓
Received
   ↓
Under Treatment
   ↓
Discharged
   ↓
Closed
```

---

## 🧩 What NIRAMAYA-SETU Offers

### Patient
- Patient registration
- Digital patient records
- Care progress tracking
- Documents
- Nearby healthcare discovery
- Doctor discovery
- Online appointment booking
- Consultation workflow prototype
- Medicine discovery and ordering prototype
- Multilingual experience
- Voice & text assistance
- Consent and privacy workflows

### ASHA / ANM
- Patient registration
- Patient records
- Field visits
- Referral creation
- Referral tracking
- Follow-up management
- Verification
- Care continuity workflows

### Doctor
- Doctor dashboard
- Referral management
- Patient records
- Treatment workflow
- Appointment schedule
- Consultation workflow
- Clinical context

### Healthcare Facility
- Incoming referrals
- Referral receipt
- Treatment queue
- Admissions
- Capacity / beds
- Specialists
- Diagnostics
- Medicines
- Discharge
- Audit

### Administration
- District/operations dashboard
- Analytics
- User management
- Audit logs
- System settings
- Role-aware access boundaries

### Shared platform capabilities
- Notifications
- Consent workflows
- Sync center
- QR referral flow
- Clinical summaries
- Global logout
- Role-aware navigation
- English / Hindi / Marathi support
- Voice & text assistance

---

## 🏥 Nearby Healthcare

The frontend includes a nearby healthcare discovery experience using browser geolocation and distance calculation.

The prototype can:

1. Request the user's location
2. Calculate approximate facility distance
3. Sort facilities by proximity
4. Show available facility information
5. Gracefully handle denied/unavailable location access

Current facility information may use frontend/demo data until connected to a live healthcare facility registry.

---

## 👨‍⚕️ Doctor Discovery & Appointments

The platform includes a patient-facing doctor discovery and appointment workflow.

### Appointment flow

```text
Find Doctor
   ↓
Doctor Profile
   ↓
Select Date
   ↓
Select Time
   ↓
Select Consultation Mode
   ↓
Confirm Appointment
```

Supported prototype modes:

- In-person
- Video consultation
- Audio / phone consultation

Appointments maintain patient, doctor, date, time, consultation mode, and status context in the frontend prototype.

---

## 🎥 Online Consultation

NIRAMAYA-SETU includes a frontend consultation-room prototype with:

- Video consultation UI
- Audio consultation mode
- Camera controls
- Microphone controls
- Consultation timer
- Session information
- Contextual patient/doctor information
- Prototype clinical notes

The consultation experience is intentionally presented as a prototype.

**Production WebRTC media exchange, secure signaling, authorization, TURN/STUN infrastructure, and production session security require backend/provider integration.**

---

## 💊 Medicine Support

The Patient portal includes a medicine discovery/order prototype:

```text
Browse
  ↓
Search
  ↓
Add to Cart
  ↓
Review
  ↓
Delivery Details
  ↓
Order
```

The prototype distinguishes:

- OTC items
- Prescription-required items

Regulated medicines display:

> **Prescription required before fulfillment.**

This frontend does not represent a live pharmacy fulfillment network.

Production pharmacy inventory, prescription validation, payment, delivery, and fulfillment require integration with an appropriate licensed pharmacy/provider.

---

## 🌐 Multilingual Experience

Current application languages:

- English
- हिन्दी (Hindi)
- मराठी (Marathi)

The project uses a centralized language context and reusable language selector.

Language selection is designed to persist across navigation and refresh in the frontend prototype.

The language architecture is intentionally extensible for additional Indian languages.

---

## 🎙️ Voice & Text Assistance

NIRAMAYA-SETU includes **Prototype Voice & Text Assistance**.

Current prototype capabilities include:

- Browser speech recognition where supported
- Text fallback
- Speech synthesis where supported
- Multilingual intent matching
- Navigation/help guidance

Supported languages:

- English
- Hindi
- Marathi

Example help topics:

- Patient registration
- Doctor appointments
- Referral creation
- Referral status
- Nearby healthcare
- NIRAMAYA-SETU overview

This is not presented as a production AI assistant. Production AI/Bhashini or other voice-service integration can be added later.

---

## 🔐 Privacy, Consent & Identity UX

The frontend demonstrates privacy-aware workflows including:

- Role-based access boundaries
- Consent-aware sharing
- Session-aware navigation
- Temporary consultation/session identifiers
- Masked identity displays
- QR payloads without sensitive clinical information
- Logout/session cleanup

### Aadhaar / ABHA

The frontend includes a prototype verification experience.

Important safeguards:

- Raw Aadhaar values are not intended to be persisted in normal business/demo records
- Masked identifiers are displayed where appropriate
- Verification is presented as a prototype workflow
- Consent is included in the verification experience

> **Prototype verification — backend UIDAI/ABHA integration required.**

Production identity verification and health-identity authorization must be implemented through authorized services and backend controls.

---

## 📄 Clinical Summary / Print

The patient clinical-record experience includes a print-oriented clinical summary layout.

The print version is designed around:

- A4 portrait format
- Patient information
- Referral context
- Clinical assessment
- Treatment
- Medication
- Investigations
- Follow-up
- Referral status
- Print-specific styling

Web application chrome such as navigation, buttons, and dashboard UI is suppressed in print mode.

The document is a prototype clinical-summary presentation and is not presented as a legally certified medical record.

---

## 👥 Role-Based Platform

The platform contains separate experiences for:

| Role | Main Entry |
|---|---|
| Patient | `/login` |
| ASHA / ANM | `/asha/login` |
| Doctor | `/doctor/login` |
| Facility Staff | `/facility/login` |
| Administrator | `/admin/login` |

Protected dashboard access uses frontend prototype session state and role-aware access gates.

Role selection is not authentication.

---

## 🧭 Role Isolation

The frontend uses centralized role context to prevent accidental switching between:

- Patient
- ASHA / ANM
- Doctor
- Facility
- Administrator
- Public

Shared routes such as notifications, consent, sync, facilities, doctors, and appointments are designed to preserve the appropriate context.

---

## 🔄 Core Workflow Examples

### ASHA referral workflow

```text
Register / Select Patient
        ↓
Create Referral
        ↓
Select / Match Facility
        ↓
Referral In Transit
        ↓
Facility Receives
        ↓
Treatment
        ↓
Discharge
        ↓
Follow-up
        ↓
Closed
```

### Patient access workflow

```text
Public Welcome
      ↓
Get Started
      ↓
Patient Login / Registration
      ↓
Patient Workspace
      ↓
Records / Progress / Documents
      ↓
Doctors / Appointments
      ↓
Consultation / Medicines
```

---

## 🛠️ Technology Stack

- Next.js
- React
- TypeScript
- Next.js App Router
- Tailwind CSS
- Browser `localStorage` for frontend prototype persistence
- Web Speech API
- Browser Geolocation API
- Responsive CSS / print styles

---

## 🏗️ Project Architecture

Major application areas:

```text
app/
├── about/
├── admin/
├── appointments/
├── asha/
├── components/
├── consultations/
├── context/
├── data/
├── doctor/
├── doctors/
├── facilities/
├── facility/
├── patient/
├── patients/
├── referrals/
├── notifications/
├── consent/
└── sync/

public/
├── about/
├── brand/
└── team/

scripts/
└── verify-suite.mjs
```

### Important shared components / utilities

- `AppShell`
- `Header`
- `Sidebar`
- `MobileNav`
- `AccessGate`
- `RoleContext`
- `LanguageContext`
- `LanguageSelector`
- `VoiceAssistant`
- Shared authentication/logout utilities
- Referral state/data utilities

---

## 📁 Public Visual Assets

The project includes a dedicated visual asset structure:

```text
public/
├── brand/
│   └── logo.svg
├── about/
│   ├── hero-care-network.svg
│   ├── continuity-flow.svg
│   ├── consultation-preview.svg
│   ├── medicine-fulfillment.svg
│   ├── multilingual-voice.svg
│   ├── offline-resilience.svg
│   ├── privacy-guardrails.svg
│   └── features/
└── team/
    └── contributor-spec.svg
```

The visual system is intended to keep healthcare illustrations, product branding, and public-facing assets consistent.

---

## 🚀 Run Locally

Clone the repository, install dependencies, and start the development server:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Production Build

Run:

```bash
npm run build
```

The production build must complete successfully before deployment.

---

## ✅ Verification Suite

Run:

```bash
node scripts/verify-suite.mjs
```

The verification suite checks major application behavior, including:

- Role/session boundaries
- Navigation
- Referral workflow
- Appointment behavior
- Consultation handling
- Medicine flow
- Language/voice behavior
- Route integrity
- UI regression checks

Do not hardcode a test-count claim in documentation; the suite count can change as the application evolves.

---

## ☁️ Deployment

The frontend is designed for deployment on Vercel.

Production flow:

```text
GitHub main
    ↓
Vercel
    ↓
Production deployment
```

---

## 🧱 Current Frontend Status

### Frontend Prototype — READY

The current frontend demonstrates:

- Role-based healthcare workflows
- Closed-loop referral tracking
- Patient care continuity
- Multilingual UX
- Voice/text assistance
- Nearby healthcare discovery
- Doctor discovery
- Appointment booking
- Consultation prototype
- Medicine ordering prototype
- Consent/privacy UX
- Clinical summary printing
- Responsive desktop/tablet/mobile interfaces

---

## ⚠️ Prototype vs Production

| Capability | Current Frontend | Production Requirement |
|---|---|---|
| Authentication | Frontend session prototype | Secure backend OAuth/OIDC |
| Authorization | Frontend access gates | Backend authorization |
| Aadhaar / ABHA | Prototype verification UX | Authorized UIDAI/ABHA backend integration |
| Appointments | Demo workflow | Real availability/backend |
| Consultation | Frontend prototype | WebRTC + signaling + TURN/STUN |
| Pharmacy | Demo ordering workflow | Licensed pharmacy + fulfillment |
| Facility discovery | Geolocation + demo data | Live registry/backend |
| Offline sync | Browser persistence | Secure multi-device synchronization |
| Audit | Frontend audit views | Immutable backend audit storage |
| QR | Referral/session-oriented prototype | Short-lived signed backend token |
| Voice | Browser/API prototype | Production AI/Bhashini or voice service |

---

## 🔮 Planned Backend / Ecosystem Integrations

Future production integration areas include:

- OAuth 2.0 / OpenID Connect
- ABDM ecosystem
- ABHA services
- FHIR R4 data exchange
- Bhashini / multilingual voice services
- eSanjeevani / telehealth ecosystem
- Real-time WebRTC infrastructure
- SMS/OTP services
- Licensed pharmacy providers
- Live facility registries
- Secure backend audit logging
- Multi-device offline synchronization

These are **planned integrations**, not claims of current live connectivity.

---

## 👨‍💻 Team / Contributors

The repository currently keeps contributor information centralized in:

```text
app/data/teamData.ts
```

Current role specifications include:

- Project Lead
- Frontend Engineering
- Backend Engineering
- Security & Privacy
- Healthcare Workflow

These are structured, editable contributor specifications. Real names, photos, and biographies should only be added when verified project/team information is available.

---

## 🔒 Security & Privacy Boundary

NIRAMAYA-SETU is currently a frontend prototype.

It must not be interpreted as a production clinical, identity, telemedicine, pharmacy, or authentication system until the required backend/provider integrations and security controls are implemented.

Production deployment should add:

- Backend authorization
- Secure identity provider
- Consent enforcement
- Secure clinical-data storage
- Audit integrity
- Signed QR tokens
- Secure teleconsultation infrastructure
- Approved health ecosystem integrations

---

## 📜 License

This project is released under the **MIT License**.

See [`LICENSE`](LICENSE).

---

## 🤝 Contributing

Contributions are welcome.

When contributing:

1. Preserve existing role-based workflows.
2. Do not break the referral lifecycle.
3. Keep privacy/security boundaries explicit.
4. Avoid introducing unsupported production claims.
5. Run the verification suite before submitting changes.
6. Run the production build before deployment.

---

## 🌱 Vision

NIRAMAYA-SETU aims to make rural healthcare journeys more connected, visible, and continuous — helping patients, field workers, clinicians, and facilities stay aligned from access to referral, treatment, follow-up, and closure.

> **One patient journey. Connected across every level of care.**
