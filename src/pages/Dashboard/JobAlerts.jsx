import React from "react";
import { Accordion, Container } from "react-bootstrap";

const JobAlerts = () => {
  return (
    <Container>
      <h2 className="mb-4">Job Alerts</h2>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to set up job alerts?</Accordion.Header>
          <Accordion.Body>
            Set up job alerts by going to the job alerts section and specifying
            your job preferences.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How to manage job alerts?</Accordion.Header>
          <Accordion.Body>
            Manage your job alerts in the job alerts section where you can edit
            or delete existing alerts.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How to disable job alerts?</Accordion.Header>
          <Accordion.Body>
            Disable job alerts by turning off the notifications in the job
            alerts settings.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default JobAlerts;
