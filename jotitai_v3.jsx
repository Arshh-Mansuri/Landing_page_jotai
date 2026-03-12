import { useState } from "react";

const SCREENS = {
  HOME: "home",
  FOLDERS: "folders",
  RECORDING: "recording",
  POST_PROCESS: "post_process",
  NOTE: "note",
  SETTINGS: "settings",
};

const folders = [
  { id: "all", name: "All Notes", count: 12, icon: "📒", color: "#d97706" },
  { id: "business", name: "Business", count: 4, icon: "💼", color: "#b45309" },
  { id: "journal", name: "Journal", count: 3, icon: "📝", color: "#92400e" },
  { id: "work", name: "Work", count: 3, icon: "🏢", color: "#78716c" },
  { id: "content", name: "Content Ideas", count: 2, icon: "✨", color: "#a16207" },
];

const writingStyles = [
  { id: "clean", label: "Simple & Clear", icon: "✦" },
  { id: "meeting", label: "Meeting Notes", icon: "◎" },
  { id: "journal", label: "Journal Entry", icon: "◈" },
  { id: "bullets", label: "Bullet Points", icon: "◆" },
  { id: "email", label: "Email Draft", icon: "▣" },
  { id: "blog", label: "Blog Post", icon: "◇" },
];

const mockNotes = [
  {
    id: 1, title: "Product launch ideas",
    preview: "Need to finalize the landing page copy and set up the email sequence for early adopters...",
    time: "2m ago", duration: "1:42", folder: "Business",
  },
  {
    id: 2, title: "Weekly reflection",
    preview: "This week went well overall. Shipped the transcription pipeline and got positive feedback...",
    time: "3h ago", duration: "3:15", folder: "Journal",
  },
  {
    id: 3, title: "Meeting notes — design sync",
    preview: "Discussed the new onboarding flow. Key decision: keep it to 2 screens max...",
    time: "Yesterday", duration: "5:30", folder: "Work",
  },
  {
    id: 4, title: "Blog post draft — BYOK model",
    preview: "Why every voice app charges $99/year and how BYOK changes the economics...",
    time: "2d ago", duration: "4:12", folder: "Content Ideas",
  },
  {
    id: 5, title: "App Store submission checklist",
    preview: "Privacy policy URL, screenshots for 6.7 inch and 5.5 inch, keywords research...",
    time: "3d ago", duration: "2:08", folder: "Business",
  },
];

const structuredNote = {
  title: "Product launch ideas",
  summary: "Planning the launch sequence for Jot It AI, focusing on early adopter acquisition through a limited-time discount and email-driven engagement.",
  sections: [
    { heading: "Landing Page", content: "Finalize copy emphasizing the BYOK model and lifetime pricing. Add a comparison table showing annual costs vs competitors. Include demo video showing the voice-to-text flow." },
    { heading: "Launch Strategy", content: "Offer first 100 users a $19.99 early bird price. Set up a 48-hour countdown timer. Post on Product Hunt, Hacker News, and r/SideProject simultaneously." },
    { heading: "Action Items", content: "→ Record demo video by Thursday\n→ Set up LemonSqueezy payment page\n→ Draft Product Hunt listing\n→ Prepare 3 Twitter threads for launch week" },
  ],
};

// ========== WARM PALETTE ==========
const C = {
  bg: "#faf7f2",
  bgDeep: "#f3efe8",
  bgCard: "#ffffff",
  bgHover: "#f5f1eb",
  accent: "#c2410c",
  accentLight: "#ea580c",
  accentBg: "rgba(194,65,12,0.06)",
  accentBorder: "rgba(194,65,12,0.12)",
  accentSoft: "#fff7ed",
  text: "#1c1917",
  textSecondary: "#78716c",
  textMuted: "#a8a29e",
  border: "rgba(28,25,23,0.07)",
  borderLight: "rgba(28,25,23,0.04)",
};

export default function JotItAI() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [selectedStyle, setSelectedStyle] = useState("clean");
  const [rewriteLevel, setRewriteLevel] = useState(2);

  const StatusBar = ({ dark }) => (
    <div style={{
      height: 50, padding: "12px 28px 0",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      position: "relative", zIndex: 10,
    }}>
      <span style={{ color: dark ? "#fff" : C.text, fontSize: 15, fontWeight: 600, fontFamily: "'SF Pro Display', system-ui" }}>9:41</span>
      <div style={{
        position: "absolute", left: "50%", top: 6, transform: "translateX(-50%)",
        width: 120, height: 32, borderRadius: 20, background: dark ? "#000" : "#1c1917",
      }} />
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={dark ? "white" : C.text}>
          <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/>
          <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/>
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" opacity="0.8"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill={dark ? "white" : C.text}>
          <rect x="0" y="0" width="22" height="12" rx="3" stroke={dark ? "white" : C.text} strokeWidth="1" fill="none"/>
          <rect x="1.5" y="1.5" width="16" height="9" rx="1.5"/>
          <rect x="23" y="3.5" width="2" height="5" rx="1" opacity="0.4"/>
        </svg>
      </div>
    </div>
  );

  const BackButton = ({ onClick, dark }) => (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={dark ? "#ddd" : C.textSecondary} strokeWidth="2.2" strokeLinecap="round">
        <path d="M19 12H5m7-7-7 7 7 7"/>
      </svg>
    </button>
  );

  const PhoneFrame = ({ children, dark }) => (
    <div style={{
      width: 375, height: 812, borderRadius: 44,
      background: dark ? "#1c1917" : C.bg,
      position: "relative", overflow: "hidden",
      boxShadow: "0 40px 80px rgba(28,25,23,0.15), 0 0 0 1px rgba(28,25,23,0.08)",
    }}>
      <StatusBar dark={dark} />
      {children}
    </div>
  );

  // ========== HOME ==========
  const HomeScreen = () => (
    <PhoneFrame>
      <div style={{ height: "calc(100% - 50px)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "4px 22px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h1 style={{
              fontSize: 27, fontWeight: 700, color: C.text, margin: 0,
              fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.3px",
            }}>
              jot it <span style={{ color: C.accent, fontWeight: 400, fontStyle: "italic" }}>ai</span>
            </h1>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setScreen(SCREENS.FOLDERS)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 6,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
              <button onClick={() => setScreen(SCREENS.SETTINGS)} style={{
                background: "none", border: "none", cursor: "pointer", padding: 6,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Credits — warm minimal */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "9px 14px", borderRadius: 10, marginBottom: 14,
            background: C.accentSoft, border: `1px solid ${C.accentBorder}`,
          }}>
            <span style={{ color: C.textSecondary, fontSize: 12, fontFamily: "system-ui" }}>API credits</span>
            <span style={{ color: C.accent, fontSize: 13, fontWeight: 700, fontFamily: "'SF Mono', monospace" }}>$4.82</span>
          </div>

          {/* Search */}
          <div style={{
            background: C.bgCard, borderRadius: 12, padding: "11px 14px",
            display: "flex", alignItems: "center", gap: 10,
            border: `1px solid ${C.border}`,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{ color: C.textMuted, fontSize: 14, fontFamily: "system-ui" }}>Search notes...</span>
          </div>
        </div>

        {/* Notes */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.2px", fontFamily: "system-ui" }}>Recent</span>
          </div>
          {mockNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => setScreen(SCREENS.NOTE)}
              style={{
                width: "100%", textAlign: "left", cursor: "pointer",
                background: C.bgCard, border: `1px solid ${C.borderLight}`,
                borderRadius: 14, padding: "14px 16px", marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                <h3 style={{
                  color: C.text, fontSize: 15, fontWeight: 600, margin: 0,
                  fontFamily: "'Georgia', serif", flex: 1, marginRight: 12,
                }}>{note.title}</h3>
                <span style={{ color: C.textMuted, fontSize: 11, whiteSpace: "nowrap", fontFamily: "system-ui" }}>{note.time}</span>
              </div>
              <p style={{
                color: C.textSecondary, fontSize: 13, margin: "0 0 10px", lineHeight: 1.55,
                fontFamily: "system-ui",
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
              }}>{note.preview}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 5,
                  background: C.accentBg, color: C.accent,
                  fontFamily: "system-ui",
                }}>{note.folder}</span>
                <span style={{ color: C.textMuted, fontSize: 11, fontFamily: "system-ui" }}>{note.duration}</span>
              </div>
            </button>
          ))}
          <div style={{ height: 90 }} />
        </div>

        {/* Record FAB */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
          <button onClick={() => setScreen(SCREENS.RECORDING)} style={{
            width: 62, height: 62, borderRadius: "50%",
            background: C.accent, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 6px 20px rgba(194,65,12,0.3), 0 0 0 5px rgba(194,65,12,0.08)`,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <rect x="9" y="1" width="6" height="14" rx="3"/>
              <path d="M5 10a7 7 0 0 0 14 0" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="19" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </PhoneFrame>
  );

  // ========== FOLDERS ==========
  const FoldersScreen = () => (
    <PhoneFrame>
      <div style={{ height: "calc(100% - 50px)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px 22px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BackButton onClick={() => setScreen(SCREENS.HOME)} />
            <h1 style={{ color: C.text, fontSize: 20, fontWeight: 700, margin: 0, fontFamily: "'Georgia', serif" }}>Folders</h1>
          </div>
          <button style={{
            background: C.accentBg, border: `1px solid ${C.accentBorder}`,
            borderRadius: 8, padding: "6px 12px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14m-7-7h14"/>
            </svg>
            <span style={{ color: C.accent, fontSize: 12, fontWeight: 600, fontFamily: "system-ui" }}>New</span>
          </button>
        </div>

        <div style={{ flex: 1, padding: "0 22px" }}>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setScreen(SCREENS.HOME)}
              style={{
                width: "100%", textAlign: "left", cursor: "pointer",
                background: C.bgCard, border: `1px solid ${C.borderLight}`,
                borderRadius: 14, padding: "16px 18px", marginBottom: 8,
                display: "flex", alignItems: "center", gap: 14,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: C.accentSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>{folder.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  color: C.text, fontSize: 15, fontWeight: 600, margin: 0,
                  fontFamily: "'Georgia', serif",
                }}>{folder.name}</h3>
                <span style={{ color: C.textMuted, fontSize: 12, fontFamily: "system-ui" }}>
                  {folder.count} {folder.count === 1 ? "note" : "notes"}
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          ))}

          {/* Folder stats */}
          <div style={{
            marginTop: 20, padding: "16px 18px", borderRadius: 14,
            background: C.bgDeep, textAlign: "center",
          }}>
            <span style={{ color: C.textMuted, fontSize: 12, fontFamily: "system-ui" }}>
              12 notes across 4 folders
            </span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );

  // ========== RECORDING ==========
  const RecordingScreen = () => (
    <PhoneFrame dark>
      <div style={{
        height: "calc(100% - 50px)", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "space-between", padding: "20px 24px 40px",
      }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
          <BackButton onClick={() => setScreen(SCREENS.HOME)} dark />
        </div>

        <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 44 }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#ef4444",
              animation: "blink 1.2s ease-in-out infinite",
            }} />
            <span style={{ color: "#a8a29e", fontSize: 13, fontWeight: 500, letterSpacing: "1.5px", textTransform: "uppercase", fontFamily: "system-ui" }}>
              Recording
            </span>
          </div>

          {/* Warm waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: 2.5, marginBottom: 36, height: 64 }}>
            {Array.from({ length: 40 }).map((_, i) => {
              const h = 12 + Math.sin(i * 0.45 + 1.5) * 22 + Math.cos(i * 0.8) * 14;
              return (
                <div key={i} style={{
                  width: 2.5, borderRadius: 3,
                  height: `${Math.max(6, Math.min(95, h))}%`,
                  background: `linear-gradient(180deg, #ea580c 0%, #c2410c 100%)`,
                  opacity: 0.3 + Math.sin(i * 0.25) * 0.4,
                }} />
              );
            })}
          </div>

          <div style={{
            fontSize: 54, fontWeight: 200, color: "#fafaf9",
            fontFamily: "system-ui", letterSpacing: "4px",
            fontVariantNumeric: "tabular-nums",
          }}>1:42</div>
        </div>

        <button onClick={() => setScreen(SCREENS.POST_PROCESS)} style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.1)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 26, height: 26, borderRadius: 6, background: "#ef4444" }} />
        </button>

        <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.15} }`}</style>
      </div>
    </PhoneFrame>
  );

  // ========== POST-PROCESSING ==========
  const PostProcessScreen = () => (
    <PhoneFrame>
      <div style={{
        height: "calc(100% - 50px)", display: "flex", flexDirection: "column",
        padding: "16px 22px 28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <BackButton onClick={() => setScreen(SCREENS.RECORDING)} />
          <span style={{ color: C.textMuted, fontSize: 13, fontFamily: "system-ui" }}>1:42 recorded</span>
        </div>

        <h2 style={{
          color: C.text, fontSize: 21, fontWeight: 700, margin: "0 0 4px",
          fontFamily: "'Georgia', serif",
        }}>How should I write this?</h2>
        <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 24px", fontFamily: "system-ui" }}>
          Pick a style and processing level
        </p>

        {/* Processing level */}
        <div style={{ marginBottom: 24 }}>
          <span style={{ color: C.textSecondary, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 10, fontFamily: "system-ui" }}>
            Processing
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {[
              { level: 0, label: "Light", desc: "Clean transcript" },
              { level: 1, label: "Medium", desc: "Structured" },
              { level: 2, label: "Full", desc: "Rewritten" },
            ].map((item) => (
              <button key={item.level} onClick={() => setRewriteLevel(item.level)} style={{
                flex: 1, padding: "13px 10px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                background: rewriteLevel === item.level ? C.accentSoft : C.bgCard,
                border: `1.5px solid ${rewriteLevel === item.level ? C.accentBorder : C.border}`,
              }}>
                <div style={{
                  color: rewriteLevel === item.level ? C.accent : C.textSecondary,
                  fontSize: 14, fontWeight: 600, marginBottom: 2, fontFamily: "system-ui",
                }}>{item.label}</div>
                <div style={{
                  color: rewriteLevel === item.level ? C.accentLight : C.textMuted,
                  fontSize: 11, fontFamily: "system-ui",
                }}>{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Writing styles */}
        <div style={{ marginBottom: 24 }}>
          <span style={{ color: C.textSecondary, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 10, fontFamily: "system-ui" }}>
            Style
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {writingStyles.map((style) => (
              <button key={style.id} onClick={() => setSelectedStyle(style.id)} style={{
                padding: "9px 14px", borderRadius: 10, cursor: "pointer",
                background: selectedStyle === style.id ? C.accentSoft : C.bgCard,
                border: `1.5px solid ${selectedStyle === style.id ? C.accentBorder : C.border}`,
                display: "flex", alignItems: "center", gap: 7,
              }}>
                <span style={{ fontSize: 13 }}>{style.icon}</span>
                <span style={{
                  color: selectedStyle === style.id ? C.accent : C.textSecondary,
                  fontSize: 13, fontWeight: 500, fontFamily: "system-ui",
                }}>{style.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Folder + Language */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <div style={{
            flex: 1, padding: "12px 14px", borderRadius: 12,
            background: C.bgCard, border: `1px solid ${C.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: C.textSecondary, fontSize: 13, fontFamily: "system-ui" }}>Folder</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: C.text, fontSize: 13, fontFamily: "system-ui" }}>Business</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
          <div style={{
            flex: 1, padding: "12px 14px", borderRadius: 12,
            background: C.bgCard, border: `1px solid ${C.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: C.textSecondary, fontSize: 13, fontFamily: "system-ui" }}>Language</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ color: C.text, fontSize: 13, fontFamily: "system-ui" }}>English</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <button onClick={() => setScreen(SCREENS.NOTE)} style={{
          width: "100%", padding: "15px 0", borderRadius: 14,
          background: C.accent, border: "none", cursor: "pointer",
          color: "#fff", fontSize: 16, fontWeight: 600,
          fontFamily: "system-ui",
          boxShadow: "0 4px 14px rgba(194,65,12,0.25)",
        }}>
          Generate Note
        </button>
      </div>
    </PhoneFrame>
  );

  // ========== NOTE ==========
  const NoteScreen = () => (
    <PhoneFrame>
      <div style={{ height: "calc(100% - 50px)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px 22px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <BackButton onClick={() => setScreen(SCREENS.HOME)} />
          <div style={{ display: "flex", gap: 14 }}>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="1.8" strokeLinecap="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
              </svg>
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.textSecondary} strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/>
              </svg>
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 22px" }}>
          <h1 style={{
            color: C.text, fontSize: 22, fontWeight: 700, margin: "0 0 10px",
            fontFamily: "'Georgia', serif", lineHeight: 1.3,
          }}>{structuredNote.title}</h1>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 5,
              background: C.accentBg, color: C.accent, fontFamily: "system-ui",
            }}>Business</span>
            <span style={{ color: C.textMuted, fontSize: 12, fontFamily: "system-ui" }}>1:42</span>
            <span style={{ color: C.borderLight }}>·</span>
            <span style={{ color: C.textMuted, fontSize: 12, fontFamily: "system-ui" }}>Simple & Clear</span>
          </div>

          {/* Audio player — warm */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 22,
            padding: "11px 14px", borderRadius: 12,
            background: C.accentSoft, border: `1px solid ${C.accentBorder}`,
          }}>
            <button style={{
              width: 32, height: 32, borderRadius: "50%", background: C.accent,
              border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21"/></svg>
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ height: 3, background: "rgba(194,65,12,0.1)", borderRadius: 3 }}>
                <div style={{ width: "0%", height: "100%", background: C.accent, borderRadius: 3 }} />
              </div>
            </div>
            <span style={{ color: C.textMuted, fontSize: 11, fontFamily: "monospace", flexShrink: 0 }}>1:42</span>
          </div>

          {/* Summary */}
          <div style={{
            padding: "14px 16px", borderRadius: 12, marginBottom: 22,
            background: "#fefce8", borderLeft: "3px solid #eab308",
          }}>
            <span style={{
              color: "#a16207", fontSize: 10, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "1.5px", display: "block", marginBottom: 6, fontFamily: "system-ui",
            }}>Summary</span>
            <p style={{
              color: "#78716c", fontSize: 14, lineHeight: 1.65, margin: 0, fontFamily: "system-ui",
            }}>{structuredNote.summary}</p>
          </div>

          {/* Sections */}
          {structuredNote.sections.map((section, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h3 style={{
                color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 6px",
                fontFamily: "'Georgia', serif",
              }}>{section.heading}</h3>
              <p style={{
                color: C.textSecondary, fontSize: 14, lineHeight: 1.7, margin: 0,
                fontFamily: "system-ui", whiteSpace: "pre-line",
              }}>{section.content}</p>
            </div>
          ))}

          {/* Transcript toggle */}
          <button style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer", padding: "10px 0",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
            <span style={{ color: C.textMuted, fontSize: 13, fontFamily: "system-ui" }}>View original transcript</span>
          </button>

          {/* Append button */}
          <button style={{
            width: "100%", padding: "12px 0", borderRadius: 12, marginTop: 8, marginBottom: 12,
            background: C.accentSoft, border: `1px solid ${C.accentBorder}`,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14m-7-7h14"/>
            </svg>
            <span style={{ color: C.accent, fontSize: 13, fontWeight: 600, fontFamily: "system-ui" }}>Append to note</span>
          </button>

          {/* Export row */}
          <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
            {["Copy", "Notion", "Markdown"].map((label) => (
              <button key={label} style={{
                flex: 1, padding: "11px 0", borderRadius: 10,
                background: C.bgCard, border: `1px solid ${C.border}`,
                color: C.textSecondary, fontSize: 12, fontWeight: 500, cursor: "pointer",
                fontFamily: "system-ui",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );

  // ========== SETTINGS ==========
  const SettingsScreen = () => (
    <PhoneFrame>
      <div style={{ height: "calc(100% - 50px)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "8px 22px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <BackButton onClick={() => setScreen(SCREENS.HOME)} />
          <h1 style={{ color: C.text, fontSize: 20, fontWeight: 700, margin: 0, fontFamily: "'Georgia', serif" }}>Settings</h1>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 22px" }}>
          {/* Plan */}
          <div style={{
            padding: "16px 18px", borderRadius: 14, marginBottom: 22,
            background: C.accentSoft, border: `1px solid ${C.accentBorder}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <span style={{ color: C.accent, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", fontFamily: "system-ui" }}>Free Plan</span>
                <p style={{ color: C.textSecondary, fontSize: 12, margin: "3px 0 0", fontFamily: "system-ui" }}>3 of 5 notes used</p>
              </div>
              <button style={{
                background: C.accent, border: "none", borderRadius: 8,
                padding: "8px 14px", color: "#fff", fontSize: 12,
                fontWeight: 600, cursor: "pointer", fontFamily: "system-ui",
              }}>$29.99 Lifetime</button>
            </div>
            <div style={{ height: 3, background: "rgba(194,65,12,0.1)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: "60%", height: "100%", background: C.accent, borderRadius: 3 }} />
            </div>
          </div>

          {/* API */}
          <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 10, fontFamily: "system-ui" }}>API Key</span>

          <div style={{
            padding: "14px 16px", borderRadius: 12, marginBottom: 8,
            background: C.bgCard, border: `1px solid ${C.border}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ color: C.text, fontSize: 13, fontWeight: 500, fontFamily: "system-ui" }}>OpenAI</span>
              <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 4,
                background: "rgba(22,163,74,0.08)", color: "#16a34a", fontWeight: 600, fontFamily: "system-ui",
              }}>Connected</span>
            </div>
            <div style={{
              background: C.bgDeep, borderRadius: 8, padding: "9px 12px",
              fontFamily: "monospace", fontSize: 12, color: C.textMuted,
            }}>sk-proj-••••••••••••••LmT3</div>
          </div>

          <div style={{
            padding: "13px 16px", borderRadius: 12, marginBottom: 22,
            background: C.bgCard, border: `1px solid ${C.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: C.textSecondary, fontSize: 13, fontFamily: "system-ui" }}>Remaining credits</span>
            <span style={{ color: C.accent, fontSize: 14, fontWeight: 700, fontFamily: "'SF Mono', monospace" }}>$4.82</span>
          </div>

          {/* Preferences */}
          <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", display: "block", marginBottom: 10, fontFamily: "system-ui" }}>Preferences</span>

          {[
            { label: "Transcription model", value: "GPT-4o Mini" },
            { label: "Default style", value: "Simple & Clear" },
            { label: "Default folder", value: "All Notes" },
            { label: "Language", value: "English" },
            { label: "Export format", value: "Markdown" },
            { label: "Auto-tag notes", value: "On" },
            { label: "Special words", value: "3 words" },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "13px 16px", borderRadius: 12,
              background: C.bgCard, border: `1px solid ${C.border}`,
              marginBottom: 6, display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ color: C.text, fontSize: 13, fontFamily: "system-ui" }}>{item.label}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: C.textSecondary, fontSize: 13, fontFamily: "system-ui" }}>{item.value}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2.5" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          ))}
          <div style={{ height: 30 }} />
        </div>
      </div>
    </PhoneFrame>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #f5f0e8 0%, #ebe4d8 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "48px 20px", gap: 32, flexWrap: "wrap",
    }}>
      {/* Nav */}
      <div style={{
        position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 2, background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        borderRadius: 10, padding: 3, zIndex: 100,
        border: "1px solid rgba(28,25,23,0.08)",
        boxShadow: "0 2px 8px rgba(28,25,23,0.06)",
      }}>
        {[
          { key: SCREENS.HOME, label: "Home" },
          { key: SCREENS.FOLDERS, label: "Folders" },
          { key: SCREENS.RECORDING, label: "Record" },
          { key: SCREENS.POST_PROCESS, label: "Process" },
          { key: SCREENS.NOTE, label: "Note" },
          { key: SCREENS.SETTINGS, label: "Settings" },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setScreen(key)} style={{
            padding: "7px 12px", borderRadius: 7, border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 500, fontFamily: "system-ui",
            background: screen === key ? "rgba(194,65,12,0.08)" : "transparent",
            color: screen === key ? C.accent : "#a8a29e",
          }}>{label}</button>
        ))}
      </div>

      {screen === SCREENS.HOME && <HomeScreen />}
      {screen === SCREENS.FOLDERS && <FoldersScreen />}
      {screen === SCREENS.RECORDING && <RecordingScreen />}
      {screen === SCREENS.POST_PROCESS && <PostProcessScreen />}
      {screen === SCREENS.NOTE && <NoteScreen />}
      {screen === SCREENS.SETTINGS && <SettingsScreen />}
    </div>
  );
}
