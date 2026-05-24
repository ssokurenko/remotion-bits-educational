import React from "react";
import {
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AnimatedText,
  Behavior,
  Particles,
  Spawner,
} from "remotion-bits";
import { FONT_SANS } from "../theme";

const GEMINI_COLORS = ["#4285F4", "#9B72CB", "#D96570", "#F2C94C"];

export const GeminiBadge: React.FC<{ startFrame: number }> = ({
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame;

  const enterSpring = spring({
    frame: local,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.7 },
  });
  const scale = interpolate(enterSpring, [0, 1], [0.6, 1]);
  const blur = interpolate(local, [0, 36], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(local, [0, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 40], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const shineProgress = ((local - 40) % 180) / 180;
  const shineX = interpolate(shineProgress, [0, 1], [-120, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const FIELD_W = 720;
  const FIELD_H = 180;

  return (
    <div
      style={{
        position: "relative",
        width: FIELD_W,
        height: FIELD_H,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
      }}
    >
      <Fireflies width={FIELD_W} height={FIELD_H} startFrame={startFrame} />

      <div
        style={{
          position: "relative",
          padding: "2px",
          borderRadius: 999,
          background: `conic-gradient(from ${local}deg at 50% 50%, ${GEMINI_COLORS[0]}, ${GEMINI_COLORS[1]}, ${GEMINI_COLORS[2]}, ${GEMINI_COLORS[3]}, ${GEMINI_COLORS[0]})`,
          boxShadow:
            "0 10px 40px rgba(66, 133, 244, 0.4), 0 0 28px rgba(155, 114, 203, 0.35)",
        }}
      >
        <div
          style={{
            position: "relative",
            padding: "16px 34px 16px 22px",
            borderRadius: 999,
            background: "rgba(8, 4, 30, 0.78)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT_SANS,
            fontSize: 26,
            fontWeight: 500,
            color: "#fff",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateX(${shineX}%)`,
              background:
                "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <GeminiSparkle size={32} startFrame={startFrame} />

          <span style={{ position: "relative", whiteSpace: "nowrap" }}>
            <AnimatedText
              transition={{
                opacity: [0, 1],
                y: [8, 0],
                split: "word",
                splitStagger: 4,
                frames: [20, 56],
                easing: "easeOutCubic",
              }}
              style={{ fontFamily: FONT_SANS, color: "#fff", fontWeight: 500 }}
            >
              Powered by Google Gemini AI
            </AnimatedText>
          </span>
        </div>
      </div>
    </div>
  );
};

const GeminiSparkle: React.FC<{ size: number; startFrame: number }> = ({
  size,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const rot = interpolate(local, [0, 180], [0, 90], {
    extrapolateRight: "extend",
  });
  const pulse = 0.92 + Math.sin(local * 0.07) * 0.08;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-12 -12 24 24"
      style={{
        transform: `rotate(${rot}deg) scale(${pulse})`,
        flexShrink: 0,
        filter: `drop-shadow(0 0 ${size * 0.4}px ${GEMINI_COLORS[0]}aa)`,
      }}
    >
      <defs>
        <linearGradient id="gem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={GEMINI_COLORS[0]} />
          <stop offset="50%" stopColor={GEMINI_COLORS[1]} />
          <stop offset="100%" stopColor={GEMINI_COLORS[2]} />
        </linearGradient>
      </defs>
      <path
        d="M0,-11 C2,-3 3,-2 11,0 C3,2 2,3 0,11 C-2,3 -3,2 -11,0 C-3,-2 -2,-3 0,-11 Z"
        fill="url(#gem-grad)"
      />
    </svg>
  );
};

const Fireflies: React.FC<{
  width: number;
  height: number;
  startFrame: number;
}> = ({ width, height, startFrame }) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width,
        height,
        pointerEvents: "none",
      }}
    >
      <Sequence from={startFrame - 8} layout="none">
        <Particles>
          <Spawner
            rate={0.3}
            max={18}
            area={{ width, height }}
            position={{ x: width / 2, y: height / 2 }}
            lifespan={140}
            velocity={{ x: 0, y: 0, varianceX: 0.3, varianceY: 0.3 }}
          >
            {GEMINI_COLORS.map((c) => (
              <div
                key={c}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: c,
                  boxShadow: `0 0 12px 3px ${c}cc`,
                }}
              />
            ))}
          </Spawner>
          <Behavior wiggle={{ magnitude: 1.6, frequency: 0.04 }} />
          <Behavior opacity={[0, 1, 0]} />
        </Particles>
      </Sequence>
    </div>
  );
};
