import MeetingTypeList from "@/components/MeetingTypeList";

const Home = () => {
  const now = new Date();

  const currTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const currDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="flex flex-col gap-10 md:gap-5 size-full">
      <div className="h-72 w-full rounded-xl bg-cover bg-hero">
        <div className="flex flex-col justify-between h-full px-5 py-8 lg:p-11">
          <h1 className="glassmorphism3 max-w-72 text-center rounded p-2">
            Upcoming Meeting at: 12:30 PM
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
