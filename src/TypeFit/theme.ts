export const FONT_SANS =
  "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
export const FONT_MONO =
  "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

export const COLORS = {
  bg0: "#0b0820",
  bg1: "#1a0f3a",
  bg2: "#221153",
  text: "#f5f3ff",
  textDim: "#c4b5fd",
  textMuted: "#8b7fb5",
  accent: "#8b5cf6",
  accentSoft: "#a78bfa",
  cyan: "#22d3ee",
  pink: "#f472b6",
  success: "#4ade80",
  error: "#fb7185",
  amber: "#fbbf24",
  cardBg: "rgba(255, 255, 255, 0.04)",
  cardBorder: "rgba(167, 139, 250, 0.28)",
  cardBorderStrong: "rgba(167, 139, 250, 0.6)",
};

export const SCENE_TIMINGS = {
  intro: { start: 0, duration: 480 },
  problem: { start: 480, duration: 300 },
  meet: { start: 780, duration: 300 },
  practice: { start: 1080, duration: 420 },
  learn: { start: 1500, duration: 540 },
  features: { start: 2040, duration: 300 },
  cta: { start: 2340, duration: 600 },
} as const;

export const TOTAL_FRAMES = 2940;
export const AUDIO_FADE_FRAMES = 180;
