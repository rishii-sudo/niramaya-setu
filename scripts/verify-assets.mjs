import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

async function auditAssets() {
  const aboutHtml = await new Promise((resolve, reject) => {
    http.get('http://localhost:3000/about', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  const matches = [...aboutHtml.matchAll(/src="([^"]+\.svg)"/g)].map(m => m[1]);
  const uniqueSrcs = Array.from(new Set(matches));
  console.log(`Found ${uniqueSrcs.length} unique SVG assets referenced on /about:`);

  let allValid = true;
  for (const src of uniqueSrcs) {
    const diskPath = path.resolve('public' + (src.startsWith('/') ? src : '/' + src));
    const exists = fs.existsSync(diskPath);
    if (!exists) {
      console.error(`[FAIL] Missing asset on disk: ${src} -> ${diskPath}`);
      allValid = false;
    } else {
      const content = fs.readFileSync(diskPath, 'utf8');
      const isValidSvg = content.includes('<svg') && content.includes('</svg>');
      if (!isValidSvg) {
        console.error(`[FAIL] Invalid SVG markup: ${src}`);
        allValid = false;
      } else {
        console.log(`[PASS] ${src} exists and is valid SVG (${content.length} bytes)`);
      }
    }
  }

  if (allValid) {
    console.log('\n[SUCCESS] ALL SVG ASSETS ARE VALID AND PRESENT ON DISK.');
  } else {
    console.error('\n[FAILURE] ONE OR MORE SVG ASSETS FAILED AUDIT.');
    process.exit(1);
  }
}

auditAssets();
