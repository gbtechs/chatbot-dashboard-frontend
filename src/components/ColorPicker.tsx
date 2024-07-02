import React, { useState } from "react";
import { SketchPicker } from "react-color";

interface Props {
  defColor: string;
  onChange: (color: any) => void;
}

export const ColorPicker: React.FC<Props> = ({ defColor, onChange }) => {
  const [color, setColor] = useState(defColor);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: any) => {
    setColor(color.hex);
    onChange(color.hex);
  };

  return (
    <div className="relative">
      <div
        className="w-8 h-8 rounded-full cursor-pointer"
        style={{ backgroundColor: defColor }}
        onClick={handleClick}
      />
      {displayColorPicker ? (
        <div className="absolute z-10">
          <div
            className="fixed top-0 right-0 bottom-0 left-0"
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};
