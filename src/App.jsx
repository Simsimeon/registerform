import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./page/Home";
import { ProfileProvider } from "./context/ProfileProvider";
import ProfileCard from "./page/ProfileCard";

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProfileCard" element={<ProfileCard />} />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
