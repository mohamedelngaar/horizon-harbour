import React from "react";
import { Link } from "react-router-dom";

import { FaArrowRight } from "react-icons/fa6";

import "./CompanyDetails.css";

const CompanyCard = ({ company }) => {
  return (
    <div className=" col-md-6">
      <div className="job-card mb-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column gap-3">
            <img src={company?.logo} alt="company logo" className="w-25" />
            <span className="fw-bolder">{company?.name}</span>
          </div>
          <div>
            <span className="jobs-counter">{company?.employees}</span>
          </div>
        </div>

        <div className="mt-3">
          <Link
            to={`/companies/${company?._id}`}
            className="companies-read-more-link"
          >
            <p className="mb-4">
              Read more about company profile <FaArrowRight />
            </p>
          </Link>
          <div className="d-flex flex-wrap justify-content-between gap-2">
            <div>
              <span className="tag tag-green">Business</span>
              <span className="tag tag-purple">Payment Gateway</span>
            </div>
            <div>
              <span>
                <Link
                  to={`/companies/${company?._id}`}
                  className="companies-read-more-link"
                >
                  Read More <FaArrowRight />
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
