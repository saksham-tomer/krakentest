import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const accessToken = req.cookies.get("access_token");

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify the token using your secret key
    // The `SECRET_KEY` should match the key you used to sign the JWT on the server
    jwt.verify(accessToken, process.env.JWT_SECRET);
    // If the token is valid, allow the request to proceed
  } catch (error) {
    // If token is invalid, expired, or any other error, redirect to login
    console.error("Token validation failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/all-creators"], // Routes protected
};
