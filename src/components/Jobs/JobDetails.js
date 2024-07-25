import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FaHandHoldingMedical } from "react-icons/fa";
import { GiWaterPolo } from "react-icons/gi";
import { GiSkills } from "react-icons/gi";
import { TbSteam } from "react-icons/tb";
import { FiHome } from "react-icons/fi";
import { MdCommute } from "react-icons/md";
import { LiaHandsSolid } from "react-icons/lia";
import { FaHandPointRight } from "react-icons/fa";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useUserInfo } from "../../customHooks/userInfo";

import "./JobDetails.css";

const fetchJob = async (jobId) => {
  // Simulate a delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(`http://localhost:8000/jobs/${jobId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }
  return response.json();
};

const JobDetail = () => {
  const { jobId } = useParams();
  const [show, setShow] = useState(false);

  const userInfo = useUserInfo();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: job,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJob(jobId),
  });

  // ----------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pervJobTitle, setPervJobTitle] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [protfolioUrl, setProtfolioUrl] = useState("");
  const [addInfo, setAddInfo] = useState("");
  // const [user, setUser] = useState("");
  const mainUserId = userInfo?._id;
  const mainJobId = jobId;
  const [attachedResume, setattachedResume] = useState(null);
  // ----------------

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("pervJobTitle", pervJobTitle);
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("protfolioUrl", protfolioUrl);
    formData.append("addInfo", addInfo);
    formData.append("user", mainUserId);
    formData.append("job", mainJobId);
    formData.append("attachedResume", attachedResume);

    try {
      const response = await axios.post(
        "http://localhost:8000/jobapps",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleClose();
      toast.success("Application submitted successfully!");
      // setTimeout(() => {
      //   navigate("/login");
      // }, 3000);
    } catch (error) {
      toast.error("Error submitting application! Try again later!");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner-container-job-details">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-message-job-details">
        We're sorry! There was an error getting Job Details! Try again later!
      </div>
    );
  }

  return (
    <>
      <div className="container job-detail-main-container">
        <div className="job-card d-flex flex-column gap-5 flex-md-row align-items-center justify-content-between mb-4">
          <div className="d-flex gap-4">
            <div className="me-5 ms-3 job-logo-company-container">
              <img src={job?.posting?.joblogo} alt="company logo" className="w-75" />
            </div>
            <div className="d-flex flex-column gap-2">
              <h4 className="fw-bold">{job?.posting?.jobTitle}</h4>
              <span className="lead fs-6">{`${job?.posting?.companyName} - ${job?.posting?.jobLocation}`}</span>
              <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                <span className="tag tag-green">{job?.posting?.workingHrs}</span>
                <span className="vertical-divider"></span>
                <span className="tag tag-orange">
                  {job?.posting?.jobCategory}
                </span>
                <span className="vertical-divider"></span>
                {job?.posting?.skillsReq.map((skill, index) => (
                  <span className="tag tag-purple" key={index}>
                    {skill}
                  </span>
                ))}
                {job?.posting?.remote && (
                  <span className="tag tag-blue">Remote</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <button className="apply-job-btn" onClick={handleShow}>
              Apply
            </button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} scrollable>
          <Modal.Header closeButton className="mb-5" />
          <Modal.Title>
            <div className="d-flex flex-column gap-5 flex-md-row align-items-center justify-content-between mb-4 ps-4 pe-4">
              <div className="d-flex gap-4">
                <div className="me-4 ms-4 job-logo-company-container">
                  <img src={job?.posting?.joblogo} alt="company logo" className="w-100" />
                </div>
                <div className="d-flex flex-column gap-2">
                  <h4 className="fw-bold">{job?.posting?.jobTitle}</h4>
                  <span className="lead fs-6">{`${job?.posting?.companyName} - ${job?.posting?.jobLocation}`}</span>
                  <div className="d-flex align-items-center gap-2 mt-2 flex-wrap">
                    <span className="tag tag-green">
                      {job?.posting?.workingHrs}
                    </span>

                    {job?.posting?.remote && (
                      <span className="tag tag-blue">Remote</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Title>
          <hr />
          <Modal.Body>
            <div className="mb-4">
              <h2 className="fw-bold">Submit your application</h2>
              <span className="fs-6">
                The following is required and will only be shared with the
                Company
              </span>
            </div>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label htmlFor="user" className="form-label">
                  User ID:
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="user"
                  // defaultValue={mainUserId}
                  value={mainUserId}
                  readOnly
                  // onChange={(event) => setUser(event.target.value)}
                  placeholder="Enter your user ID"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="job" className="form-label">
                  Job ID:
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="job"
                  // defaultValue={mainUserId}
                  value={mainJobId}
                  readOnly
                  // onChange={(event) => setUser(event.target.value)}
                  placeholder="Enter the job ID"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control p-2"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="form-label">
                  Phone number
                </label>
                <input
                  type="tel"
                  className="form-control p-2"
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="previous-job" className="form-label">
                  Current of previous job title
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="previous-job"
                  value={pervJobTitle}
                  onChange={(event) => setPervJobTitle(event.target.value)}
                  placeholder="What's your current or previous job title?"
                />
              </div>

              <hr />

              <h4 className="fw-bold text-uppercase mt-4 mb-4">Links</h4>

              <div className="mb-4">
                <label htmlFor="linkedin" className="form-label">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="linkedin"
                  value={linkedinUrl}
                  onChange={(event) => setLinkedinUrl(event.target.value)}
                  placeholder="Link to your LinkedIn URL"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="portfolio" className="form-label">
                  Portfolio URL
                </label>
                <input
                  type="text"
                  className="form-control p-2"
                  id="portfolio"
                  value={protfolioUrl}
                  onChange={(event) => setProtfolioUrl(event.target.value)}
                  placeholder="Link to your portfolio URL"
                />
              </div>

              <hr />

              <div className="mb-4 mt-4">
                <label htmlFor="additional-info" className="form-label">
                  Additional Information
                </label>
                <textarea
                  className="form-control p-2"
                  style={{
                    height: "100px",
                    resize: "none",
                  }}
                  id="additional-info"
                  value={addInfo}
                  onChange={(event) => setAddInfo(event.target.value)}
                  placeholder="Add a cover letter or anything else you want to share"
                />
                <span className="fst-italic">
                  Maximum of 500 charaters please!
                </span>
              </div>

              <div className="mb-4 d-flex flex-column flex-md-row align-items-center gap-2 justify-content-between">
                <div>
                  <span className="fw-bold fs-6">Attach your resume</span>
                </div>
                <div>
                  <input
                    type="file"
                    className="form-control"
                    id="resume"
                    onChange={(event) =>
                      setattachedResume(event.target.files[0])
                    }
                    placeholder="Attach your resume/CV"
                  />
                </div>
              </div>

              <hr />

              <div className="mb-4 mt-4">
                <button type="submit" className="apply-job-btn w-100">
                  Submit Application
                </button>
              </div>

              <div className="mb-4 mt-4">
                <span>
                  By submitting your application, you agree to our Terms of
                  Service and Privacy Policy
                </span>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="bg-white">
        <div className="bg-white container">
          <div className="row">
            <div className="col-md-8">
              <div className="left-content d-flex flex-column gap-5 pt-5 pb-5 ps-2 ps-md-0 pe-2 pe-md-0 text-center text-md-start">
                {/* Content for the left side */}
                <div className="d-flex flex-column gap-2">
                  <h2 className="fw-bold">Description</h2>
                  <p>{job.posting.jobDesc}</p>
                </div>

                <div className="d-flex flex-column gap-2 job-detail">
                  <h2 className="fw-bold">Responsibilities</h2>
                  <ul>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />
                      <li>
                        Community engagement to ensure that is supported and
                        actively represented online
                      </li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />
                      <li>
                        Focus on social media content development and
                        publication
                      </li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />
                      <li>Marketing and strategy support</li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />
                      <li>
                        Stay on top of trends on social media platforms, and
                        suggest content ideas to the team
                      </li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />
                      <li>Engage with online communities</li>
                    </div>
                  </ul>
                </div>

                <div className="d-flex flex-column gap-2 job-detail">
                  <h2 className="fw-bold">Who You Are</h2>
                  <ul>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>
                        You get energy from people and building the ideal work
                        environment
                      </li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>
                        You have a sense for beautiful spaces and office
                        experiences
                      </li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>
                        You are a confident office manager, ready for added
                        responsibilities
                      </li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>You're detail-oriented and creative</li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>
                        You're a growth marketer and know how to run campaigns
                      </li>
                    </div>
                  </ul>
                </div>

                <div className="d-flex flex-column gap-2 job-detail">
                  <h2 className="fw-bold">Nice-To-Haves</h2>
                  <ul>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>Fluent in English</li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>Project management skills</li>
                    </div>
                    <div className="d-flex align-items-center">
                      <FaHandPointRight className="pointing-hand-right-icon" />

                      <li>Copy editing skills</li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <div className="right-content d-flex flex-column gap-5 pt-5 pb-5 ps-2 ps-md-0 pe-2 pe-md-0">
                {/* Content for the right side */}
                <h2 className="fw-bold">About This Role</h2>

                <div className="d-flex align-items-center justify-content-between">
                  <div>Apply Before</div>
                  <div className="fw-bold">July 31, 2024</div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>Job Posted On</div>
                  <div className="fw-bold">
                    {new Date(job.posting.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>Job Type</div>
                  <div className="fw-bold">{job.posting.jobCategory}</div>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>Salary</div>
                  <div className="fw-bold">$10000</div>
                </div>

                <hr />

                <div className="d-flex flex-column gap-4">
                  <h2 className="fw-bold">Categories</h2>
                  <div className="d-flex flex-column align-items-start gap-2">
                    <p className="tag tag-orange">{job.posting.jobCategory}</p>
                    <p className="tag tag-green m-0">{job.posting.industry}</p>
                  </div>
                </div>

                <hr />

                <div className="d-flex flex-column gap-4">
                  <h2 className="fw-bold">Required Skills</h2>
                  <div className="d-flex flex-wrap align-items-start gap-2">
                    {job.posting.skillsReq.map((skill, index) => (
                      <p className="tag tag-purple" key={index}>
                        {skill}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <div className="pt-5 pb-5">
            <div className="d-flex flex-column mb-5">
              <h2 className="fw-bold">Perks & Benefits</h2>
              <span>This job comes with several perks and benefits</span>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-center align-items-md-stretch justify-content-md-start gap-4">
              <div className="d-flex flex-column gap-2 perks-card">
                <FaHandHoldingMedical className="perks-icon" />
                <span className="fw-bold">Full Healthcare</span>
                <span>
                  We believe in thriving communities and that starts with our
                  team being happy and healthy.
                </span>
              </div>
              <div className="d-flex flex-column gap-2 perks-card">
                <GiWaterPolo className="perks-icon" />
                <span className="fw-bold">Unlimited Vacation</span>
                <span>
                  We believe you should have a flexible schedule that makes
                  space for family, wellness, and fun.
                </span>
              </div>
              <div className="d-flex flex-column gap-2 perks-card">
                <GiSkills className="perks-icon" />
                <span className="fw-bold">Skill Development</span>
                <span>
                  We believe in always learning and leveling up our skills.
                  Whether it's a conference or online course.
                </span>
              </div>
              <div className="d-flex flex-column gap-2 perks-card">
                <TbSteam className="perks-icon" />
                <span className="fw-bold">Team Summits</span>
                <span>
                  Every 6 months we have a full team summit where we have fun,
                  reflect, and plan for the upcoming quarter.
                </span>
              </div>
              <div className="d-flex flex-column gap-2 perks-card">
                <FiHome className="perks-icon" />
                <span className="fw-bold">Remote Working</span>
                <span>
                  You know how you perform your best. Work from home, coffee
                  shop or anywhere when you feel like it.
                </span>
              </div>
              <div className="d-flex flex-column gap-2 perks-card">
                <MdCommute className="perks-icon" />
                <span className="fw-bold">Commuter Benefits</span>
                <span>
                  We’re grateful for all the time and energy each team member
                  puts into getting to work every day.
                </span>
              </div>
              <div className="d-flex flex-column gap-2 perks-card">
                <LiaHandsSolid className="perks-icon" />
                <span className="fw-bold">We give back.</span>
                <span>
                  We anonymously match any donation our employees make (up to
                  $/€ 600) so they can support the organizations they care about
                  most—times two.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
