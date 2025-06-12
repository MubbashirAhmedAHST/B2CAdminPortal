"use client";

import { ActionIcon } from "rizzui";
import { cn } from "@/helpers/utilities";

export default function HamburgerButtonMobile({
  className = "",
  setToggle,
  toggle,
}) {
  const openMenu = () => {
    setToggle((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="block md:hidden">
      {" "}
      {/* ✅ Visible only on mobile */}
      <ActionIcon
        aria-label="Open Sidebar Menu"
        variant="text"
        className={cn(
          "nav-link sidebartoggler waves-effect waves-light h-auto w-auto py-0 px-2 ml-2",
          className
        )}
        onClick={openMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 fcs-orange-color"
        >
          <title>Open Menu</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
          />
        </svg>
      </ActionIcon>
    </div>
  );
}
