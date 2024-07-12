import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { Dropdown } from "./Dropdown";
import { ToggleButton } from "./ToggleButton";
import useApiRequest from "@/hooks/useApiRequest";
import { Tooltip } from "./Tooltip";
import { ColorPicker } from "./ColorPicker";
import { useNotification } from "@/contexts/NotificationContext";
import { toQueryString } from "@/utils";

interface Props {}

export const ChatbotPreferences: React.FC<Props> = ({}) => {
  const { loading, error, makeRequest } = useApiRequest();
  const [preferences, setPreferences] = useState<any>({});
  const [showInfo, setShowInfo] = useState<string>("");
  const { notify } = useNotification();
  const logoInputRef = useRef<HTMLInputElement>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

  const fontOptions = [
    { key: "Inter", value: "inter" },
    { key: "Poppins", value: "poppins" },
  ];

  const defaultPreferences: any = {
    primary_color: "#219ebc",
    secondary_color: "#fb8500",
    background_color: "#f7f9fb",
    shadow: false,
    stroke: false,
    corner_radius: 0,
    font: "inter",
    initial_message: "Hi! How can I help you?",
    buttons: [],
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

      setPreferences(data);
      // throw new Error();
    } catch (error) {
      savePreferences(defaultPreferences);
      setPreferences(defaultPreferences);
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

  const onShadowChange = (shadow: boolean) => {
    setPreferences({ ...preferences, shadow });
    savePreferences({ shadow });
  };

  const onStrokeChange = (stroke: boolean) => {
    setPreferences({ ...preferences, stroke });
    savePreferences({ stroke });
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
  };

  const savePreferences = async (body: any) => {
    try {
      await makeRequest(`/appearance`, "POST", body);

      notify("Preferences saved successfully", "success");

      if (logoInputRef?.current) logoInputRef.current.value = "";
    } catch (error) {
      notify("Failed to save preferences", "error");
    }
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
                  onChange={onShadowChange}
                />
              </div>
              <h5 className="mt-2 pr-4">
                Choose whether you want to have shadow under the chat area.
              </h5>
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
                  onChange={onStrokeChange}
                />
              </div>
              <h5 className="mt-2 pr-4">
                Choose whether you want to have stroke around the chat area.
              </h5>
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
                <input
                  key={"button_" + (index + 1)}
                  type="text"
                  value={button["button_" + (index + 1)] || ""}
                  className="input-text rounded-full max-w-[320px] text-sm px-4 py-2 mt-2"
                  onChange={(e) => handleButtonInput(e, index)}
                  onBlur={onButtonChange}
                />
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
        </div>
      </Card>
    </>
  );
};
