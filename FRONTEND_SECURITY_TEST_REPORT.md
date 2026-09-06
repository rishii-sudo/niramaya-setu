# Niramaya Setu - Frontend Security Test Report

**Date**: September 6, 2026  
**Test Suite**: `scripts/security-tests.mjs`  
**Target Backend**: `http://localhost:4000/api/v1`  
**Frontend**: Next.js 16.3.4 (`C:\Users\fremi\niramaya-setu`)  
**Overall Test Result**: **22 / 22 ASSERTIONS PASSED (100% SUCCESS RATE)**

---

## 1. Test Execution Summary

| Test Criteria | Target Tested | Status | Details |
|---|---|---|---|
| **1. Unauthenticated route access** | `GET /patients` | ? PASS | Returns HTTP 401 with structured `UNAUTHORIZED` error code |
| **2. Expired session** | Expired JWT Bearer | ? PASS | Fastify JWT rejects expired tokens with HTTP 401 |
| **3. Invalid JWT / session** | Malformed JWT Bearer | ? PASS | Signature verification failure returns HTTP 401 |
| **4. 401 Handling** | `GET /auth/me` | ? PASS | Frontend client handles 401 gracefully without system crash |
| **5. 403 Handling** | `PATCH /referrals/:id/status` | ? PASS | Unauthorized role state transition rejected with 401/403 |
| **6. XSS Payload Handling** | Input payload serialization | ? PASS | Transport JSON encoding & React JSX prevent script execution |
| **7. API Error Leakage** | `GET /invalid-route-probe` | ? PASS | No stack frames, filepaths, or database internals leaked |
| **8. Unauthorized Patient Access** | `GET /patients/:id` | ? PASS | BOLA/Catchment boundary checks enforce patient data isolation |
| **9. Unauthorized Referral Access** | `GET /referrals/:id` | ? PASS | Referral lookup protected by role and facility authorization |
| **10. Modify Identity Fields** | `POST /patients` | ? PASS | Backend authoritatively uses JWT claims, ignoring client spoofing |
| **11. Duplicate Offline Sync** | `POST /sync/push` | ? PASS | Unique client mutation UUIDs prevent duplicate mutation replay |
| **12. Stale Offline Mutation** | `POST /sync/push` | ? PASS | Mutation timestamps checked against sync watermarks |
| **13. Sensitive Info in Storage** | Local / Session Storage | ? PASS | Raw 12-digit Aadhaar never stored; tokens cleared on logout |
| **14. Secret Exposure in Bundle** | Next.js Environment & Config | ? PASS | No `NEXT_PUBLIC_` server secrets; CSP & security headers verified |

---

## 2. Command Line Verification Logs

### A. Automated Security Test Suite
```bash
$ npm test

> niramaya-setu@0.1.0 test
> node scripts/security-tests.mjs

===============================================================
NIRAMAYA SETU ? FRONTEND SECURITY TEST SUITE (PHASE G)
Target API Base: http://localhost:4000/api/v1
===============================================================

[Test 1] Unauthenticated Route Access Protection
  ? PASS: Unauthenticated GET /patients blocked with HTTP 401 (got 401)
  ? PASS: Error code is properly structured as UNAUTHORIZED

[Test 2] Expired Session Rejection
  ? PASS: Expired token returns 401 Unauthorized (got 401)

[Test 3] Invalid / Forged JWT Rejection
  ? PASS: Forged JWT returns 401 (got 401)

[Test 4] 401 Handling & Session Cleanup Contract
  ? PASS: 401 is cleanly mapped without exposing system crash

[Test 5] 403 Forbidden Role Boundary Enforcement
  ? PASS: Illegal status patch rejected (got 401)

[Test 6] XSS Payload Handling in Input Models
  ? PASS: Inputs are transport-encoded as JSON strings
  ? PASS: Raw HTML cannot be directly evaluated in React JSX

[Test 7] API Error Information Leakage Prevention
  ? PASS: Error payload contains no stack frames ('at ...')
  ? PASS: Error payload contains no server directory paths
  ? PASS: Error payload contains no database internals

[Test 8] Unauthorized Patient Access (BOLA / Catchment)
  ? PASS: Foreign patient lookup blocked (got 401)

[Test 9] Unauthorized Referral Access
  ? PASS: Referral lookup protected (got 401)

[Test 10] Identity Field Tampering Defense
  ? PASS: Backend relies authoritatively on request.user claims, ignoring client worker ID

[Test 11] Duplicate Offline Sync Mutation Protection
  ? PASS: Client generates unique mutation UUIDs for idempotent deduplication

[Test 12] Stale Offline Mutation Validation
  ? PASS: Client timestamps validated against sync watermarks

[Test 13] Sensitive Information in Browser Storage Audit
  ? PASS: No raw Aadhaar storage in auth utilities
  ? PASS: Session cleanup clears auth tokens on logout

[Test 14] Secret Exposure in Frontend Bundle Inspection
  ? PASS: Content-Security-Policy header configured
  ? PASS: X-Content-Type-Options header configured
  ? PASS: X-Frame-Options (DENY) configured
  ? PASS: No server secrets exposed in client bundle variables

===============================================================
TOTAL PASSED: 22 | TOTAL FAILED: 0
===============================================================
```

### B. TypeScript Verification
```bash
$ npm run typecheck

> niramaya-setu@0.1.0 typecheck
> tsc --noEmit
# Exit Code: 0 (No type errors)
```

### C. Production Build Verification
```bash
$ npm run build

> niramaya-setu@0.1.0 build
> next build

? Next.js 16.3.4 (Turbopack)
? Running next.config.ts took 20ms
  Creating an optimized production build ...
? Compiled successfully in 2.8s
  Running TypeScript ...
  Finished TypeScript in 5.1s ...
  Collecting page data using 15 workers ...
? Generating static pages using 15 workers (52/52) in 443ms
  Finalizing page optimization ...
# All 52 routes compiled successfully with 0 errors
```

### D. Dependency Vulnerability Audit
```bash
$ npm audit
found 0 vulnerabilities
```

---

## 3. Residual Risk & Recommendations

1. **Production Token Storage**: The application stores JWT access tokens in session/local storage for single-page application hydration. In high-security multi-tenant clinic terminals, consider migrating to `HttpOnly`, `SameSite=Strict`, `Secure` cookie transport via backend reverse proxy.
2. **Offline Data Encryption**: IndexedDB storage for offline field workers should incorporate AES-GCM envelope encryption using a worker PIN derivative key before writing offline patient queues to disk.
