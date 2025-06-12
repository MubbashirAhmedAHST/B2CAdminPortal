"use client";
import { cn } from "@/lib/utils";

export default function Buttons({
  label,
  onClick,
  onclick,
  className,
  type = "button",
  variant = "contained",
  disable,
  ...props
}) {
  return (
    <button
      onClick={onClick ? onClick : onclick}
      disabled={disable}
      className={cn(
        className,
        "fs-b2c font-semibold text-white h-100 border-0 py-2 px-8 sm:px-5 focus:outline-none rounded-2xl sm:w-auto sm:text-xs",
        disable
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#cf132a] hover:bg-red-700 cursor-pointer"
      )}
      
      variant={variant}
      type={type}
      {...props}
    >
      {label}
    </button>
  );
}
