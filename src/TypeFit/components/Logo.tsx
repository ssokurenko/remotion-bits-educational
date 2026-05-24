import React from "react";
import { COLORS, FONT_SANS } from "../theme";

export const TypeFitLogo: React.FC<{
  size?: number;
}> = ({ size = 80 }) => {
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: 800,
        letterSpacing: -size * 0.04,
        color: COLORS.text,
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: FONT_SANS,
      }}
    >
      <span>type</span>
      <span style={{ color: "#000" }}>.fit</span>
    </div>
  );
};
