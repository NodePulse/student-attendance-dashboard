"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Sidebar = () => {
  const { user } = useKindeBrowserClient();
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutIcon, path: "/dashboard" },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();

  return (
    <div className="border shadow-md h-screen p-5">
      <Image
        priority
        src="/logo.svg"
        alt="logo"
        width={100}
        height={50}
        style={{ width: "100%", height: "auto" }}
      />
      <hr className="my-5" />
      {menuList.map((menu) => (
        <Link href={menu.path} key={menu.id}>
          <h2
            key={menu.id}
            className={`flex items-center gap-3 text-lg p-4 text-stone-500
           hover:bg-primary hover:text-white rounded-lg cursor-pointer
           my-2 ${path === menu.path && "bg-primary text-white"} `}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      <div className="flex gap-2 items-center bottom-5 fixed p-2">
        <Image
          src={user?.picture ? user.picture : "/user.svg"}
          width={35}
          height={35}
          alt="profile"
          className={`rounded-full border border-black ${
            user?.picture ? "" : "hidden"
          }`}
        />
        <div className="">
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-400">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
