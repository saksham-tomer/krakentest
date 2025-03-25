import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useUserCookie = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch {
        console.error("Error parsing cookie!");
      }
    }
  }, []);

  return user;
};
export default useUserCookie;
