import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Login from "../Login/Login";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("username");
    localStorage.removeItem("profilePic");
    navigate("/logout");
    document.title = "Logout | Admin Dashboard";
  }, []);

  useEffect(() => {
    const handleBackButton = () => {
      navigate("/login");
    };
    window.addEventListener("popstate", handleBackButton);
    return () => window.removeEventListener("popstate", handleBackButton);
  }, [navigate]);

  return (
    <>
      <LogoutContainer className="logout_container">
        <div className="logout_div d-flex align-items-center justify-content-center flex-column">
          <p className="mb-0" style={{ color: "red", fontWeight: "700" }}>
            You have successfully logged out.
          </p>
          <p className="mb-0 w-75 text-center">
            Please use the correct admin credentials to access the admin
            dashboard.
          </p>
        </div>
        <Login />
      </LogoutContainer>
    </>
  );
};

const LogoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  margin: 0 auto;

  .login_page {
    margin-top: 0.75rem;
  }
`;

export default Logout;
