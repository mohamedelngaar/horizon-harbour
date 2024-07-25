import {
  FiDribbble,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

import logo from "../../assets/images/footer-logo.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-main-container bg-custom-color text-custom-color p-5">
      <div className="container">
        <div className="row gap-4 gap-md-0">
          {/* First column */}
          <div className="col-md-4 col-lg-4 mb-4 mt-5 mt-md-0">
            <img src={logo} alt="Horizon Harbour Logo" className="mb-4" />
            <p>
              A pioneering project crafted as part of our graduation project,
              aims to revolutionize the way you navigate the job market.
              Designed with a focus on user-centricity, we specialize in
              connecting talent with the right job openings!
            </p>
          </div>
          {/* Second column */}
          <div className="col-md-8 col-lg-4 mb-4 d-flex justify-content-around">
            <div className="d-flex flex-column gap-4">
              <h4 className="text-white">About</h4>
              <span>Companies</span>
              <span>Pricing</span>
              <span>Terms</span>
              <span>Advice</span>
              <span>Privacy Policy</span>
            </div>
            {/* Third column */}
            <div className="d-flex flex-column gap-4">
              <h4 className="text-white">Resources</h4>
              <span>Help Docs</span>
              <span>Guide</span>
              <span>Updates</span>
              <span>Contact Us</span>
            </div>
          </div>
          {/* Fourth column */}
          <div className="col-md-12 col-lg-4 mb-4 d-flex flex-column gap-4">
            <h4 className="text-white">Get Job Notifications</h4>
            <span>
              The latest job news, articles, sent to your inbox weekly.
            </span>
            <div className="input-group mt-3 d-flex gap-2 flex-column flex-md-row">
              <input
                type="email"
                className="w-sm-100 border-0 ps-3 p-3"
                placeholder="Email Address"
              />
              <div className="input-group-append">
                <button className="border-0 text-white fw-bold bg-primary-color p-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="d-flex flex-column gap-4 text-center flex-md-row gap-md-0 align-items-center justify-content-between mt-5">
          <span>2024 &copy; Horizon Harbour. All rights reserved.</span>
          <div className="d-flex align-items-center gap-4 ">
            <a
              className="social-media-icon"
              href="https://www.facebook.com/horizonharbour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook />
            </a>
            <a
              className="social-media-icon"
              href="https://www.instagram.com/horizonharbour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram />
            </a>
            <a
              className="social-media-icon"
              href="https://www.twitter.com/horizonharbour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter />
            </a>
            <a
              className="social-media-icon"
              href="https://www.linkedin.com/horizonharbour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin />
            </a>
            <a
              className="social-media-icon"
              href="https://www.dribble.com/horizonharbour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiDribbble />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
