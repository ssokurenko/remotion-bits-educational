import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { AnimatedText, Scene3D, Step, useViewportRect } from "remotion-bits";
import { COLORS, FONT_MONO, FONT_SANS } from "../theme";

interface Course {
  title: string;
  audience: string;
  icon: string;
  accent: string;
  preview: string;
}

const COURSES: Course[] = [
  {
    title: "Touch Typing Foundations",
    audience: "Beginners",
    icon: "⌨",
    accent: COLORS.cyan,
    preview: "ASDF JKL; · home row",
  },
  {
    title: "IELTS Phrasal Verbs",
    audience: "English Learners",
    icon: "📖",
    accent: COLORS.pink,
    preview: "look up · carry on · figure out",
  },
  {
    title: "RACE Pattern Prompts",
    audience: "AI Enthusiasts",
    icon: "✨",
    accent: COLORS.accent,
    preview: "Role · Action · Context · Expectation",
  },
  {
    title: "CARE Pattern Prompts",
    audience: "AI Enthusiasts",
    icon: "💡",
    accent: COLORS.accentSoft,
    preview: "Context · Action · Result · Example",
  },
  {
    title: "Speed & Accuracy Booster",
    audience: "Experienced",
    icon: "⚡",
    accent: COLORS.amber,
    preview: "rhythm · flow · 100+ WPM",
  },
  {
    title: "Professional Mastery",
    audience: "Developers",
    icon: "{ }",
    accent: COLORS.success,
    preview: "() => { return 'code'; }",
  },
];

export const LearnScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rect = useViewportRect();

  const exit = interpolate(frame, [250, 270], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: exit, fontFamily: FONT_SANS }}>
      <Scene3D
        perspective={1500}
        transitionDuration={32}
        stepDuration={28}
        easing="easeInOutCubic"
      >
        <Step
          id="title"
          x={0}
          y={0}
          z={0}
          transition={{ opacity: [0, 1] }}
          exitTransition={{ opacity: [1, 0] }}
        >
          <TitleCard rect={rect} />
        </Step>

        {COURSES.map((course, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const x = (col - 1) * rect.vmin * 70;
          const y = (row - 0.5) * rect.vmin * 50;
          const z = (i + 1) * rect.vmin * 80;

          return (
            <Step
              key={course.title}
              id={`course-${i}`}
              x={x}
              y={y}
              z={z}
              rotateY={col === 0 ? 8 : col === 2 ? -8 : 0}
              transition={{ opacity: [0, 1] }}
              exitTransition={{ opacity: [1, 0] }}
            >
              <CourseCard course={course} index={i + 1} rect={rect} />
            </Step>
          );
        })}

        <Step
          id="outro"
          x={0}
          y={0}
          z={rect.vmin * 600}
          transition={{ opacity: [0, 1] }}
          exitTransition={{ opacity: [1, 0] }}
        >
          <OutroCard rect={rect} />
        </Step>
      </Scene3D>
    </AbsoluteFill>
  );
};

const TitleCard: React.FC<{ rect: ReturnType<typeof useViewportRect> }> = ({
  rect,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: rect.vmin * 2,
        textAlign: "center",
        width: rect.width,
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          fontSize: rect.vmin * 2.4,
          letterSpacing: rect.vmin * 0.6,
          textTransform: "uppercase",
          color: "#000",
          fontWeight: 600,
        }}
      >
        <AnimatedText
          transition={{
            opacity: [0, 1],
            y: [10, 0],
            split: "word",
            splitStagger: 2,
            frames: [0, 18],
            easing: "easeOutCubic",
          }}
          style={{ fontFamily: FONT_SANS, color: "#000" }}
        >
          Six Learning Paths
        </AnimatedText>
      </div>
      <div
        style={{
          fontSize: rect.vmin * 8,
          fontWeight: 800,
          color: COLORS.text,
          letterSpacing: -rect.vmin * 0.2,
          maxWidth: rect.width * 0.8,
          lineHeight: 1.05,
        }}
      >
        <AnimatedText
          transition={{
            opacity: [0, 1],
            y: [24, 0],
            blur: [10, 0],
            split: "word",
            splitStagger: 2,
            frames: [4, 30],
            easing: "easeOutCubic",
          }}
          style={{
            fontFamily: FONT_SANS,
            fontWeight: 800,
            color: COLORS.text,
          }}
        >
          Start where you are.
        </AnimatedText>
      </div>
    </div>
  );
};

const CourseCard: React.FC<{
  course: Course;
  index: number;
  rect: ReturnType<typeof useViewportRect>;
}> = ({ course, index, rect }) => {
  const width = rect.vmin * 60;
  const height = rect.vmin * 40;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: rect.vmin * 2.4,
        padding: rect.vmin * 3,
        background:
          "linear-gradient(160deg, rgba(34,17,83,0.85) 0%, rgba(11,8,32,0.95) 100%)",
        border: `1px solid ${course.accent}66`,
        boxShadow: `0 ${rect.vmin * 2}px ${rect.vmin * 6}px rgba(0,0,0,0.55), 0 0 ${rect.vmin * 4}px ${course.accent}33`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backdropFilter: "blur(14px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -rect.vmin * 8,
          right: -rect.vmin * 8,
          width: rect.vmin * 30,
          height: rect.vmin * 30,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${course.accent}55 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        <div
          style={{
            width: rect.vmin * 10,
            height: rect.vmin * 10,
            borderRadius: rect.vmin * 2,
            background: `linear-gradient(135deg, ${course.accent} 0%, ${course.accent}88 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: rect.vmin * 5,
            color: "#fff",
            fontFamily: FONT_MONO,
            fontWeight: 700,
            boxShadow: `0 0 ${rect.vmin * 3}px ${course.accent}88`,
          }}
        >
          {course.icon}
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: rect.vmin * 2,
            color: "#fff",
            opacity: 0.6,
            letterSpacing: 1,
          }}
        >
          0{index} / 06
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: rect.vmin * 1.4,
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: rect.vmin * 1.8,
            letterSpacing: rect.vmin * 0.3,
            textTransform: "uppercase",
            color: "#fff",
            opacity: 0.85,
            fontWeight: 600,
            fontFamily: FONT_SANS,
          }}
        >
          {course.audience}
        </div>
        <div
          style={{
            fontSize: rect.vmin * 4.4,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.1,
            letterSpacing: -rect.vmin * 0.1,
            fontFamily: FONT_SANS,
          }}
        >
          {course.title}
        </div>
        <div
          style={{
            fontSize: rect.vmin * 2.2,
            color: "#fff",
            fontFamily: FONT_MONO,
            opacity: 0.7,
            paddingTop: rect.vmin * 1.2,
            borderTop: `1px solid ${course.accent}33`,
          }}
        >
          {course.preview}
        </div>
      </div>
    </div>
  );
};

const OutroCard: React.FC<{ rect: ReturnType<typeof useViewportRect> }> = ({
  rect,
}) => {
  const frame = useCurrentFrame();
  const local = frame - 230;
  const scale = interpolate(local, [0, 25], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: rect.vmin * 2,
        textAlign: "center",
        transform: `scale(${scale})`,
        width: rect.width,
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          fontSize: rect.vmin * 10,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: -rect.vmin * 0.3,
          lineHeight: 1,
        }}
      >
        Built for everyone.
      </div>
      <div
        style={{
          fontSize: rect.vmin * 3,
          color: "#000",
          fontFamily: FONT_MONO,
          maxWidth: rect.width * 0.7,
          whiteSpace: "normal",
        }}
      >
        Beginner to professional. English learners to AI engineers.
      </div>
    </div>
  );
};
