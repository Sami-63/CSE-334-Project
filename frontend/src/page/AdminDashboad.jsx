import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddRoomForm from "../conponents/AddRoomForm";
import AddFacilitiesForm from "../conponents/AddFacilitiesForm";
import ViewBookingsForm from "../conponents/ViewBookingsForm";
import { useAuthContext } from "../hooks/useAuthContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("user -> ", user);
    if (!user) navigate("/");
    else if (user.userType !== "admin") navigate("/");
  }, [navigate, user]);

  const renderForm = () => {
    if (activeTab === null) {
      return null; // No form or option selected
    }

    switch (activeTab) {
      case "addRoom":
        return <AddRoomForm />;
      case "addFacilities":
        return <AddFacilitiesForm />;
      case "viewBookings":
        return <ViewBookingsForm />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <h1 className='text-center mt-4'>Admin Dashboard</h1>
      <Row className='mt-4'>
        <Col md={4} className='text-center'>
          <Button
            variant='primary'
            className='w-100'
            onClick={() => setActiveTab("addRoom")}
          >
            Add Room
          </Button>
        </Col>
        <Col md={4} className='text-center'>
          <Button
            variant='primary'
            className='w-100'
            onClick={() => setActiveTab("addFacilities")}
          >
            Add Facility
          </Button>
        </Col>
        <Col md={4} className='text-center'>
          <Button
            variant='primary'
            className='w-100'
            onClick={() => setActiveTab("viewBookings")}
          >
            View Bookings
          </Button>
        </Col>
      </Row>
      <Row className='mt-4 justify-content-center'>
        <Col md={activeTab === "viewBookings" ? 12 : 4}>{renderForm()}</Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
