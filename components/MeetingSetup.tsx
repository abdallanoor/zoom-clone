import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isCamToggledOn, setIsCamToggledOn] = useState(false);
  const [isMicToggledOn, setIsMicToggledOn] = useState(false);

  const call = useCall();

  if (!call)
    throw new Error("useCall must be used within streamCall component");

  useEffect(() => {
    if (isCamToggledOn) {
      call?.camera.enable();
    } else {
      call?.camera.disable();
    }
  }, [isCamToggledOn, call?.camera]);

  useEffect(() => {
    if (isMicToggledOn) {
      call?.microphone.enable();
    } else {
      call?.microphone.disable();
    }
  }, [isMicToggledOn, call?.microphone]);

  return (
    <section className="flex-center h-screen w-full flex-col gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex-center gap-3 ">
        <label htmlFor="camera" className="flex-center gap-2 ">
          <Checkbox
            id="camera"
            checked={isCamToggledOn}
            onCheckedChange={() => setIsCamToggledOn(!isCamToggledOn)}
          />
          Camera {isCamToggledOn ? "on" : "off"}
        </label>
        <label htmlFor="mic" className="flex-center gap-2 ">
          <Checkbox
            id="mic"
            checked={isMicToggledOn}
            onCheckedChange={() => setIsMicToggledOn(!isMicToggledOn)}
          />
          Mic {isMicToggledOn ? "on" : "off"}
        </label>
        <DeviceSettings />
      </div>

      <Button
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Start Meeting
      </Button>
    </section>
  );
};

export default MeetingSetup;
