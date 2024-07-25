import React from "react";
import { Container } from "react-bootstrap";

import { Link } from "react-router-dom";

const Messages = () => {
  return (
    <Container className="mb-4 mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="dashboard-text">Messages</h1>
        <Link to="/">
          <button className="dashboard-back-to-home-btn">
            Back to homepage
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default Messages;
