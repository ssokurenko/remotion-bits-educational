import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
} from "remotion";
import { Background } from "./components/Background";
import { CTAScene } from "./scenes/CTAScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { IntroScene } from "./scenes/IntroScene";
import { LearnScene } from "./scenes/LearnScene";
import { MeetScene } from "./scenes/MeetScene";
import { PracticeScene } from "./scenes/PracticeScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { AUDIO_FADE_FRAMES, SCENE_TIMINGS, TOTAL_FRAMES } from "./theme";

export const TypeFitVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#06051a" }}>
      <Audio
        src={staticFile("soundtrack.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [
              0,
              30,
              TOTAL_FRAMES - AUDIO_FADE_FRAMES,
              TOTAL_FRAMES,
            ],
            [0, 0.35, 0.35, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />
      <Background />

      <Sequence
        from={SCENE_TIMINGS.intro.start}
        durationInFrames={SCENE_TIMINGS.intro.duration}
        layout="none"
      >
        <IntroScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.problem.start}
        durationInFrames={SCENE_TIMINGS.problem.duration}
        layout="none"
      >
        <ProblemScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.meet.start}
        durationInFrames={SCENE_TIMINGS.meet.duration}
        layout="none"
      >
        <MeetScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.practice.start}
        durationInFrames={SCENE_TIMINGS.practice.duration}
        layout="none"
      >
        <PracticeScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.learn.start}
        durationInFrames={SCENE_TIMINGS.learn.duration}
        layout="none"
      >
        <LearnScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.features.start}
        durationInFrames={SCENE_TIMINGS.features.duration}
        layout="none"
      >
        <FeaturesScene />
      </Sequence>

      <Sequence
        from={SCENE_TIMINGS.cta.start}
        durationInFrames={SCENE_TIMINGS.cta.duration}
        layout="none"
      >
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
