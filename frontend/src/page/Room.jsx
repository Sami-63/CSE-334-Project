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

const Room = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [personCount, setPersonCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [acCount, setAcCount] = useState(0);
  const [imgUrl, setImgUrl] = useState("");

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const { getRoom, isLoading, error } = GetRoom();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!user) navigate("/login");
    else {
      //
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getRoom(id);

          console.log("response => ", response);

          setTitle(response.title);
          setDescription(response.description);
          setPrice(response.price);
          setRating(response.rating);
          setPersonCount(response.personCount);
          setBedroomCount(response.bedroomCount);
          setAcCount(response.acCount);
          setImgUrl(response.imgUrl);
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
      {error && <Alert>{error}</Alert>}
      {!isLoading && (
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Rating: {rating}/5</Card.Text>
          <Container>
            <Row>
              <Col md={8}>
                <Image src={imgUrl} alt={title} fluid style={{}} />
              </Col>
              <Col md={4}>
                <Row>
                  <Col>
                    <Card.Text>Capacity:</Card.Text>
                    <Card.Text>{personCount} persons</Card.Text>
                    <Card.Text>{bedroomCount} bedrooms</Card.Text>
                    <Card.Text>
                      Air Conditioning: {acCount ? "Yes" : "No"}
                    </Card.Text>
                    <Card.Text>{description}</Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='checkInDate'>
                      <p className='my-2'>Price: {price}</p>
                      <Form.Label>Check-in Date</Form.Label>
                      <Form.Control
                        type='date'
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        min={today} // Set the minimum date as today
                        max={checkOutDate || undefined} // Disable dates after the check-out date
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId='checkOutDate'>
                      <Form.Label>Check-out Date</Form.Label>
                      <Form.Control
                        type='date'
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        min={checkInDate || today} // Disable dates before the check-in date or today
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
    </Card>
  );
};

export default Room;
