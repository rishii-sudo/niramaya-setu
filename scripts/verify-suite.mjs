// Automated Verification Suite for NIRAMAYA-SETU Targeted Correction Pass
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = "http://localhost:3000";

function fetchRoute(route) {
  return new Promise((resolve, reject) => {
    http
      .get(`${BASE_URL}${route}`, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      })
      .on("error", reject);
  });
}

async function runVerification() {
  console.log("=== NIRAMAYA-SETU AUTOMATED VERIFICATION SUITE ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  // 1. Audit Target Routes (HTTP 200)
  const routesToTest = [
    "/",
    "/about",
    "/get-started",
    "/dashboard",
    "/admin/analytics",
    "/admin/users",
    "/admin/audit",
    "/admin/settings",
    "/admin/login",
    "/doctor",
    "/doctor/appointments",
    "/doctor/referrals",
    "/asha",
    "/asha/patients",
    "/asha/register-patient",
    "/asha/follow-ups",
    "/asha/visits",
    "/asha/create-referral",
    "/facility/dashboard",
    "/facility/incoming-referrals",
    "/facility/diagnostics",
    "/facility/discharge",
    "/patient",
    "/patient/records",
    "/patient/progress",
    "/patient/documents",
    "/patient/medicines",
    "/facilities",
    "/doctors",
    "/appointments",
    "/notifications",
    "/consent",
    "/sync",
  ];

  console.log("--- 1. Testing Route Availability (HTTP 200) ---");
  for (const route of routesToTest) {
    try {
      const res = await fetchRoute(route);
      assert(res.status === 200, `Route ${route} returned HTTP 200`);
    } catch (err) {
      assert(false, `Route ${route} failed with error: ${err.message}`);
    }
  }

  console.log("\n--- 2. Testing Admin Dashboard vs ASHA Separation ---");
  try {
    const dashRes = await fetchRoute("/dashboard");
    assert(dashRes.body.includes("District Health Administration"), "Admin dashboard contains District Health Administration");
    assert(!dashRes.body.includes("ASHA / ANM Field Work"), "Admin dashboard does NOT contain 'ASHA / ANM Field Work'");
    assert(!dashRes.body.includes("ASHA / ANM Dashboard"), "Admin dashboard does NOT contain 'ASHA / ANM Dashboard'");
  } catch (err) {
    assert(false, `Dashboard test failed: ${err.message}`);
  }

  console.log("\n--- 3. Testing Admin Analytics Route ---");
  try {
    const analyticsRes = await fetchRoute("/admin/analytics");
    assert(analyticsRes.body.includes("District Health Analytics"), "Analytics page contains 'District Health Analytics'");
    assert(analyticsRes.body.includes("Care Continuity Funnel"), "Analytics page contains 'Care Continuity Funnel'");
  } catch (err) {
    assert(false, `Analytics test failed: ${err.message}`);
  }

  console.log("\n--- 4. Testing Canonical Patient Demographics in Files ---");
  const patientDataFile = fs.readFileSync(path.resolve("app/data/patientData.ts"), "utf-8");
  assert(patientDataFile.includes("patientId: \"NS-10284\"") && patientDataFile.includes("age: 54") && patientDataFile.includes("Ramesh Kumar"), "Ramesh Kumar: NS-10284, age 54 verified");
  assert(patientDataFile.includes("patientId: \"NS-10279\"") && patientDataFile.includes("age: 47") && patientDataFile.includes("Sunita Devi"), "Sunita Devi: NS-10279, age 47 verified");
  assert(patientDataFile.includes("patientId: \"NS-10271\"") && patientDataFile.includes("age: 58") && patientDataFile.includes("Mohan Lal"), "Mohan Lal: NS-10271, age 58 verified");
  assert(patientDataFile.includes("patientId: \"NS-10263\"") && patientDataFile.includes("age: 61") && patientDataFile.includes("Kamla Devi"), "Kamla Devi: NS-10263, age 61 verified");

  console.log("\n--- 5. Testing Medicine Catalog Consistency ---");
  const medicinesFile = fs.readFileSync(path.resolve("app/patient/medicines/page.tsx"), "utf-8");
  assert(medicinesFile.includes("name: \"Metformin 500mg\"") && medicinesFile.includes("category: \"Antidiabetic\""), "Metformin 500mg categorized as Antidiabetic");
  assert(!medicinesFile.includes("name: \"Metformin 500mg\",\n    genericName: \"Metformin HCl\",\n    category: \"Antihypertensive\""), "Metformin is NOT Antihypertensive");
  assert(medicinesFile.includes("Oral Rehydration Salts (ORS)") && medicinesFile.includes("form: \"Sachet\""), "ORS form is Sachet");

  console.log("\n--- 6. Testing Consultation Room Invalid ID Logic ---");
  const consultationFile = fs.readFileSync(path.resolve("app/consultations/[id]/page.tsx"), "utf-8");
  assert(consultationFile.includes("Invalid or Expired Consultation"), "Consultation room contains explicit invalid session state");
  assert(consultationFile.includes("isLoaded && !appointment"), "Invalid session triggers when no appointment found");
  assert(!consultationFile.includes("const patientName = appointment?.patientName || \"Ramesh Kumar\";"), "No silent fallback to Ramesh Kumar");

  console.log("\n--- 7. Testing Appointment Booking Demo Context ---");
  const appointmentFile = fs.readFileSync(path.resolve("app/appointments/page.tsx"), "utf-8");
  assert(appointmentFile.includes("CANONICAL_DEMO_PATIENTS"), "Appointments page includes canonical demo patient selector");
  assert(appointmentFile.includes("Patient Context Required"), "Appointments requires patient context when unauthenticated");
  assert(!appointmentFile.includes("setPatientName(\"Patient Applicant\");"), "No silent fallback to Patient Applicant");

  console.log("\n--- 8. Testing About Page & Voice Claims ---");
  const aboutFile = fs.readFileSync(path.resolve("app/about/page.tsx"), "utf-8");
  assert(aboutFile.includes("title: \"Voice & Text Assistance\""), "Voice assistance accurately titled 'Voice & Text Assistance'");
  assert(aboutFile.includes("Prototype voice-guided assistance") || aboutFile.includes("Prototype voice and text guidance") || aboutFile.includes("Prototype Voice Assistance"), "Voice assistance described as prototype");
  assert(!aboutFile.includes("Voice and text AI assistant"), "No false production AI claims");
  assert(aboutFile.includes("LanguageSelector"), "LanguageSelector in About page header");

  console.log("\n--- 9. Testing Auth Gate & Role Safety ---");
  const authFile = fs.readFileSync(path.resolve("app/utils/auth.ts"), "utf-8");
  assert(authFile.includes("isRoleAuthenticated"), "auth.ts exports isRoleAuthenticated");
  assert(authFile.includes("niramaya-doctor-auth") && authFile.includes("niramaya-admin-auth"), "auth.ts checks role-specific session keys");
  const roleContextFile = fs.readFileSync(path.resolve("app/context/RoleContext.tsx"), "utf-8");
  assert(roleContextFile.includes("isRoleAuthenticated(pathRole)"), "RoleContext prevents URL prefixes from authenticating without session key");
  const appShellFile = fs.readFileSync(path.resolve("app/components/AppShell.tsx"), "utf-8");
  console.log("\n--- 10. Testing Doctor Treatment Routing & Back Navigation ---");
  const sidebarFile = fs.readFileSync(path.resolve("app/components/Sidebar.tsx"), "utf-8");
  assert(sidebarFile.includes("href: \"/doctor/patients/NS-10284/treatment\""), "Doctor Treatment Queue points directly to patient treatment page");
  const doctorReferralsFile = fs.readFileSync(path.resolve("app/doctor/referrals/page.tsx"), "utf-8");
  assert(doctorReferralsFile.includes("/doctor/patients/${referral.patientId}/treatment"), "Doctor Referrals table has direct Treatment action button");
  assert(!doctorReferralsFile.includes("<LanguageSelector />"), "Doctor Referrals has NO duplicate LanguageSelector");
  assert(!doctorReferralsFile.includes("<header className="), "Doctor Referrals has NO duplicate inner header");
  const doctorDashboardFile = fs.readFileSync(path.resolve("app/doctor/page.tsx"), "utf-8");
  assert(!doctorDashboardFile.includes("<LanguageSelector"), "Doctor Dashboard has NO duplicate LanguageSelector");
  assert(!doctorDashboardFile.includes("<header className="), "Doctor Dashboard has NO duplicate inner header");

  const doctorTreatmentFile = fs.readFileSync(path.resolve("app/doctor/patients/[id]/treatment/page.tsx"), "utf-8");
  assert(doctorTreatmentFile.includes("router.back()"), "Doctor Treatment page includes browser back action");
  assert(doctorTreatmentFile.includes("← Back to Referrals"), "Doctor Treatment page includes '← Back to Referrals' button");
  assert(doctorTreatmentFile.includes("← Back to Patient"), "Doctor Treatment page includes '← Back to Patient' button");

  console.log("\n--- 11. Testing Role Isolation & Cross-Role Access Boundary ---");
  const accessGateFile = fs.readFileSync(path.resolve("app/components/AccessGate.tsx"), "utf-8");
  assert(accessGateFile.includes("isCrossRoleContamination"), "AccessGate checks cross-role contamination");
  assert(accessGateFile.includes("Access Boundary Check"), "AccessGate displays Access Boundary Check badge");
  assert(appShellFile.includes("activeRole !== \"public\" && activeRole !== protectedRole"), "AppShell blocks silent role switching across protected domains");

  console.log("\n--- 12. Testing ASHA Dashboard Layout Polish ---");
  const ashaFile = fs.readFileSync(path.resolve("app/asha/page.tsx"), "utf-8");
  assert(ashaFile.includes("mx-auto max-w-7xl space-y-6"), "ASHA dashboard uses centered max-w-7xl container");
  assert(ashaFile.includes("p-5 sm:p-6 lg:p-8"), "ASHA dashboard has standard responsive padding matching doctor portal");

  console.log("\n--- 13. Testing Clinical A4 Print Output ---");
  const globalsCss = fs.readFileSync(path.resolve("app/globals.css"), "utf-8");
  assert(globalsCss.includes(".print-only {") && globalsCss.includes(".screen-only,"), "globals.css defines screen-only and print-only rules");
  const patientDetailFile = fs.readFileSync(path.resolve("app/patients/[id]/page.tsx"), "utf-8");
  assert(patientDetailFile.includes("print-only") && patientDetailFile.includes("Clinical Summary & Care Continuum Document"), "Patient overview includes dedicated print-only clinical summary");
  assert(patientDetailFile.includes("Reason for Referral") && patientDetailFile.includes("Prescribed Medications"), "Clinical document contains required clinical sections");

  console.log("\n--- 14. Testing Prescription Medicine Requirements ---");
  assert(medicinesFile.includes("Prescription required before fulfillment."), "Medicines page displays 'Prescription required before fulfillment.'");

  console.log("\n--- 15. Testing Brand & Public Assets ---");
  assert(fs.existsSync(path.resolve("public/brand/logo.svg")), "public/brand/logo.svg exists");
  assert(fs.existsSync(path.resolve("public/about/continuity-flow.svg")), "public/about/continuity-flow.svg exists");
  assert(fs.existsSync(path.resolve("public/team/contributor-spec.svg")), "public/team/contributor-spec.svg exists");

  console.log("\n--- 16. Testing Patient Login Role-Context & Session Isolation ---");
  assert(authFile.includes("export function clearStaffSessionKeys"), "auth.ts exports clearStaffSessionKeys");
  const loginFile = fs.readFileSync(path.resolve("app/login/page.tsx"), "utf-8");
  assert(loginFile.includes("clearStaffSessionKeys()"), "login page clears staff sessions on OTP verification");
  assert(loginFile.includes("localStorage.setItem(\"niramaya-active-role\", \"patient\")"), "login page sets niramaya-active-role to patient");
  assert(loginFile.includes("setActiveRole(\"patient\")"), "login page updates RoleContext active role to patient");
  assert(roleContextFile.includes("pathRole === \"patient\" && isRoleAuthenticated(\"patient\")"), "RoleContext ensures authenticated patient session takes precedence over prior staff roles");

  const patientDashboardFile = fs.readFileSync(path.resolve("app/patient/page.tsx"), "utf-8");
  assert(patientDashboardFile.includes("logoutUser(\"patient\")"), "patient dashboard calls logoutUser on sign out");
  assert(patientDashboardFile.includes("router.push(target)"), "patient dashboard redirects after clearing session on logout");

  const recordsFile = fs.readFileSync(path.resolve("app/patient/records/page.tsx"), "utf-8");
  assert(recordsFile.includes("logoutUser(\"patient\")"), "patient records calls logoutUser on sign out");
  assert(recordsFile.includes("href=\"/appointments\"") && recordsFile.includes("href=\"/patient/medicines\""), "patient records nav includes Appointments and Medicines");

  const progressFile = fs.readFileSync(path.resolve("app/patient/progress/page.tsx"), "utf-8");
  assert(progressFile.includes("logoutUser(\"patient\")"), "patient progress calls logoutUser on sign out");
  assert(progressFile.includes("href=\"/appointments\"") && progressFile.includes("href=\"/patient/medicines\""), "patient progress nav includes Appointments and Medicines");

  const documentsFile = fs.readFileSync(path.resolve("app/patient/documents/page.tsx"), "utf-8");
  assert(documentsFile.includes("logoutUser(\"patient\")"), "patient documents calls logoutUser on sign out");
  assert(documentsFile.includes("href=\"/appointments\"") && documentsFile.includes("href=\"/patient/medicines\""), "patient documents nav includes Appointments and Medicines");

  console.log("\n--- 17. Testing Single Header & Single LanguageSelector Shell ---");
  const headerFile = fs.readFileSync(path.resolve("app/components/Header.tsx"), "utf-8");
  assert(headerFile.includes("hidden md:block"), "Header.tsx includes hidden md:block for responsive visibility");
  assert(headerFile.includes("<LanguageSelector"), "Header.tsx renders LanguageSelector component");
  assert(!headerFile.includes("aria-label=\"Select Language\""), "Header.tsx removed duplicate inlined select");

  const shellSidebarFile = fs.readFileSync(path.resolve("app/components/Sidebar.tsx"), "utf-8");
  assert(!shellSidebarFile.includes("<LanguageSelector"), "Sidebar.tsx does NOT render LanguageSelector");
  assert(shellSidebarFile.includes("md:flex md:flex-col") && shellSidebarFile.includes("hidden"), "Sidebar.tsx uses hidden md:flex md:flex-col aligned with MobileNav");

  assert(roleContextFile.includes('subtitle: "ASHA / ANM"'), "RoleContext defines 'ASHA / ANM' subtitle");
  assert(roleContextFile.includes('subtitle: "Doctor Workspace"'), "RoleContext defines 'Doctor Workspace' subtitle");
  assert(roleContextFile.includes('subtitle: "Facility Operations"'), "RoleContext defines 'Facility Operations' subtitle");
  assert(roleContextFile.includes('subtitle: "System Administration"'), "RoleContext defines 'System Administration' subtitle");

  assert(shellSidebarFile.includes('subtitle: "ASHA / ANM"'), "Sidebar config defines 'ASHA / ANM' subtitle");
  assert(shellSidebarFile.includes('subtitle: "Doctor Workspace"'), "Sidebar config defines 'Doctor Workspace' subtitle");
  assert(shellSidebarFile.includes('subtitle: "Facility Operations"'), "Sidebar config defines 'Facility Operations' subtitle");
  assert(shellSidebarFile.includes('subtitle: "System Administration"'), "Sidebar config defines 'System Administration' subtitle");

  const referralsCreateFile = fs.readFileSync(path.resolve("app/referrals/create/page.tsx"), "utf-8");
  assert(!referralsCreateFile.includes("<LanguageSelector"), "referrals/create does NOT render LanguageSelector");
  assert(!referralsCreateFile.includes("<header className=\"border-b"), "referrals/create does NOT render duplicate header");

  const referralsIdFile = fs.readFileSync(path.resolve("app/referrals/[id]/page.tsx"), "utf-8");
  assert(!referralsIdFile.includes("<LanguageSelector"), "referrals/[id] does NOT render LanguageSelector");
  assert(!referralsIdFile.includes("<header className=\"border-b"), "referrals/[id] does NOT render duplicate header");

  const facilityDashFile = fs.readFileSync(path.resolve("app/facility/dashboard/page.tsx"), "utf-8");
  assert(!facilityDashFile.includes("<header className=\"border-b"), "facility/dashboard does NOT render duplicate header");

  const facilityIncomingFile = fs.readFileSync(path.resolve("app/facility/incoming-referrals/page.tsx"), "utf-8");
  assert(!facilityIncomingFile.includes("<header className=\"border-b"), "facility/incoming-referrals does NOT render duplicate header");

  const patientsFile = fs.readFileSync(path.resolve("app/patients/page.tsx"), "utf-8");
  assert(!patientsFile.includes("<header className=\"border-b"), "patients does NOT render duplicate header");

  const patientsRegisterFile = fs.readFileSync(path.resolve("app/patients/register/page.tsx"), "utf-8");
  assert(!patientsRegisterFile.includes("<header className=\"border-b"), "patients/register does NOT render duplicate header");

  console.log("\n--- 18. Testing Public Entry Flow (/ -> /get-started) ---");
  const homeFile = fs.readFileSync(path.resolve("app/page.tsx"), "utf-8");
  assert(homeFile.includes("href=\"/get-started\""), "Home page contains prominent CTA link to /get-started");
  assert(homeFile.includes("How NIRAMAYA-SETU Works"), "Home page explains How NIRAMAYA-SETU Works");
  assert(homeFile.includes("ACCESS") && homeFile.includes("RECORD") && homeFile.includes("REFER") && homeFile.includes("FOLLOW"), "Home page illustrates the 4-step care continuum");
  assert(homeFile.includes("LanguageSelector"), "Home page includes global LanguageSelector");
  assert(homeFile.includes("Ayushman Bharat Digital Mission") && homeFile.includes("FHIR R4"), "Home page documents national ecosystem integrations");

  const getStartedFile = fs.readFileSync(path.resolve("app/get-started/page.tsx"), "utf-8");
  assert(getStartedFile.includes("What best describes you?"), "Get Started page contains role selection prompt 'What best describes you?'");
  assert(getStartedFile.includes("Patient / Citizen") && getStartedFile.includes("ASHA / ANM Field Worker"), "Get Started includes Patient and ASHA roles");
  assert(getStartedFile.includes("Doctor / Clinician") && getStartedFile.includes("Facility Staff / Hospital"), "Get Started includes Doctor and Facility roles");
  assert(getStartedFile.includes("router.push"), "Get Started uses router.push without auto-authenticating session");

  assert(appShellFile.includes('pathname === "/get-started"'), "AppShell treats /get-started as standalone public route");
  assert(roleContextFile.includes('pathname === "/get-started"'), "RoleContext treats /get-started as public route");

  console.log("\n--- 19. Testing Final About Page (/about) ---");
  const finalAboutFile = fs.readFileSync(path.resolve("app/about/page.tsx"), "utf-8");
  assert(finalAboutFile.includes("One Patient Journey. Connected Across Every Level of Care."), "About page contains official headline");
  assert(finalAboutFile.includes("Connected Rural Care • Closed-Loop Referral Platform"), "About page contains official tagline");
  assert(finalAboutFile.includes("/brand/logo.svg"), "About page uses official logo /brand/logo.svg");
  assert(finalAboutFile.includes("/about/hero-care-network.svg"), "About page renders hero-care-network.svg illustration");
  assert(fs.existsSync(path.resolve("public/about/hero-care-network.svg")), "hero-care-network.svg exists on disk");
  assert(finalAboutFile.includes("/about/continuity-flow.svg"), "About page renders continuity-flow.svg");
  assert(fs.existsSync(path.resolve("public/about/continuity-flow.svg")), "continuity-flow.svg exists on disk");

  // 17 Capabilities
  const expectedCaps = [
    "Patient Registration",
    "Digital Patient Records",
    "ASHA / ANM Field Support",
    "Referral Management",
    "Closed-Loop Referral Tracking",
    "Follow-up Tracking",
    "Nearby Hospital / Clinic Discovery",
    "Doctor Discovery",
    "Online Appointment Booking",
    "Video Consultation Prototype",
    "Audio Consultation Prototype",
    "Clinical Summary / Documents",
    "Medicine Discovery / Ordering Prototype",
    "Multilingual Support",
    "Voice & Text Assistance",
    "Consent & Privacy",
    "Offline-first Rural Workflow",
  ];
  let allCapsFound = true;
  for (const cap of expectedCaps) {
    if (!finalAboutFile.includes(cap)) {
      allCapsFound = false;
      console.error(`Missing capability in /about: ${cap}`);
    }
  }
  assert(allCapsFound, "About page contains all 17 specified capability cards");

  // 6 Stakeholders
  const expectedStakeholders = [
    "Patients & Families",
    "ASHA / ANM Workers",
    "Doctors & Clinicians",
    "Hospitals & Clinics",
    "Administrators & Health Officials",
    "Healthcare Partners & Organizations",
  ];
  let allStakeholdersFound = true;
  for (const sh of expectedStakeholders) {
    if (!finalAboutFile.includes(sh)) {
      allStakeholdersFound = false;
      console.error(`Missing stakeholder in /about: ${sh}`);
    }
  }
  assert(allStakeholdersFound, "About page covers all 6 distinct stakeholder groups");

  // Unsupported claim absence
  assert(!finalAboutFile.includes("40%+"), "About page removed unsupported '40%+' claim");
  assert(!finalAboutFile.includes("91.4%"), "About page removed unsupported '91.4%' claim");
  assert(!finalAboutFile.includes("14 Facilities"), "About page removed unsupported '14 Facilities' claim");
  assert(!finalAboutFile.includes("100% Offline Sync"), "About page removed unsupported '100% Offline Sync' claim");

  // Prototype notices & disclaimers
  assert(finalAboutFile.includes("Production WebRTC integration planned"), "About page discloses WebRTC roadmap status");
  assert(finalAboutFile.includes("Prescription required before fulfillment"), "About page discloses prescription requirement");
  assert(finalAboutFile.includes("Prototype Voice Assistance"), "About page discloses voice assistant prototype status");

  // Team & Data Integration
  assert(finalAboutFile.includes("teamMembers") && finalAboutFile.includes("projectCreators"), "About page imports team data from teamData.ts");
  assert(finalAboutFile.includes("Core architectural roles & contributor specifications") || finalAboutFile.includes("Core architectural roles &amp; contributor specifications"), "About page labels team specifications transparently");

  // Single LanguageSelector
  const langSelectorCount = (finalAboutFile.match(/<LanguageSelector/g) || []).length;
  assert(langSelectorCount === 1, `About page renders exactly 1 LanguageSelector (found ${langSelectorCount})`);

  // Links & Navigation
  assert(finalAboutFile.includes("href=\"/login\"") && finalAboutFile.includes("href=\"/asha/login\""), "About page links to Patient and ASHA logins");
  assert(finalAboutFile.includes("href=\"/doctor/login\"") && finalAboutFile.includes("href=\"/facility/login\""), "About page links to Doctor and Facility logins");
  assert(finalAboutFile.includes("href=\"/get-started\""), "About page links to /get-started");

  console.log(`\n==================================================`);
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==================================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runVerification();
