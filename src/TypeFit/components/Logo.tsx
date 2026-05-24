import React from "react";
import { COLORS, FONT_SANS } from "../theme";

export const TypeFitLogo: React.FC<{
  size?: number;
  showCursor?: boolean;
  cursorOn?: boolean;
}> = ({ size = 80, showCursor = true, cursorOn = true }) => {
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
      {showCursor && (
        <span
          style={{
            display: "inline-block",
            width: size * 0.08,
            height: size * 0.95,
            background: COLORS.cyan,
            marginLeft: size * 0.12,
            opacity: cursorOn ? 1 : 0,
            borderRadius: 2,
            boxShadow: `0 0 ${size * 0.3}px ${COLORS.cyan}`,
          }}
        />
      )}
    </div>
  );
};
