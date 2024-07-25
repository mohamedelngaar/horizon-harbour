import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, decode it to get user information
    if (token) {
      const decoded = jwtDecode(token);
      // Extract user's role from decoded token
      const info = decoded;
      setUserInfo(info);
    } else {
      // If no token found, set user role to null
      setUserInfo(null);
    }
  }, []);

  return userInfo;
};
