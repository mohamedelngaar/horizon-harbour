import React from "react";

import Accordion from "react-bootstrap/Accordion";

const GettingStarted = () => {
  return (
    <>
      <h2 className="mb-4">Getting Started</h2>

      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is My Applications?</Accordion.Header>
          <Accordion.Body>
            My Applications is a way for you to track jobs as you move through
            the application process. Depending on the job you applied to, you
            may also receive notifications indicating that an application has
            been actioned by an employer.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How to access my applications history?
          </Accordion.Header>
          <Accordion.Body>
            To access applications history, go to your My Applications page on
            your dashboard profile. You must be signed in to your JobHuntly
            account to view this page.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Not seeing jobs you applied in your my application list?
          </Accordion.Header>
          <Accordion.Body>
            Please note that we are unable to track materials submitted for jobs
            you apply to via an employer's site. As a result, these applications
            are not recorded in the My Applications section of your JobHuntly
            account. We suggest keeping a personal record of all positions you
            have applied to externally.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default GettingStarted;
