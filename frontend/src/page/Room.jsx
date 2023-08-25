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
    <Card className="room-card">
      {isLoading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!isLoading && (
        <Card.Body>
          <Card.Title>{roomData.title}</Card.Title>
          <Card.Text className="rating">Rating: {roomData.rating}/5</Card.Text>
          <Container>
            <Row>
              <Col md={8}>
                <Image src={roomData.imgUrl} alt={roomData.title} fluid />
              </Col>
              <Col md={3}>
                <Row>
                  <Col>
                    <div className="room-details">
                      <h3>Room Details</h3>
                      <ul>
                        <li>
                          <strong>Capacity        :</strong> {roomData.personCount} persons
                        </li>
                        <li>
                          <strong>Bedrooms        :</strong> {roomData.bedroomCount}
                        </li>
                        <li>
                          <strong>Air Conditioning:</strong>{" "}
                          {roomData.acCount ? "Yes" : "No"}
                        </li>
                      </ul>
                    </div>
                    <Card.Text className="description">
                     <b>Description :{roomData.description}</b> 
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Button
                    variant="primary"
                    type="submit"
                    className="my-3 book-button"
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

      {message && <Alert variant="success">{message}</Alert>}

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
