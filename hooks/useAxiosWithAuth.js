"use client";

import { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { logout } from "@/utlis/logoutUser";

const useAxiosWithAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getToken = () => {
    const token = Cookie.get("access_token");
    return token;
  };

  const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.log("No token found in cookies.");
      }
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }

      setLoading(true);
      return config;
    },
    (error) => {
      setError(error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false);
      setData(response);
      return response;
    },
    (error) => {
      setLoading(false);

      if (error.response && error.response.status === 401) {
        logout();
      }
      setError(error);
      return Promise.reject(error);
    }
  );

  const getData = async (method, url, payload = {}) => {
    try {
      setLoading(true);
      const response = await axiosInstance[method](url, payload);
      const data = response.data;
      setData(response.data.success.data);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    axiosInstance,
    getData,
    data,
    loading,
    error,
  };
};

export default useAxiosWithAuth;
