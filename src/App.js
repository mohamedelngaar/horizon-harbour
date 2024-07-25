import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";

import AppLayout from "../src/pages/AppLayout.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import Companies from "./pages/Companies/Companies.jsx";
import Homepage from "./pages/Homepage/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import JobDetails from "./components/Jobs/JobDetails.js";
import { useAuth } from "./customHooks/useAuth.js";
import AuthPage from "./components/Chat/AuthPage.js";
import ChatsPage from "./components/Chat/ChatsPage.js";
import ChatbotAI from "./components/ChatbotAI/ChatbotAI.jsx";
import VideoCall from "./components/VideoCalling/VideoCall.jsx";
import CompanyDetails from "./components/Companies/CompanyDetails.js";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Home from "./pages/Dashboard/Home.jsx";
import Messages from "./pages/Dashboard/Messages.jsx";
import Applications from "./pages/Dashboard/Applications.jsx";
import Profile from "./pages/Dashboard/PublicProfile.jsx";
import Settings from "./pages/Dashboard/Settings.jsx";
import Help from "./pages/Dashboard/Help.jsx";
import GettingStarted from "./pages/Dashboard/GettingStarted.jsx";
import MyProfile from "./pages/Dashboard/MyProfile.jsx";
import ApplyingForJob from "./pages/Dashboard/ApplyingForJob.jsx";
import JobSearchTips from "./pages/Dashboard/JobSearchTips.jsx";
import JobAlerts from "./pages/Dashboard/JobAlerts.jsx";
import RecordVideo from "./components/RecordVideo/RecordVideo.jsx";

export default function App() {
  const [user, setUser] = useState({});

  const queryClient = new QueryClient();

  let userObject;

  // GLOBAL GOOGLE AUTH
  useEffect(() => {
    // Check if user information exists in local storage
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      const userObject = jwtDecode(storedToken);
      setUser(userObject);
    }
  }, []);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;

    localStorage.setItem("jwtToken", response.credential);

    toast("Successfully signed in!", {
      icon: "👏",
    });

    // Redirect to home page
    // window.location.href = "/";
  }

  function handleSignOut() {
    localStorage.removeItem("jwtToken");
    // eslint-disable-next-line no-undef
    google.accounts.id.disableAutoSelect();
    setUser({});
    // document.getElementById("signInDiv").hidden = false;

    toast("Successfully signed out!", {
      icon: "👋",
    });
  }

  function isLoggedIn() {
    return localStorage.getItem("jwtToken") !== null;
  }
  // GLOBAL GOOGLE AUTH

  const isAuthenticated = useAuth();
  // const clientId = process.env.GOOGLE_CLIENT_ID;

  const [chatUser, setChatUser] = useState(undefined);

  return (
    <>
      <div className="detect-offline-container">
        <Offline>
          📡 You are offline. Please check your internet connection.
        </Offline>
      </div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AppLayout
                  user={user}
                  handleCallbackResponse={handleCallbackResponse}
                  handleSignOut={handleSignOut}
                  isLoggedIn={isLoggedIn}
                />
              }
            >
              <Route index element={<Homepage />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Home />} />
                {/* <Route path="messages" element={<Messages />} /> */}
                <Route
                  path="messages"
                  element={
                    chatUser ? (
                      <ChatsPage user={chatUser} />
                    ) : (
                      <AuthPage onAuth={(chatUser) => setChatUser(chatUser)} />
                    )
                  }
                />
                <Route path="applications" element={<Applications />} />
                <Route path="profile" element={<Profile />} />
                <Route path="ai-video-analyzer" element={<Settings />} />
                {/* <Route path="help" element={<Help />} /> */}
                <Route path="help" element={<Help />}>
                  <Route
                    index
                    // path="getting-started"
                    element={<GettingStarted />}
                  />
                  <Route path="getting-started" element={<GettingStarted />} />
                  <Route path="my-profile" element={<MyProfile />} />
                  <Route path="applying-for-job" element={<ApplyingForJob />} />
                  <Route path="job-search-tips" element={<JobSearchTips />} />
                  <Route path="job-alerts" element={<JobAlerts />} />
                </Route>
              </Route>
              {/* <Route
                path="/chat"
                element={
                  chatUser ? (
                    <ChatsPage user={chatUser} />
                  ) : (
                    <AuthPage onAuth={(chatUser) => setChatUser(chatUser)} />
                  )
                }
              /> */}
              {/* <Route path="/chat-ai" element={<ChatbotAI />} /> */}
              <Route path="/video-call" element={<VideoCall />} />
              <Route path="/recordvideo" element={<RecordVideo />} />
              <Route
                path="jobs"
                element={
                  isAuthenticated || isLoggedIn() ? (
                    <Jobs />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/jobs/:jobId" element={<JobDetails />} />
              <Route
                path="/companies/:companyId"
                element={<CompanyDetails />}
              />
              <Route
                path="companies"
                element={
                  isAuthenticated || isLoggedIn() ? <Companies /> : <Login />
                }
              />
              <Route
                path="login"
                element={
                  isAuthenticated || isLoggedIn() ? (
                    <Navigate to="/" />
                  ) : (
                    <Login
                      user={user}
                      handleCallbackResponse={handleCallbackResponse}
                      handleSignOut={handleSignOut}
                    />
                  )
                }
              />
              <Route
                path="signup"
                element={
                  isAuthenticated || isLoggedIn() ? (
                    <Navigate to="/" />
                  ) : (
                    <Signup />
                  )
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        {/* NOTIFICATIONS */}
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#4640de",
              color: "white",
            },
          }}
        />
        {/* NOTIFICATIONS */}
      </QueryClientProvider>
    </>
  );
}
