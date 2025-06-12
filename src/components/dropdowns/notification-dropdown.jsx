"use client"; // ✅ Ensures client-side component for interactivity

import { Popover } from "rizzui";
import NotificationsList from "@/components/lists/notifications-list"; // ✅ Alias path updated
import useMedia from "react-use/lib/useMedia"; // ✅ React-use for media query
import { useState } from "react";

export default function NotificationDropdown({ children, data }) {
  const isMobile = useMedia("(max-width: 480px)", false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <NotificationsList setIsOpen={setIsOpen} data={data} />}
      shadow="sm"
      placement={isMobile ? "bottom" : "bottom-end"}
      tooltipArrowClassName="fcs-dark-blue-fill-color"
      className="rounded-xl py-0 z-50 px-0 dark:bg-gray-100 [&>svg]:hidden [&>svg]:dark:fill-gray-100 sm:[&>svg]:inline-flex"
    >
      {children}
    </Popover>
  );
}
