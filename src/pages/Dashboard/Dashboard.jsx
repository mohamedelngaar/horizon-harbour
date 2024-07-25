import { useState } from "react";

import { Button, Collapse, Container, Nav } from "react-bootstrap";

import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPhotoVideo } from "react-icons/fa";

import firstSidebarShape from "../../assets/images/sidebar-first-shape.png";
import secondSidebarShape from "../../assets/images/sidebar-second-shape.png";

import { Link, Outlet } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="d-flex">
      <div className={`sidebar ${open ? "open" : "closed"}`}>
        <Nav className="flex-column gap-2 mt-5">
          <Nav.Link
            as={Link}
            to="/dashboard"
            className="d-flex align-items-center gap-3"
          >
            <IoHomeOutline className="fs-4" />
            {open && "Dashboard"}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="messages"
            className="d-flex align-items-center gap-3"
          >
            <MdOutlineMessage className="fs-4" />
            {open && "Messages"}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="applications"
            className="d-flex align-items-center gap-3"
          >
            <IoDocumentTextOutline className="fs-4" />
            {open && "My Applications"}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="profile"
            className="d-flex align-items-center gap-3"
          >
            <CiUser className="fs-4" />
            {open && "My Public Profile"}
          </Nav.Link>
          <hr className="sidebar-hr" />
          {open && <span className="sidebar-settings-text">Settings</span>}
          <Nav.Link
            as={Link}
            to="ai-video-analyzer"
            className="d-flex align-items-center gap-3"
          >
            <FaPhotoVideo className="fs-4 " />
            {open && "AI Video Analyzer"}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="help"
            className="d-flex align-items-center gap-3 "
          >
            <FiHelpCircle className="fs-4" />
            {open && "Help Center"}
          </Nav.Link>
        </Nav>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="sidebar"
          aria-expanded={open}
          className="mb-3 sidebar-collapse-btn"
        >
          {open ? (
            <FaArrowLeft className="left-arrow-sidebar" />
          ) : (
            <FaArrowRight className="right-arrow-sidebar" />
          )}
        </Button>
        <img
          src={firstSidebarShape}
          className="first-sidebar-shape"
          alt="first-sidebar-shape"
        />
        <img
          src={secondSidebarShape}
          className="second-sidebar-shape"
          alt="second-sidebar-shape"
        />
      </div>
      <div className="content">
        <Container className="mb-4">
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
