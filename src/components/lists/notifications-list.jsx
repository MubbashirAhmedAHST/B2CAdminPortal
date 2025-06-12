"use client";

import { Title } from "rizzui";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { PiMoneyDuotone, PiPackageDuotone } from "react-icons/pi";
import Link from "next/link"; // ✅ Next.js Link
import routes_list from "@/router/routes-list"; // ✅ Adjusted path for routes
import moment from "moment";
import { constants } from "@/helpers/constants"; // ✅ Adjusted path for constants

export default function NotificationsList({ setIsOpen, data }) {
  return (
    <div className="w-[320px] text-left rtl:text-right sm:w-[360px] 2xl:w-[420px]">
      <ul className="list-style-none">
        {/* Header */}
        <li>
          <div className="drop-title text-white fcs-dark-blue-bg-color rounded-t-xl">
            <span className="font-extralight tracking-wider">
              Notifications
            </span>
          </div>
        </li>

        {/* Notifications List */}
        <li>
          <SimpleBar className="max-h-[420px]">
            <div className="grid cursor-pointer grid-cols-1 gap-0 ps-0">
              {data && data.length > 0 ? (
                data.map((d, key) => (
                  <div
                    key={key}
                    className="align-middle items-center border-b group grid grid-cols-[auto_minmax(0,1fr)] gap-0 px-2 py-2 pe-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded p-1 [&>svg]:h-auto [&>svg]:w-5">
                      {d.title?.toLowerCase().includes("shipment") ? (
                        <PiPackageDuotone />
                      ) : (
                        <PiMoneyDuotone />
                      )}
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center">
                      <div className="w-full">
                        <Title
                          as="h6"
                          className="mb-0.5 w-11/12 truncate fcs-font-size !font-bold"
                        >
                          {d.title}
                        </Title>
                        <p className="fcs-font-size tracking-wide">
                          {d.description}
                        </p>
                        <span className="ms-auto whitespace-nowrap pe-8 text-xs text-gray-500">
                          {moment(d.notificationDate).format(
                            constants.DateFormatStr
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No notifications found.</div>
              )}
            </div>
          </SimpleBar>
        </li>

        {/* Footer Link */}
        <li className="py-3 border-t">
          <Link
            href={routes_list.view_all_notifications}
            onClick={() => setIsOpen(false)} // ✅ Closes popover on click
            className="nav-link text-center m-b-5 font-semibold"
          >
            Check all notifications
          </Link>
        </li>
      </ul>
    </div>
  );
}
