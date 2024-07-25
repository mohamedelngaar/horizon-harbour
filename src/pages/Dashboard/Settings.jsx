import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Container } from "react-bootstrap";
import axios from "axios";
import jsPDF from "jspdf";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { IoIosInformationCircleOutline } from "react-icons/io";

import "./Dashboard.css";

const Settings = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedLength, setDisplayedLength] = useState(1000);

  const pollJobStatus = async (jobId) => {
    try {
      const getResponse = await axios.get(
        `https://api.hume.ai/v0/batch/jobs/${jobId}/predictions`,
        {
          headers: {
            "X-Hume-Api-Key":
              "AQiIqiTrhI95bg8ERwDDQQHWTPU0Ra7AnapLb7eCraAc6mjV",
          },
        }
      );

      setAnalysisResult(getResponse.data);
      setIsLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "Job is in progress."
      ) {
        setTimeout(() => pollJobStatus(jobId), 120000);
      } else {
        console.error("Error polling job status", error);
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const postResponse = await axios.post(
        "http://localhost:8000/analyze-video",
        {
          videoUrl,
        }
      );

      const jobId = postResponse.data.job_id;
      console.log(`Job ID: ${jobId}`);

      pollJobStatus(jobId);
    } catch (error) {
      console.error("Error analyzing video", error);
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!analysisResult) return;

    const doc = new jsPDF();
    doc.text("Analysis Result", 10, 10);
    doc.setFontSize(10);

    const emotions =
      analysisResult?.[0]?.results?.predictions?.[0]?.models?.face
        ?.grouped_predictions?.[0]?.predictions?.[0]?.emotions;

    if (emotions) {
      const emotionsText = emotions
        .map((emotion) => `${emotion.name}: ${emotion.score}`)
        .join("\n");
      doc.text(emotionsText, 10, 20);
    }

    doc.save("horizon-harbour-analysis-result.pdf");
  };

  const handleReadMore = () => {
    setDisplayedLength(displayedLength + 1000);
  };

  return (
    <>
      <Container className="mb-4 mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <h1 className="dashboard-text">AI Video Analyzer</h1>
          <Link to="/">
            <button className="dashboard-back-to-home-btn">
              Back to homepage
            </button>
          </Link>
        </div>
      </Container>
      <hr />
      <Container className="mt-5">
        <h2 className="fw-bold mb-4">
          Analyze Facial and Body Language in Meetings with{" "}
          <span className="heading-ai-analyzer-text">Horizon Harbour</span> AI
          Model
        </h2>
        <form
          onSubmit={handleSubmit}
          className="d-flex align-items-center gap-4"
        >
          <input
            type="text"
            value={videoUrl}
            className="analyzed-ai-video-input"
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter video URL"
          />
          <button type="submit" className="analyzed-ai-video-btn">
            Analyze
          </button>
        </form>
        <div className="mt-4 emotion-note-ai-video-analyzed">
          <div>
            <IoIosInformationCircleOutline className="fs-1" />
          </div>
          <div>
            <h3 className="mb-4">Emotion Score Scale Explanation:</h3>
            <p className="mb-0">
              Scores range from 0 to 1. Higher scores indicate stronger presence
              of the emotion.
            </p>
            <p>
              Example: If a score is 0.5 or above, the emotion is relatively
              high. If below 0.5, the presence of the emotion is lower.
            </p>
          </div>
        </div>
        <div className="mt-4 emotion-note-ai-video-analyzed">
          <div>
            <IoIosInformationCircleOutline className="fs-1" />
          </div>
          <div>
            <h3 className="mb-4 text-uppercase">Note:</h3>
            <p className="mb-0 tag tag-orange">
              You must upload your video on any online service and then grab the
              URL and paste it here.
              <br />
              Use this website:{" "}
              <a
                href="https://snapsynopsis.com/direct-file/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://snapsynopsis.com/direct-file/
              </a>
            </p>
            <p className="mt-2 text-bg-danger p-1">
              <span className="fw-bold text-uppercase">Important: </span>Please
              make sure your face is visible in the video or else results might
              not be displayed.
            </p>
          </div>
        </div>
        {isLoading && (
          <div className="text-center mt-5">
            <p>Analyzing the video... Please wait...</p>
            <div className="loading-spinner-container">
              <LoadingSpinner />
            </div>
          </div>
        )}
        {analysisResult && (
          <div>
            <h2 className="mt-4 text-uppercase fw-bold">Analysis Result:</h2>
            <div>
              <h3 className="mt-4 mb-3">
                Facial & Body Language Expression Measurement:
              </h3>
              <ul>
                {analysisResult?.[0]?.results?.predictions?.[0]?.models?.face?.grouped_predictions?.[0]?.predictions?.[0]?.emotions.map(
                  (emotion, index) => (
                    <li key={index} className="mb-2">
                      <span className="fw-bold">{emotion.name}:</span>{" "}
                      {emotion.score.toFixed(2)}
                    </li>
                  )
                )}
              </ul>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="download-pdf-analyze-ai-btn mt-4"
            >
              Download Result as PDF
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Settings;
