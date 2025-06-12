"use client";

import "../assets/css/global.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store/store";
import { useEffect } from "react";
import "@progress/kendo-theme-bootstrap/dist/all.css";
import { Nunito } from "next/font/google";
import Loader from "./loader";
import AutoLogout from "@/lib/AutoLogout";
import ScrollToTopOnPageChange from "@/components/ui/scroll-to-top-on-page-change";

const nunito = Nunito({ subsets: ["latin"], weight: ["300", "400", "700"] });
export default function RootLayout({ children }) {
  useEffect(() => {
    let tries = 0;
    const maxTries = 10;
    const interval = setInterval(() => {
      const div = document.querySelector(
        'div[style*="display: flex"][style*="justify-content: center"][style*="position: fixed"][style*="background-color: rgb(255, 192, 0)"]'
      );

      if (div) {
        div.style.display = "none";
        console.log("License div is now hidden.");
        clearInterval(interval);
      } else {
        tries++; // Increment the counter
        console.log(`License div not found. Try ${tries}/${maxTries}`);

        // Check if maximum tries have been reached
        if (tries >= maxTries) {
          console.log(
            "Max tries reached. Stopping the search for the license div."
          );
          clearInterval(interval); // Clear the interval after max tries
        }
      }
    }, 1000); // Check every second

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.materialdesignicons.com/5.9.55/css/materialdesignicons.min.css"
        />
        <link rel="stylesheet" type="text/css" href="/css/custom.css" />
        <title>Admin | Click Ship & Go</title>
      </head>

      <body className="font-NunitoSans antialiased">
        <Provider store={store}>
          <Loader />
          <ScrollToTopOnPageChange />
          <AutoLogout />
          <PersistGate loading={null} persistor={persistor}>
            <div id="root">{children}</div>

            {/* Scripts should be after root */}
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="/js/check.js"></script>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
