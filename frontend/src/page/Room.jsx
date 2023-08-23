import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Alert,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GetRoom } from "../actions/roomActions";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../conponents/Loader";
import PaymentModal from "../conponents/PaymentModal";

const Room = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");

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
              <Col md={3}>
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
                  <Button
                    variant='primary'
                    type='submit'
                    className='my-3'
                    onClick={handleSubmit}
                  >
                    Book Now
                  </Button>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      )}

      {message && <Alert variant='success'>{message}</Alert>}

      {/* PaymentModal component */}
      {showPaymentModal && (
        <PaymentModal
          show={showPaymentModal}
          handleClose={handleClosePaymentModal}
          selectedRoom={roomData}
          price={roomData.price}
          setText={setMessage}
        />
      )}
    </Card>
  );
};

export default Room;
