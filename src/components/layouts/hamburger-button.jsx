"use client";

import { ActionIcon } from "rizzui";
import { cn } from "@/helpers/utilities"; // Adjusted for Next.js alias imports

export default function HamburgerButton({ className = "", setToggle, toggle }) {
  const openMenu = () => {
    setToggle(toggle === 0 ? 1 : 0);
  };

  return (
    <ActionIcon
      aria-label="Open Sidebar Menu"
      variant="text"
      className={cn(
        "me-3 h-auto w-auto p-0 sm:me-4 xl:hidden", // Adjust for responsive design
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
        />
      </svg>
    </ActionIcon>
  );
}
