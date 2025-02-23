"use client";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState("");
  const [existingUserID, setExistingUserID] = useState(null);

  useEffect(() => {
    if (userID === null) {
      localStorage.removeItem("userID");
      setIsLoading(false);
    } else if (userID !== "" && userID !== null) {
      localStorage.setItem("userID", userID);
      setIsLoading(false);
    } else {
      setExistingUserID(localStorage.getItem("userID"));
      setIsLoading(false);
    }
  }, [userID]);

  if (isLoading) {
    return <></>;
  }

  return (
    <UserContext.Provider
      value={{ userEmail, setUserEmail, userID, setUserID, existingUserID }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
