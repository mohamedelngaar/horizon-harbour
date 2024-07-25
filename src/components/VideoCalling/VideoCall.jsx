import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  usePubSub,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../../API.js";
import ReactPlayer from "react-player";
import { Container } from "react-bootstrap";
import "./VideoCall.css";
import { useUserInfo } from "../../customHooks/userInfo.js";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.js";
import RecordVideo from "../RecordVideo/RecordVideo.jsx";

// import { ReactSketchCanvas } from "@shawngoh87/react-sketch-canvas";

// const WhiteboardView = () => {
//   // Define a reference for the canvas
//   const canvasRef = useRef();

//   // Define the props required by the canvas element used
//   const canvasProps = {
//     width: "100%",
//     height: "500px",
//     backgroundImage:
//       "https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg",
//     preserveBackgroundImageAspectRatio: "none",
//     strokeWidth: 4,
//     eraserWidth: 5,
//     strokeColor: "#000000",
//     canvasColor: "#FFFFFF",
//     allowOnlyPointerType: "all",
//     withViewBox: false,
//   };

//   const { localParticipant } = useMeeting();

//   const { publish } = usePubSub("WHITEBOARD", {
//     onMessageReceived: (message) => {
//       //Check if the stroke is from remote participant only
//       if (message.senderId !== localParticipant.id) {
//         canvasRef.current.loadPaths(JSON.parse(message.message));
//       }
//     },
//     onOldMessagesReceived: (messages) => {
//       messages.map((message) => {
//         canvasRef.current.loadPaths(JSON.parse(message.message));
//       });
//     },
//   });

//   // This callback from the canvas component will give us the stroke json we need to share
//   const onStroke = (stroke, isEraser) => {
//     // We will be setting the `persist:true` so that all the strokes
//     // are available for the participants who have recently joined
//     publish(JSON.stringify(stroke), { persist: true });
//   };

//   return (
//     <div>
//       {/* Adding the actual canvas object */}
//       <ReactSketchCanvas ref={canvasRef} onStroke={onStroke} {...canvasProps} />
//     </div>
//   );
// };

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <Container>
      <div className="main-join-screen-video-call-container">
        <h2 className="fw-bold mt-5 text-center">
          Welcome to{" "}
          <span className="video-call-horizon-heading-text">
            Horizon Harbour
          </span>{" "}
          Video Meeting Call 👋
        </h2>
        <div className="mt-5 d-flex flex-column gap-3">
          <div className="w-100">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              className="w-100 video-call-input"
              onChange={(e) => {
                setMeetingId(e.target.value);
              }}
            />
          </div>
          <div className="mb-5 text-center">
            <button onClick={onClick} className="video-call-join-btn">
              Join
            </button>
            <button
              onClick={async () => {
                const newMeetingId = await getMeetingAndToken();
                setMeetingId(newMeetingId);
              }}
              className="video-call-create-meeting-btn"
            >
              Create Meeting
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

function ParticipantView(props) {
  const userInfo = useUserInfo();

  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div
      key={props.participantId}
      className="mb-5"
      style={{ display: "flex", alignItems: "center" }}
    >
      {/* Left side container for participant info */}
      <div style={{ flex: "1" }}>
        <p className="fw-bold mt-4 mb-5">
          <span>Participant Name:</span> {userInfo?.name} | Webcam Status:{" "}
          {webcamOn ? "ON" : "OFF"} | Mic Status: {micOn ? "ON" : "OFF"}
        </p>
        <audio ref={micRef} autoPlay muted={isLocal} />
      </div>

      {/* Right side container for video */}
      {webcamOn && (
        <div style={{ flex: "1", marginLeft: "20px" }}>
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={true}
            muted={false}
            playing={true}
            url={videoStream}
            height={"250px"}
            width={"350px"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </div>
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <p className="fw-bold">Your Video Meeting Controls</p>
      <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
        <button
          onClick={() => leave()}
          className="video-call-leave-btn bg-danger"
        >
          Leave Meeting
        </button>
        <button
          onClick={() => toggleMic()}
          className="video-call-toggle-mic-btn"
        >
          Toggle Mic
        </button>
        <button
          onClick={() => toggleWebcam()}
          className="video-call-toggle-webcam"
        >
          Toggle Webcam
        </button>
      </div>
    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setTimeout(() => {
        setJoined("JOINED");
      }, 10000);
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");

    setTimeout(() => {
      join();
    }, 1000);
  };
  return (
    <Container>
      <div className="container main-join-screen-video-call-container-joining">
        <h2 className="fw-bold mt-5 text-center">
          Welcome to{" "}
          <span className="welcome-video-calling-text">Horizon Harbour</span>{" "}
          Video Meeting Call 👋
        </h2>
        <div className="text-center">
          <h3 className="mt-5">
            <span className="meeting-id-text">Meeting ID:</span>{" "}
            {props.meetingId}
          </h3>
          {joined && joined === "JOINED" ? (
            <div className="mt-5 d-flex flex-column gap-4">
              <Controls />
              <RecordVideo />
              {/* <WhiteboardView /> */}
              {[...participants.keys()].map((participantId) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                />
              ))}
            </div>
          ) : joined && joined === "JOINING" ? (
            <>
              <div className="loading-spinner-container mt-5">
                <LoadingSpinner />
              </div>
              <p className="fw-bold mt-4">
                Joining the meeting... Please wait...
              </p>
            </>
          ) : (
            <button onClick={joinMeeting} className="video-call-join-btn mt-4">
              Join
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}

function VideoCall() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
    return meetingId;
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default VideoCall;
