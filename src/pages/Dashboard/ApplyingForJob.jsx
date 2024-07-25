import React from "react";

import { Accordion, Container } from "react-bootstrap";

const ApplyingForJob = () => {
  return (
    <Container>
      <h2 className="mb-4">Applying for a Job</h2>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to find job listings?</Accordion.Header>
          <Accordion.Body>
            Job listings can be found under the jobs section. Use filters to
            narrow down your search.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How to apply for a job?</Accordion.Header>
          <Accordion.Body>
            To apply for a job, click on the job listing and follow the
            application instructions provided.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How to track application status?</Accordion.Header>
          <Accordion.Body>
            Application status can be tracked under the applications section of
            your dashboard.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default ApplyingForJob;
