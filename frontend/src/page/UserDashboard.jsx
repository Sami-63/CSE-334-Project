import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./UserDashboard.css";
import MyBookings from "../conponents/MyBookings";
import Profile from "./Profile";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const renderContent = () => {
    if (activeTab === null) {
      return null; // No tab selected
    }

    switch (activeTab) {
      case "myBookings":
        return <MyBookings />;
      case "profile":
        return <Profile />;
      // Add other cases for other tabs
      default:
        return null;
    }
  };

  return (
    <div
      className={`user-dashboard ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <div className='sidebar'>
        <div className='sidebar-toggle' onClick={handleToggleSidebar}>
          <FontAwesomeIcon
            icon={sidebarCollapsed ? faAngleDoubleLeft : faAngleDoubleRight}
            className='sidebar-toggle-icon'
          />
        </div>
        <div className='sidebar-menu'>
          <div
            className={`sidebar-menu-item ${
              activeTab === "profile" ? "active" : ""
            }`}
            onClick={() => handleTabClick("profile")}
          >
            Profile
          </div>
          <div
            className={`sidebar-menu-item ${
              activeTab === "myBookings" ? "active" : ""
            }`}
            onClick={() => handleTabClick("myBookings")}
          >
            My Bookings
          </div>

          {/* Add other sidebar menu items here */}
        </div>
      </div>
      <div className='main-content'>
        <div className='content'>{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
