import { useMemo } from "react";
import { Rect } from "remotion-bits";

export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;

/**
 * Returns a Rect for the design-space stage (1920×1080), regardless of the
 * outer composition dimensions. Use this instead of `useViewportRect()` when
 * you want sizing/positioning to follow the 1080p design space inside the
 * 2× scaled stage that TypeFitVideo renders for 4K output.
 */
export const useStageRect = (): Rect => {
  return useMemo(() => new Rect(STAGE_WIDTH, STAGE_HEIGHT), []);
};
