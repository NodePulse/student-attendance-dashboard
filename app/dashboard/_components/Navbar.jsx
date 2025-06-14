"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="p-4 shadow-md border flex justify-between">
      <div className=""></div>
      <div className="">
        <Image
          src={user?.picture ? user.picture : "/user.svg"}
          width={35}
          height={35}
          alt="profile"
          className={`rounded-full border border-black ${
            user?.picture ? "" : "hidden"
          }`}
        />
      </div>
    </div>
  );
};

export default Navbar;
