import React, { useState } from "react";
import { useProfile } from "../context/ProfileProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { name, setName, email, setEmail, validateEmail, error, setError } =
    useProfile();

  return (
    <div className="wrapper">
      <form>
        <h2>Register Now</h2>
        <div className="input-box">
          <input
            type="text"
            placeholder="Please enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <i className="fa-solid fa-user"></i>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Please enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="fa-solid fa-message"></i>
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            check this
          </label>
          <a href="#">{error}</a>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={(e) => {
            e.preventDefault();

            if (!name || !email) return setError("Crediential misses");
            if (!validateEmail(email)) return setError("Invalid Email");

            if (validateEmail) navigate("ProfileCard");
          }}
        >
          Register here
        </button>
        <div className="register-link">
          <p>Already register?</p>
        </div>
      </form>
    </div>
  );
};

export default Home;
