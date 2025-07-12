require('./axios.min.js'); // Inject axios mock

const https = require("https");
const axios = globalThis.axios;

// Disable SSL check for test purposes (optional)
const agent = new https.Agent({ rejectUnauthorized: false });

const target = "https://realtyblocks.com";

// 1. Basic availability test with redirect protection
axios.get(target)
  .then(res => {
    console.log("✅ Site Status:", res.status);
    console.log("🧾 Headers:", res.headers || {});
    console.log("📍 Response:", res.data);
  })
  .catch(err => {
    console.error("❌ Failed to reach site:", err.message);
  });

// 2. Check for security headers (simulated)
axios.get(target)
  .then(res => {
    const securityHeaders = ["content-security-policy", "strict-transport-security", "x-frame-options"];
    securityHeaders.forEach(header => {
      console.log(`🔐 ${header}:`, res.headers?.[header] || "❌ Missing");
    });
  });

// 3. Simulated brute force test
(async () => {
  const loginURL = target + "/login";
  const payloads = [
    { email: "admin@test.com", password: "admin123" },
    { email: "user@example.com", password: "123456" },
    { email: "test@test.com", password: "password" },
  ];

  for (const creds of payloads) {
    try {
      const res = await axios.post(loginURL, creds);
      console.log(`🚪 Tried ${creds.email}:${creds.password} ➜ Status ${res.status}`);
    } catch (err) {
      console.log(`🚪 Tried ${creds.email}:${creds.password} ➜ Failed`);
    }
  }
})();
