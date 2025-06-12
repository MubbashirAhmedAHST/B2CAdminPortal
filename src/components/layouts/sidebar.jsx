"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link"; // ✅ Next.js native Link
import { cn, reloadURL } from "@/helpers/utilities"; // ✅ Adjusted alias
import { PiCaretDownBold } from "react-icons/pi";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { menuItems } from "./menu-items"; // ✅ Path for menu items
import { Collapse, Title } from "rizzui";
import { GetClientDetails } from "@/helpers/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import routes_list from "@/router/routes-list";

export default function Sidebar({ className, toggle, toggleVal }) {
  const [pathname, setPathname] = useState("");
  const details = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
const router = useRouter()

  // Handle client-side routing to get pathname
  useEffect(() => {
    if(!details && !accessToken){
       router.push(routes_list.login)
    }
    setPathname(window.location.pathname);
  }, []);

  return (
    <aside
      className={cn(
        "left-sidebar fixed bottom-0 start-0 h-full w-[270px] border-e-2 border-gray-100 2xl:w-72",
        className
      )}
    >
      {/* User Profile */}
      <div className="sticky top-0 px-1 pb-0 pt-4">
        <div className="user-profile d-flex no-block dropdown m-t-20">
          <div className="user-pic">
            <img
              src="/imgs/avatar.webp"
              className="rounded-circle"
              width="50"
            />
          </div>
          <div className="user-content hide-menu ml-[10px]">
            <div className="">
              <h6 className="m-b-0 user-name text-white">Welcome!</h6>
              <span className="op-5 user-email">
                {details?.firstName} {details?.lastName}
              </span>
              <br />
              {details?.email}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <SimpleBar className="h-[calc(100%-80px)]">
        <div className="mt-4 mb-8 pb-3 3xl:mt-6">
          {menuItems.map((item, index) => {
            // Filter by type
            // if (item.type !== details?.businessType && item.type !== "all") return null;

            const isActive = pathname === item.href;
            const pathnameExistInDropdowns = item.dropdownItems?.some(
              (dropdownItem) => dropdownItem.href === pathname
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns);

            return (
              <Fragment key={`${item.name}-${index}`}>
                {item.href ? (
                  <>
                    {item.dropdownItems ? (
                      <Collapse
                        defaultOpen={isDropdownOpen}
                        header={({ open, toggle }) => (
                          <div
                            onClick={toggle}
                            className={cn(
                              "group relative mx-0 flex cursor-pointer items-center justify-between rounded-md px-0 py-1 font-medium lg:my-1 2xl:mx-5 2xl:my-2",
                              isDropdownOpen
                                ? "text-gray-200"
                                : "text-gray-200 transition-colors duration-200 hover:text-white"
                            )}
                          >
                            <span className="flex items-center fcs-font-size">
                              {item.icon && (
                                <span className="mx-3 my-0.5 flex items-center justify-center rounded-md px-2 py-2 [&>svg]:h-[20px] [&>svg]:w-[20px]">
                                  {item.icon}
                                </span>
                              )}
                              {item.name}
                            </span>
                            <PiCaretDownBold
                              className={cn(
                                "h-3.5 w-3.5 -rotate-90 transition-transform duration-200 fcs-red-color mr-3",
                                open && "rotate-0"
                              )}
                            />
                          </div>
                        )}
                      >
                        {item.dropdownItems.map((dropdownItem, idx) => {
                          // if (
                          //   dropdownItem.type !== details.businessType &&
                          //   dropdownItem.type !== "all"
                          // )
                          //   return null;

                          const isChildActive = pathname === dropdownItem.href;

                          return (
                            <Link
                              href={dropdownItem.href}
                              key={`${dropdownItem.name}-${idx}`}
                              onClick={() => reloadURL(dropdownItem.href)} // Optional reload
                              className={cn(
                                "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-2 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                                isChildActive
                                  ? "text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                                  : "text-grey-200 transition-colors duration-200 hover:text-white"
                              )}
                            >
                              <div className="flex items-center truncate">
                                {dropdownItem.icon && (
                                  <span className="text-grey-200 me-2 inline-flex items-center justify-center rounded-md [&>svg]:h-[16px] [&>svg]:w-[16px]">
                                    {dropdownItem.icon}
                                  </span>
                                )}
                                <span className="truncate fcs-font-size ml-[17px]">
                                  {dropdownItem.name}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </Collapse>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => reloadURL(item.href)}
                        className={cn(
                          "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-2 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                          isActive
                            ? "text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5"
                            : "text-grey-200 transition-colors duration-200 hover:text-white"
                        )}
                      >
                        <div className="flex items-center truncate">
                          {item.icon && (
                            <span className="me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]">
                              {item.icon}
                            </span>
                          )}
                          <span className="truncate fcs-font-size">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    )}
                  </>
                ) : (
                  <Title
                    as="h6"
                    className={cn(
                      "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8",
                      index !== 0 && "mt-6 3xl:mt-7"
                    )}
                  >
                    {item.name}
                  </Title>
                )}
              </Fragment>
            );
          })}
        </div>
      </SimpleBar>
    </aside>
  );
}
