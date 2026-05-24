import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText, StaggeredMotion } from "remotion-bits";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

const ICON_SIZE = 46;

const iconProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fff",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const InsightIcon = () => (
  <svg {...iconProps}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 L20 20" strokeWidth="2.8" />
    <path
      d="M7 11.5 L9 9 L11 11.5 L13 7"
      strokeWidth="1.8"
      opacity="0.9"
    />
  </svg>
);

const StairsIcon = () => (
  <svg {...iconProps}>
    <path d="M3 20h4v-4h4v-4h4V8h4V4" />
    <path d="M15 4h4v4" strokeWidth="2.4" />
  </svg>
);

const LockIcon = () => (
  <svg {...iconProps}>
    <rect x="4.5" y="11" width="15" height="9.5" rx="2.2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15.6" r="1.4" fill="#fff" stroke="none" />
    <path d="M12 17v1.4" />
  </svg>
);

const TagIcon = () => (
  <svg {...iconProps}>
    <path d="M3 12.5V4a1 1 0 0 1 1-1h8.5a1 1 0 0 1 .7.3l7.5 7.5a1 1 0 0 1 0 1.4l-8.5 8.5a1 1 0 0 1-1.4 0L3.3 13.2a1 1 0 0 1-.3-.7Z" />
    <text
      x="10"
      y="13.2"
      fontFamily="Inter, sans-serif"
      fontSize="6.5"
      fontWeight="800"
      fill="#fff"
      stroke="none"
      textAnchor="middle"
    >
      $0
    </text>
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "AI-Driven Insights",
    description: "Real-time feedback from pattern analysis.",
    icon: <InsightIcon />,
    accent: COLORS.cyan,
  },
  {
    title: "Personalized Paths",
    description: "Lessons that adapt to your skill level.",
    icon: <StairsIcon />,
    accent: COLORS.accent,
  },
  {
    title: "Strict Mode",
    description: "Build precision through corrective practice.",
    icon: <LockIcon />,
    accent: COLORS.pink,
  },
  {
    title: "Try for Free",
    description: "Zero-barrier entry, no card needed.",
    icon: <TagIcon />,
    accent: COLORS.success,
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  const exit = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
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
          marginBottom: 18,
          fontWeight: 600,
        }}
      >
        <AnimatedText
          transition={{
            opacity: [0, 1],
            y: [12, 0],
            split: "word",
            splitStagger: 2,
            frames: [0, 18],
            easing: "easeOutCubic",
          }}
          style={{ fontFamily: FONT_SANS, color: "#000" }}
        >
          Why it works
        </AnimatedText>
      </div>

      <div
        style={{
          fontSize: 72,
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
            y: [22, 0],
            blur: [8, 0],
            split: "word",
            splitStagger: 2,
            frames: [6, 32],
            easing: "easeOutCubic",
          }}
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 800,
            color: COLORS.text,
          }}
        >
          Coaching, not just drills.
        </AnimatedText>
      </div>

      <div style={{ width: 1500, maxWidth: "100%" }}>
        <StaggeredMotion
          transition={{
            y: [40, 0],
            opacity: [0, 1],
            scale: [0.94, 1],
            frames: [30, 70],
            stagger: 6,
            staggerDirection: "forward",
            easing: "easeOutCubic",
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </StaggeredMotion>
      </div>
    </AbsoluteFill>
  );
};

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  return (
    <div
      style={{
        padding: 36,
        borderRadius: 24,
        background:
          "linear-gradient(160deg, rgba(34,17,83,0.55) 0%, rgba(11,8,32,0.85) 100%)",
        border: `1px solid ${feature.accent}55`,
        boxShadow: `0 18px 50px rgba(0,0,0,0.4), 0 0 30px ${feature.accent}1a`,
        display: "flex",
        alignItems: "flex-start",
        gap: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${feature.accent}55 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      <div
        style={{
          width: 70,
          height: 70,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${feature.accent} 0%, ${feature.accent}88 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          color: "#fff",
          flexShrink: 0,
          boxShadow: `0 0 24px ${feature.accent}88`,
          fontFamily: FONT_MONO,
          fontWeight: 700,
        }}
      >
        {feature.icon}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: -0.5,
            fontFamily: FONT_SANS,
          }}
        >
          {feature.title}
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#fff",
            opacity: 0.75,
            fontFamily: FONT_MONO,
            lineHeight: 1.4,
          }}
        >
          {feature.description}
        </div>
      </div>
    </div>
  );
};
