import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";

import jobseeker from "../../assets/images/job-seeker.png";
import employer from "../../assets/images/employer.png";

import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>Horizon Harbour - Get hired in no time!</title>
      </Helmet>
      <div className="container d-flex align-items-center justify-content-center p-5 custom-margin-homepage">
        <div>
          <h2 className="text-center mb-4 mt-5">
            Hello! What are you looking for?
          </h2>
          <div className="d-flex flex-column gap-4 gap-md-5 justify-content-md-between flex-md-row justify-content-center">
            <Link to="jobs">
              <div className="overlay-container">
                <img src={jobseeker} alt="Job Seeker" className="img-fluid " />
                <div className="overlay">Jobs</div>
              </div>
            </Link>
            <Link to="companies">
              <div className="overlay-container">
                <img src={employer} alt="Employer" className="img-fluid" />
                <div className="overlay">Hiring</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
