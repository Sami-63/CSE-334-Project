import { useState, useEffect } from "react";
import {
  Container,
  Card,
  Alert,
  Row,
  Col,
  Image,
  Button,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GetFacility } from "../actions/facilityActions";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../conponents/Loader";
import PaymentModal from "../conponents/PaymentModal";

const FacilityPage = () => {
  const { id } = useParams();
  const [facility, setFacility] = useState({
    category: "",
    title: "",
    description: "",
    price: 0,
    rating: 0,
    imgUrl: "",
  });

  const [message, setMessage] = useState("");

  const { getFacility, isLoading, error } = GetFacility();
  const [showPaymentModal, setShowPaymentModal] = useState(false); // New state for PaymentModal

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
    const fetchdata = async () => {
      try {
        const response = await getFacility(id);
        setFacility(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();
  }, []);

  return (
    <Card>
      {isLoading && <Loader />}
      {error && <Alert variant='danger'>{error}</Alert>}
      {!isLoading && (
        <Card.Body>
          <Card.Title>{facility.title}</Card.Title>
          <Card.Text>Rating: {facility.rating}/5</Card.Text>
          <Container>
            <Row>
              <Col md={8}>
                <Image src={facility.imgUrl} alt={facility.title} fluid />
              </Col>
              <Col md={3}>
                <Row>
                  <Col>
                    <Card.Text>Capacity:</Card.Text>
                    <Card.Text>{facility.description}</Card.Text>
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

export default FacilityPage;
