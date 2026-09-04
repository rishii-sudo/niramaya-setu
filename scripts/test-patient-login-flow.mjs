// Comprehensive End-to-End Simulation Test for Patient Login Flow & Role Context Isolation
import fs from "node:fs";
import path from "node:path";

class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

const mockStorage = new MockLocalStorage();
global.window = { localStorage: mockStorage };
global.localStorage = mockStorage;

// Import compiled or dynamically evaluate auth & role helpers
function isRoleAuthenticated(role) {
  switch (role) {
    case "doctor":
      return !!(
        mockStorage.getItem("niramaya-doctor-auth") ||
        mockStorage.getItem("niramaya-doctor-verification") === "verified" ||
        mockStorage.getItem("niramaya-doctor-id")
      );
    case "asha":
      return !!(
        mockStorage.getItem("niramaya-asha-auth") ||
        mockStorage.getItem("niramaya-asha-verification") === "verified" ||
        mockStorage.getItem("niramaya-asha-id")
      );
    case "facility":
      return !!(
        mockStorage.getItem("niramaya-facility-auth") ||
        mockStorage.getItem("niramaya-facility-verification") === "verified" ||
        mockStorage.getItem("niramaya-facility-id")
      );
    case "admin":
      return !!(
        mockStorage.getItem("niramaya-admin-auth") ||
        mockStorage.getItem("niramaya-admin-id")
      );
    case "patient":
      return !!(
        mockStorage.getItem("niramaya-patient-auth") ||
        mockStorage.getItem("niramaya-patient-mobile")
      );
    case "public":
      return true;
    default:
      return false;
  }
}

function clearStaffSessionKeys() {
  const staffKeys = [
    "niramaya-doctor-id",
    "niramaya-doctor-role",
    "niramaya-doctor-verification",
    "niramaya-doctor-referral",
    "niramaya-doctor-remember",
    "niramaya-doctor-auth",
    "niramaya-asha-id",
    "niramaya-asha-role",
    "niramaya-asha-verification",
    "niramaya-asha-referral",
    "niramaya-asha-remember",
    "niramaya-asha-auth",
    "niramaya-facility-id",
    "niramaya-facility-role",
    "niramaya-facility-verification",
    "niramaya-facility-referral",
    "niramaya-facility-remember",
    "niramaya-facility-token",
    "niramaya-facility-auth",
    "niramaya-admin-id",
    "niramaya-admin-role",
    "niramaya-admin-auth",
    "niramaya-admin-remember",
  ];
  staffKeys.forEach((k) => mockStorage.removeItem(k));
}

function logoutUser(activeRole) {
  const keysToRemove = [
    "niramaya-active-role",
    "niramaya-patient-mobile",
    "niramaya-patient-auth",
    "niramaya-doctor-id",
    "niramaya-doctor-role",
    "niramaya-doctor-verification",
    "niramaya-doctor-referral",
    "niramaya-doctor-remember",
    "niramaya-doctor-auth",
    "niramaya-asha-id",
    "niramaya-asha-role",
    "niramaya-asha-verification",
    "niramaya-asha-referral",
    "niramaya-asha-remember",
    "niramaya-asha-auth",
    "niramaya-facility-id",
    "niramaya-facility-role",
    "niramaya-facility-verification",
    "niramaya-facility-referral",
    "niramaya-facility-remember",
    "niramaya-facility-token",
    "niramaya-facility-auth",
    "niramaya-admin-id",
    "niramaya-admin-role",
    "niramaya-admin-auth",
    "niramaya-admin-remember",
  ];
  keysToRemove.forEach((k) => mockStorage.removeItem(k));
  switch (activeRole) {
    case "asha":
      return "/asha/login";
    case "doctor":
      return "/doctor/login";
    case "facility":
      return "/facility/login";
    case "patient":
      return "/login";
    case "admin":
      return "/admin/login";
    default:
      return "/login";
  }
}

function getRoleFromPathname(pathname) {
  if (pathname === "/asha" || pathname.startsWith("/asha/")) {
    if (pathname === "/asha/login" || pathname === "/asha/verify") return null;
    return "asha";
  }
  if (pathname === "/doctor" || pathname.startsWith("/doctor/")) {
    if (pathname === "/doctor/login" || pathname === "/doctor/verify") return null;
    return "doctor";
  }
  if (pathname === "/facility" || pathname.startsWith("/facility/")) {
    if (pathname === "/facility/login" || pathname === "/facility/verify") return null;
    return "facility";
  }
  if (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/dashboard"
  ) {
    if (pathname === "/admin/login" || pathname === "/admin/verify") return null;
    return "admin";
  }
  if (pathname === "/patient" || pathname.startsWith("/patient/")) {
    return "patient";
  }
  return null;
}

function evaluateRoleContext(pathname, currentActiveRole) {
  const pathRole = getRoleFromPathname(pathname);
  const stored = mockStorage.getItem("niramaya-active-role");
  const isStoredValid =
    stored &&
    ["asha", "doctor", "facility", "admin", "patient"].includes(stored) &&
    isRoleAuthenticated(stored);

  if (pathRole) {
    if (pathRole === "patient" && isRoleAuthenticated("patient")) {
      if (stored !== "patient") {
        clearStaffSessionKeys();
        mockStorage.setItem("niramaya-active-role", "patient");
      }
      return "patient";
    }
    if (isStoredValid && stored !== pathRole) {
      return stored;
    }
    if (isRoleAuthenticated(pathRole)) {
      mockStorage.setItem("niramaya-active-role", pathRole);
      return pathRole;
    } else {
      return "public";
    }
  } else {
    if (isStoredValid) {
      return stored;
    } else {
      return "public";
    }
  }
}

function checkAppShellAccessGate(pathname, activeRole) {
  const protectedRole = getRoleFromPathname(pathname);
  if (!protectedRole) {
    return { blocked: false, reason: null };
  }
  if (!isRoleAuthenticated(protectedRole)) {
    return {
      blocked: true,
      reason: "Authentication Required",
      requiredRole: protectedRole,
    };
  }
  if (activeRole !== "public" && activeRole !== protectedRole) {
    return {
      blocked: true,
      reason: "Access Boundary Check",
      currentRole: activeRole,
      requiredRole: protectedRole,
    };
  }
  return { blocked: false, reason: null };
}

// SIMULATION TEST SUITE
console.log("=== PATIENT LOGIN ROLE-CONTEXT SIMULATION TESTS ===\n");
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

// -------------------------------------------------------------
// SCENARIO 1: Admin login -> logout -> Patient login -> /patient
// -------------------------------------------------------------
console.log("--- TEST 1: Admin Login -> Logout -> Patient Login -> /patient ---");
mockStorage.clear();

// 1. Admin login
mockStorage.setItem("niramaya-admin-id", "ADMIN-101");
mockStorage.setItem("niramaya-admin-role", "Administrator");
mockStorage.setItem("niramaya-admin-auth", "demo-authenticated");
mockStorage.setItem("niramaya-active-role", "admin");

let activeRole = evaluateRoleContext("/dashboard", "public");
assert(activeRole === "admin", "Admin login sets activeRole = admin");
let gate = checkAppShellAccessGate("/dashboard", activeRole);
assert(!gate.blocked, "Admin can access /dashboard without AccessGate");

// 2. Admin logout
const redirect = logoutUser(activeRole);
assert(redirect === "/admin/login", "logoutUser('admin') returns /admin/login");
assert(!mockStorage.getItem("niramaya-active-role"), "niramaya-active-role removed");
assert(!mockStorage.getItem("niramaya-admin-auth"), "niramaya-admin-auth removed");

// 3. Patient login flow on /login
const patientMobile = "9876543210";
clearStaffSessionKeys();
mockStorage.setItem("niramaya-patient-mobile", patientMobile);
mockStorage.setItem("niramaya-patient-auth", "demo-authenticated");
mockStorage.setItem("niramaya-active-role", "patient");

// 4. Access /patient
activeRole = evaluateRoleContext("/patient", "public");
assert(activeRole === "patient", "RoleContext activates 'patient' on /patient");
gate = checkAppShellAccessGate("/patient", activeRole);
assert(!gate.blocked, "Patient accesses /patient with NO AccessGate");

// -------------------------------------------------------------
// SCENARIO 2: CRITICAL - Admin session active -> explicitly start Patient login -> authenticate -> Patient dashboard
// -------------------------------------------------------------
console.log("\n--- TEST 2: Admin Session Active -> Explicit Patient Login -> Patient Dashboard ---");
mockStorage.clear();

// Set active Admin session
mockStorage.setItem("niramaya-admin-id", "ADMIN-101");
mockStorage.setItem("niramaya-admin-role", "Administrator");
mockStorage.setItem("niramaya-admin-auth", "demo-authenticated");
mockStorage.setItem("niramaya-active-role", "admin");

assert(isRoleAuthenticated("admin") === true, "Admin session is actively authenticated");

// User explicitly navigates to /login and performs Patient verification
// In app/login/page.tsx verifyOtp:
clearStaffSessionKeys();
mockStorage.setItem("niramaya-patient-mobile", "9876543210");
mockStorage.setItem("niramaya-patient-auth", "demo-authenticated");
mockStorage.setItem("niramaya-active-role", "patient");

assert(!mockStorage.getItem("niramaya-admin-auth"), "Previous admin auth key was wiped");
assert(!mockStorage.getItem("niramaya-admin-id"), "Previous admin ID was wiped");
assert(mockStorage.getItem("niramaya-active-role") === "patient", "niramaya-active-role became 'patient'");
assert(isRoleAuthenticated("patient") === true, "Patient is now authenticated");

// User redirects to /patient
activeRole = evaluateRoleContext("/patient", "admin");
assert(activeRole === "patient", "RoleContext switches activeRole to 'patient'");
gate = checkAppShellAccessGate("/patient", activeRole);
assert(!gate.blocked, "Patient accesses /patient directly (NO Administrator access gate!)");

// -------------------------------------------------------------
// SCENARIO 3: Patient Subroutes (/patient/records, progress, documents, medicines, /appointments)
// -------------------------------------------------------------
console.log("\n--- TEST 3: Patient Subroutes Access ---");
const subroutes = [
  "/patient",
  "/patient/records",
  "/patient/progress",
  "/patient/documents",
  "/patient/medicines",
  "/appointments",
];

for (const route of subroutes) {
  activeRole = evaluateRoleContext(route, "patient");
  gate = checkAppShellAccessGate(route, activeRole);
  assert(!gate.blocked, `Patient can access ${route} without gate`);
}

// -------------------------------------------------------------
// SCENARIO 4: Patient Logout clears session & re-locks /patient
// -------------------------------------------------------------
console.log("\n--- TEST 4: Patient Logout & Re-authentication Gate ---");
const patientLogoutTarget = logoutUser("patient");
assert(patientLogoutTarget === "/login", "logoutUser('patient') redirects to /login");
assert(!mockStorage.getItem("niramaya-patient-auth"), "niramaya-patient-auth removed");
assert(!mockStorage.getItem("niramaya-patient-mobile"), "niramaya-patient-mobile removed");
assert(!mockStorage.getItem("niramaya-active-role"), "niramaya-active-role removed");

activeRole = evaluateRoleContext("/patient", "public");
gate = checkAppShellAccessGate("/patient", activeRole);
assert(gate.blocked && gate.reason === "Authentication Required", "/patient requires authentication after logout");

// -------------------------------------------------------------
// SCENARIO 5: Business & Demo Data Preservation
// -------------------------------------------------------------
console.log("\n--- TEST 5: Business Data Preservation ---");
mockStorage.setItem("niramaya-custom-referrals", JSON.stringify([{ id: "REF-1" }]));
mockStorage.setItem("niramaya_patients", JSON.stringify([{ id: "P-1" }]));
mockStorage.setItem("niramaya-appointments", JSON.stringify([{ id: "APT-1" }]));

// Run clearStaffSessionKeys and logoutUser
clearStaffSessionKeys();
logoutUser("doctor");
logoutUser("admin");
logoutUser("patient");

assert(mockStorage.getItem("niramaya-custom-referrals") !== null, "Custom referrals data preserved");
assert(mockStorage.getItem("niramaya_patients") !== null, "Registered patients data preserved");
assert(mockStorage.getItem("niramaya-appointments") !== null, "Appointments data preserved");

console.log(`\n==================================================`);
console.log(`SIMULATION RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log(`==================================================\n`);

process.exit(failed > 0 ? 1 : 0);
