"use client";

import Loader from "@/components/Loader";
import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";

const Home = () => {
  const now = new Date();

  const currTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  const { upcomingCalls, isLoading } = useGetCalls();

  if (isLoading) return <Loader />;

  // Ensure upcomingCalls is defined and then reverse it
  const reversedUpcomingCalls = upcomingCalls
    ? [...upcomingCalls].reverse()
    : [];

  const formatMeetingDate = (date: any) => {
    const meetingDate = new Date(date);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const time = meetingDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (meetingDate >= today && meetingDate < tomorrow) {
      return `Today at ${time}`;
    } else if (
      meetingDate >= tomorrow &&
      meetingDate < new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
    ) {
      return `Tomorrow at ${time}`;
    } else {
      return meetingDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  return (
    <section className="flex flex-col gap-10 md:gap-5 size-full">
      <div className="h-72 w-full rounded-xl bg-cover bg-hero">
        <div className="flex flex-col justify-between h-full px-5 py-8 lg:p-11">
          <h1 className="glassmorphism3 max-w-96 text-center rounded p-2">
            Upcoming Meeting:{" "}
            {reversedUpcomingCalls.length > 0
              ? formatMeetingDate(reversedUpcomingCalls[0].state?.startsAt)
              : "Nothing"}
          </h1>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold lg:text-6xl">{currTime}</h1>
            <p className="text-lg font-medium lg:text-xl">{currDate}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
