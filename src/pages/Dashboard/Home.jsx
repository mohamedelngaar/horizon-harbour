import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../customHooks/userInfo";

import { FaArrowRight } from "react-icons/fa";

import vector from "../../assets/images/Vector (Stroke).png";
import infoQuestion from "../../assets/images/Icon.png";
import mainContent from "../../assets/images/Main Content.png";
import nomad from "../../assets/images/Nomad.png";
import coursera from "../../assets/images/coursera.png";
import { useFetchJobApplications } from "../../fetchers/jobAppsService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
  const userInfo = useUserInfo();

  const { data, isLoading, isError } = useFetchJobApplications();

  const userJobApplications = data?.JobApp?.filter(
    (jobApp) => jobApp?.user?._id === userInfo?._id
  );

  const top2RecentJobApplications = userJobApplications
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  const formatCreatedAtDate = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  return (
    <div className="home-dashboard-main-container">
      <Container className="mb-4 mt-4 home-dashboard-main-container">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="dashboard-text">Dashboard</h1>
          <Link to="/">
            <button className="dashboard-back-to-home-btn">
              Back to homepage
            </button>
          </Link>
        </div>
      </Container>
      <Container>
        <div className="d-flex flex-column gap-2">
          <span className="fw-bold fs-5">
            Good Morning,{" "}
            <span className="fw-bold fs-2 text-uppercase">
              {userInfo?.name}
            </span>
          </span>
          <span>
            Here is what’s happening with your job search applications from July
            19 - July 25.
          </span>
        </div>
      </Container>
      <hr />
      <Container>
        <div className="row">
          <div className="col-md-3 mt-4">
            <div className="d-flex flex-column gap-4">
              <div className="total-jobs-applied-container d-flex flex-column gap-3">
                <span className="fw-bold fs-5">Total Jobs Applied</span>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-bolder fs-1">
                    {userJobApplications?.length}
                  </span>
                  <img src={vector} alt="vector" className="w-25" />
                </div>
              </div>
              <div className="total-jobs-applied-container d-flex flex-column gap-3">
                <span className="fw-bold fs-5">Interviewed</span>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="fw-bolder fs-1">0</span>
                  <img src={infoQuestion} alt="vector" className="w-25" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1 mt-4"></div>
          <div className="col-md-8 mt-4">
            <div className="total-jobs-applied-container d-flex flex-column gap-3">
              <span className="fw-bold fs-5">Job Applied Status</span>
              <img
                src={mainContent}
                alt="main-content-graph"
                className="main-content-graph"
              />
              <Link to="/dashboard/applications">
                <div className="d-flex align-items-center gap-2">
                  View All Applications
                  <FaArrowRight />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="mt-5 total-jobs-applied-container">
          <div className="recent-apps-container d-flex flex-column">
            <span className="fw-bold fs-4">Recent Applications History</span>
            <span className="note-most-recent-apps-text">
              Only the 2 most recent applied jobs will be displayed here!
            </span>
          </div>
          <hr />
          {isError && (
            <div className="error-message-container">
              <span className="fst-italic fw-bold">
                Oops! You have no job applications yet.{" "}
                <Link to="/jobs">Click here to apply for a job</Link>
              </span>
            </div>
          )}
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
              {top2RecentJobApplications?.map((recentJobApp, index) => (
                <tr
                  key={recentJobApp?._id}
                  className={
                    index % 2 === 0 ? "table-row-white" : "table-row-gray"
                  }
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">Nomad</td>
                  <td className="p-4">{recentJobApp?.job?.jobTitle}</td>
                  <td className="p-4">
                    {formatCreatedAtDate(recentJobApp?.createdAt)}
                  </td>
                  <td className="p-4 pending-interview-tag">
                    Pending Interview
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
          {isLoading && (
            <div className="loading-spinner-container mt-4">
              <LoadingSpinner />
            </div>
          )}
          {(!userJobApplications || userJobApplications.length === 0) && (
            <div className="error-message-container mt-5 mb-5">
              <span className="fst-italic fw-bold">
                Oops! You have no job applications yet.{" "}
                <Link to="/jobs">Click here to apply for a job</Link>
              </span>
            </div>
          )}
          {/* <div>
            <div className="d-flex align-items-center justify-content-between w-100 p-4">
              <div>
                <div className="d-flex align-items-center gap-4">
                  <img src={nomad} alt="companylogo" />
                  <div className="d-flex flex-column gap-2">
                    <span>Social Media Assistant</span>
                    <span>Nomad - Paris, France - Full Time</span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span>Date Applied</span>
                <span>24 July 2021</span>
              </div>
              <div>
                <span className="tag tag-orange">In Review</span>
              </div>
            </div>
          </div> */}
          {/* <hr /> */}
          {/* <div>
            <div className="d-flex align-items-center justify-content-between w-100 p-4">
              <div>
                <div className="d-flex align-items-center gap-4">
                  <img src={coursera} alt="companylogo" />
                  <div className="d-flex flex-column gap-2">
                    <span>Social Media Assistant</span>
                    <span>Udacity - New York, USA - Full Time</span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <span>Date Applied</span>
                <span>24 July 2021</span>
              </div>
              <div>
                <span className="tag tag-blue">Pending Interview</span>
              </div>
            </div>
          </div> */}
          <hr />
          <div className="mt-4 w-100 d-flex align-items-center justify-content-center">
            <Link to="/dashboard/applications">
              <div className="d-flex align-items-center gap-2 text-center w-100">
                View All Applications History
                <FaArrowRight />
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
