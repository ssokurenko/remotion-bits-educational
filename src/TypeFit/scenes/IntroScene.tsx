import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "remotion-bits";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme";
import { TypeFitLogo } from "../components/Logo";
import { GeminiBadge } from "../components/GeminiBadge";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.7 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleStart = 120;
  const badgeStart = 180;

  const exit = interpolate(frame, [450, 480], [1, 0], {
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
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {frame >= badgeStart && <GeminiBadge startFrame={badgeStart} />}
      </div>

      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: 48,
        }}
      >
        <TypeFitLogo size={150} />
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
              splitStagger: 4,
              easing: "easeOutCubic",
              frames: [0, 60],
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

      {frame >= subtitleStart + 36 && (
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
              splitStagger: 4,
              easing: "easeOutCubic",
              frames: [0, 52],
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
