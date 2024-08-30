import { useEffect, useRef, useState } from "react";

interface Props {
  options: any[];
  onSelect: (option: any) => void;
  defaultValue?: any;
  classes?: string;
  placeholder?: string;
}

export const Dropdown: React.FC<Props> = ({
  options,
  onSelect,
  defaultValue,
  classes,
  placeholder,
}) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<any>(
    placeholder ? "" : defaultValue || options[0]
  );
  const dropDownRef = useRef<HTMLButtonElement>(null);
  const optionsDivRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropDownRef.current &&
      optionsDivRef.current &&
      !dropDownRef.current.contains(event.target as Node) &&
      !optionsDivRef.current.contains(event.target as Node)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValue) {
      const defOption = options.find((option) => option.value === defaultValue);
      setSelected(defOption || options[0]);
    }
  }, [defaultValue]);

  return (
    <div className="relative">
      <button
        ref={dropDownRef}
        className={`w-[150px] h-[40px] flex justify-between items-center rounded-full border-1 radius-[15px] bg-white font-primary ${
          classes || "py-4 px-6"
        }`}
        onClick={() => setShow(!show)}
      >
        <span className={selected.key ? "" : "font-primary-1 c-gray"}>
          {selected.key || placeholder || ""}
        </span>
        <img src="/icons/chevron-down.svg" alt="down" />
      </button>
      {show && (
        <div
          ref={optionsDivRef}
          className={`w-[150px] absolute top-[45px] z-10 bg-white border-1 radius-1 font-primary-1 p-2 ${
            classes && classes.includes("w-full") ? "w-full" : ""
          }`}
        >
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
