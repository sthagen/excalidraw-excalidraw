import React from "react";
import { getContrastingBWColor } from "../../colors";

interface HotkeyLabelProps {
  color: string;
  keyLabel: string | number;
  isShade?: boolean;
}
const HotkeyLabel = ({
  color,
  keyLabel,
  isShade = false,
}: HotkeyLabelProps) => {
  return (
    <div
      className="color-picker__button__hotkey-label"
      style={{
        color: getContrastingBWColor(color, 0.7),
      }}
    >
      {isShade && "⇧"}
      {keyLabel}
    </div>
  );
};

export default HotkeyLabel;
