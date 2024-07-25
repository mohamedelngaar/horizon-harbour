import React from "react";

import { Accordion, Container } from "react-bootstrap";

const MyProfile = () => {
  return (
    <Container>
      <h2 className="mb-4">My Profile</h2>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to change profile picture?</Accordion.Header>
          <Accordion.Body>
            To change your profile picture, go to the profile section and click
            on the current picture to upload a new one.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How to update bio?</Accordion.Header>
          <Accordion.Body>
            You can update your bio in the profile section by clicking the edit
            button next to the bio section.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How to manage privacy settings?</Accordion.Header>
          <Accordion.Body>
            Privacy settings can be managed under the settings section of your
            profile.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default MyProfile;
