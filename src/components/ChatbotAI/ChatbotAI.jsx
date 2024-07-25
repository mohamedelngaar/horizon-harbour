import { useState } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import "./ChatbotAI.css";

const ChatbotAI = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const surpriseOptions = [
    "How do you prepare for a job interview?",
    "What is the importance of networking in finding a job?",
    "How can you optimize your Horizon Harbour profile to attract recruiters?",
    "What are the key elements of a standout resume?",
    "How do you negotiate a job offer?",
    "Why is it important to tailor your job application for each position?",
    "What are the best practices for writing a cover letter?",
    "How can you effectively search for jobs on a job board?",
    "What skills are most sought after by employers in your industry?",
    "How do you handle job rejections gracefully?",
    "Why is continuing education important for career growth?",
    "What are the signs of a good company culture during a job interview?",
    "How can you use social media to enhance your job search?",
    "What are the common mistakes to avoid during a job interview?",
    "How do you stay motivated during a long job search?",
    "What are the benefits of using a recruitment agency?",
    "How do you assess if a job offer aligns with your career goals?",
    "What are the trends in remote work opportunities?",
    "How do you effectively manage your online professional presence?",
    "What are the key differences between a CV and a resume?",
  ];

  const surprise = () => {
    const randomValue =
      surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  };

  const getResponse = async () => {
    if (!value) {
      setError("Error! Please ask a question!");
      return;
    }

    setLoading(true);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          history: chatHistory,
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("http://localhost:8000/gemini", options);
      const data = await response.text();
      console.log(data);
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        {
          role: "user",
          parts: [{ text: value }],
        },
        {
          role: "model",
          parts: [{ text: data }],
        },
      ]);

      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong! Please try again later.");
    }

    setLoading(false);
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <div className="chatai-app">
      <p>
        What do you want to know?
        <button className="surprise" onClick={surprise} disabled={!chatHistory}>
          Surprise me! 🎁
        </button>
      </p>
      <div className="input-chatai-container">
        <input
          value={value}
          className="input-chatai"
          placeholder="Type a question or hit the 'surprise me' button..."
          onChange={(e) => setValue(e.target.value)}
        />
        {!error && <button onClick={getResponse}>Ask me</button>}
        {error && <button onClick={clear}>Clear</button>}
      </div>
      {error && <p className="mt-4">{error}</p>}
      {loading && (
        <div className="loading-spinner-container mt-5 help-ai-loading-spinner d-flex flex-column gap-2">
          <LoadingSpinner />
          <p fw-bold mt-4>
            Generating your answer... Please wait...
          </p>
        </div>
      )}
      <div className="search-result mt-4">
        {chatHistory.map((chatItem, index) => (
          <div key={index}>
            <p className="answer">
              <span className="fw-bold text-uppercase chatitem-role">
                {chatItem.role}:
              </span>{" "}
              {chatItem.parts[0].text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotAI;
