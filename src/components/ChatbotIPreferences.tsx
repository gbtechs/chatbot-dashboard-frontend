import { useEffect, useState } from "react";
import { Card } from "./Card";
import { Dropdown } from "./Dropdown";
import { ToggleButton } from "./ToggleButton";
import useApiRequest from "@/hooks/useApiRequest";
import { Tooltip } from "./Tooltip";
import { ColorPicker } from "./ColorPicker";

interface Props {}

export const ChatbotPreferences: React.FC<Props> = ({}) => {
  const { loading, error, makeRequest } = useApiRequest();
  const [preferences, setPreferences] = useState<any>({});
  const [showInfo, setShowInfo] = useState<string>("");

  const fontOptions = [
    { key: "Inter", value: "inter" },
    { key: "Poppins", value: "poppins" },
  ];

  const defaultPreferences = {
    primary_color: "#219ebc",
    secondary_color: "#fb8500",
    background_color: "#f7f9fb",
    shadow: "true",
    stroke: "true",
    corner_radios: "30",
    font: "poppins",
    initial_message: "Hi! How can I help you?",
    buttons: [],
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      // const data: any = await makeRequest("/preferences", "GET");
      // setPreferences(data);
      setPreferences(defaultPreferences);
    } catch (error) {
      setPreferences(defaultPreferences);
    }
  };

  const openFileUpload = () => {
    alert("File upload");
  };

  const onShadowChange = (shadow: boolean) => {
    alert("shadow: " + shadow);
  };

  const onStrokeChange = (stroke: boolean) => {
    alert("stroke: " + stroke);
  };

  const onFontChange = (font: string) => {
    alert("font: " + font);
  };

  const onColorChange = (color: any) => {
    setPreferences({ ...preferences, ...color });
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
              onClick={openFileUpload}
            >
              <img className="" src="/icons/image.svg" alt="img" />
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
              onClick={openFileUpload}
            >
              <img className="" src="/icons/profile.svg" alt="img" />
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
                <ToggleButton onChange={onShadowChange} />
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
                <ToggleButton onChange={onStrokeChange} />
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
            <div className="">
              <Dropdown
                options={fontOptions}
                onSelect={(option) => onFontChange(option.value)}
              />
            </div>
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex flex-col">
            <h3>Chatbot logo</h3>
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
            <input type="text" className="input-text rounded-full px-4 py-2" />
          </div>

          <div className="border-1 my-4"></div>

          <div className="flex flex-col">
            <h3>Menu buttons' labels</h3>
            <h5 className="py-2">
              Customize default labels for the main menu’s buttons.
            </h5>
            <input
              type="text"
              className="input-text rounded-full max-w-[320px] px-4 py-2"
            />
            <div className="flex items-center cursor-pointer mt-2 mb-4">
              <img src="/icons/plus.svg" alt="+" className="mr-2" />
              <h5>Add more buttons</h5>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
