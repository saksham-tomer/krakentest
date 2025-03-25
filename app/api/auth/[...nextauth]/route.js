import axios from "axios";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        (account.provider === "google" || account.provider === "discord") &&
        account.access_token
      ) {
        let payload;
        console.log(account.provider)
        if (account.provider === "google") {
          payload = { token: account.id_token, provider: "google" };
        } else if (account.provider === "discord") {
          payload = { token: account.access_token, provider: "discord" };
        }

        const loginEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/ai-games/login`;

        try {
          const response = await axios.post(loginEndpoint, payload);
          if (response.status === 201 || response.status === 200) {
            const { access_token, ...userData } = response.data.success.data;
            const cookie = cookies();

            // Set userdata separately for easier access
            cookie.set("user", JSON.stringify(userData), {
              httpOnly: false, // JavaScript access required to read user data
              secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
              sameSite: "Strict", // Prevent CSRF attacks
              maxAge: 15 * 24 * 60 * 60, // 15 days in seconds
              path: "/", // Cookie is available to all pages
            });

            cookie.set("access_token", access_token, {
              httpOnly: false, // Prevent JavaScript access to the cookie
              secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
              sameSite: "Strict", // Prevent CSRF attacks
              maxAge: 15 * 24 * 60 * 60, // 15 days in seconds
              path: "/", // Cookie is available to all pages
            });

            return true; // Allow sign-in
          } else {
            console.error("Failed to send token to backend", response);
            return false; // Deny sign-in
          }
        } catch (error) {
          console.error("Error during backend API call", error);
          return false; // Deny sign-in if there was an error
        }
      }
      return false;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}`;
      }
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };