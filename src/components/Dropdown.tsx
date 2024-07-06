import { useEffect, useState } from "react";

interface Props {
  options: any[];
  onSelect: (option: any) => void;
  defaultValue?: any;
}

export const Dropdown: React.FC<Props> = ({
  options,
  onSelect,
  defaultValue,
}) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<any>(defaultValue || options[0]);

  useEffect(() => {
    if (defaultValue) {
      const defOption = options.find((option) => option.value === defaultValue);
      setSelected(defOption || options[0]);
    }
  }, [defaultValue]);

  return (
    <div>
      <button
        className="w-[150px] h-[40px] flex justify-between items-center rounded-full border-1 radius-[15px] bg-white font-primary py-4 px-6"
        onClick={() => setShow(!show)}
      >
        <span>{selected.key}</span>
        <img src="/icons/chevron-down.svg" alt="down" />
      </button>
      {show && (
        <div className="p-2 bg-white border-1 radius-1 font-primary-1 mt-1">
          {options.map((option) => (
            <div
              key={option.key}
              className="py-1 px-4 hover:bg-gray-100 cursor-pointer rounded-full"
              onClick={() => {
                setShow(false);
                setSelected(option);
                onSelect(option);
              }}
            >
              {option.key}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
