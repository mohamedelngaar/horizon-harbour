import { useState } from "react";
import { Link } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import { Helmet } from "react-helmet";

import stripeLogo from "../../assets/images/stripe-logo.png";
import vectorDrawing from "../../assets/images/Vector.png";

import { useFetchCompanies } from "../../fetchers/companyService";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import CompanyCard from "../../components/Companies/CompanyCard";
import Pagination from "../../components/Pagination/Pagination";

import "./Companies.css";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [sortBy, setSortBy] = useState("Newest");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError } = useFetchCompanies();

  const filteredCompanies = data?.companies?.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedComapnies = filteredCompanies?.sort((a, b) => {
    if (sortBy === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // Paginate filtered jobs
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedComapnies?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <>
      <Helmet>
        <title>Horizon Harbour - Companies</title>
      </Helmet>
      <div className="custom-section-padding container">
        <h1
          className="custom-fs-jobs-title text-center fw-bold position-image-under"
          style={{ position: "relative" }}
        >
          Find your{" "}
          <span className="fw-bolder dream-job-custom-color">
            dream companies
          </span>
          <img
            src={vectorDrawing}
            alt="vector drawing logo"
            className="image-under-text"
            style={{
              position: "absolute",
              bottom: "-15px",
              left: "58%",
              transform: "translateX(-50%)",
            }}
          />
        </h1>
        <p className="text-center lead fs-6 mt-5">
          Find the dream companies you dream work for
        </p>

        <form className="d-flex mt-5 position-relative" role="search">
          <input
            className="form-control custom-jobs-search me-2"
            type="search"
            placeholder="Company name or keyword"
            aria-label="Search"
          />
          <CiSearch className="z-3 fs-3 search-icon" />
          <button className="search-btn-custom" type="submit">
            Search
          </button>
        </form>
        <p className="lead fs-6 mt-3">
          Popular: Twitter, Microsoft, Apple, Facebook
        </p>
      </div>

      {/* ----------------------- */}

      <div className="bg-light w-100">
        <div class="container bg-light custom-jobs-container">
          <div class="row">
            <div class="col-md-3 pb-5 pb-md-0 d-flex flex-column align-items-center align-items-md-start">
              {/* industry filters */}
              <div className="">
                <h4 className="fw-bold">Industry</h4>
                <div className="d-flex flex-column gap-2 mt-3">
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Advertising
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Business Service
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Blockchain
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Cloud
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Consumer Tech
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Education
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Fintech
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Gaming
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Food & Beverage
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Healthcare
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Hosting
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      Media
                    </label>
                  </div>
                </div>
              </div>
              {/* industry filters */}
              {/* company size filters */}
              <div className="mt-5">
                <h4 className="fw-bold">Company Size</h4>
                <div className="d-flex flex-column gap-2 mt-3">
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      1-50
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      51-150
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      151-250
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      251-500
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      501-1000
                    </label>
                  </div>
                  <div
                    class="form-check
                  "
                  >
                    <input
                      class="form-check-input custom-checkbox-filter"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      class="form-check
                    -label"
                      for="flexCheckDefault"
                    >
                      1000 or above
                    </label>
                  </div>
                </div>
              </div>
              {/* company size filters */}
            </div>
            <div class="col-md-9">
              <div className="d-flex flex-column text-center gap-3 flex-md-row gap-md-0 align-items-md-center justify-content-md-between">
                <div>
                  <h2 className="fw-bolder">All Companies</h2>
                  <span className="lead fs-6">
                    Showing {data?.companies?.length} results
                  </span>
                </div>
                <div>
                  <span className="me-2 lead fs-6">Sort by:</span>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="Newest">Most recent</option>
                    <option value="Oldest">Oldest</option>
                  </select>
                </div>
              </div>
              <div className="mt-5 row">
                {/* An individual company card */}
                {/* <div className=" col-md-6">
                  <div className="job-card mb-4">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-column gap-3">
                        <img src={stripeLogo} alt="company logo" />
                        <span className="fw-bolder">Stripe</span>
                      </div>
                      <div>
                        <span className="jobs-counter">7 Jobs</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Stripe is a software platform for starting and running
                        internet businesses. Millions of businesses rely on
                        Stripe's software tools.
                      </p>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="tag tag-green">Business</span>
                        <span className="tag tag-purple">Payment Gateway</span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* An individual company card */}
                {/* An individual company card */}
                {/* <div className=" col-md-6">
                  <div className="job-card mb-4">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-column gap-3">
                        <img src={stripeLogo} alt="company logo" />
                        <span className="fw-bolder">Stripe</span>
                      </div>
                      <div>
                        <span className="jobs-counter">7 Jobs</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Stripe is a software platform for starting and running
                        internet businesses. Millions of businesses rely on
                        Stripe's software tools.
                      </p>
                      <div className="d-flex flex-wrap gap-2">
                        <span className="tag tag-green">Business</span>
                        <span className="tag tag-purple">Payment Gateway</span>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* An individual company card */}
                {isLoading && (
                  <div className="loading-spinner-container">
                    <LoadingSpinner />
                  </div>
                )}
                {isError && (
                  <div className="error-message-container">
                    <span className="fst-italic fw-bold">
                      Oops! There was an error getting the companies for you!
                      Try again please!
                    </span>
                  </div>
                )}
                {!isLoading &&
                  !isError &&
                  filteredCompanies?.length > 0 &&
                  currentPosts.map((company) => (
                    <CompanyCard key={company._id} company={company} />
                  ))}
                {!isLoading && !isError && filteredCompanies?.length === 0 && (
                  <p className="no-jobs-found-text">
                    No Companies Found with the search term "{searchTerm}"!
                    Please re-check the search term!
                  </p>
                )}
              </div>
              {/* PAGINATION */}
              <Pagination
                totalPosts={data?.companies?.length}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
              {/* PAGINATION */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
