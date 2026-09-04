import http from 'node:http';

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
  console.log('=== VERIFY DOCTOR DIRECTORY & ACCESS BOUNDARY ===\n');
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

  // 1. Verify Public Doctor Directory Route
  const doctorsRes = await fetchRoute('/doctors');
  assert(doctorsRes.status === 200, 'Route /doctors returns HTTP 200');
  assert(doctorsRes.body.includes('Doctor Directory'), '/doctors contains "Doctor Directory" title');
  assert(doctorsRes.body.includes('Consult Verified Medical Specialists'), '/doctors contains "Consult Verified Medical Specialists"');
  assert(doctorsRes.body.includes('Tele-Health &amp; In-Person Specialist Care') || doctorsRes.body.includes('Tele-Health & In-Person Specialist Care'), '/doctors contains Tele-Health subtitle');
  assert(doctorsRes.body.includes('Dr. Rajesh Sharma') || doctorsRes.body.includes('Dr. Priya Patel'), '/doctors renders clinician directory cards');
  assert(!doctorsRes.body.includes('Doctor Access Required'), '/doctors does NOT render "Doctor Access Required"');
  assert(!doctorsRes.body.includes('Access Boundary Check'), '/doctors does NOT render "Access Boundary Check"');
  assert(!doctorsRes.body.includes('Authentication Required'), '/doctors does NOT render "Authentication Required" gate');

  // 2. Verify Public Facilities Directory Route
  const facilitiesRes = await fetchRoute('/facilities');
  assert(facilitiesRes.status === 200, 'Route /facilities returns HTTP 200');
  assert(!facilitiesRes.body.includes('Facility Staff Access Required'), '/facilities does NOT render "Facility Staff Access Required"');
  assert(!facilitiesRes.body.includes('Access Boundary Check'), '/facilities does NOT render "Access Boundary Check"');

  console.log(`\n==================================================`);
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`==================================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTest();
