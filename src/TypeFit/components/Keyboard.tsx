import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONT_MONO } from "../theme";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export const Keyboard: React.FC<{
  width: number;
  highlightedKey?: string | null;
  homeRow?: boolean;
  pressFrame?: number;
}> = ({ width, highlightedKey, homeRow = false, pressFrame }) => {
  const frame = useCurrentFrame();
  const keySize = width / 12;
  const gap = keySize * 0.12;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        alignItems: "center",
        padding: keySize * 0.5,
        borderRadius: keySize * 0.4,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.2) 100%)",
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: `0 ${keySize * 0.4}px ${keySize * 2}px rgba(0,0,0,0.5)`,
      }}
    >
      {ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            display: "flex",
            gap,
            marginLeft: rowIndex * keySize * 0.4,
          }}
        >
          {row.map((key) => {
            const isHighlighted = highlightedKey === key;
            const isHomeKey =
              homeRow && ["A", "S", "D", "F", "J", "K", "L"].includes(key);
            const recentPress =
              pressFrame !== undefined && isHighlighted
                ? interpolate(
                    frame,
                    [pressFrame, pressFrame + 8],
                    [1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  )
                : 0;

            return (
              <div
                key={key}
                style={{
                  width: keySize,
                  height: keySize,
                  borderRadius: keySize * 0.18,
                  background: isHighlighted
                    ? `linear-gradient(180deg, ${COLORS.accent}, ${COLORS.cyan})`
                    : isHomeKey
                      ? `linear-gradient(180deg, ${COLORS.accent}55, ${COLORS.accent}22)`
                      : "linear-gradient(180deg, #1d1640 0%, #110a2a 100%)",
                  border: `1px solid ${isHighlighted ? COLORS.cyan : COLORS.cardBorder}`,
                  color: isHighlighted ? "#fff" : COLORS.textDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONT_MONO,
                  fontWeight: 700,
                  fontSize: keySize * 0.42,
                  boxShadow: isHighlighted
                    ? `0 0 ${keySize * 0.6}px ${COLORS.cyan}, inset 0 0 ${keySize * 0.2}px ${COLORS.accent}`
                    : "inset 0 -2px 4px rgba(0,0,0,0.5), 0 2px 0 rgba(0,0,0,0.5)",
                  transform: `translateY(${recentPress * 4}px) scale(${1 - recentPress * 0.04})`,
                  position: "relative",
                }}
              >
                {key}
                {isHomeKey && !isHighlighted && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: keySize * 0.08,
                      width: keySize * 0.25,
                      height: 2,
                      background: COLORS.accentSoft,
                      borderRadius: 2,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div
        style={{
          width: keySize * 5,
          height: keySize * 0.7,
          borderRadius: keySize * 0.15,
          background: "linear-gradient(180deg, #1d1640 0%, #110a2a 100%)",
          border: `1px solid ${COLORS.cardBorder}`,
          marginTop: gap,
          boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
};
