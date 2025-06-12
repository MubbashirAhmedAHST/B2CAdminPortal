"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Use Next.js router
import { Text, Title } from "rizzui";
import { SignOutClient } from "@/helpers/auth"; // ✅ Use alias path
import routes_list from "@/router/routes-list"; // ✅ Use alias path
import { reloadURL } from "@/helpers/utilities"; // ✅ Use alias path
import Image from "next/image"; // ✅ Use Next.js optimized Image
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/reducers/AuthSlicers";
import { useEffect } from "react";

export default function ProfileDropdown({ details }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isEmpty = !user;

  const signOut = () => {
    router.push(routes_list.login);
    dispatch(logout());
  };

  const menuItems = [
    {
      name: "My Profile",
      href: `${routes_list.my_profile}`,
    },
    // {
    //   name: "Change Password",
    //   // href: routes_list.change_password,
    //   href: "#",
    // },
    // {
    //   name: "Notifications",
    //   // href: routes_list.view_all_notifications,

    //   href: "#",
    // },
  ];

  return (
    <div className="w-auto text-left rtl:text-right">
      {/* Profile Header */}
      <div className="flex items-center border-b border-gray-300 p-[15px] mb-1 fcs-dark-blue-bg-color rounded-t-xl">
        <Image
          src="/imgs/avatar.webp"
          alt="Avatar"
          className="rounded-full inline"
          width={80}
          height={80}
          priority
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold text-white">
            {`${details?.firstName} ${details?.lastName}`}
          </Title>
          <Text className="fcs-font-size text-white">{details?.email}</Text>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => reloadURL(item.href)} // Optional page reload
            className="group flex items-center hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
            style={{ padding: ".65rem 1rem" }}
          >
            {item.name}
          </Link>
        ))}
        {/* Logout Button */}
        <button
          type="button"
          onClick={signOut}
          className="justify-start group flex items-center hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          style={{ padding: "0.65rem 0.9rem" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
