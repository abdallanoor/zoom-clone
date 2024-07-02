"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="flex-between sticky bg-dark-1 z-50 w-full px-6 py-5 lg:px-10">
      <Link href="/">
        <Image src="/images/logo.svg" alt="logo" width={90} height={90} />
      </Link>
      <div className="flex-between gap-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
