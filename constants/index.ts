import {
  Home,
  CalendarClock,
  CalendarCheck,
  Video,
  CircleUser,
} from "lucide-react";

export const navLinks = [
  {
    lable: "Home",
    route: "/",
    icon: Home,
  },
  {
    lable: "Upcoming",
    route: "/upcoming",
    icon: CalendarClock,
  },
  {
    lable: "Previous",
    route: "/previous",
    icon: CalendarCheck,
  },
  {
    lable: "Recordings",
    route: "/recordings",
    icon: Video,
  },
  {
    lable: "Personal Room",
    route: "/personal-room",
    icon: CircleUser,
  },
];

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  // "/images/avatar-5.png",
];
