const fs = require("fs");
const files = [
  "package.json",
  "app/services/apiClient.ts",
  "app/utils/auth.ts",
  "app/asha/login/page.tsx",
  "app/doctor/login/page.tsx",
  "app/facility/login/page.tsx",
  "app/admin/login/page.tsx",
  "app/asha/register-patient/page.tsx",
  "app/asha/patients/page.tsx",
  "app/sync/page.tsx",
  "next.config.ts"
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let buf = fs.readFileSync(file);
    if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
      buf = buf.subarray(3);
    }
    fs.writeFileSync(file, buf);
    console.log("Cleaned BOM for:", file);
  }
}
