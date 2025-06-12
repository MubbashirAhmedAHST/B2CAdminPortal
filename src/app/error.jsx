"use client";

import routes_list from "@/router/routes-list";
import "../assets/css/global.css";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import Link from "next/link";
import { PiHouseLineDuotone } from "react-icons/pi";


export default function ErrorPage({ error }) {
  return (
    // <html lang="en">
    //   <head>
    //     <meta charSet="UTF-8" />
    //     <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //     <link
    //       rel="stylesheet"
    //       href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    //     />
    //     <link
    //       rel="stylesheet"
    //       href="https://cdn.materialdesignicons.com/5.9.55/css/materialdesignicons.min.css"
    //     />
    //     <link rel="stylesheet" type="text/css" href="/css/custom.css" />
    //     <title>Error | Admin | Click Ship & Go</title>
    //   </head>

    //   <body className="font-NunitoSans antialiased">
        <div className="bg-gray-100 p-10 w-full h-screen flex flex-col items-center justify-center">
          <Link
            className="navbar-brand"
            style={{ height: "88px" }}
            href={routes_list.dashboard}
          >
            <span className="logo-text">
              <img
                src="\images\header-logo.png"
                alt="Logo"
                width="250"
                height="100"
              />
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-red mb-4">
            Something went wrong! 
          </h1>
          <p className="mb-1">Sorry for the inconvenience. </p>
          <p className="text-red mb-6">ERROR: {error ? error.message : "Something went wrong"}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-auto flex items-center"
          >
            <PiHouseLineDuotone className="mr-1.5 text-lg" />Go Back
          </button>
        </div>
    //   </body>
    // </html>
  );
}
