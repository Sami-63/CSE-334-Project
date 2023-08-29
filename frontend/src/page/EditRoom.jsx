import { useState, useEffect } from "react";
import { Container, Row, Alert } from "react-bootstrap";

import { FilterRooms, GetAllRooms } from "../actions/roomActions";

import Loader from "../conponents/Loader";
import RoomCard from "../conponents/RoomCard";
import FilterBox from "../conponents/FilterBox";

const EditRoom = () => {
  const { getRooms, isLoading, error } = GetAllRooms();
  const [rooms, setRooms] = useState([]);

  const {
    filter,
    isLoading: searchLoading,
    error: searchError,
  } = FilterRooms();

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
        {error && <Alert variant='danger'>{error}</Alert>}
        {searchError && <Alert variant='danger'>{searchError}</Alert>}
        {(isLoading || searchLoading) && <Loader />}

        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </Row>
    </Container>
  );
};

export default EditRoom;
