import React from "react";

import { Link } from "react-router-dom";

import "./Logout.css";

const LogoutGoogle = ({ handleSignOut }) => {
  return (
    <div>
      <Link to="/login">
        <button
          className="fw-bold border-0 custom-padding mt-2"
          onClick={handleSignOut}
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default LogoutGoogle;
