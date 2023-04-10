import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext, ProfileContext } from "../../App";
import { generateRandomTotal } from "../../Reusable Components/Function";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import "./Navbar.sass";

const Navbar = () => {
  const { handleDarkMode } = useContext(ThemeContext);
  const { userName, profilePic } = useContext(ProfileContext);

  // Handle hamburger menu display for med and small devices
  const [menu, setMenu] = useState(false);
  function handleMenu() {
    setMenu(!menu);
    document
      .querySelector(".dashboard_container_left_panel")
      .setAttribute("style", `${menu ? "" : "display: block"}`);
  }

  // Dummy read notification
  const [readNotification, setReadNotification] = useState(false);
  const notifications = document.querySelectorAll(".count_notification");
  function handleNotification() {
    setReadNotification(!readNotification);
    notifications.forEach((notification) => {
      notification.style.display = "none";
    });
  }

  // Dummy read message
  const [readMessage, setReadMessage] = useState(false);
  const messages = document.querySelectorAll(".count_message");
  function handleMessage() {
    setReadMessage(!readMessage);
    messages.forEach((message) => {
      message.style.display = "none";
    });
  }

  // Handle user profile menu
  const [profileMenu, setProfileMenu] = useState(false);
  const adminProfileDiv = document.querySelector(".admin_profile_div");

  function handleProfileMenu() {
    const isProfileMenuOpen = profileMenu;
    setProfileMenu(!isProfileMenuOpen);
    document
      .querySelector(".items_div")
      .setAttribute(
        "style",
        `${isProfileMenuOpen ? "" : "display: block; opacity: 1"}`
      );
    if (isProfileMenuOpen && profile) {
      setProfile(false);
      adminProfileDiv.setAttribute("style", "display: none");
    }
  }

  // Handle profile
  const [profile, setProfile] = useState(false);
  function handleProfile() {
    setProfile(!profile);
    adminProfileDiv.setAttribute(
      "style",
      `display: ${profile ? "none" : "block"}`
    );
  }

  // Handle welcome popup
  const [popup, setPopup] = useState(false);
  function handlePopup() {
    setPopup(!popup);
    const popupDiv = document.querySelector(".welcome_popup_div");
    if (popupDiv) {
      popupDiv.style.display = "block";
    }
  }

  useEffect(() => {
    // Storing boolean flag in the browser's local storage to check if the popup has already been shown...
    const popupShown = localStorage.getItem("popupShown");
    if (!popupShown) {
      setTimeout(() => {
        handlePopup();
      }, 1000);
    }
  }, []);

  function removePopup() {
    setPopup(false);
    localStorage.setItem("popupShown", true);
  }

  // --------------------------------------------------------------------------
  return (
    <>
      <div className="navbar_container">
        <div className="navbar_logo_div">
          {menu ? (
            <CloseIcon
              className="hamburger_menu_btn bg-danger text-light p-1"
              onClick={handleMenu}
            />
          ) : (
            <MenuIcon className="hamburger_menu_btn" onClick={handleMenu} />
          )}
          <Link to="/home" style={{ textDecoration: "none", color: "unset" }}>
            <span className="logo">Admin Dashboard</span>
          </Link>
        </div>
        <div className="search_and_settings_div">
          <div className="search_div">
            <input
              type="text"
              placeholder="Search..."
              className="search_input"
            />
            <SearchIcon />
          </div>
          <div className="items_div_wrapper">
            <div className="items_div">
              <div className="item" onClick={handleProfile}>
                <AccountCircleOutlinedIcon className="icon" />
                <p className="mb-0 mx-1">Profile</p>
              </div>
              <div className="item" onClick={handleDarkMode}>
                <DarkModeOutlinedIcon className="icon" />
                <p className="mb-0 mx-1">Toggle Theme</p>
              </div>
              <div
                className="item notification_item"
                onClick={handleNotification}
              >
                <NotificationsNoneOutlinedIcon className="icon" />
                <div className="counter count_notification">1</div>
                <p className="mb-0 mx-1">Notifications</p>
                {readNotification && (
                  <p className="read_state mb-0">
                    Consider you have read this notification.
                  </p>
                )}
              </div>
              <div className="item" onClick={handleMessage}>
                <ChatBubbleOutlineOutlinedIcon className="icon" />
                <div className="counter count_message">2</div>
                <p className="mb-0 mx-1">Messages</p>
                {readMessage && (
                  <>
                    <p className="read_state mb-0 text-decoration-none list-unstyled">
                      Consider you have read message1.
                    </p>
                    <p
                      className="read_state mb-0 mt-5 text-decoration-none list-unstyled"
                      style={{
                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 7px 20px 0px",
                      }}
                    >
                      Consider you have read message2.
                    </p>
                  </>
                )}
              </div>
            </div>
            {popup && (
              <div className="welcome_popup_div">
                <p className="welcome_text mb-0">
                  Welcome <span>{userName}</span> to the Admin Dashboard. Feel
                  free to explore and let me know if you have any questions.
                  Thanks for joining!
                </p>
                <CloseIcon className="icon" onClick={removePopup} />
              </div>
            )}
            <div
              className="user_profile_div d-flex align-items-center justify-content-center"
              onClick={handleProfileMenu}
            >
              <p className="username mb-0">{userName}</p>
              <img src={profilePic} alt="Dashboard user" className="avatar" />
            </div>
          </div>
          <div className="admin_profile_div">
            <div className="admin_info_div">
              <div className="admin_name_and_img_div">
                <p className="mb-1">
                  <span>Admin:</span> {userName}
                </p>
                <img
                  src={profilePic}
                  alt="Admin Avatar"
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="admin_info_text_div">
                <p className="mb-1" style={{ borderBottom: "1px solid #888" }}>
                  Management records
                </p>
                <p className="mb-1">
                  <span>Orders:</span>{" "}
                  {generateRandomTotal(1000).formattedRandomTotal}
                </p>
                <p className="mb-1">
                  <span>Total Users:</span>{" "}
                  {generateRandomTotal(10000).formattedRandomTotal}
                </p>
                <p className="mb-1">
                  <span>New Users:</span>{" "}
                  {generateRandomTotal(1000).formattedRandomTotal}+
                </p>
                <p className="mb-1">
                  <span>Balance:</span> $
                  {generateRandomTotal(100000).formattedRandomTotal}
                </p>
                <p className="mb-1">
                  <span>Sales:</span>{" "}
                  {generateRandomTotal(10000).percentageCalculator}% of Targeted
                  Sales
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
