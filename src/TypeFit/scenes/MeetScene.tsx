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
import { COLORS, FONT_SANS } from "../theme";
import { TypeFitLogo } from "../components/Logo";

export const MeetScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 16, stiffness: 130, mass: 0.6 },
  });
  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const ringScale = interpolate(frame, [0, 120], [0.6, 1.6], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });
  const ringOpacity = interpolate(frame, [0, 120], [0.6, 0], {
    extrapolateRight: "clamp",
  });

  const exit = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineStart = 100;

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
          opacity: interpolate(frame, [0, 36], [0, 1], {
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
          <TypeFitLogo size={170} />
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
              splitStagger: 4,
              easing: "easeOutCubic",
              frames: [0, 56],
            }}
            style={{
              fontSize: 64,
              fontFamily: FONT_SANS,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            A typing platform that learns how you learn.
          </AnimatedText>
        </div>
      )}

      {frame >= taglineStart + 60 && (
        <div
          style={{
            marginTop: 64,
            display: "flex",
            gap: 32,
          }}
        >
          {PILLS.map((pill, i) => (
            <Pill
              key={pill.label}
              pill={pill}
              delay={i * 18}
              startFrame={taglineStart + 60}
            />
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

interface PillData {
  label: string;
  icon: React.ReactNode;
  color: string;
}

const PILLS: PillData[] = [
  {
    label: "Practice",
    color: "#2b7fff",
    icon: (
      <svg width={44} height={44} viewBox="0 0 24 24" fill="none">
        <path
          d="M8 5v14l11-7L8 5Z"
          fill="#fff"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Learn",
    color: "#BF5AF2",
    icon: (
      <svg
        width={44}
        height={44}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z" />
        <path d="M4 19a2 2 0 0 0 2 2h12" />
        <path d="M9 7h6M9 11h6" />
      </svg>
    ),
  },
  {
    label: "Improve",
    color: "#FF375F",
    icon: (
      <svg
        width={44}
        height={44}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 18 10 12 13 15 20 6" />
        <path d="M15 6h5v5" />
      </svg>
    ),
  },
];

const Pill: React.FC<{ pill: PillData; delay: number; startFrame: number }> = ({
  pill,
  delay,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - startFrame - delay;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 11, stiffness: 130, mass: 0.7 },
  });
  const scale = interpolate(enter, [0, 1], [0.55, 1]);
  const rotate = interpolate(enter, [0, 1], [-8, 0]);
  const opacity = interpolate(local, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = interpolate(local, [0, 24], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const floatY = Math.sin((local - delay) * 0.05) * 6;
  const glowAlpha = 0.45 + Math.sin(local * 0.06) * 0.15;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${floatY}px) scale(${scale}) rotate(${rotate}deg)`,
        filter: `blur(${blur}px)`,
        padding: 2,
        borderRadius: 999,
        background: `linear-gradient(135deg, ${pill.color} 0%, ${pill.color}88 50%, ${pill.color} 100%)`,
        boxShadow: `0 16px 40px ${pill.color}66, 0 0 32px rgba(255, 255, 255, ${glowAlpha * 0.4})`,
      }}
    >
      <div
        style={{
          padding: "22px 44px 22px 36px",
          borderRadius: 999,
          background: "rgba(8, 4, 30, 0.82)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          gap: 18,
          color: "#fff",
          fontFamily: FONT_SANS,
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: -0.5,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${pill.color}, ${pill.color}aa)`,
            boxShadow: `0 0 18px ${pill.color}aa`,
          }}
        >
          {pill.icon}
        </span>
        {pill.label}
      </div>
    </div>
  );
};
