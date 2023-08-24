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
    <Container className='user-dashboard-container'>
      <h1 className='text-center mt-4'>Dashboard</h1>
      <Row className='mt-4'>
        <Col
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant='primary'
            className='dashboard-button mx-4'
            onClick={() => setActiveTab("myBookings")}
          >
            My Bookings
          </Button>
          <Button
            variant='primary'
            className='dashboard-button mx-4'
            onClick={() => setActiveTab("profile")}
          >
            Manage Profile
          </Button>

          {user && user.userType === "admin" ? (
            <>
              <Button
                variant='primary'
                className='dashboard-button mx-4'
                onClick={() => setActiveTab("addroom")}
              >
                Add Room
              </Button>

              <Button
                variant='primary'
                className='dashboard-button mx-4'
                onClick={() => setActiveTab("addfacility")}
              >
                Add Facility
              </Button>

              <Button
                variant='primary'
                className='dashboard-button mx-4'
                onClick={() => setActiveTab("getallbookings")}
              >
                All Bookings
              </Button>
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row className='mt-4 justify-content-center'>
        <Col
          md={activeTab === "addroom" || activeTab === "addfacility" ? 6 : 12}
        >
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
