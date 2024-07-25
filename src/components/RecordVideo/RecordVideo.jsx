import React, { useState, useRef } from "react";

import { Link } from "react-router-dom";

import "./RecordVideo.css";

function ScreenRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
      });

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp8",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
    } catch (error) {
      console.error("Error starting screen recording: ", error);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    setIsPaused(false);

    const blob = new Blob(recordedChunksRef.current, {
      type: "video/webm",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "horizon-harbour-meeting-recording.webm";
    document.body.appendChild(a);
    a.click();

    URL.revokeObjectURL(url);

    recordedChunksRef.current = [];
  };

  const handlePauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleResumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  return (
    <div className="mb-4">
      <p className="fw-bold">Your Video Recording Meeting Controls</p>
      <p className="tag tag-orange w-75 mx-auto">
        <span className="fw-bold text-uppercase">Note: </span> It's important to
        start recording the meeting if you would like to analyze your facial and
        body language using our{" "}
        <Link to="/dashboard/ai-video-analyzer">
          advanced Horizon Harbour AI Analyzer
        </Link>
        .
      </p>
      <p className="tag tag-orange w-75 mx-auto">
        Once you're done, click on "Stop Sharing" from browser pop up and click
        on "Download Meeting Record" to download it.
      </p>
      <button
        onClick={handleStartRecording}
        disabled={isRecording}
        className="record-video-btn record-video-start-record-btn"
      >
        Start Recording Meeting
      </button>
      <button
        onClick={handlePauseRecording}
        disabled={!isRecording || isPaused}
        className="record-video-btn record-video-pause-record-btn"
      >
        Pause Recording
      </button>
      <button
        onClick={handleResumeRecording}
        disabled={!isRecording || !isPaused}
        className="record-video-btn record-video-resume-record-btn"
      >
        Resume Recording
      </button>
      <button
        onClick={handleStopRecording}
        disabled={!isRecording}
        className="record-video-btn record-video-download-record-btn"
      >
        Download Meeting Record
      </button>
    </div>
  );
}

export default ScreenRecorder;
