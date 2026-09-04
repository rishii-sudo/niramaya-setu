import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'http://localhost:3000';

function fetchRoute(route) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${route}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runTest() {
  console.log('=== COMPREHENSIVE RUNTIME DOCTOR DIRECTORY & ACCESS BOUNDARY AUDIT ===\n');
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

  // 1. HTTP Endpoint Verification
  console.log('--- 1. HTTP 200 & DOM Content Verification ---');
  const doctorsRes = await fetchRoute('/doctors');
  assert(doctorsRes.status === 200, 'Route /doctors returns HTTP 200');
  assert(doctorsRes.body.includes('Doctor Directory'), '/doctors contains "Doctor Directory" title');
  assert(doctorsRes.body.includes('Consult Verified Medical Specialists'), '/doctors contains "Consult Verified Medical Specialists"');
  assert(doctorsRes.body.includes('Tele-Health &amp; In-Person Specialist Care') || doctorsRes.body.includes('Tele-Health & In-Person Specialist Care'), '/doctors contains Tele-Health subtitle');
  assert(doctorsRes.body.includes('Dr. Rajesh Sharma') || doctorsRes.body.includes('Dr. Priya Patel'), '/doctors renders clinician directory cards');
  assert(!doctorsRes.body.includes('Doctor Access Required'), '/doctors does NOT render "Doctor Access Required"');
  assert(!doctorsRes.body.includes('Access Boundary Check'), '/doctors does NOT render "Access Boundary Check"');
  assert(!doctorsRes.body.includes('Authentication Required'), '/doctors does NOT render "Authentication Required" gate');

  const facilitiesRes = await fetchRoute('/facilities');
  assert(facilitiesRes.status === 200, 'Route /facilities returns HTTP 200');
  assert(!facilitiesRes.body.includes('Facility Staff Access Required'), '/facilities does NOT render "Facility Staff Access Required"');
  assert(!facilitiesRes.body.includes('Access Boundary Check'), '/facilities does NOT render "Access Boundary Check"');

  // 2. Source Code & Function Logic Verification
  console.log('\n--- 2. AppShell Route Classification Logic ---');
  const appShellCode = fs.readFileSync(path.resolve('app/components/AppShell.tsx'), 'utf8');

  // Extract getProtectedRoleForPath from AppShell.tsx
  const fnMatch = appShellCode.match(/function getProtectedRoleForPath\([\s\S]*?\n\}/);
  assert(fnMatch !== null, 'Found getProtectedRoleForPath in AppShell.tsx');

  const getProtectedRoleForPath = new Function(
    'pathname',
    fnMatch[0].replace('function getProtectedRoleForPath(pathname: string): Role | null', '')
      .replace(/:\s*Role\s*\|\s*null/g, '')
  );

  // Test Route Protection Classifications:
  assert(getProtectedRoleForPath('/doctors') === null, 'getProtectedRoleForPath("/doctors") === null (Public)');
  assert(getProtectedRoleForPath('/doctors/') === null, 'getProtectedRoleForPath("/doctors/") === null (Public)');
  assert(getProtectedRoleForPath('/doctors/specialists') === null, 'getProtectedRoleForPath("/doctors/specialists") === null (Public)');
  assert(getProtectedRoleForPath('/facilities') === null, 'getProtectedRoleForPath("/facilities") === null (Public)');
  assert(getProtectedRoleForPath('/facilities/1') === null, 'getProtectedRoleForPath("/facilities/1") === null (Public)');

  assert(getProtectedRoleForPath('/doctor') === 'doctor', 'getProtectedRoleForPath("/doctor") === "doctor" (Protected)');
  assert(getProtectedRoleForPath('/doctor/') === 'doctor', 'getProtectedRoleForPath("/doctor/") === "doctor" (Protected)');
  assert(getProtectedRoleForPath('/doctor/appointments') === 'doctor', 'getProtectedRoleForPath("/doctor/appointments") === "doctor" (Protected)');
  assert(getProtectedRoleForPath('/doctor/referrals') === 'doctor', 'getProtectedRoleForPath("/doctor/referrals") === "doctor" (Protected)');
  assert(getProtectedRoleForPath('/doctor/patients/NS-10284/treatment') === 'doctor', 'getProtectedRoleForPath("/doctor/patients/...") === "doctor" (Protected)');
  assert(getProtectedRoleForPath('/doctor/login') === null, 'getProtectedRoleForPath("/doctor/login") === null (Public login)');
  assert(getProtectedRoleForPath('/doctor/verify') === null, 'getProtectedRoleForPath("/doctor/verify") === null (Public verify)');

  assert(getProtectedRoleForPath('/asha') === 'asha', 'getProtectedRoleForPath("/asha") === "asha" (Protected)');
  assert(getProtectedRoleForPath('/facility') === 'facility', 'getProtectedRoleForPath("/facility") === "facility" (Protected)');
  assert(getProtectedRoleForPath('/dashboard') === 'admin', 'getProtectedRoleForPath("/dashboard") === "admin" (Protected)');
  assert(getProtectedRoleForPath('/patient') === 'patient', 'getProtectedRoleForPath("/patient") === "patient" (Protected)');

  // 3. RoleContext getRoleFromPathname Logic
  console.log('\n--- 3. RoleContext Route Classification Logic ---');
  const roleContextCode = fs.readFileSync(path.resolve('app/context/RoleContext.tsx'), 'utf8');
  const roleFnMatch = roleContextCode.match(/export function getRoleFromPathname\([\s\S]*?\n\}/);
  assert(roleFnMatch !== null, 'Found getRoleFromPathname in RoleContext.tsx');

  const getRoleFromPathname = new Function(
    'pathname',
    roleFnMatch[0].replace('export function getRoleFromPathname(pathname: string): Role | null', '')
      .replace(/:\s*Role\s*\|\s*null/g, '')
  );

  assert(getRoleFromPathname('/doctors') === null, 'getRoleFromPathname("/doctors") === null (Public)');
  assert(getRoleFromPathname('/doctors/') === null, 'getRoleFromPathname("/doctors/") === null (Public)');
  assert(getRoleFromPathname('/doctor') === 'doctor', 'getRoleFromPathname("/doctor") === "doctor"');
  assert(getRoleFromPathname('/doctor/appointments') === 'doctor', 'getRoleFromPathname("/doctor/appointments") === "doctor"');
  assert(getRoleFromPathname('/facilities') === null, 'getRoleFromPathname("/facilities") === null (Public)');
  assert(getRoleFromPathname('/facility') === 'facility', 'getRoleFromPathname("/facility") === "facility"');

  // 4. Runtime Cross-Role Boundary Simulation
  console.log('\n--- 4. AppShell Cross-Role Simulation on /doctors ---');
  const testRoles = ['public', 'patient', 'asha', 'facility', 'admin', 'doctor'];

  for (const currentRole of testRoles) {
    const isRoleAuth = (r) => r === currentRole && currentRole !== 'public';
    const protectedRole = getProtectedRoleForPath('/doctors');
    let willGateTrigger = false;

    if (protectedRole) {
      if (!isRoleAuth(protectedRole)) willGateTrigger = true;
      if (currentRole !== 'public' && currentRole !== protectedRole) willGateTrigger = true;
    }

    assert(!willGateTrigger, `User with role "${currentRole}" navigating to /doctors is NEVER blocked by AccessGate`);
  }

  // 5. Runtime Cross-Role Boundary Simulation on /doctor (Must be protected for non-doctors)
  console.log('\n--- 5. AppShell Protection Simulation on /doctor Workspaces ---');
  for (const currentRole of testRoles) {
    const isRoleAuth = (r) => r === currentRole && currentRole !== 'public';
    const protectedRole = getProtectedRoleForPath('/doctor/appointments');
    let willGateTrigger = false;

    if (protectedRole) {
      if (!isRoleAuth(protectedRole)) willGateTrigger = true;
      if (currentRole !== 'public' && currentRole !== protectedRole) willGateTrigger = true;
    }

    if (currentRole === 'doctor') {
      assert(!willGateTrigger, `Authenticated doctor can access /doctor/appointments`);
    } else {
      assert(willGateTrigger, `User with role "${currentRole}" is blocked by AccessGate when accessing /doctor/appointments`);
    }
  }

  console.log(`\n==================================================`);
  console.log(`COMPREHENSIVE AUDIT: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==================================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTest();
