import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { Dropdown } from "./Dropdown";
import { ToggleButton } from "./ToggleButton";
import useApiRequest from "@/hooks/useApiRequest";
import { Tooltip } from "./Tooltip";
import { ColorPicker } from "./ColorPicker";
import { useNotification } from "@/contexts/NotificationContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";

interface Props {
  onPreferencesUpdated: (preferences: any) => void;
}

export const ChatbotPreferences: React.FC<Props> = ({
  onPreferencesUpdated,
}) => {
  const { loading, error, makeRequest } = useApiRequest();
  const [preferences, setPreferences] = useState<any>({});
  const [showInfo, setShowInfo] = useState<string>("");
  const [showShadow, setShowShadow] = useState<boolean>(false);
  const [showStroke, setShowStroke] = useState<boolean>(false);
  const { notify } = useNotification();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  const fontOptions = [
    { key: "Inter", value: "inter" },
    { key: "Open Sans", value: "openSans" },
    { key: "Roboto", value: "roboto" },
    { key: "Lato", value: "lato" },
    { key: "Montserrat", value: "montserrat" },
    { key: "Oswald", value: "oswald" },
    { key: "Raleway", value: "raleway" },
    { key: "Poppins", value: "poppins" },
    { key: "Nunito", value: "nunito" },
  ];

  const defaultPreferences: any = {
    logo: "",
    icon: "",
    primary_color: "#219ebc",
    secondary_color: "#fb8500",
    background_color: "#f7f9fb",
    shadow: "#b3c1c8",
    stroke: "#dde2e4",
    corner_radius: 30,
    font: "poppins",
    initial_message: "Hi! How can I help you?",
    buttons: [],
    type: "current",
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const data: any = await makeRequest("/appearance", "GET");

      Object.keys(defaultPreferences).forEach((key) => {
        if (!data[key]) data[key] = defaultPreferences[key];
      });

      !!data.shadow && setShowShadow(true);
      !!data.stroke && setShowStroke(true);
      setPreferences(data);
      onPreferencesUpdated(data);
      // throw new Error();
    } catch (error: any) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 404) {
        !!defaultPreferences.shadow && setShowShadow(true);
        !!defaultPreferences.stroke && setShowStroke(true);
        savePreferences(defaultPreferences);
        savePreferences({ ...defaultPreferences, type: "default" });
        setPreferences(defaultPreferences);
        onPreferencesUpdated(defaultPreferences);
      }
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      const allowedExtensions = ["image/png", "image/jpeg"];

      if (!allowedExtensions.includes(file.type)) {
        notify("Only PNG and JPG files are allowed", "error");
        return;
      }

      if (file.size > maxSizeInBytes) {
        notify(`File size should not exceed ${maxSizeInMB} MB`, "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result?.toString();
        if (base64String) {
          savePreferences({ [fileType]: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleShadow = (shadow: boolean) => {
    setShowShadow(shadow);
    setPreferences({
      ...preferences,
      shadow: shadow ? defaultPreferences.shadow : "",
    });
    savePreferences({ shadow: shadow ? defaultPreferences.shadow : "" });
  };

  const toggleStroke = (stroke: boolean) => {
    setShowStroke(stroke);
    setPreferences({
      ...preferences,
      stroke: stroke ? defaultPreferences.stroke : "",
    });
    savePreferences({ stroke: stroke ? defaultPreferences.stroke : "" });
  };

  const onFontChange = (font: string) => {
    setPreferences({ ...preferences, font });
    savePreferences({ font });
  };

  const onColorChange = (color: any) => {
    setPreferences({ ...preferences, ...color });
    savePreferences({ ...color });
  };

  const onInitialMessageChange = () => {
    savePreferences({ initial_message: preferences.initial_message });
  };

  const onCornerRadiusChange = () => {
    savePreferences({ corner_radius: preferences.corner_radius });
  };

  const onButtonChange = () => {
    savePreferences({ buttons: preferences.buttons });
  };

  const handleButtonInput = (e: any, index: number) => {
    preferences.buttons[index] = { ["button_" + (index + 1)]: e.target.value };
    setPreferences({ ...preferences });
  };

  const addButton = () => {
    if (preferences.buttons.length >= 3) return;
    preferences.buttons.push({
      ["button_" + (preferences.buttons.length + 1)]: "Button Label",
    });
    setPreferences({ ...preferences });
    savePreferences({ buttons: preferences.buttons });
  };

  const removeButton = (index: number) => {
    preferences.buttons.splice(index, 1);
    setPreferences({ ...preferences });
    savePreferences({ buttons: preferences.buttons });
  };

  const savePreferences = async (body: any) => {
    try {
      const data = await makeRequest(`/appearance`, "POST", body);

      notify("Preferences saved successfully", "success");
      onPreferencesUpdated({ ...preferences, ...body });

      if (logoInputRef?.current) logoInputRef.current.value = "";
      if (iconInputRef?.current) iconInputRef.current.value = "";

      return data;
    } catch (error) {
      notify("Failed to save preferences", "error");
    }
  };

  const setAsDefault = async () => {
    savePreferences({ ...preferences, type: "default" });
  };

  const resetToDefault = async () => {
    const data: any = await makeRequest("/appearance?type=default", "GET");
    savePreferences({ ...preferences, type: "current" });
    setPreferences({ ...preferences, type: "current" });
    onPreferencesUpdated(data);
  };

  const showTooltip = (key: string) => {
    key === showInfo ? setShowInfo("") : setShowInfo(key);
  };

  return (
    <>
      <Card title="" desc=" ">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <h3>Chatbot logo</h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <h5>
                  Upload your logo or preferred image branding the chat
                  interface.
                </h5>
                <h5>
                  (the files should be in jpg. or png. formats, not more than
                  2MB.)
                </h5>
              </div>
              <img src="/settings-logo.svg" alt="img" />
            </div>
            <div
              className="w-[40px] rounded-full border-dark cursor-pointer p-2"
              onClick={() =>
                logoInputRef.current && logoInputRef.current.click()
              }
            >
              <img className="" src="/icons/image.svg" alt="img" />
              <input
                type="file"
                ref={logoInputRef}
                className="hidden"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleFileChange(e, "logo")}
              />
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex flex-col">
            <h3>Chatbot icon</h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <h5>
                  Upload your icon or preferred image branding the chat
                  interface.
                </h5>
                <h5>
                  (the files should be in jpg. or png. formats, not more than
                  2MB.)
                </h5>
              </div>
              <img src="/settings-icon.svg" alt="img" />
            </div>
            <div
              className="w-[40px] rounded-full border-dark cursor-pointer p-2"
              onClick={() =>
                iconInputRef.current && iconInputRef.current.click()
              }
            >
              <img className="" src="/icons/profile.svg" alt="img" />
              <input
                type="file"
                ref={iconInputRef}
                className="hidden"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleFileChange(e, "icon")}
              />
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex flex-col">
            <h3>Colors</h3>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex items-center relative">
                  <span className="label-1 mr-1">Primary Color</span>
                  <img
                    src="/icons/info.svg"
                    alt="img"
                    className="cursor-pointer"
                    onClick={() => showTooltip("primary")}
                  />
                  {showInfo === "primary" && (
                    <Tooltip>
                      <span>It applies to top bar color and send icon</span>
                    </Tooltip>
                  )}
                </div>

                <div className="flex items-center border-dark rounded-full w-[140px] p-1 mt-2">
                  <ColorPicker
                    defColor={preferences.primary_color}
                    onChange={(c) => onColorChange({ primary_color: c })}
                  />
                  <span className="c-gray ml-2 mr-4">
                    {preferences.primary_color}
                  </span>
                </div>
              </div>
              <img src="/settings-primary-color.svg" alt="img" />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex items-center relative">
                  <span className="label-1 mr-1">Secondary Color</span>
                  <img
                    src="/icons/info.svg"
                    alt="img"
                    className="cursor-pointer"
                    onClick={() => showTooltip("secondary")}
                  />
                  {showInfo === "secondary" && (
                    <Tooltip>
                      <span>It applies to chat button</span>
                    </Tooltip>
                  )}
                </div>

                <div className="flex items-center border-dark rounded-full w-[140px] p-1 mt-2">
                  <ColorPicker
                    defColor={preferences.secondary_color}
                    onChange={(c) => onColorChange({ secondary_color: c })}
                  />
                  <span className="c-gray ml-2 mr-4">
                    {preferences.secondary_color}
                  </span>
                </div>
              </div>
              <img src="/settings-secondary-color.svg" alt="img" />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="flex items-center relative">
                  <span className="label-1 mr-1">Background Color</span>
                  <img
                    src="/icons/info.svg"
                    alt="img"
                    className="cursor-pointer"
                    onClick={() => showTooltip("background")}
                  />
                  {showInfo === "background" && (
                    <Tooltip>
                      <span>It applies to chat background</span>
                    </Tooltip>
                  )}
                </div>

                <div className="flex items-center border-dark rounded-full w-[140px] p-1 mt-2">
                  <ColorPicker
                    defColor={preferences.background_color}
                    onChange={(c) => onColorChange({ background_color: c })}
                  />
                  <span className="c-gray ml-2 mr-4">
                    {preferences.background_color}
                  </span>
                </div>
              </div>
              <img src="/settings-background-color.svg" alt="img" />
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="min-w-[70px] mr-4">Shadow</h3>
                <ToggleButton
                  defaultValue={preferences.shadow}
                  onChange={toggleShadow}
                />
              </div>
              <h5 className="mt-2 pr-4">
                Choose whether you want to have shadow under the chat area.
              </h5>
              {showShadow && (
                <div className="flex items-center border-dark rounded-full w-[140px] p-1 mt-2">
                  <ColorPicker
                    defColor={preferences.shadow}
                    onChange={(c) => onColorChange({ shadow: c })}
                  />
                  <span className="c-gray ml-2 mr-4">{preferences.shadow}</span>
                </div>
              )}
            </div>
            <div>
              <img src="/settings-shadow.svg" alt="img"></img>
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h3 className="min-w-[70px] mr-4">Stroke</h3>
                <ToggleButton
                  defaultValue={preferences.stroke}
                  onChange={toggleStroke}
                />
              </div>
              <h5 className="mt-2 pr-4">
                Choose whether you want to have stroke around the chat area.
              </h5>
              {showStroke && (
                <div className="flex items-center border-dark rounded-full w-[140px] p-1 mt-2">
                  <ColorPicker
                    defColor={preferences.stroke}
                    onChange={(c) => onColorChange({ stroke: c })}
                  />
                  <span className="c-gray ml-2 mr-4">{preferences.stroke}</span>
                </div>
              )}
            </div>
            <div>
              <img src="/settings-stroke.svg" alt="img"></img>
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h3>Corner radius</h3>
              <div className="flex items-center">
                <img src="/settings-corner-radius-1.svg" alt="cr" />
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="input-text w-16 rounded p-2 mt-2 ml-4"
                  value={preferences?.corner_radius || 0}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      corner_radius: e.target.value,
                    })
                  }
                  onKeyDown={(e: any) =>
                    e.key === "Enter" &&
                    setPreferences({
                      ...preferences,
                      corner_radius: e.target.value,
                    })
                  }
                  onBlur={onCornerRadiusChange}
                />
              </div>
            </div>
            <div>
              <img src="/settings-corner-radius-2.svg" alt="img"></img>
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex flex-col">
            <h3>Font</h3>
            <h5 className="py-2">
              Select from a curated collection of popular Google fonts to
              personalize your design.
            </h5>
            <div>
              <Dropdown
                defaultValue={preferences.font}
                options={fontOptions}
                onSelect={(option) => onFontChange(option.value)}
              />
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex flex-col">
            <h3>Initial message</h3>
            <div className="py-2">
              <h5>
                Customize default text like greetings or welcome messages that
                will automatically appear in the chat.
              </h5>
              <h5>
                By leaving this part empty, there will not be an initial
                message.
              </h5>
            </div>
            <input
              type="text"
              className="input-text rounded-full text-sm px-4 py-2"
              value={preferences.initial_message || ""}
              onChange={(e) =>
                setPreferences({
                  ...preferences,
                  initial_message: e.target.value,
                })
              }
              onKeyDown={(e: any) =>
                e.key === "Enter" &&
                setPreferences({
                  ...preferences,
                  initial_message: e.target.value,
                })
              }
              onBlur={onInitialMessageChange}
            />
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex flex-col">
            <h3>Menu buttons&apos; labels</h3>
            <h5 className="py-2">
              Customize default labels for the main menu’s buttons.
            </h5>

            {preferences?.buttons &&
              preferences.buttons.map((button: any, index: number) => (
                <div
                  key={"button_" + (index + 1)}
                  className="flex items-center mt-2"
                >
                  <input
                    type="text"
                    value={button["button_" + (index + 1)] || ""}
                    className="input-text rounded-full max-w-[320px] text-sm px-4 py-2 text-center"
                    onChange={(e) => handleButtonInput(e, index)}
                    onKeyDown={(event) =>
                      event.key === "Enter" && handleButtonInput(event, index)
                    }
                    onBlur={onButtonChange}
                  />
                  {preferences.buttons.length - 1 === index && (
                    <TrashIcon
                      className="ml-2 w-4 h-4 cursor-pointer text-red-500"
                      onClick={() => removeButton(index)}
                    ></TrashIcon>
                  )}
                </div>
              ))}

            {preferences?.buttons && preferences?.buttons.length < 3 && (
              <div
                className="flex items-center cursor-pointer mt-2 mb-4"
                onClick={addButton}
              >
                <img src="/icons/plus.svg" alt="+" className="mr-2" />
                <h5>Add more buttons</h5>
              </div>
            )}
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex align-center">
            <button
              className="bg-orange text-white rounded-full px-8 py-2 mr-8"
              onClick={setAsDefault}
            >
              <h3>Set changes as default</h3>
            </button>
            <button
              className="font-primary-1 bg-white border-dark rounded-full px-8 py-2"
              onClick={resetToDefault}
            >
              Reset to default
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};
