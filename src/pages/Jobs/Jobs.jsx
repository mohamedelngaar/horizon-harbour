import { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { Helmet } from "react-helmet";

import { useFetchJobs } from "../../fetchers/jobService";
import JobCard from "../../components/Jobs/JobCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import vectorDrawing from "../../assets/images/Vector.png";

import "./Jobs.css";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [sortBy, setSortBy] = useState("Newest");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const { data, isLoading, isError } = useFetchJobs();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching jobs</div>;
  // }

  const filteredJobs = data?.postings?.filter((job) =>
    job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedJobs = filteredJobs?.sort((a, b) => {
    if (sortBy === "Newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // Paginate filtered jobs
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedJobs?.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <Helmet>
        <title>Horizon Harbour - Jobs</title>
      </Helmet>
      <div className="custom-section-padding container">
        <h1
          className="custom-fs-jobs-title text-center fw-bold position-image-under"
          style={{ position: "relative" }}
        >
          Find your{" "}
          <span className="fw-bolder dream-job-custom-color">dream job</span>
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
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </p>

        <form className="d-flex mt-5 position-relative" role="search">
          <input
            className="form-control custom-jobs-search me-2"
            type="search"
            placeholder="Job title or keyword"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <CiSearch className="z-3 fs-3 search-icon" />
          <button className="search-btn-custom" type="submit">
            Search
          </button>
        </form>
        <p className="lead fs-6 mt-3">
          Popular: UI Designer, UX Researcher, Android, Admin
        </p>
      </div>

      <div className="bg-light w-100">
        <div class="container bg-light custom-jobs-container">
          <div class="row">
            <div class="col-md-3 pb-5 pb-md-0 d-flex flex-column align-items-center align-items-md-start">
              {/* type of employment filters */}
              <div className="">
                <h4 className="fw-bold">Type of employment</h4>
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
                      Full-time
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
                      Part-time
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
                      Remote
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
                      Internship
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
                      Contract
                    </label>
                  </div>
                </div>
              </div>
              {/* type of employment filters */}
              {/* categories filters */}
              <div className="mt-5">
                <h4 className="fw-bold">Categories</h4>
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
                      Design
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
                      Sales
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
                      Marketing
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
                      Business
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
                      Human Resources
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
                      Finance
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
                      Engineering
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
                      Technology
                    </label>
                  </div>
                </div>
              </div>
              {/* categories filters */}
              {/* job level filters */}
              <div className="mt-5">
                <h4 className="fw-bold">Job Level</h4>
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
                      Entry Level
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
                      Mid Level
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
                      Senior Level
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
                      Director
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
                      VP or above
                    </label>
                  </div>
                </div>
              </div>
              {/* job level filters */}
              {/* salary range filters */}
              <div className="mt-5">
                <h4 className="fw-bold">Salary range</h4>
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
                      $700 - $1000
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
                      $100 - $1500
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
                      $1500 - $2000
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
                      $3000 or above
                    </label>
                  </div>
                </div>
              </div>
              {/* salary range filters */}
            </div>
            <div class="col-md-9">
              <div className="d-flex flex-column text-center text-md-start gap-3 flex-md-row gap-md-0 align-items-md-center justify-content-md-between">
                <div>
                  <h2 className="fw-bolder">All Jobs</h2>
                  <span className="lead fs-6">
                    Showing {data?.postings?.length} results
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
              <div className="mt-5">
                {/* An individual job card */}
                {/* <div className="job-card d-flex flex-column gap-5 flex-md-row align-items-center justify-content-between">
                  <div className="d-flex gap-4">
                    <div>
                      <img src={nomadLogo} alt="company logo" />
                    </div>
                    <div className="d-flex flex-column gap-2">
                      <h4 className="fw-bold">Social Media Assistant</h4>
                      <span className="lead fs-6">Nomad - Paris, France</span>
                      <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                        <span className="tag tag-green">Full-time</span>
                        <span class="vertical-divider"></span>

                        <span className="tag tag-orange">Marketing</span>
                        <span className="tag tag-purple">Design</span>
                        <span className="tag tag-blue">Remote</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="apply-job-btn">Apply</button>
                  </div>
                </div> */}
                {/* An individual job card */}
                {/* {isLoading && (
                  <div className="loading-spinner-container">
                    <LoadingSpinner />
                  </div>
                )}
                {isError && (
                  <div className="error-message-container">
                    <span className="fst-italic fw-bold">
                      Oops! There was an error getting the jobs for you! Try
                      again please!
                    </span>
                  </div>
                )}
                {data &&
                  data.postings?.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))} */}
                {isLoading && (
                  <div className="loading-spinner-container">
                    <LoadingSpinner />
                  </div>
                )}
                {isError && (
                  <div className="error-message-container">
                    <span className="fst-italic fw-bold">
                      Oops! There was an error getting the jobs for you! Try
                      again please!
                    </span>
                  </div>
                )}
                {!isLoading &&
                  !isError &&
                  filteredJobs?.length > 0 &&
                  currentPosts.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                {!isLoading && !isError && filteredJobs?.length === 0 && (
                  <p className="no-jobs-found-text">
                    No Jobs Found with the search term "{searchTerm}"! Please
                    re-check the search term!
                  </p>
                )}
              </div>
              {/* PAGINATION */}
              <Pagination
                totalPosts={data?.postings?.length}
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

export default Jobs;
