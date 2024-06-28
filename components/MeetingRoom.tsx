import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

const MeetingRoom = () => {
  type CallLayoutType = "grid" | "speaker-left" | "speaker-right";
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();
  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative pt-4 h-screen w-full overflow-hidden">
      <div className="relative size-full flex-center">
        <div className="flex items-center size-full max-w-[1000px]">
          <CallLayout />
        </div>
        <div
          className={cn("hidden h-[calc(100vh-86px)] ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed flex items-center justify-center bottom-1 sm:bottom-0 w-full gap-5 flex-wrap">
        <CallControls onLeave={() => router.push("/")} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              className="rounded-full bg-[#19232d] hover:bg-[#323b44]"
              size="icon"
              variant="secondary"
            >
              <LayoutList size={20} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark-1">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          aria-haspopup="true"
          className="rounded-full bg-[#19232d] hover:bg-[#323b44]"
          size="icon"
          variant="secondary"
          onClick={() => setShowParticipants(!showParticipants)}
        >
          <Users size={20} />
        </Button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
