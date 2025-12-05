import { Navigate } from "react-router-dom";
import React, { Children, useContext, useEffect, useState } from "react";
import { ProfileContext } from "./ProfileContext";
const CLOUDINARY_CLOUD_NAME = "digidg6yu";
const CLOUDINARY_UPLOAD_PRESET = "my_react_upload";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
export const ProfileProvider = ({ children }) => {
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [upLoadedURL, setUpLoadedURL] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState(function () {
    const validURL = localStorage.getItem("submittedUrl");
    return validURL ? JSON.parse(validURL) : " ";
  });
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
      localStorage.setItem("submittedUrl", JSON.stringify(submittedUrl));
    },
    [submittedUrl]
  );
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
  const isValidUrl = (string) => {
    try {
      new URL(string);
      setSubmittedUrl(string);

      return true;
    } catch (err) {
      return setImageError("Please enter a valid image URL");
    }
  };

  const validateEmail = (email) => {
    // A common regex for basic email format validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleUpload = async () => {
    if (!submittedUrl) return;
    isValidUrl(submittedUrl);
    if (!isValidUrl(submittedUrl)) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", submittedUrl);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const response = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        alert("uploaded successfully");
        // The 'data' object contains the secure_url and other details
        setUpLoadedURL(data.secure_url);
        return console.log("upload", upLoadedURL);
      } else {
        setImageError("upload fail", response.statusText);
        return null;
      }
    } catch (err) {
      setImageError(err);
    } finally {
      setLoading(false);
    }
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
        submittedUrl,
        setSubmittedUrl,
        imageError,
        setImageError,
        loading,
        setLoading,
        upLoadedURL,
        setUpLoadedURL,
        handleUpload,
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
