import React from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import "./Logout.css";

const Logout = ({ handleSignOut }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");

    toast("Successfully signed out!", {
      icon: "👋",
    });
  };

  return (
    <div>
      <a href="/login">
        <button
          className="fw-bold border-0 custom-padding mt-2"
          onClick={handleLogout}
        >
          Logout
        </button>
      </a>
    </div>
  );
};

export default Logout;
