const axios = require("axios");
const https = require("https");

// Disable SSL check for test purposes (optional)
const agent = new https.Agent({ rejectUnauthorized: false });

const target = "https://realtyblocks.com";

// 1. Basic availability test
axios.get(target, { httpsAgent: agent })
  .then(res => {
    console.log("✅ Site Status:", res.status);
    console.log("🧾 Headers:", res.headers);
  })
  .catch(err => {
    console.error("❌ Failed to reach site:", err.message);
  });

// 2. Check for security headers
axios.get(target, { httpsAgent: agent })
  .then(res => {
    const securityHeaders = ["content-security-policy", "strict-transport-security", "x-frame-options"];
    securityHeaders.forEach(header => {
      console.log(`🔐 ${header}:`, res.headers[header] || "❌ Missing");
    });
  });

// 3. Basic brute force test (simulated - non-aggressive)
(async () => {
  const loginURL = target + "/login"; // Update with real login endpoint
  const payloads = [
    { email: "admin@test.com", password: "admin123" },
    { email: "user@example.com", password: "123456" },
    { email: "test@test.com", password: "password" },
  ];

  for (const creds of payloads) {
    try {
      const res = await axios.post(loginURL, creds, { httpsAgent: agent });
      console.log(`🚪 Tried ${creds.email}:${creds.password} ➜ Status ${res.status}`);
    } catch (err) {
      console.log(`🚪 Tried ${creds.email}:${creds.password} ➜ Failed`);
    }
  }
})();
