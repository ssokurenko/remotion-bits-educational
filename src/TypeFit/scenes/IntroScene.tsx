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

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.7 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleStart = 38;

  const badgeOpacity = interpolate(frame, [90, 115], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const badgeY = interpolate(frame, [90, 115], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cursorOn = Math.floor(frame / 14) % 2 === 0;

  const exit = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          opacity: badgeOpacity,
          transform: `translateY(${badgeY}px)`,
          marginBottom: 28,
          padding: "10px 22px",
          borderRadius: 999,
          background: `linear-gradient(135deg, ${COLORS.accent}33, ${COLORS.cyan}22)`,
          border: `1px solid ${COLORS.cardBorderStrong}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 22,
          color: "#000",
          fontWeight: 500,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: COLORS.success,
            boxShadow: `0 0 14px ${COLORS.success}`,
          }}
        />
        Powered by Google Gemini AI
      </div>

      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 48,
        }}
      >
        <TypeFitLogo size={150} cursorOn={cursorOn} />
      </div>

      {frame >= subtitleStart && (
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: COLORS.text,
            letterSpacing: -2,
            textAlign: "center",
            maxWidth: 1400,
            lineHeight: 1.1,
          }}
        >
          <AnimatedText
            transition={{
              y: [30, 0],
              blur: [12, 0],
              opacity: [0, 1],
              split: "word",
              splitStagger: 2,
              easing: "easeOutCubic",
              frames: [0, 30],
            }}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 800,
              color: COLORS.text,
            }}
          >
            Master Touch Typing.
          </AnimatedText>
        </div>
      )}

      {frame >= subtitleStart + 18 && (
        <div
          style={{
            marginTop: 18,
            fontSize: 36,
            color: "#000",
            fontFamily: FONT_MONO,
            letterSpacing: 1,
          }}
        >
          <AnimatedText
            transition={{
              y: [16, 0],
              opacity: [0, 1],
              split: "word",
              splitStagger: 2,
              easing: "easeOutCubic",
              frames: [0, 26],
            }}
            style={{
              fontFamily: FONT_MONO,
              color: "#000",
            }}
          >
            with AI-Powered Coaching
          </AnimatedText>
        </div>
      )}
    </AbsoluteFill>
  );
};
