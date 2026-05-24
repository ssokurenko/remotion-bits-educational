import "./index.css";
import { Composition } from "remotion";
import { TypeFitVideo } from "./TypeFit/TypeFitVideo";
import { TOTAL_FRAMES } from "./TypeFit/theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TypeFit"
        component={TypeFitVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
