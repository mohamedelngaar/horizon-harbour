import axios from "axios";

import { useUserInfo } from "../../customHooks/userInfo";

import "./Chat.css";

// eslint-disable-next-line react/prop-types
const AuthPage = ({ onAuth }) => {
  const userInfo = useUserInfo();

  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0];

    axios
      .post("http://localhost:8000/authenticate", { username: value })
      .then((response) => {
        onAuth({ ...response.data, secret: value });
      })
      .catch((e) => console.log("error", e));
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card w-75">
        <div className="form-title-app">Horizon Harbour Chatting System</div>
        <div className="form-title">Welcome, {userInfo?.name}👋</div>

        <div className="form-subtitle">
          <span>Create a username to get started!</span>
          <span className="form-note">
            NOTE: Make sure to memorize the username, because this is what you
            will login with next time!
          </span>
        </div>

        <div className="auth">
          <div className="auth-label">Username</div>
          <input className="auth-input" name="username" />
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
