"use client";

import { useState, useEffect } from "react";
import CreatorListItem from "./CreatorListItem";
import useAxiosWithAuth from "@/hooks/useAxiosWithAuth";

export default function CreatorsList() {
  const [creators, setCreators] = useState([])
  const { axiosInstance, loading, error } = useAxiosWithAuth();

  async function fetchCreators(){
    console.log("Get Creators API called");
    try {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_BACKEND_URL+"/ai-games/creators/all");
      console.log(response);
  
      // Access the data using the assumed structure: response.data.success.data
      if (response.data && response.data.success) {
        setCreators(response.data.success.data);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  }

  useEffect(()=>{
    fetchCreators();
  },[]);

  return (
    <div className="grid grid-cols-1  gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
      {creators.map((creatorData, i) => (
        <CreatorListItem key={i} creatorData={creatorData} />
      ))}
    </div>
  );
}
