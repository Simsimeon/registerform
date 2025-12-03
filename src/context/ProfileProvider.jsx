import { Navigate } from "react-router-dom";
import React, { Children, useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfileContext";
export const ProfileProvider = ({ children }) => {
  const [name, setName] = useState(function () {
    const fuLllName = localStorage.getItem("name");
    return fuLllName ? JSON.parse(fuLllName) : " ";
  });
  const [error, setError] = useState("");
  const [email, setEmail] = useState(function () {
    const fullEmail = localStorage.getItem("email");
    return fullEmail ? JSON.parse(fullEmail) : " ";
  });
  useEffect(
    function () {
      localStorage.setItem("name", JSON.stringify(name));
    },
    [name]
  );
  useEffect(
    function () {
      localStorage.setItem("email", JSON.stringify(email));
    },
    [email]
  );
  const validateEmail = (email) => {
    // A common regex for basic email format validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <ProfileContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        validateEmail,
        error,
        setError,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined)
    throw new Error("PostContext was use outside of the Postprovider");
  return context;
}
