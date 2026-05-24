import React from "react";
import {
  AbsoluteFill,
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
  resolvePoint,
  Spawner,
} from "remotion-bits";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme";
import { useStageRect } from "../hooks/useStageRect";
import { TypeFitLogo } from "../components/Logo";

const KeyboardIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size * 0.72}
    viewBox="0 0 24 17"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="1" width="22" height="15" rx="2.5" />
    <path d="M5 6h.01M9 6h.01M13 6h.01M17 6h.01M19 6h.01M5 10h.01M9 10h.01M13 10h.01M17 10h.01M19 10h.01M8 13h8" />
  </svg>
);

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rect = useStageRect();

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.6 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(frame, [0, 36], [0, 1], {
    extrapolateRight: "clamp",
  });

  const buttonStart = 120;
  const buttonSpring = spring({
    frame: frame - buttonStart,
    fps,
    config: { damping: 14, stiffness: 130 },
  });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.85, 1]);
  const buttonOpacity = interpolate(frame, [buttonStart, buttonStart + 30], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const buttonPulse = 1 + Math.sin((frame - buttonStart) * 0.075) * 0.02;
  const arrowShift = Math.sin((frame - buttonStart) * 0.09) * 6;

  const urlOpacity = interpolate(frame, [170, 210], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [170, 210], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_SANS,
      }}
    >
      <Sequence from={0}>
        <Particles>
          <Spawner
            rate={0.6}
            position={resolvePoint(rect, { x: "center", y: "110%" })}
            area={{ width: rect.width, height: 0 }}
            velocity={{
              x: 0,
              y: -rect.height * 0.006,
              varianceX: rect.width * 0.0015,
              varianceY: rect.height * 0.0025,
            }}
            lifespan={360}
            max={80}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: COLORS.cyan,
                boxShadow: `0 0 8px ${COLORS.cyan}`,
              }}
            />
            <div
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: COLORS.accentSoft,
                boxShadow: `0 0 6px ${COLORS.accentSoft}`,
              }}
            />
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: COLORS.pink,
                boxShadow: `0 0 10px ${COLORS.pink}`,
              }}
            />
          </Spawner>
          <Behavior opacity={[0, 1, 0]} />
        </Particles>
      </Sequence>

      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 30,
        }}
      >
        <TypeFitLogo size={120} />
      </div>

      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: -3,
          textAlign: "center",
          lineHeight: 1,
          marginBottom: 24,
          color: COLORS.text,
        }}
      >
        <AnimatedText
          transition={{
            opacity: [0, 1],
            y: [30, 0],
            blur: [10, 0],
            split: "word",
            splitStagger: 4,
            frames: [40, 100],
            easing: "easeOutCubic",
          }}
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 900,
            color: COLORS.text,
          }}
        >
          Start typing smarter today.
        </AnimatedText>
      </div>

      <div
        style={{
          marginTop: 50,
          opacity: buttonOpacity,
          transform: `scale(${buttonScale * buttonPulse})`,
        }}
      >
        <div
          style={{
            padding: "26px 56px",
            borderRadius: 22,
            background: "#1E55E0",
            color: "#fff",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: -0.5,
            display: "flex",
            alignItems: "center",
            gap: 18,
            boxShadow:
              "0 12px 32px rgba(30, 85, 224, 0.45), 0 2px 0 rgba(0,0,0,0.08)",
            fontFamily: FONT_SANS,
          }}
        >
          <KeyboardIcon size={42} />
          Start Practicing Now
          <span
            style={{
              transform: `translateX(${arrowShift}px)`,
              fontSize: 38,
              lineHeight: 1,
              fontWeight: 500,
            }}
          >
            →
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
          fontFamily: FONT_MONO,
          fontSize: 28,
          color: COLORS.textDim,
          letterSpacing: 4,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
      </div>
    </AbsoluteFill>
  );
};
