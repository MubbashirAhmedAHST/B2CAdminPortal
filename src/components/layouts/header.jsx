"use client";

import Link from "next/link"; // ✅ Using next/link instead of react-router-dom
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import HamburgerButton from "./hamburger-button";
import HamburgerButtonMobile from "./hamburger-button-mobile";
import HeaderMenuRight from "./header-menu-right";
import Sidebar from "./sidebar";
import routes_list from "@/router/routes-list";
import { PiArrowLeftBold, PiUserCircleBold } from "react-icons/pi";
import { Button } from "rizzui";
import { useState } from "react";

export default function Header({ toggle, toggleVal }) {
  const isMounted = useIsMounted();
  const windowScroll = useWindowScroll();

  return (
    <header className="topbar">
      <nav className="navbar top-navbar navbar-expand-md navbar-light">
        {/* Left Section */}
        <div className="navbar-header bg-white-gray sm:w-[270px] xl:w-[267px] 2xl:w-[285px]">
          {/* Mobile Hamburger */}
          <HamburgerButtonMobile
            setToggle={toggle}
            toggle={toggleVal}
            view={<Sidebar className="static w-full 2xl:w-full" />}
          />

          {/* Logo */}
          <Link
            className="navbar-brand"
            style={{ height: "88px" }}
            href={routes_list.dashboard}
          >
            <span className="logo-text">
              <img
                src="\images\header-logo.png"
                alt="Logo"
                width="160"
                height="100"
              />
            </span>
          </Link>

          <Link
            className="topbartoggler d-block d-md-none waves-effect waves-light"
            href="javascript:void(0)"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <PiUserCircleBold className="me-1 h-[25px] w-[25px] fcs-orange-color" />
          </Link>
        </div>

        {/* Right Section */}
        <div className="navbar-collapse" id="navbarSupportedContent">
          {/* Back Button */}
          <Button
            onClick={() => window.history.back()} // ✅ Replaced `history.back()` for Next.js (client-side)
            variant="text"
            rounded="lg"
            className="fcs-font-size w-auto mb-0 p-0 ml-10 underline underline-offset-2 text-white"
          >
            <PiArrowLeftBold className="float-left me-1.5 h-[14px] w-[14px]" />
            Back
          </Button>

          {/* Main Navigation */}
          <ul className="navbar-nav float-left mr-auto">
            {/* Desktop Hamburger */}
            <li
              className="nav-item d-none d-md-block"
              style={{ marginLeft: "15px" }}
            >
              <HamburgerButton
                setToggle={toggle}
                toggle={toggleVal}
                view={<Sidebar className="static w-full 2xl:w-full" />}
              />
            </li>
          </ul>
          <div>
          {/* <div className="absolute right-4 top-[90px] z-50"> */}
            <HeaderMenuRight />
          </div>
        </div>
      </nav>
    </header>
  );
}
