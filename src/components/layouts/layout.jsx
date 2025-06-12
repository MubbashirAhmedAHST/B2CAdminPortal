"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { constants } from "@/helpers/constants";
import { FetchData_GET } from "@/helpers/dal";
import { GetClientDetails } from "@/helpers/auth";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import Link from "next/link"; // ✅ Next.js native link
import { useSelector } from "react-redux";

export default function Layout({ children }) {
  const [toggle, setToggle] = useState(0);
  const [isPermission, setIsPermission] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // const [details] = useState(GetClientDetails());
  const details = useSelector((state) => state.auth.user);
  // useEffect(() => {
  //   const checkPermission = async () => {
  //     setIsLoading(true);
  //     const pathName = window.location.pathname;

  //     const result = await FetchData_GET(
  //       `${constants.CheckUserHavePagePermissionAPI}?userID=${details.adminId}&userType=ADMIN&urlPathName=${pathName.replace(/^\//, "")}`
  //     );

  //     console.log(result); // For debugging, can be removed in production

  //     if (result) {
  //       setIsPermission(true); // Assuming you handle this based on result later
  //     } else {
  //       setIsPermission(false);
  //     }

  //     setIsLoading(false);
  //   };

  //   checkPermission();
  // }, [details.adminId]);

  return (
    <>
      <main className="flex min-h-screen flex-grow bg-white-gray relative">
        {/* Header */}
        <Header toggle={setToggle} toggleVal={toggle} />

        {/* Sidebar - Desktop */}
        <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />

        {/* Content */}
        <div
          className="w-full xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]"
          style={{ marginTop: "85px" }}
        >
          {children}
          {/* {!isLoading ? (
            isPermission ? (
              
            ) : (
              <div className="card">
                <div className="card-body">
                  <Title as="h5" className="fcs-red-color">
                    You are not allowed to access this page.{" "}
                    <button
                      onClick={() => window.history.back()}
                      className="w-[63px] mb-2 p-0 ml-0 underline underline-offset-2 text-primary"
                    >
                      Click here to go back.
                    </button>
                  </Title>
                </div>
              </div>
            )
          ) : (
            <SpinnerLoader showLoadingText={true} />
          )} */}
        </div>
      </main>

      {/* Mobile Sidebar */}
      {toggle === 1 && (
        <div id="mobile_menu" className="fixed inset-0 z-50 bg-white">
          <Sidebar toggle={setToggle} toggleVal={toggle} />
        </div>
      )}
    </>
  );
}
