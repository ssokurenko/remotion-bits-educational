# TypeFit — Educational Promo Video

A short, polished promo video for [type.fit](https://type.fit/), an AI-powered touch-typing platform.
The video is generated programmatically with [Remotion](https://www.remotion.dev/) and assembled from animation primitives provided by [`remotion-bits`](https://www.npmjs.com/package/remotion-bits).

The video runs at **3840×2160 (4K UHD) / 60 fps**, scored by a soundtrack that fades out under the final call-to-action, and walks viewers through the product's value proposition across seven scenes:

| # | Scene             | What happens                                                                                       |
|---|-------------------|----------------------------------------------------------------------------------------------------|
| 1 | **Intro**         | `type.fit` wordmark reveal with "Master Touch Typing · with AI-Powered Coaching" + Gemini badge.   |
| 2 | **Problem**       | "How fast do you type?" framing with a slow typing sample and a rising WPM counter.                |
| 3 | **Meet**          | Logo reveal with a tagline and three-pill summary (Practice · Learn · Improve).                    |
| 4 | **Practice**      | Mock `/practice` UI with a quote being typed in strict mode and animated stat counters + confetti. |
| 5 | **Learn**         | A `Scene3D` camera flythrough across the six courses on `/learn`.                                  |
| 6 | **Features**      | Four-card grid: AI Insights · Personalized Paths · Strict Mode · Try for Free.                     |
| 7 | **Call to action**| "Start typing smarter today" with the Apple-style **Start Practicing Now** button.                 |

The visual language deliberately mirrors Apple's Human Interface palette — vibrant radial gradients animate continuously behind every scene, with all text restricted to **white or black** for maximum legibility on bright backgrounds.

## Tech stack

- **Remotion 4.0.465** — React-based programmatic video.
- **remotion-bits 0.2** — animation primitives (`AnimatedText`, `AnimatedCounter`, `Scene3D`, `StaggeredMotion`, `Particles`, `GradientTransition`).
- **React 19** + **TypeScript 5.9**.
- **Tailwind v4** (loaded via `@remotion/tailwind-v4`, mainly for resets — animations are all `interpolate`-driven, never CSS transitions).
- **Inter** + **JetBrains Mono** loaded from Google Fonts via `src/index.css`.

## Project layout

```
src/
├── index.ts                       # Remotion entry point (registerRoot)
├── index.css                      # Tailwind import + Google Fonts + CSS vars
├── Root.tsx                       # Compositions registry (TypeFit only)
└── TypeFit/
    ├── TypeFitVideo.tsx           # Top-level composition; wraps a 1920×1080 stage scaled 2× to 4K
    ├── theme.ts                   # COLORS, fonts, SCENE_TIMINGS, TOTAL_FRAMES
    ├── components/
    │   ├── Background.tsx         # Apple-palette GradientTransition + vignette
    │   ├── Logo.tsx               # `type.fit` wordmark with blinking cursor
    │   └── Keyboard.tsx           # Pixel-perfect keyboard render (unused, reusable)
    └── scenes/
        ├── IntroScene.tsx
        ├── ProblemScene.tsx
        ├── MeetScene.tsx
        ├── PracticeScene.tsx
        ├── LearnScene.tsx
        ├── FeaturesScene.tsx
        └── CTAScene.tsx
```

`src/HelloWorld/*` is the unused starter template — kept around for reference but not registered.

### Timing

All scene timings live in `src/TypeFit/theme.ts` as `SCENE_TIMINGS`:

```ts
// at 60 fps
intro:    { start:    0, duration: 480 }   // 0   – 8.0s
problem:  { start:  480, duration: 300 }   // 8.0 – 13.0s
meet:     { start:  780, duration: 300 }   // 13  – 18.0s
practice: { start: 1080, duration: 420 }   // 18  – 25.0s
learn:    { start: 1500, duration: 540 }   // 25  – 34.0s
features: { start: 2040, duration: 300 }   // 34  – 39.0s
cta:      { start: 2340, duration: 600 }   // 39  – 49.0s
```

`TOTAL_FRAMES = 2940`. The single composition `TypeFit` is registered in `src/Root.tsx`.

### Audio

The score lives at `public/soundtrack.mp3` and is mounted inside `TypeFitVideo.tsx` via Remotion's `<Audio>` component. A `volume={(f) => interpolate(...)}` curve gives a quick fade-in over the first half-second and a longer fade-out over the last `AUDIO_FADE_FRAMES = 180` frames (3 s) so the music tails under the CTA. Swap the file at the same path to change the track; no other code changes required.

## Getting started

### Prerequisites

- **Node 20+**
- **Bun** (the lockfile is `bun.lock`; `npm`/`pnpm` also work)
- macOS / Linux / Windows — Remotion uses headless Chromium under the hood

### Install

```bash
bun install
# or
npm install
```

> **Note**: `culori` is an indirect peer dep used by `remotion-bits`' `GradientTransition` for color interpolation. It's already pinned in `package.json`. If you fork this and see a webpack alias error mentioning `culori`, run `bun add culori`.

### Open the studio

```bash
npx remotion studio
```

This opens the visual editor at `http://localhost:3000`. Pick the **TypeFit** composition from the left sidebar; the player on the right reflects code changes live.

### Render a still frame (fast sanity check)

```bash
npx remotion still TypeFit out/frame.jpg --scale=0.2 --frame=560
```

- `--frame` is 0-based; e.g. `560` ≈ middle of the practice scene.
- `--scale=0.2` renders a smaller preview (3840×2160 × 0.2 = 768×432) — handy when iterating on layout. Drop to `--scale=1` for a true-4K still.

### Render the full video

```bash
# Default (H.264 mp4 at 3840×2160 / 60 fps)
npx remotion render TypeFit out/typefit.mp4

# 4K ProRes for editing pipelines
npx remotion render TypeFit out/typefit.mov --codec=prores --prores-profile=4444

# WebM/VP9 for the web
npx remotion render TypeFit out/typefit.webm --codec=vp9

# Need a 1080p deliverable? Render at half resolution.
npx remotion render TypeFit out/typefit-1080p.mp4 --scale=0.5
```

The bundle step takes ~10–15 s on a modern machine; the actual frame render time depends mostly on the number of `Particles` and `Scene3D` steps in view.

### Lint + type-check

```bash
npm run lint     # eslint + tsc --noEmit
# or, individually:
npx tsc --noEmit
npx eslint src
```

## Editing guide

### Change copy, colors, or timings

- **Copy** lives directly inside each scene file. Most headlines are wrapped in `<AnimatedText>` — replace the children and the `split:"word"` reveal handles the rest.
- **Colors**: `src/TypeFit/theme.ts` exposes `COLORS`. Background palette stages are in `src/TypeFit/components/Background.tsx` as `APPLE_RADIAL_STAGES`.
- **Scene durations**: edit `SCENE_TIMINGS` in `theme.ts` and update `TOTAL_FRAMES` accordingly. Each scene's own internal `useCurrentFrame()` is already scoped by its `<Sequence>`.

### Add a new scene

1. Create `src/TypeFit/scenes/MyScene.tsx`. Use `useCurrentFrame()` for scene-local timing — Remotion zeroes the frame at the parent `<Sequence>`.
2. Add a `SCENE_TIMINGS.myScene` entry in `theme.ts` and bump `TOTAL_FRAMES`.
3. Mount it inside `TypeFitVideo.tsx` with `<Sequence layout="none" from={...} durationInFrames={...}>`.

> **Gotcha**: wrapping non-`AbsoluteFill` content in `<Sequence>` without `layout="none"` introduces an extra `AbsoluteFill`, which will pin children to the top-left. Always pass `layout="none"` for inline content.

### Working with `remotion-bits`

The discovery/fetch CLI is the fastest way to find a building block:

```bash
# Search the registry
npx remotion-bits find "camera flythrough product showcase" --tag scene-3d --json

# Print the full source of one example
npx remotion-bits fetch bit-3d-basic --json
```

The bits this project uses (and where they live):

| Primitive            | Used in                                  |
|----------------------|------------------------------------------|
| `AnimatedText`       | Every scene's headlines/subtitles        |
| `AnimatedCounter`    | `PracticeScene` stat boxes (WPM/Acc/Streak) |
| `GradientTransition` | `components/Background.tsx`              |
| `StaggeredMotion`    | `FeaturesScene` 4-card grid              |
| `Scene3D` + `Step`   | `LearnScene` camera flythrough           |
| `Particles`/`Spawner`/`Behavior` | `PracticeScene` confetti, `CTAScene` rising sparkles |

## Conventions

- **No CSS animations / transitions / Tailwind animation classes** — they don't render frame-by-frame. Use `interpolate`, `spring`, or `Easing` from Remotion.
- **Sizing**: prefer `useViewportRect()` (`rect.vmin`, `rect.width`, ...) over hardcoded pixels for anything inside `Scene3D` so it scales with the composition.
- **Text colors**: white (`#fff`) or black (`#000`) only. Reserve hue for icons, badges, borders, and the background.
- **Sequences**: pass `layout="none"` when you don't want an absolute-fill wrapper.

## Troubleshooting

- **`Field 'browser' doesn't contain a valid alias configuration` mentioning `culori`** — run `bun add culori`.
- **Text inside `AnimatedText` doesn't show up** — gradient text (`background-clip: text; color: transparent`) doesn't propagate through the per-word `<span>`s that `AnimatedText` emits. Use a solid color, or omit the split.
- **Grid items pinned to the top-left of a scene** — you almost certainly wrapped a grid child in `<Sequence>` without `layout="none"`. Move the delay into the child (e.g. via an `opacity` interpolation or `startFrame` prop) instead.
- **Fonts look wrong in the rendered MP4** — the Google Fonts `@import` in `src/index.css` is webpack-bundled, but the network fetch happens at render time. Ensure the render machine has internet access, or vendor the fonts via `@remotion/google-fonts`.

## License

UNLICENSED — internal/demo only. The `type.fit` name, copy, and branding remain the property of their respective owners; this project is a visual exploration, not affiliated with type.fit.
