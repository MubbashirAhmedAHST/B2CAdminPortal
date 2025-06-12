import { getRandomArrayElement } from "./utilities";

export const SessionVars = {
  AccessKey: "AdmAccessKey",
  Expiry: "AdmExpiry",
  ClientDetails: "AdmClientDetails"
};

export const roles = {
  Administrator: "Administrator",
  Manager: "Manager",
  Sales: "Sales",
  Support: "Support",
  Developer: "Developer",
  HRD: "HR Department",
  RestrictedUser: "Restricted User",
  Customer: "Customer",
};

export const users = [
  {
    id: 1,
    role: roles.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      1
    )}.webp`,
  },
  {
    id: 2,
    role: roles.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      2
    )}.webp`,
  },
  {
    id: 3,
    role: roles.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      3
    )}.webp`,
  },
  {
    id: 4,
    role: roles.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      4
    )}.webp`,
  },
  {
    id: 5,
    role: roles.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      5
    )}.webp`,
  },
  {
    id: 6,
    role: roles.Administrator,
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      6
    )}.webp`,
  },
];

export const rolesList = [
  {
    name: roles.Administrator,
    color: '#2465FF',
    users,
  },
  {
    name: roles.Manager,
    color: '#F5A623',
    users,
  },
  {
    name: roles.Sales,
    color: '#FF1A1A',
    users,
  },
  {
    name: roles.Support,
    color: '#8A63D2',
    users,
  },
  {
    name: roles.Developer,
    color: '#FF1A1A',
    users,
  },
  {
    name: roles.HRD,
    color: '#11A849',
    users,
  },
  {
    name: roles.RestrictedUser,
    color: '#4E36F5',
    users,
  },
  {
    name: roles.Customer,
    color: '#0070F3',
    users,
  },
];
