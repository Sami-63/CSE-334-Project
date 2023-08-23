import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Form,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GetRoom } from "../actions/roomActions";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../conponents/Loader";
import PaymentModal from "../conponents/PaymentModal";

const Room = () => {
  const { id } = useParams();

  const [roomData, setRoomData] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 0,
    personCount: 1,
    bedroomCount: 1,
    acCount: 0,
    imgUrl: "",
  });

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false); // New state for PaymentModal

  const { getRoom, isLoading, error } = GetRoom();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) navigate("/login");
    else {
      handleOpenPaymentModal(); // Open PaymentModal when submitting the form
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getRoom(id);
          setRoomData(response);
        }
      } catch (error) {
        console.error("Error fetching room info:", error);
      }
    };

    fetchData();
  }, [id]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <Card>
      {isLoading && <Loader />}
      {error && <Alert variant='danger'>{error}</Alert>}
      {!isLoading && (
        <Card.Body>
          <Card.Title>{roomData.title}</Card.Title>
          <Card.Text>Rating: {roomData.rating}/5</Card.Text>
          <Container>
            <Row>
              <Col md={8}>
                <Image src={roomData.imgUrl} alt={roomData.title} fluid />
              </Col>
              <Col md={4}>
                <Row>
                  <Col>
                    <Card.Text>Capacity:</Card.Text>
                    <Card.Text>{roomData.personCount} persons</Card.Text>
                    <Card.Text>{roomData.bedroomCount} bedrooms</Card.Text>
                    <Card.Text>
                      Air Conditioning: {roomData.acCount ? "Yes" : "No"}
                    </Card.Text>
                    <Card.Text>{roomData.description}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='checkInDate'>
                      <p className='my-2'>Price: {roomData.price}</p>
                      <Form.Label>Check-in Date</Form.Label>
                      <Form.Control
                        type='date'
                        value={checkInDate}
                        min={today}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId='checkOutDate'>
                      <Form.Label>Check-out Date</Form.Label>
                      <Form.Control
                        type='date'
                        value={checkOutDate}
                        min={checkInDate || today}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant='primary' type='submit' className='my-3'>
                      Book Now
                    </Button>
                  </Form>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      )}

      {/* PaymentModal component */}
      {showPaymentModal && (
        <PaymentModal
          show={showPaymentModal}
          handleClose={handleClosePaymentModal}
          selectedRoom={roomData}
          price={roomData.price}
          searchData={{}} // Pass your searchData here
        />
      )}
    </Card>
  );
};

export default Room;
