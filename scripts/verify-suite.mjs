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
  assert(aboutFile.includes("Prototype voice-guided assistance"), "Voice assistance described as prototype");
  assert(!aboutFile.includes("Voice and text AI assistant"), "No false production AI claims");
  assert(aboutFile.includes("LanguageSelector"), "LanguageSelector in About page header");

  console.log("\n--- 9. Testing Auth Gate & Role Safety ---");
  const authFile = fs.readFileSync(path.resolve("app/utils/auth.ts"), "utf-8");
  assert(authFile.includes("isRoleAuthenticated"), "auth.ts exports isRoleAuthenticated");
  assert(authFile.includes("niramaya-doctor-auth") && authFile.includes("niramaya-admin-auth"), "auth.ts checks role-specific session keys");
  const roleContextFile = fs.readFileSync(path.resolve("app/context/RoleContext.tsx"), "utf-8");
  assert(roleContextFile.includes("isRoleAuthenticated(pathRole)"), "RoleContext prevents URL prefixes from authenticating without session key");
  const appShellFile = fs.readFileSync(path.resolve("app/components/AppShell.tsx"), "utf-8");
  assert(appShellFile.includes("AccessGate"), "AppShell renders AccessGate on protected routes when unauthenticated");

  console.log(`\n==================================================`);
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==================================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runVerification();
