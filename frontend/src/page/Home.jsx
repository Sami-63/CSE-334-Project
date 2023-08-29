import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

import { FilterRooms, GetAllRooms } from "../actions/roomActions";
import { useEffect, useState } from "react";
import Loader from "../conponents/Loader";
import RoomCard from "../conponents/RoomCard";
import Description from "../conponents/Description";
import { GetAllFacility } from "../actions/facilityActions";
import FacilityCard from "../conponents/FacilityCard";
import FilterBox from "../conponents/FilterBox";
import "./Home.css";
import FacilityFilterBox from "../conponents/FacilityFilterBox";

function Home() {
  const { getRooms, isLoading, error } = GetAllRooms();
  const {
    getAll,
    isLoading: facilityLoading,
    error: facilityError,
  } = GetAllFacility();

  const [rooms, setRooms] = useState([]);
  const [otherFacilities, setOtherFacilies] = useState({});
  const {
    filter,
    isLoading: searchLoading,
    error: searchError,
  } = FilterRooms();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getRooms();
        setRooms(response.slice(0, 3));
      } catch (error) {
        setRooms({});
        console.log(error);
      }

      try {
        const response = await getAll();
        setOtherFacilies(response);
      } catch (error) {
        setOtherFacilies({});
        console.log(error);
      }
    };

    fetchdata();
  }, []);
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#0d6efd',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <>
      <Description />
      <Container>
        <Row>
          <h2 className="text-center mb-4">Our Rooms</h2>
          <FilterBox setRooms={setRooms} filter={filter} />

          {error ? <Alert variant="danger">{error}</Alert> : <></>}
          {isLoading ? <Loader /> : <></>}

          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <Link to="/roomlist">
              <Button variant="secondary" style={buttonStyle}>
                See More
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <div>
        {facilityLoading ? <Loader /> : <></>}
        {facilityError ? <Alert>{facilityError}</Alert> : <></>}
        {Object.keys(otherFacilities).map((category) => (
          <Container className="my-5" key={category}>
            <Row>
              <FacilityFilterBox />
              <Row><h2 className="text-center mb-4">{category}</h2></Row>

              {facilityError ? (
                <Alert variant="danger">{facilityError}</Alert>
              ) : (
                <></>
              )}
              {facilityLoading ? <Loader /> : <></>}

              {otherFacilities[category].slice(0, 3).map((item) => (
                <FacilityCard key={item.id} facility={item} />
              ))}
            </Row>

            <Row className="mt-3">
              <Col className="text-center">
                <Link to={`/facilitylist/${category}`}>
                <Button variant="secondary" style={buttonStyle}>
                  See More
                  </Button>
                </Link>
              </Col>
            </Row>

            <div>
              <div className="card-container"></div>
            </div>
          </Container>
        ))}
      </div>
    </>
  );
}

export default Home;
