"use client";

import { useEffect, useState } from "react";
import { Popover } from "rizzui";
import ProfileDropdown from "@/components/dropdowns/profile-dropdown"; // ✅ Adjusted alias path
import { cn } from "@/helpers/utilities"; // ✅ Path alias for utilities
import { GetClientDetails } from "@/helpers/auth"; // ✅ Path alias for auth helper
import Image from "next/image"; // ✅ Next.js optimized image
import { useSelector } from "react-redux";

export default function ProfileMenu({
  buttonClassName = "",
  avatarClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const _details = useSelector((state) => state.auth.user);

  useEffect(() => {
    setIsOpen(false);
    if (_details) {
      setDetails(_details);
    }
  }, [_details]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <ProfileDropdown details={details} />}
      shadow="sm"
      placement="bottom-end"
      tooltipArrowClassName="fcs-dark-blue-fill-color"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100 profile-popup"
    >
      <button
        className={cn(
          "shrink-0 rounded-xl outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px",
          buttonClassName
        )}
        aria-label="Open Profile Menu"
      >
        <Image
          src="/imgs/avatar.webp"
          alt="User Avatar"
          width={50}
          height={50}
          className={cn("rounded-full inline", avatarClassName)}
          priority
        />
      </button>
    </Popover>
  );
}
