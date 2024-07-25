import React from "react";
import { Link } from "react-router-dom";

import { Container } from "react-bootstrap";

import { useUserInfo } from "../../customHooks/userInfo";
import newfeaturenote from "../../../src/assets/images/new-feature-note.png";
import { useFetchJobApplications } from "../../fetchers/jobAppsService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import "./Dashboard.css";

const Applications = () => {
  const userInfo = useUserInfo();

  const { data, isLoading, isError } = useFetchJobApplications();

  const userJobApplications = data?.JobApp?.filter(
    (jobApp) => jobApp?.user?._id === userInfo?._id
  );

  const formatCreatedAtDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  return (
    <>
      <Container className="mb-4 mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="dashboard-text">My Applications</h1>
          <Link to="/">
            <button className="dashboard-back-to-home-btn">
              Back to homepage
            </button>
          </Link>
        </div>
      </Container>
      <hr />
      <Container>
        <div className="d-flex flex-column gap-2 mt-4">
          <span className="fw-bold fs-5">
            Keep It Up,{" "}
            <span className="fw-bold fs-2 text-uppercase">
              {userInfo?.name}
            </span>
          </span>
          <span>Here is job applications status from July 19 - July 25.</span>
        </div>
      </Container>
      <Container>
        <div className="mt-4 d-flex align-items-center gap-4 main-new-feature-container">
          <div>
            <img src={newfeaturenote} alt="new feature note" />
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="fw-bold new-feature-text">
              A Feature Coming Soon!
            </span>
            <p>
              You can request a follow-up 7 days after applying for a job if the
              application status is in review. Only one follow-up is allowed per
              job.
            </p>
          </div>
        </div>
      </Container>
      <Container>
        <div className="mt-4">
          <h4 className="fw-bold">Applications History</h4>

          {isError && (
            <div className="error-message-container mt-5">
              <span className="fst-italic fw-bold">
                Oops! Something went wrong retrieving all applications. Try
                again later.
              </span>
            </div>
          )}

          <div className="mt-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Company Name</th>
                  <th className="p-4">Roles</th>
                  <th className="p-4">Date Applied</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userJobApplications?.map((jobApp, index) => (
                  <tr
                    key={jobApp?._id}
                    className={
                      index % 2 === 0 ? "table-row-white" : "table-row-gray"
                    }
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">Nomad</td>
                    <td className="p-4">{jobApp?.job?.jobTitle}</td>
                    <td className="p-4">
                      {formatCreatedAtDate(jobApp?.createdAt)}
                    </td>
                    <td className="p-4">
                      <span className="tag tag-orange">Pending Interview</span>
                    </td>
                    <td className="p-4">
                      <Link to="/video-call">
                        <button className="create-meeting-btn">
                          Create Meeting
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isLoading && (
            <div className="loading-spinner-container mt-5">
              <LoadingSpinner />
            </div>
          )}
          {(!userJobApplications || userJobApplications.length === 0) && (
            <div className="error-message-container mt-5">
              <span className="fst-italic fw-bold">
                Oops! You have no job applications yet.{" "}
                <Link to="/jobs">Click here to apply for a job</Link>
              </span>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Applications;
