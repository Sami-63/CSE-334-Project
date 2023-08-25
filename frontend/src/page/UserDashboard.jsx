import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import MyBookings from "../conponents/MyBookings";
import Profile from "./Profile";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./UserDashboard.css"; // Import your CSS file for custom styling
import AddRoomForm from "../conponents/AddRoomForm";
import AddFacilitiesForm from "../conponents/AddFacilitiesForm";
import ViewBookingsForm from "../conponents/ViewBookingsForm";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "myBookings":
        return <MyBookings />;
      case "profile":
        return <Profile />;
      case "addroom":
        return <AddRoomForm />;
      case "addfacility":
        return <AddFacilitiesForm />;
      case "getallbookings":
        return <ViewBookingsForm />;
      default:
        return null;
    }
  };

  return (
    <Container className="user-dashboard-container">
      <h2>Dashboard</h2>
      <Row>
        <Col md={2} className="sidebar">
        <Button
            variant="primary"
            className={`dashboard-button profile-button ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Manage Profile
          </Button>
          <Button
            variant="primary"
            className={`dashboard-button my-bookings-button ${activeTab === "myBookings" ? "active" : ""}`}
            onClick={() => setActiveTab("myBookings")}
          >
            My Bookings
          </Button>
          

          {user && user.userType === "admin" && (
            <>
              <Button
                variant="primary"
                className={`dashboard-button add-room-button ${activeTab === "addroom" ? "active" : ""}`}
                onClick={() => setActiveTab("addroom")}
              >
                Add Room
              </Button>

              <Button
                variant="primary"
                className={`dashboard-button add-facility-button ${activeTab === "addfacility" ? "active" : ""}`}
                onClick={() => setActiveTab("addfacility")}
              >
                Add Facility
              </Button>

              <Button
                variant="primary"
                className={`dashboard-button get-all-bookings-button ${activeTab === "getallbookings" ? "active" : ""}`}
                onClick={() => setActiveTab("getallbookings")}
              >
                All Bookings
              </Button>
            </>
          )}
        </Col>
        <Col md={10} className="content">
          <h1 className="text-center mt-4">Dashboard</h1>
          <Row className="mt-4 justify-content-center">
            <Col md={activeTab === "addroom" || activeTab === "addfacility" ? 6 : 12}>
              {renderContent()}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;