import React from "react";
import { Link } from "react-router-dom";

import "./JobDetails.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card d-flex flex-column gap-5 flex-md-row align-items-center justify-content-between mb-4">
      <div className="d-flex gap-4 w-75">
        <div className="me-4 job-logo-company-container">
          <img src={job?.joblogo} alt="company logo" className="w-75" />
        </div>
        <div className="d-flex flex-column gap-2">
          <h4 className="fw-bold">{job?.jobTitle}</h4>
          <span className="lead fs-6">{`${job?.companyName} - ${job?.jobLocation}`}</span>
          <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
            <span className="tag tag-green">{job?.workingHrs}</span>
            <span className="vertical-divider"></span>
            <span className="tag tag-orange">{job?.jobCategory}</span>
            <span className="vertical-divider"></span>
            {job?.skillsReq?.map((skill, index) => (
              <span className="tag tag-purple" key={index}>
                {skill}
              </span>
            ))}
            {job?.remote && <span className="tag tag-blue">Remote</span>}
          </div>
        </div>
      </div>
      <div>
        <button className="apply-job-btn">
          <Link to={`/jobs/${job?._id}`} className="apply-job-btn-link">
            Job Details
          </Link>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
