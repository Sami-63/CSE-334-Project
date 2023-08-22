import { useState, useEffect } from "react";
import { Container, Row, Alert } from "react-bootstrap";

import { GetAllRooms } from "../actions/roomActions";

import Loader from "../conponents/Loader";
import RoomCard from "../conponents/RoomCard";

const RoomList = () => {
  const { getRooms, isLoading, error } = GetAllRooms();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getRooms();
        setRooms(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchdata();

    console.log("rooms -> ", rooms);
  }, []);

  return (
    <Container className='mt-5'>
      <Row>
        <h2 className='text-center mb-4'>Our Rooms</h2>

        {error && <Alert variant='danger'>{error}</Alert>}
        {isLoading && <Loader />}

        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </Row>
    </Container>
  );
};

export default RoomList;
