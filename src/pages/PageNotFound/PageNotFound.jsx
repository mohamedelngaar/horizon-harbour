import { Link } from "react-router-dom";

import logo from "../../assets/images/horizon-harbour-logo-white.png";

import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <img
        src={logo}
        alt="Website Logo"
        className="mb-4"
        style={{ maxWidth: "200px" }}
      />
      <h1 className="display-1">404</h1>
      <p className="lead">Oops! We couldn't find that page.</p>
      <p>
        It looks like you've taken a wrong turn. Don't worry... it happens to
        the best of us.
      </p>
      <div className="d-flex align-items-center flex-column gap-2 flex-md-row gap-md-4">
        <Link
          to="/"
          className="btn p-2 text-white custom-btn-primary-color mt-3"
        >
          Take me home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="border-1 rounded-2 p-2 custom-btn-secondary-color custom-btn mt-3"
        >
          Previous Page
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
