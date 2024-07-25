import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logout from "../Logout/Logout";
import LogoutGoogle from "../Logout/LogoutGoogle";
import { useAuth } from "../../customHooks/useAuth";

import logo from "../../assets/images/horizon-harbour-logo-white.png";
import menu from "../../assets/images/menu.svg";
import exit from "../../assets/images/exit.svg";

import "./Navbar.css";

const NavigationBar = ({
  user,
  handleCallbackResponse,
  handleSignOut,
  isLoggedIn,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header navbar navbar-expand-lg navbar-light bg-light">
      <div className="container ">
        <div className="header-logo-box">
          <Link to="/">
            <img className="logo" src={logo} alt="Horizon Harbour Logo" />
          </Link>
        </div>
        <img
          className={`mobile-menu ${menuOpen ? "hidden" : ""}`}
          src={menu}
          alt="Open Navigation Bar Icon"
          onClick={toggleMenu}
        />

        <nav className={`main-nav  ${menuOpen ? "menu-btn" : ""}`}>
          <img
            className={`mobile-menu-exit ${menuOpen ? "" : "hidden"}`}
            src={exit}
            alt="Close Navigation Bar Icon"
            onClick={toggleMenu}
          />
          <ul className="main-nav-list d-flex justify-content-between">
            <div className="d-flex gap-5 left-side-nav">
              <li>
                <Link className="main-nav-link" to="jobs">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link className="main-nav-link" to="companies">
                  Browse Companies
                </Link>
              </li>
              {/* <li>
                <Link className="main-nav-link" to="chat">
                  Chat
                </Link>
              </li> */}
            </div>

            <div className="d-flex align-content-center gap-3 right-side-nav">
              {isLoggedIn() && (
                <div className="logged-in-user-info-container">
                  <img
                    src={user?.picture}
                    alt="user"
                    className="logged-in-user-pfp"
                  />
                  <h3 className="logged-in-user-name">{user?.name}</h3>
                </div>
              )}
              {isLoggedIn() ? (
                <LogoutGoogle
                  handleCallbackResponse={handleCallbackResponse}
                  handleSignOut={handleSignOut}
                />
              ) : isAuthenticated ? (
                <Logout />
              ) : (
                <Link to="login">
                  <button className="text-white fw-bold bg-primary-color border-0 custom-padding mt-2">
                    Login
                  </button>
                </Link>
              )}
              <div className="vertical-line"></div>
              {isLoggedIn() || isAuthenticated ? (
                <Link to="dashboard">
                  <button className="text-white fw-bold bg-primary-color border-0 custom-padding mt-2">
                    Profile
                  </button>
                </Link>
              ) : (
                <Link to="signup">
                  <button className="text-white fw-bold bg-primary-color border-0 custom-padding mt-2">
                    Signup
                  </button>
                </Link>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
