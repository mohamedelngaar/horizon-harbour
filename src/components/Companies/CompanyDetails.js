import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

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
import { FaFire } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { LiaIndustrySolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import { ImFlag } from "react-icons/im";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./CompanyDetails.css";

const fetchCompany = async (companyId) => {
  // Simulate a delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(`http://localhost:8000/companies/${companyId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch company");
  }
  return response.json();
};

const CompanyDetails = () => {
  const { companyId } = useParams();

  const {
    data: company,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => fetchCompany(companyId),
  });

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
        We're sorry! There was an error getting Company Details! Try again
        later!
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="top-most-company-details-container container">
        <div className="header-container pt-5 pb-5 d-flex">
          <div className="companyLogo-main-container">
            <img
              src={company?.company?.logo}
              alt="company logo"
              className="w-50"
            />
          </div>
          <div>
            <div className="d-flex align-items-center gap-4">
              <span className="fw-bolder fs-1">{company?.company?.name}</span>
              <span className="jobs-counter">
                {company?.company?.employees} Jobs
              </span>
            </div>
            <a href={company?.company?.linkCompany} className="fw-bolder">
              {company?.company?.linkCompany}
            </a>
            <div className="d-flex align-items-center gap-5 mt-5">
              <div className="d-flex align-items-center gap-3">
                <FaFire className="fs-4 text-primary" />
                <div className="d-flex flex-column">
                  <span className="">Founded</span>
                  <span className="fw-bold">
                    {company?.company?.founded
                      ? formatDate(company.company.founded)
                      : "N/A"}
                  </span>{" "}
                </div>
              </div>
              {/* ------ */}
              <div className="d-flex align-items-center gap-3">
                <MdGroups2 className="fs-2 text-primary" />
                <div className="d-flex flex-column">
                  <span className="">Employees</span>
                  <span className="fw-bold">{company?.company?.employees}</span>
                </div>
              </div>
              {/* ------ */}
              <div className="d-flex align-items-center gap-3">
                <FaLocationDot className="fs-4 text-primary" />
                <div className="d-flex flex-column">
                  <span className="">Location</span>
                  <span className="fw-bold">{company?.company?.locations}</span>
                </div>
              </div>
              {/* ------ */}
              <div className="d-flex align-items-center gap-3">
                <LiaIndustrySolid className="fs-4 text-primary" />
                <div className="d-flex flex-column">
                  <span className="">Industry</span>
                  <span className="fw-bold">{company?.company?.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------- */}
      <div className="bg-white pt-5 pb-5">
        <div className="bg-white container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="fw-bolder">Company Profile</h2>
              <p className="mt-4 lead">{company?.company?.profile}</p>
              <h2 className="fw-bolder mt-5">Contact</h2>
              <p className="mt-4">
                <a
                  href={
                    company?.company?.contact?.startsWith("http")
                      ? company.company.contact
                      : `http://${company.company.contact}`
                  }
                  className="text-decoration-none border border-1 border-primary p-2"
                >
                  {company?.company?.contact}
                </a>
              </p>
              <h2 className="fw-bolder mt-5 mb-3">
                A Glimpse Into Our Company
              </h2>
              <div className="">
                {company?.company?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="glimpse"
                    className="company-glimpse-images me-2 mb-2"
                  />
                ))}
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <h2 className="fw-bolder mb-3">Tech Stack</h2>
              <span className="fs-6">
                Learn about the technology and tools that{" "}
                {company?.company?.name} uses.
              </span>
              <div className="d-flex flex-wrap gap-4 align-items-center mt-5 mb-5">
                <BsTools className="fs-5" />
                {company?.company?.techStack}
              </div>
              <hr />
              <h2 className="fw-bolder mb-3 mt-5">Office Location</h2>
              <span>
                {company?.company?.name} offices spread across several countries
              </span>
              <div className="mt-4 d-flex align-items-center gap-4">
                <ImFlag className="fs-5" />
                <span>{company?.company?.locations}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------- */}

      <div className="pt-5 pb-5 our-company-team container">
        <h2 className="fw-bolder">Team</h2>
        <div className="mt-5 d-flex flex-wrap gap-4">
          {/* ----------- */}
          <div className="d-flex flex-column gap-2 perks-card text-center">
            <FaRegUser className="perks-icon mx-auto" />
            <span className="fw-bold">Célestin Gardinier</span>
            <span>CEO & Co-Founder</span>
          </div>
          {/* ----------- */}
          {/* ----------- */}
          <div className="d-flex flex-column gap-2 perks-card text-center">
            <FaRegUser className="perks-icon mx-auto" />
            <span className="fw-bold">Reynaud Colbert</span>
            <span>Co-Founder</span>
          </div>
          {/* ----------- */}
          {/* ----------- */}
          <div className="d-flex flex-column gap-2 perks-card text-center">
            <FaRegUser className="perks-icon mx-auto" />
            <span className="fw-bold">Arienne Lyon</span>
            <span>Managing Director</span>
          </div>
          {/* ----------- */}
          {/* ----------- */}
          <div className="d-flex flex-column gap-2 perks-card text-center">
            <FaRegUser className="perks-icon mx-auto" />
            <span className="fw-bold">Bernard Alexander</span>
            <span>Managing Director</span>
          </div>
          {/* ----------- */}
          {/* ----------- */}
          <div className="d-flex flex-column gap-2 perks-card text-center">
            <FaRegUser className="perks-icon mx-auto" />
            <span className="fw-bold">Reynaud Colbert</span>
            <span>Co-Founder</span>
          </div>
          {/* ----------- */}
        </div>
      </div>

      <div className="container">
        <hr />
      </div>

      {/* ---------------- */}
      <div className="pt-5 pb-5 container">
        <div className="d-flex flex-column mb-5">
          <h2 className="fw-bold">Perks & Benefits</h2>
          <span>This job comes with several perks and benefits</span>
        </div>
        <div className="d-flex flex-wrap align-items-center justify-content-center align-items-md-stretch justify-content-md-start gap-4">
          <div className="d-flex flex-column gap-2 perks-card">
            <FaHandHoldingMedical className="perks-icon" />
            <span className="fw-bold">Full Healthcare</span>
            <span>
              We believe in thriving communities and that starts with our team
              being happy and healthy.
            </span>
          </div>
          <div className="d-flex flex-column gap-2 perks-card">
            <GiWaterPolo className="perks-icon" />
            <span className="fw-bold">Unlimited Vacation</span>
            <span>
              We believe you should have a flexible schedule that makes space
              for family, wellness, and fun.
            </span>
          </div>
          <div className="d-flex flex-column gap-2 perks-card">
            <GiSkills className="perks-icon" />
            <span className="fw-bold">Skill Development</span>
            <span>
              We believe in always learning and leveling up our skills. Whether
              it's a conference or online course.
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
              You know how you perform your best. Work from home, coffee shop or
              anywhere when you feel like it.
            </span>
          </div>
          <div className="d-flex flex-column gap-2 perks-card">
            <MdCommute className="perks-icon" />
            <span className="fw-bold">Commuter Benefits</span>
            <span>
              We’re grateful for all the time and energy each team member puts
              into getting to work every day.
            </span>
          </div>
          <div className="d-flex flex-column gap-2 perks-card">
            <LiaHandsSolid className="perks-icon" />
            <span className="fw-bold">We give back.</span>
            <span>
              We anonymously match any donation our employees make (up to $/€
              600) so they can support the organizations they care about
              most—times two.
            </span>
          </div>
        </div>
      </div>
      {/* ---------------- */}
    </>
  );
};

export default CompanyDetails;
