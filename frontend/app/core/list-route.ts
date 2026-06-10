import {
  RiDashboardLine,
  RiBookOpenLine,
  RiCalendarCheckLine,
  RiHistoryLine,
  RiUserLine,
  RiBankCardLine,
  type RemixiconComponentType,
} from "@remixicon/react";

export interface MenuItem {
  title: string;
  icon: RemixiconComponentType;
  path: string;
  children?: MenuItem[];
}
// sidebar-menu.ts

export const sidebarRouteMenu: MenuItem[] = [
  {
    title: "Dashboard",
    path: "/",
    icon: RiDashboardLine,
  },
  {
    title: "Kelas",
    path: "/kelas",
    icon: RiBookOpenLine,
    children: [
      {
        title: "Daftar Kelas",
        path: "/kelas/daftar",
        icon: RiBookOpenLine,
      },
      {
        title: "Booking Kelas",
        path: "/kelas/booking",
        icon: RiCalendarCheckLine,
      },
      {
        title: "History Kelas",
        path: "/kelas/history",
        icon: RiHistoryLine,
      },
    ],
  },

  {
    title: "Konsultasi",
    path: "/konsultasi",
    icon: RiUserLine,
    children: [
      {
        title: "Daftar Konsultasi",
        path: "/konsultasi/daftar",
        icon: RiBookOpenLine,
      },
      {
        title: "Booking Konsultasi",
        path: "/konsultasi/bookingKonsultasi",
        icon: RiCalendarCheckLine,
      },
      {
        title: "History Konsultasi",
        path: "/konsultasi/historyKonsultasi",
        icon: RiHistoryLine,
      },
    ],
  },

  {
    title: "Payment",
    path: "/payment",
    icon: RiBankCardLine,
  },

  {
    title: "User",
    path: "/user",
    icon: RiUserLine,
    // children: [
    //   {
    //     title: "Profile",
    //     path: "/user",
    //     icon: RiUserLine,
    //   },
    // {
    //   title: "Sign In",
    //   path: "/user/signIn",
    //   icon: RiLoginCircleLine,
    // },
    // {
    //   title: "Sign Up",
    //   path: "/user/signUp",
    //   icon: RiUserAddLine,
    // },
    // ],
  },
];
