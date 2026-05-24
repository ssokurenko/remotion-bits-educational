import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "remotion-bits";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme";
import { TypeFitLogo } from "../components/Logo";

export const MeetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 16, stiffness: 130, mass: 0.6 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const cursorOn = Math.floor(frame / 13) % 2 === 0;

  const ringScale = interpolate(frame, [0, 60], [0.6, 1.6], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [0, 60], [0.6, 0], {
    extrapolateRight: "clamp",
  });

  const exit = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineStart = 50;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: exit,
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          fontSize: 24,
          letterSpacing: 8,
          textTransform: "uppercase",
          color: "#000",
          marginBottom: 28,
          fontWeight: 600,
          opacity: interpolate(frame, [0, 18], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Meet
      </div>

      <div style={{ position: "relative", marginBottom: 50 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 600,
              height: 200,
              borderRadius: 200,
              border: `2px solid ${COLORS.cyan}`,
              opacity: ringOpacity,
              transform: `scale(${ringScale})`,
            }}
          />
        </div>
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <TypeFitLogo size={170} cursorOn={cursorOn} />
        </div>
      </div>

      {frame >= taglineStart && (
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -1,
            textAlign: "center",
            maxWidth: 1400,
            lineHeight: 1.25,
          }}
        >
          <AnimatedText
            transition={{
              y: [20, 0],
              opacity: [0, 1],
              split: "word",
              splitStagger: 2,
              easing: "easeOutCubic",
              frames: [0, 28],
            }}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            A typing platform that learns how you learn.
          </AnimatedText>
        </div>
      )}

      {frame >= taglineStart + 30 && (
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
          }}
        >
          {["Practice", "Learn", "Improve"].map((label, i) => (
            <Pill key={label} label={label} delay={i * 5} startFrame={taglineStart + 30} />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Pill: React.FC<{ label: string; delay: number; startFrame: number }> = ({
  label,
  delay,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame - delay;
  const opacity = interpolate(local, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 14], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        padding: "12px 28px",
        borderRadius: 999,
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.cardBorder}`,
        color: "#000",
        fontFamily: FONT_MONO,
        fontSize: 22,
        letterSpacing: 1,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {label}
    </div>
  );
};
