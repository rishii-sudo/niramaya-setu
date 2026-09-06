# Niramaya Setu — Frontend Security Audit Report

**Date**: September 6, 2026  
**Target Application**: Next.js 16 (App Router) Frontend at `C:\Users\fremi\niramaya-setu`  
**Backend API**: Fastify Backend at `http://localhost:4000/api/v1`  
**Overall Assessment**: **NEEDS HARDENING & SECURE BACKEND INTEGRATION**

---

## 1. Executive Summary

The **Niramaya Setu** frontend is a comprehensive Next.js 16 application featuring detailed workflows for ASHA/ANM workers, Doctors, Health Facilities, and Patients.

However, from an architectural security standpoint:
1. **Frontend Demo Authentication in localStorage**: Currently, authentication checks in `app/utils/auth.ts` and `app/context/RoleContext.tsx` rely on mock string flags in browser `localStorage` (e.g., `localStorage.setItem("niramaya-asha-auth", "demo-authenticated")`).
2. **Mock In-Memory Data**: Patient registrations, referrals, triage records, and facility lists are stored in local static arrays in `app/data/` rather than communicating with the hardened Fastify backend.
3. **No Centralized API Client**: There is no typed API client handling JWT bearer headers, error responses (401, 403, 429), request timeouts, and PII-redacted logging.
4. **Missing Production Security Headers**: `next.config.ts` has empty configuration without Content Security Policy (CSP), HSTS, or Permissions-Policy.

---

## 2. OWASP Top 10 Mapping & Detailed Vulnerability Findings

### A. Broken Access Control (OWASP A01:2021)
* **Finding ID**: **FE-SEC-01** (High)
* **Location**: `app/utils/auth.ts:L3-L35`, `app/context/RoleContext.tsx:L120-L160`
* **Vulnerability**: Route access checks (`isRoleAuthenticated`) read directly from client-editable `localStorage`. Anyone opening browser DevTools can execute `localStorage.setItem("niramaya-admin-auth", "true")` to bypass frontend UI gates.
* **Remediation**: Integrate real backend JWT sessions (`POST /api/v1/auth/login`, `GET /api/v1/auth/me`), store session tokens securely, and treat frontend role checks purely as UX rendering helpers while the backend strictly enforces RBAC.

---

### B. Identification and Authentication Failures (OWASP A07:2021)
* **Finding ID**: **FE-SEC-02** (High)
* **Location**: `app/asha/login/page.tsx`, `app/doctor/login/page.tsx`, `app/facility/login/page.tsx`
* **Vulnerability**: Login pages do not submit credentials to `/api/v1/auth/login`. They use hardcoded PIN verification and set demo keys.
* **Remediation**: Wire the login forms to `POST /api/v1/auth/login` using the centralized API client, receiving and validating JWT bearer tokens.

---

### C. Cryptographic Failures & Sensitive Data in Local Storage (OWASP A02:2021)
* **Finding ID**: **FE-SEC-03** (Medium)
* **Location**: `app/asha/patients/page.tsx`, `app/data/patientData.ts`
* **Vulnerability**: Newly registered patient records and clinical notes are temporarily stored in `localStorage` in plaintext. If an unmanaged tablet is shared among multiple field workers, raw patient data remains readable.
* **Remediation**: Connect patient registration directly to `/api/v1/patients` and use IndexedDB / secure storage for offline sync mutation queues.

---

### D. Security Misconfiguration (OWASP A05:2021)
* **Finding ID**: **FE-SEC-04** (Medium)
* **Location**: `next.config.ts`
* **Vulnerability**: Missing HTTP security headers (CSP, X-Content-Type-Options, X-Frame-Options, Permissions-Policy).
* **Remediation**: Add a robust `headers()` configuration in `next.config.ts`.

---

### E. Insecure Design & Offline Sync Identity Spoofing (OWASP A04:2021)
* **Finding ID**: **FE-SEC-05** (High)
* **Location**: `app/sync/page.tsx`
* **Vulnerability**: Offline sync records in `app/sync/page.tsx` are simulated locally without backend mutation payloads, idempotency UUIDs, or watermarks.
* **Remediation**: Connect `app/sync/page.tsx` to `POST /api/v1/sync/push` and `POST /api/v1/sync/pull` with client-generated mutation UUIDs.

---

## 3. Prioritized Frontend Remediation Plan

1. **Phase B (API Client)**: Create `app/services/apiClient.ts` with base URL, timeout, JWT interceptor, safe error handling, and PII redaction.
2. **Phase C (Auth)**: Connect login forms and session restoration via `apiClient.login()` and `apiClient.getMe()`.
3. **Phase D (Features)**: Connect Patients (`/api/v1/patients`), Triage (`/api/v1/triage`), Facilities (`/api/v1/facilities/match`), Referrals (`/api/v1/referrals`), and ABDM OTP stubs.
4. **Phase E (Offline Sync)**: Connect sync engine to `/api/v1/sync/push` and `/api/v1/sync/pull`.
5. **Phase F (Headers)**: Configure Next.js production security headers in `next.config.ts`.
6. **Phase G (Testing)**: Add automated frontend security tests and run typecheck/build.
