const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8").replace(/^\uFEFF/, ""));
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n", { encoding: "utf8" });

console.log("Rewrote package.json successfully");
