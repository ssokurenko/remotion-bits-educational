import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import {
  AnimatedCounter,
  Behavior,
  Particles,
  resolvePoint,
  Spawner,
  useViewportRect,
} from "remotion-bits";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme";

const SAMPLE_QUOTE =
  "Practice doesn't make perfect. Practice makes permanent.";

export const PracticeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rect = useViewportRect();

  const headerOpacity = interpolate(frame, [0, 36], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(frame, [0, 36], [16, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cardOpacity = interpolate(frame, [16, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(frame, [16, 56], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const typeStart = 60;
  const typeEnd = 340;
  const typedChars = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, SAMPLE_QUOTE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const typed = SAMPLE_QUOTE.slice(0, typedChars);
  const remaining = SAMPLE_QUOTE.slice(typedChars);

  const cursorOn = Math.floor(frame / 18) % 2 === 0;

  const statsStart = 80;

  const exit = interpolate(frame, [390, 420], [1, 0], {
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
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            background: `${COLORS.accent}33`,
            border: `1px solid ${COLORS.cardBorderStrong}`,
            fontFamily: FONT_MONO,
            color: "#000",
            fontSize: 18,
            letterSpacing: 2,
          }}
        >
          type.fit / practice
        </div>
      </div>

      <div
        style={{
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
          width: 1500,
          maxWidth: "100%",
          padding: 56,
          borderRadius: 32,
          background:
            "linear-gradient(180deg, rgba(34,17,83,0.6) 0%, rgba(11,8,32,0.85) 100%)",
          border: `1px solid ${COLORS.cardBorderStrong}`,
          boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${COLORS.accent}22, inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#ff6b6b",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#fbbf24",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#4ade80",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 18,
              color: "#fff",
              opacity: 0.75,
              letterSpacing: 1,
            }}
          >
            Lesson · Mindset Quotes
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              fontFamily: FONT_MONO,
              fontSize: 18,
              color: "#fff",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: COLORS.success,
                boxShadow: `0 0 12px ${COLORS.success}`,
              }}
            />
            Strict Mode
          </div>
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 56,
            lineHeight: 1.5,
            letterSpacing: 0.5,
            color: "#fff",
            wordSpacing: 4,
          }}
        >
          <span style={{ color: "#fff" }}>{typed}</span>
          <span
            style={{
              display: "inline-block",
              width: 4,
              height: 56,
              background: "#2b7fff",
              verticalAlign: "middle",
              marginLeft: 4,
              marginRight: 4,
              opacity: cursorOn ? 1 : 0,
              boxShadow: "0 0 16px #2b7fff",
            }}
          />
          <span style={{ color: "#fff", opacity: 0.35 }}>
            {remaining}
          </span>
        </div>

        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 28,
          }}
        >
          <StatBox
            label="WPM"
            target={85}
            color={COLORS.cyan}
            startFrame={statsStart}
          />
          <StatBox
            label="Accuracy"
            target={98}
            suffix="%"
            color={COLORS.success}
            startFrame={statsStart + 16}
          />
          <StatBox
            label="Streak"
            target={12}
            suffix=" days"
            color={COLORS.pink}
            startFrame={statsStart + 32}
          />
        </div>
      </div>

      <Sequence from={340}>
        <Particles>
          <Spawner
            rate={0}
            burst={24}
            position={resolvePoint(rect, { x: "center", y: "55%" })}
            area={{ width: rect.width * 0.4, height: 0 }}
            velocity={{
              x: 0,
              y: -rect.height * 0.02,
              varianceX: rect.width * 0.01,
              varianceY: rect.height * 0.008,
            }}
            lifespan={160}
            max={24}
          >
            {[COLORS.accent, COLORS.cyan, COLORS.pink, COLORS.success].map(
              (c, i) => (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 8,
                    backgroundColor: c,
                    borderRadius: 2,
                  }}
                />
              ),
            )}
          </Spawner>
          <Behavior gravity={{ y: 0.075 }} />
          <Behavior drag={0.985} />
          <Behavior opacity={[1, 0]} />
          <Behavior
            handler={(p) => {
              p.rotation += p.velocity.x * 1.2;
            }}
          />
        </Particles>
      </Sequence>
    </AbsoluteFill>
  );
};

const StatBox: React.FC<{
  label: string;
  target: number;
  suffix?: string;
  color: string;
  startFrame: number;
}> = ({ label, target, suffix, color, startFrame }) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;

  const opacity = interpolate(local, [0, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(local, [0, 32], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        padding: "24px 28px",
        borderRadius: 20,
        background: `linear-gradient(180deg, ${color}22 0%, ${color}08 100%)`,
        border: `1px solid ${color}55`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: 18,
          color: "#fff",
          opacity: 0.75,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 4,
        }}
      >
        <Sequence from={startFrame} layout="none">
          <AnimatedCounter
            transition={{
              values: [0, target],
              duration: 100,
              easing: "easeOutQuart",
            }}
            toFixed={0}
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: "#fff",
              fontFamily: FONT_MONO,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          />
        </Sequence>
        {suffix && (
          <span
            style={{
              fontSize: 28,
              color: "#fff",
              fontFamily: FONT_MONO,
              fontWeight: 600,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};
