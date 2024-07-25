import React from "react";
import { Accordion, Container } from "react-bootstrap";

const JobSearchTips = () => {
  return (
    <Container>
      <h2 className="mb-4">Job Search Tips</h2>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How to optimize your resume?</Accordion.Header>
          <Accordion.Body>
            Optimize your resume by including relevant keywords and highlighting
            your key achievements.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How to prepare for an interview?</Accordion.Header>
          <Accordion.Body>
            Prepare for an interview by researching the company and practicing
            common interview questions.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How to network effectively?</Accordion.Header>
          <Accordion.Body>
            Network effectively by attending industry events and connecting with
            professionals on LinkedIn.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default JobSearchTips;
