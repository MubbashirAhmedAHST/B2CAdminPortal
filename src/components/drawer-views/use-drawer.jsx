import { atom, useAtomValue, useSetAtom } from "jotai";
import React, { useState } from "react";

export function useDrawer() {
  const DrawerPlacements = "left" | "right" | "top" | "bottom";
  // const DrawerTypes = {
  //   view: React.ReactNode,
  //   isOpen: Boolean,
  //   placement: String,
  //   customSize: String,
  // };
  const drawerAtom = //atom<DrawerTypes>
    {
      isOpen: false,
      view: null,
      placement: "right",
      customSize: "320px",
    };
  // const state = useAtomValue(drawerAtom);
  // const setState = useSetAtom(drawerAtom);
  let [state, setState] = useState(drawerAtom);

  const openDrawer = ({ view, placement, customSize }) => {
    setState({
      ...state,
      isOpen: true,
      view,
      placement,
      customSize,
    });
  };

  const closeDrawer = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}
