import React, { useEffect, useState } from "react";

interface Props {
  onChange: (enabled: boolean) => void;
  defaultValue?: boolean;
}

export const ToggleButton: React.FC<Props> = ({ onChange, defaultValue }) => {
  const [enabled, setEnabled] = useState(defaultValue || false);

  useEffect(() => {
    setEnabled(defaultValue || false);
  }, [defaultValue]);

  const onStateChange = (state: boolean) => {
    setEnabled(state);
    onChange(state);
  };

  return (
    <div
      className={`${
        enabled ? "bg-green-600" : "bg-gray-30"
      } relative inline-flex items-center h-[20px] w-[36px] rounded-full transition-colors duration-300 ease-in-out cursor-pointer`}
      onClick={() => onStateChange(!enabled)}
    >
      <span
        className={`${
          enabled ? "translate-x-[18px]" : "translate-x-[2px]"
        } inline-block w-[16px] h-[16px] transform bg-white rounded-full transition-transform duration-300 ease-in-out`}
      />
    </div>
  );
};
