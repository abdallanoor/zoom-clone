"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger icon"
            width={32}
            height={32}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-1 border-none">
          <SheetClose asChild>
            <Link href="/">
              <Image src="/images/logo.svg" alt="logo" width={90} height={90} />
            </Link>
          </SheetClose>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <section className="flex flex-col h-full gap-6 mt-10">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.route ||
                  pathname.startsWith(`${link.route}/`);
                return (
                  <SheetClose key={link.lable} asChild>
                    <Link
                      href={link.route}
                      className={cn(
                        "flex items-center gap-2 rounded-lg p-4 w-full max-w-60 opacity-50",
                        {
                          "bg-dark-2 opacity-100": isActive,
                        }
                      )}
                    >
                      <link.icon className="w-5 h-5" />
                      <p>{link.lable}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
