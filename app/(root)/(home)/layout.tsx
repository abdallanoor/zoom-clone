import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="pt-8 sm:pt-10 flex h-[calc(100vh-68px)] bg-dark-2 sm:rounded-ss-xl flex-col flex-1 scroll overflow-auto">
          <div className="px-6 sm:px-10 pb-6">
            <div className="w-full max-w-6xl mx-auto">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
