import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { AnimatedText } from "remotion-bits";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme";

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();

  const wpm = Math.floor(
    interpolate(frame, [30, 130], [12, 38], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  const sample = "The quick brown fox jumps...";
  const typedChars = Math.floor(
    interpolate(frame, [40, 130], [0, sample.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const typed = sample.slice(0, typedChars);

  const cursorOn = Math.floor(frame / 10) % 2 === 0;

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
          fontSize: 28,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#000",
          marginBottom: 18,
          fontWeight: 600,
        }}
      >
        <AnimatedText
          transition={{
            opacity: [0, 1],
            y: [12, 0],
            split: "word",
            splitStagger: 3,
            frames: [0, 20],
            easing: "easeOutCubic",
          }}
          style={{ fontFamily: FONT_SANS, color: "#000" }}
        >
          The Challenge
        </AnimatedText>
      </div>

      <div
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: COLORS.text,
          letterSpacing: -2,
          marginBottom: 60,
          textAlign: "center",
        }}
      >
        <AnimatedText
          transition={{
            opacity: [0, 1],
            y: [24, 0],
            blur: [8, 0],
            split: "word",
            splitStagger: 2,
            frames: [10, 38],
            easing: "easeOutCubic",
          }}
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 800,
            color: COLORS.text,
          }}
        >
          How fast do you type?
        </AnimatedText>
      </div>

      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "32px 48px",
            borderRadius: 24,
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.cardBorder}`,
            backdropFilter: "blur(20px)",
            minWidth: 720,
            opacity: interpolate(frame, [25, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 38,
              color: "#000",
              letterSpacing: 1,
            }}
          >
            <span style={{ color: "#000" }}>{typed}</span>
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 36,
                background: "#000",
                verticalAlign: "middle",
                marginLeft: 4,
                marginRight: 4,
                opacity: cursorOn ? 1 : 0,
              }}
            />
            <span style={{ color: "#000", opacity: 0.35 }}>
              {sample.slice(typedChars)}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "28px 44px",
            borderRadius: 24,
            background: `linear-gradient(135deg, ${COLORS.error}22, ${COLORS.error}08)`,
            border: `1px solid ${COLORS.error}55`,
            opacity: interpolate(frame, [40, 65], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 96,
              fontWeight: 800,
              color: "#000",
              lineHeight: 1,
            }}
          >
            {wpm}
          </div>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: 18,
              color: "#000",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            WPM
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 50,
          fontSize: 24,
          color: "#000",
          opacity: interpolate(frame, [95, 115], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontFamily: FONT_SANS,
        }}
      >
        Average typists lose <strong style={{ color: "#000" }}>21 days</strong> per year
        looking at the keyboard.
      </div>
    </AbsoluteFill>
  );
};
