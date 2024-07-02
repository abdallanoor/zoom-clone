// @ts-nocheck

"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import { CalendarCheck, CalendarClock, Play, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { toast } from "./ui/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recording" }) => {
  const { upcomingCalls, endedCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
        setRecordings(recordings);
      } catch (error) {
        toast({
          title: "Try again later",
        });
      }
    };
    if (type === "recording") fetchRecordings();
  }, [type, callRecordings]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recording":
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous calls";
      case "upcoming":
        return "No Upcoming calls";
      case "recording":
        return "No Recording";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index: number) => (
          <MeetingCard
            key={meeting.id ?? index} // Use index as fallback if id is not available
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 26) ||
              meeting?.filename?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              meeting.state?.start_time.toLocaleString()
            }
            icon={
              type === "ended" ? (
                <CalendarCheck size={30} />
              ) : type === "upcoming" ? (
                <CalendarClock size={30} />
              ) : (
                <Video size={30} />
              )
            }
            link={
              type === "recording"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            buttonIcon1={type === "recording" ? <Play size={15} /> : undefined}
            buttonText={type === "recording" ? "Play" : "Start"}
            handleClick={
              type === "recording"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            isPreviousMeeting={type === "ended"}
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
