"use client";
import React from "react";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky top-0 left-0 flex w-fit h-[calc(100vh-72px)] flex-col justify-between bg-dark-1 p-5 pt-10 max-sm:hidden lg:w-[264px] scroll overflow-auto">
      <div className="flex flex-1 flex-col gap-3">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.lable}
              className={cn(
                "flex items-center justify-start gap-2 rounded-lg p-4 lg:p-3 hover:bg-blue-1/5 transition-colors",
                {
                  "bg-blue-1 hover:bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.lable}
                width={17}
                height={17}
              />
              <p className=" font-medium max-lg:hidden">{link.lable}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
