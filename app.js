// Generate waveform bars
const wf = document.getElementById("waveform");
for (let i = 0; i < 36; i++) {
  const h = 12 + Math.sin(i * 0.45 + 1.5) * 20 + Math.cos(i * 0.8) * 12;
  const bar = document.createElement("div");
  bar.className = "wbar";
  bar.style.height = Math.max(6, Math.min(90, h)) + "%";
  bar.style.opacity = (0.25 + Math.abs(Math.sin(i * 0.3)) * 0.55).toFixed(2);
  wf.appendChild(bar);
}

// Floating sticky button — show after scrolling past hero, hide near waitlist
(function () {
  const sticky = document.getElementById("sticky-cta");
  const hero   = document.querySelector(".hero-wrap");
  const wl     = document.getElementById("waitlist");
  function onScroll() {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const wlTop      = wl.getBoundingClientRect().top;
    const inView     = heroBottom < 0 && wlTop > window.innerHeight * 0.5;
    sticky.classList.toggle("visible", inView);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// Waitlist form
document.getElementById("waitlist-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("waitlist-email").value.trim();
  const btn = document.getElementById("waitlist-btn");
  const msg = document.getElementById("waitlist-msg");

  btn.disabled = true;
  btn.textContent = "Saving...";
  msg.textContent = "";
  msg.className = "email-msg";

  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      msg.textContent = "🎉 You're on the list! We'll let you know when we launch.";
      msg.className = "email-msg success";
      document.getElementById("waitlist-email").value = "";
      btn.textContent = "Done!";
    } else if (res.status === 409) {
      msg.textContent = "You're already registered — we'll be in touch!";
      msg.className = "email-msg success";
      btn.disabled = false;
      btn.textContent = "Notify me";
    } else {
      throw new Error();
    }
  } catch {
    msg.textContent = "Something went wrong. Please try again.";
    msg.className = "email-msg error";
    btn.disabled = false;
    btn.textContent = "Notify me";
  }
});

// Social share links
const pageUrl = encodeURIComponent(window.location.href);
const xText = encodeURIComponent(
  "Just discovered Jot It AI 🎙\n\nRecord a voice memo → get a structured note with AI.\n\n✦ Works with OpenAI, Claude, or Grok — pay pennies, not $99/yr\n✦ 6 writing styles — meetings, journals, blog posts & more\n✦ Auto-extracts tasks to a todo list\n✦ $29.99/year\n\nNo fluff.",
);
const liText = encodeURIComponent(
  "I built Jot It AI — a voice-to-notes app that actually structures your thoughts.\n\nThe problem: voice memos are a graveyard of good ideas. You record them, never revisit them.\n\nThe solution: record anything → Jot It AI transcribes + structures it into a clean note using your own API key.\n\n🔑 Bring Your Own Key — OpenAI, Claude, or Grok. Pay the provider directly, typically pennies per note\n✍️ 6 writing styles: Meeting Notes, Journal, Blog Post, Email Draft & more\n⚡ 3 processing levels: Light (clean transcript) → Full (fully rewritten)\n✅ Smart task extraction — auto-detects action items and adds them to your todo list\n📂 Folders, search, Notion & Markdown export\n💰 $29.99/year — cancel anytime\n\nBuilt for people who think out loud.",
);
document.getElementById("share-x").href =
  `https://twitter.com/intent/tweet?text=${xText}&url=${pageUrl}`;
document.getElementById("share-li").href =
  `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}&summary=${liText}`;

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
