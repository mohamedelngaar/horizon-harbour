import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoLanguageSharp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import { CiFlag1 } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa6";

import { useUserInfo } from "../../customHooks/userInfo";

import profileStaticImage from "../../assets/images/profile-static.png";
import fakeAvatar from "../../assets/images/avatar.avif";
import twitter from "../../assets/images/twitter.png";
import godaddy from "../../assets/images/godaddy.png";
import harvard from "../../assets/images/harvard.png";
import toronto from "../../assets/images/toronto.png";

import "./Dashboard.css";

const Profile = () => {
  const userInfo = useUserInfo();

  return (
    <>
      <Container className="mb-4 mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="dashboard-text">My Profile</h1>
          <Link to="/">
            <button className="dashboard-back-to-home-btn">
              Back to homepage
            </button>
          </Link>
        </div>
      </Container>
      <hr />
      <div className="row">
        <div className="col-md-8 mt-4">
          <div className="main-profile-container-details">
            <img
              src={profileStaticImage}
              alt="profile static"
              className="w-100"
            />
            <div className="d-flex align-items-center flex-container-of-profile p-5 position-relative">
              <div className="">
                {/* <FaUserTie className="fake-avatar" /> */}
                <img
                  src={userInfo?.profilePic}
                  alt="fake profile avatar"
                  className="fake-avatar"
                />
              </div>
              <div className="d-flex flex-column gap-3 personal-info-container">
                <span className="fs-4 fw-bold">{userInfo?.name}</span>
                <span>Product Designer at Twitter</span>
                <span>
                  <CiLocationOn className="fs-6" />
                  Alexandria, EGYPT
                </span>
                <div className="d-flex align-items-center gap-4 w-100">
                  <span className=" tag tag-green">
                    <CiFlag1 className="fs-6" />
                    OPEN FOR OPPORTUNITIES
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------ */}

          <div className="about-me-profile-container">
            <span className="fs-4 fw-bold d-block mb-4">About Me</span>
            <p>
              I’m a product designer + filmmaker currently working remotely at
              Twitter from beautiful Manchester, United Kingdom. I’m passionate
              about designing digital products that have a positive impact on
              the world.
            </p>
            <p>
              For 10 years, I’ve specialised in interface, experience &
              interaction design as well as working in user research and product
              strategy for product agencies, big tech companies & start-ups.
            </p>
          </div>
          {/* ------------------ */}
          {/* ------------------ */}

          <div className="about-me-profile-container">
            <span className="fs-4 fw-bold d-block mb-4">Experiences</span>
            <div>
              <div className="d-flex gap-4 mb-4 mt-5">
                <div>
                  <img src={twitter} alt="twitter" />
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="fw-bold fs-4">Product Designer</span>
                  <span>Twitter - Full Time - Jun 2019 - Present (1y 1m)</span>
                  <span>Manchester, UK</span>
                  <p>
                    Created and executed social media plan for 10 brands
                    utilizing multiple features and content types to increase
                    brand outreach, engagement, and leads.
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex gap-4 mt-4">
                <div>
                  <img src={godaddy} alt="godaddy" />
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="fw-bold fs-4">
                    Growth Marketing Designer
                  </span>
                  <span>GoDaddy - Full Time - Jun 2011 - May 2019 (8y)</span>
                  <span>Manchester, UK</span>
                  <p>
                    Developed digital marketing strategies, activation plans,
                    proposals, contests and promotions for client initiatives
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* ------------------ */}
          {/* ------------------ */}

          <div className="about-me-profile-container">
            <span className="fs-4 fw-bold d-block mb-4">Educations</span>
            <div className="d-flex gap-4 mb-4 mt-5">
              <div>
                <img src={harvard} alt="harvard" />
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="fw-bold fs-4">Harvard University</span>
                <span>Postgraduate degree, Applied Psychology</span>
                <span>2010 - 2012</span>
                <p>
                  As an Applied Psychologist in the field of Consumer and
                  Society, I am specialized in creating business opportunities
                  by observing, analysing, researching and changing behaviour.
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex gap-4 mb-4 mt-5">
              <div>
                <img src={toronto} alt="toronto" />
              </div>
              <div className="d-flex flex-column gap-2">
                <span className="fw-bold fs-4">University of Toronto</span>
                <span>Bachelor of Arts, Visual Communication</span>
                <span>2005 - 2009</span>
                <p>
                  Created and executed social media plan for 10 brands utilizing
                  multiple features and content types to increase brand
                  outreach, engagement, and leads.
                </p>
              </div>
            </div>
          </div>
          {/* ------------------ */}
          {/* ------------------ */}
          <div className="about-me-profile-container">
            <span className="fs-4 fw-bold d-block mb-4">Skills</span>

            <span className="tag tag-purple">Communcation</span>
            <span className="tag tag-purple">Analytics</span>
            <span className="tag tag-purple">Facebook Ads</span>
            <span className="tag tag-purple">Content Planning</span>
            <span className="tag tag-purple">Community Manager</span>
          </div>
          {/* ------------------ */}
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-3 mt-4">
          <div className="d-flex flex-column gap-4 main-additional-details-box mb-4">
            <h4>Additional Details</h4>
            <div className="d-flex gap-4">
              <MdOutlineEmail className="fs-4" />
              <div className="d-flex flex-column">
                <span>Email</span>
                <span>{userInfo?.email}</span>
              </div>
            </div>
            <div className="d-flex gap-4">
              <FaPhone className="fs-4" />
              <div className="d-flex flex-column">
                <span>Phone</span>
                <span>{userInfo?.phone}</span>
              </div>
            </div>
            <div className="d-flex gap-4">
              <IoLanguageSharp className="fs-4" />
              <div className="d-flex flex-column">
                <span>Languages</span>
                <span>English & Arabic</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-4 main-additional-details-box">
            <h4>Social Links</h4>
            <div className="d-flex gap-4">
              <FaInstagram className="fs-4" />
              <div className="d-flex flex-column">
                <span>Instagram</span>
                <span>instagram.com/{userInfo?.name}</span>
              </div>
            </div>
            <div className="d-flex gap-4">
              <IoLogoTwitter className="fs-4" />
              <div className="d-flex flex-column">
                <span>Twitter</span>
                <span>twitter.com/{userInfo?.name}</span>
              </div>
            </div>
            <div className="d-flex gap-4">
              <TbWorldWww className="fs-4" />
              <div className="d-flex flex-column">
                <span>Website</span>
                <span>www.{userInfo?.name}.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
