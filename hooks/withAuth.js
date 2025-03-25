"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import Cookie from "js-cookie";

const withAuth = (Component) => {
  const WrappedComponent = (props) => {
    const accessToken = Cookie.get("access_token");

    useEffect(() => {
      if (!accessToken) {
        redirect("/login"); // Redirect to the login page if not authenticated
      }
    }, [accessToken]);

    if (!accessToken) {
      return null; // Optionally show a loading spinner here
    }

    return <Component {...props} />;
  };

  // Set the display name for debugging purposes
  WrappedComponent.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withAuth;
