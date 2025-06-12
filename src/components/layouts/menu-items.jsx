import {
  PiUserSquareBold,
  PiAtomBold,
  PiUserListBold,
  PiUserCirclePlusBold,
  PiBoatBold,
  PiStorefrontBold,
  PiChartBarBold,
  PiWrenchBold,
} from "react-icons/pi";

import routes_list from "@/router/routes-list"; // ✅ Updated path for Next.js aliasing

export const menuItems = [
  {
    name: "Dashboard",
    href: routes_list.dashboard,
    icon: <PiAtomBold />,
    type: "all",
  },

  {
    name: "Vendor Management",
    type: "all",
    href: "#",
    icon: <PiStorefrontBold />,
    dropdownItems: [
      {
        name: "List of Vendors",
        href: routes_list.vendor_list,
        icon: <PiStorefrontBold />,
      },
      {
        name: "Add New Vendor",
        href: routes_list.create_vendor,
        icon: <PiUserCirclePlusBold />,
      },
    ],
  },
  {
    name: "Customer Management",
    type: "all",
    href: "#",
    icon: <PiUserListBold />,
    dropdownItems: [
      {
        name: "List of Customers",
        href: routes_list.customer_list,
        icon: <PiUserListBold />,
      },
    ],
  },
  {
    name: "Ship Management",
    type: "all",
    href: "#",
    icon: <PiBoatBold />,
    dropdownItems: [
      {
        name: "List of Shipments",
        href: routes_list.shipment_list,
        icon: <PiBoatBold />,
      },
    ],
  },
  {
    name: "Employee Management",
    type: "all",
    href: "#",
    icon: <PiUserSquareBold />,
    dropdownItems: [
      {
        name: "List of Employees",
        href: routes_list.employee_list,
        icon: <PiUserSquareBold />,
      },
      {
        name: "Add New Employee",
        href: routes_list.create_employee,
        icon: <PiUserCirclePlusBold />,
      },
    ],
  },

  {
    name: "Promotion Management",
    type: "all",
    href: "#",
    icon: <PiUserSquareBold />,
    dropdownItems: [
      {
        name: "List of Promotion",
        href: routes_list.promotion_list,
        icon: <PiUserSquareBold />,
      },
      {
        name: "Add New Promotion",
        href: routes_list.create_promotion,
        icon: <PiUserCirclePlusBold />,
      },
    ],
  },

  {
    name: "Settings",
    type: "all",
    href: "#",
    icon: <PiWrenchBold />,
    dropdownItems: [
      {
        name: "Manage Rate Groups",
        href: routes_list.rategroup_list,
        icon: <PiChartBarBold />,
      },
      {
        name: "Manage Role",
        href: routes_list.role_list,
        icon: <PiChartBarBold />,
      },
    ],
  },
];
