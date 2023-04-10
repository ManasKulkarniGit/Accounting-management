import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../App";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Loader from "../../Reusable Components/Loader";
import "./Login.sass";

const Login = () => {
  const { isLoading } = useContext(LoaderContext);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [selectedRandomAdmin, setSelectedRandomAdmin] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
  };

  const handleLogin = () => {
    if (!profilePic) {
      alert("Please upload a profile pic and try again.");
    } else if (
      userName.trim().toLowerCase() !== selectedRandomAdmin ||
      password.trim().toLowerCase() !== randomPassword
    ) {
      alert("Wrong credentials. Please try again.");
    } else {
      localStorage.setItem("userName", userName);
      localStorage.setItem("profilePic", profilePic);
      // Redirect to dashboard component
      navigate("/home");
    }
  };

  const randomPassword = "admin005";
  useEffect(() => {
    const randomAdmins = ["sam005", "sachin005", "max005"];
    const randomIndex = Math.floor(Math.random() * randomAdmins.length);
    setSelectedRandomAdmin(randomAdmins[randomIndex]);
    document.title = "Login | Admin Dashboard";
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="login_page">
          <h5>Login to Admin Dashboard</h5>
          <div className="profile_pic_container">
            <label
              htmlFor="profilePic"
              className="d-flex align-items-start upload_pic_label"
              style={{ borderBottom: "1px solid #20B2AA" }}
            >
              Upload Profile pic{" "}
              <DriveFolderUploadOutlinedIcon className="icon mx-1" />
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
            {profilePic && <img src={profilePic} alt="Avatar" />}
          </div>
          <div className="username_container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={handleUserNameChange}
              placeholder={`${
                selectedRandomAdmin
                  ? selectedRandomAdmin.charAt(0).toUpperCase() +
                    selectedRandomAdmin.substring(1)
                  : ""
              }`}
            />
          </div>
          <div className="password_container">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePassword}
              placeholder={`${
                randomPassword
                  ? randomPassword.charAt(0).toUpperCase() +
                    randomPassword.substring(1)
                  : ""
              }`}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          <div className="signin_note mt-2">
            <p>
              Please use the provided placeholder values as your username and
              password in the designated fields to access the dashboard.
              <span> A profile picture is required to sign in. Thank you.</span>
              <br />
              Note: The <span>username</span> and <span>password</span> are case
              insensitive.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
