"use client";

import { useEffect, useState } from "react";
import { ActionIcon, Badge } from "rizzui";
import NotificationDropdown from "@/components/dropdowns/notification-dropdown";
import ProfileMenu from "./profile-menu"; // Adjust as per actual path
import { constants } from "@/helpers/constants"; // Adjusted for alias path
import { FetchData_GET } from "@/helpers/dal";
import Image from "next/image"; // For optimized image rendering in Next.js

export default function HeaderMenuRight() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   async function fetchNotifications() {
  //     const result = await FetchData_GET(constants.AdminTop5Notifications);
  //     if (result) {
  //       setData(result);
  //     } else {
  //       setData([]);
  //     }
  //   }

  //   fetchNotifications();
  // }, []);

  return (
    <div className="ms-auto grid shrink-0 grid-cols-2 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4 mr-lg-4 float-right lg:float-none mt-1">
      {/* <NotificationDropdown data={data}>
        <ActionIcon
          title="Notifications"
          aria-label="Notification"
          variant="text"
          className="bg-white-gray rounded-full relative h-[50px] w-[50px] md:h-13 md:w-13"
        >
          <Image
            src="/imgs/bell.png"
            alt="Notifications"
            width={26}
            height={26}
          />
          {data.length > 0 && (
            <Badge
              renderAsDot
              color="warning"
              enableOutlineRing
              className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
            />
          )}
        </ActionIcon>
      </NotificationDropdown> */}
      <ProfileMenu />
    </div>
  );
}
