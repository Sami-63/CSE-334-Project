import { useState, useEffect } from "react";
import { Container, Card, Alert, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { GetFacility } from "../actions/facilityActions";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../conponents/Loader";

import PaymentModal2 from "../conponents/PaymentModal2";

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
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
      handleOpenPaymentModal();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFacility(id);
        setFacility(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container className='my-4'>
      <Row className='justify-content-center'>
        <Col md={12}>
          <Card>
            {isLoading && <Loader />}
            {error && <Alert variant='danger'>{error}</Alert>}
            {!isLoading && (
              <Row>
                <Col md={6}>
                  <Card.Img
                    variant='top'
                    src={facility.imgUrl}
                    style={{ height: "100%" }}
                  />
                </Col>
                <Col md={6} className='my-4'>
                  <Card.Body>
                    <Card.Title>{facility.title}</Card.Title>
                    <Card.Text>Rating: {facility.rating}/5</Card.Text>
                    <Card.Text>{facility.description}</Card.Text>
                    <Button variant='primary' onClick={handleSubmit}>
                      Book Now
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            )}
          </Card>
          {message && <Alert variant='success'>{message}</Alert>}
        </Col>
      </Row>

      {showPaymentModal && (
        <PaymentModal2
          show={showPaymentModal}
          handleClose={handleClosePaymentModal}
          selectedFacility={facility}
          price={facility.price}
          setText={setMessage}
        />
      )}
    </Container>
  );
};

export default FacilityPage;
