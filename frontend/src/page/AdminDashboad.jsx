import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';
import AddRoomForm from '../conponents/AddRoomForm';
import AddFacilitiesForm from '../conponents/AddFacilitiesForm';
import ViewBookingsForm from '../conponents/ViewBookingsForm';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const renderForm = () => {
    if (activeTab === null) {
      return null; // No form or option selected
    }

    switch (activeTab) {
      case 'addRoom':
        return <AddRoomForm />;
      case 'addFacilities':
        return <AddFacilitiesForm />;
      case 'viewBookings':
        return <ViewBookingsForm />;
      default:
        return null;
    }
  };

  return (
    <div className={`admin-dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar">
        <div className="sidebar-toggle" onClick={handleToggleSidebar}>
          <FontAwesomeIcon
            icon={sidebarCollapsed ? faAngleDoubleLeft : faAngleDoubleRight}
            className="sidebar-toggle-icon"
          />
        </div>
        <div className="sidebar-menu">
          <div
            className={`sidebar-menu-item ${activeTab === 'addRoom' ? 'active' : ''}`}
            onClick={() => handleTabClick('addRoom')}
          >
            Add Room
          </div>
          <div
            className={`sidebar-menu-item ${activeTab === 'addFacilities' ? 'active' : ''}`}
            onClick={() => handleTabClick('addFacilities')}
          >
            Add Facilities
          </div>
          <div
            className={`sidebar-menu-item ${activeTab === 'viewBookings' ? 'active' : ''}`}
            onClick={() => handleTabClick('viewBookings')}
          >
            View Bookings
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="content">{renderForm()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;