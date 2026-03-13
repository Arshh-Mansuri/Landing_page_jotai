import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Validate required env vars at startup ───────────────────────────────────
const REQUIRED = ["SUPABASE_URL", "SUPABASE_ANON_KEY"];
const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  console.error("Set them in Railway → your service → Variables tab.");
  process.exit(1);
}

const app = express();

// ─── Security headers ───────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],  // inline styles in HTML (intentional)
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// ─── Rate limiting — /api/subscribe: max 5 requests per IP per 15 min ───────
const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests — please try again later." },
});

app.use(express.json({ limit: "10kb" }));  // cap body size
app.use(express.static(__dirname));

// ─── Supabase client (credentials from env only) ────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ─── Email validation ────────────────────────────────────────────────────────
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
function isValidEmail(email) {
  return (
    typeof email === "string" &&
    email.length > 0 &&
    email.length <= 254 &&
    email.indexOf("@") <= 64 &&
    EMAIL_RE.test(email)
  );
}

// ─── POST /api/subscribe ─────────────────────────────────────────────────────
app.post("/api/subscribe", subscribeLimiter, async (req, res) => {
  const { email } = req.body ?? {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({ email: email.toLowerCase().trim() });

  if (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "already_registered" });
    }
    // Log full error server-side for debugging (never sent to client)
    console.error("[subscribe] db error:", error.code, error.message, error.hint ?? "");
    return res.status(500).json({ error: "Failed to save" });
  }

  res.json({ ok: true });
});

// ─── Fallback ────────────────────────────────────────────────────────────────
app.get("*", (_req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
