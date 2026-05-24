import React from "react";
import { AbsoluteFill } from "remotion";
import { GradientTransition } from "remotion-bits";
import { TOTAL_FRAMES } from "../theme";

const APPLE_RADIAL_STAGES = [
  "radial-gradient(circle at 20% 20%, #FFD93A 0%, #FF1F4D 100%)",
  "radial-gradient(circle at 80% 30%, #FF2D7E 0%, #7B57FF 100%)",
  "radial-gradient(circle at 30% 80%, #2DA8FF 0%, #7B57FF 100%)",
  "radial-gradient(circle at 70% 70%, #FFB000 0%, #FF1F4D 100%)",
  "radial-gradient(circle at 50% 10%, #FF1F4D 0%, #7B57FF 100%)",
  "radial-gradient(circle at 20% 90%, #00C8FF 0%, #FF2D7E 100%)",
];

export const Background: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0420", overflow: "hidden" }}>
      <GradientTransition
        gradient={APPLE_RADIAL_STAGES}
        duration={TOTAL_FRAMES}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(8, 4, 30, 0.35) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
