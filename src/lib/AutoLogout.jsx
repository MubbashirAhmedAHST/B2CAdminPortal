"use client";
import routes_list from "@/router/routes-list";
import { logout } from "@/store/reducers/AuthSlicers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AutoLogout() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const expiry = useSelector((state) => state.auth.expiry);
  console.log(accessToken ,expiry)
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (accessToken && expiry) {
      console.log("Mounting AutoLogout effect");
      const expiryTimeTimestamp = new Date(expiry).getTime();
      const currentTime = Date.now();
      const timeLeft = expiryTimeTimestamp - currentTime;
      console.log("Time left: ", timeLeft);
      console.log("Current time: ", currentTime);
      console.log("Expiry time: ", expiryTimeTimestamp);

      if (timeLeft <= 0) {
        console.log("Session expired, logging out");
        dispatch(logout());
        router.push(routes_list.login);
      } else {
        console.log("Session active, setting timeout for " + timeLeft + "ms");
        const timeout = setTimeout(() => {
          console.log("Session expired, logging out");
          dispatch(logout());
          router.push(routes_list.login);
        }, timeLeft);
        return () => clearTimeout(timeout);
      }
    }
  }, [accessToken, expiry]);

  return <></>;
}
