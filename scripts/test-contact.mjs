#!/usr/bin/env node
/**
 * End-to-end checks for the contact form API against a running server.
 *   npm run build && npm start   (in one terminal)
 *   BASE_URL=http://localhost:3000 npm run test:contact
 *
 * With no email env vars set, a valid submission must return `not_configured`
 * (503) — the site never claims a message was sent when it wasn't.
 */
const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let failed = 0;

function check(name, cond, detail = "") {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
  if (!cond) failed++;
}

async function freshToken() {
  const html = await (await fetch(`${BASE}/contact`)).text();
  const m = html.match(/name="token" value="([^"]+)"/);
  if (!m) throw new Error("Could not find form token on /contact");
  return m[1];
}

const post = (body, headers = { "Content-Type": "application/json" }) =>
  fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers,
    body: headers["Content-Type"] === "application/json" ? JSON.stringify(body) : body,
    redirect: "manual",
  });

const valid = { name: "Test Person", email: "test@example.com", phone: "", message: "Hello, this is a test message.", consent: "yes" };

(async () => {
  let r = await fetch(`${BASE}/api/contact`);
  check("GET is rejected", r.status === 405, `status ${r.status}`);

  r = await post({ ...valid });
  check("missing token rejected", (await r.json()).status === "rejected");

  r = await post({ ...valid, token: "123.abc" });
  check("forged token rejected", (await r.json()).status === "rejected");

  const token = await freshToken();
  r = await post({ ...valid, token });
  check("instant submission flagged too_fast", (await r.json()).status === "too_fast");

  await sleep(3500);

  r = await post({ ...valid, token, website: "http://spam.example" });
  check("honeypot rejected", (await r.json()).status === "rejected");

  r = await post({ token, name: "A", email: "nope", message: "short", consent: "" });
  let j = await r.json();
  check(
    "invalid fields reported",
    r.status === 400 && j.status === "invalid" && j.fieldErrors?.name && j.fieldErrors?.email && j.fieldErrors?.message && j.fieldErrors?.consent,
    JSON.stringify(j.fieldErrors),
  );

  r = await post({ ...valid, token });
  j = await r.json();
  const configured = process.env.EXPECT_CONFIGURED === "1";
  if (configured) check("valid submission sent", r.status === 200 && j.status === "success", j.status);
  else check("valid submission truthfully not_configured", r.status === 503 && j.status === "not_configured", j.message);

  const form = new URLSearchParams({ ...valid, token }).toString();
  r = await post(form, { "Content-Type": "application/x-www-form-urlencoded" });
  const loc = r.headers.get("location") || "";
  check("no-JS form post redirects with status", r.status === 303 && loc.includes("/contact?status="), loc);

  const page = await (await fetch(`${BASE}/contact?status=not_configured`)).text();
  check("no-JS status banner rendered", page.includes("was NOT sent"));

  console.log(failed ? `\n${failed} check(s) failed` : "\nAll contact checks passed");
  process.exit(failed ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
