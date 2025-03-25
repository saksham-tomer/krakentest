"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";
import useUserCookie from "@/hooks/useUserCookie";

// interface UserContextType {
//   profile: any;
//   getProfile: () => void;
// }

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [gamePointCoupons, setGamePointCoupons] = useState([]);
  const [creatorCoupons, setCreatorCoupons] = useState([]);

  const user = useUserCookie();

  const { axiosInstance, loading, error } = useAxiosWithAuth();
  

  async function getProfile(){
    console.log("Get profile API called");
    try {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_BACKEND_URL+"/ai-games/profile");
      // Access the data using the assumed structure: response.data.success.data
      if (response.data && response.data.success) {
        setProfile(response.data.success.data); // set user profile with data
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  async function fetchCoupons() {
    console.log("Get coupons API called");
    try {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/ai-games/coupons/");
      console.log(response);
      // Assuming the response structure contains an array of coupons
      // You can set the coupons to state here when ready to display them
      setGamePointCoupons(response.data.game_point_coupons);
      setCreatorCoupons(response.data.creator_coupons);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  }

  useEffect(() => {
    if (user) {
      getProfile();
      fetchCoupons();

    }
  }, [user]);
  

  return (
    <UserContext.Provider value={{ profile, getProfile, gamePointCoupons, creatorCoupons, fetchCoupons }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}