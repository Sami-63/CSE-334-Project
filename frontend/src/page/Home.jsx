import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

import { GetAllRooms } from "../actions/roomActions";
import { useEffect, useState } from "react";
import Loader from "../conponents/Loader";
import RoomCard from "../conponents/RoomCard";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { getRooms, isLoading, error } = GetAllRooms();
  const [rooms, setRooms] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getRooms();
        setRooms(response.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();

    console.log("rooms -> ", rooms);
  }, []);

  return (
    <>
      <div className='home'>
        <Container>
          <Row className='justify-content-center align-items-center'>
            <Col md={6} className='text-center'>
              <h1>Welcome to Our Website</h1>
              <p>Discover Amazing Rooms for Your Stay</p>
              {!user && (
                <Link to='/register'>
                  <Button variant='primary'>Get Started</Button>
                </Link>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Container className='m-5'>
        <Row>
          <h2 className='text-center mb-4'>Our Rooms</h2>

          {error && <Alert variant='danger'>{error}</Alert>}
          {isLoading && <Loader />}

          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </Row>

        <Row className='mt-3'>
          <Col className='text-center'>
            <Link to='/roomlist'>
              <Button variant='secondary'>See More</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
