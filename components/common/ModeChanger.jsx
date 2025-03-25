"use client";

import { useEffect } from "react";

export default function ModeChanger() {
  useEffect(() => {
    const htmlElm = document.getElementsByTagName("html")[0];
    const currentState = localStorage?.getItem("idDarkMode");
    if (!currentState || JSON.parse(currentState) == true) {
      htmlElm.classList.add("dark");
    } else {
      htmlElm.classList.remove("dark");
    }
  }, []);
  return <></>;
}
