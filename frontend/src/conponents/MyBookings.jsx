import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { GetMyBooking } from "../actions/bookingActions";
import { GetMyFacilityBookings } from "../actions/facilityActions";
import { Alert, Container, Table } from "react-bootstrap";
import Loader from "./Loader";

const MyBookings = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);

  const {
    getmyBooking,
    isLoading: roomLoading,
    error: roomError,
  } = GetMyBooking();
  const {
    getmyFacilityBooking,
    isLoading: facilityLoading,
    error: facilityError,
  } = GetMyFacilityBookings();

  const [roomBookings, setRoomBookings] = useState([]);
  const [facilityBookings, setFacilityBBookings] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getmyBooking();
        setRoomBookings(response);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await getmyFacilityBooking();
        setFacilityBBookings(response);
      } catch (error) {
        console.log("facility error ", error);
      }

      console.log("roomBookings => ", roomBookings);
      console.log("facilityBookings => ", facilityBookings);
    };

    fetchdata();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setRating(0);
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleCancelButtonClick = () => {
    closePopup();
  };

  const handleSubmitButtonClick = () => {
    // Perform submission logic here
    closePopup();
  };

  return (
    <div className='my-bookings'>
      <Container>
        <h1 className='text-center mt-4'>Room Bookings</h1>
        {roomLoading && <Loader />}
        {roomError && <Alert>{roomError}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>

              <th>Room ID</th>
              <th>Payment Amount</th>
              <th>Given Rating</th>
            </tr>
          </thead>
          <tbody>
            {roomBookings?.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.roomId}</td>
                <td>{booking.paymentAmount}</td>
                <td>{booking.givenRating}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Container style={{ marginTop: "100px" }}>
        <h1 className='text-center mt-4'>Other Facility Bookings</h1>
        {facilityLoading && <Loader />}
        {facilityError && <Alert>{facilityError}</Alert>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Customer Email</th>
              <th>Room ID</th>
              <th>Payment Amount</th>
              <th>Given Rating</th>
            </tr>
          </thead>
          <tbody>
            {facilityBookings?.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.customerEmail}</td>
                <td>{booking.roomId}</td>
                <td>{booking.paymentAmount}</td>
                <td>{booking.givenRating}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {showPopup && (
        <div className='popup'>
          <div className='popup-content'>
            <h3>Rate the Room</h3>
            <div className='rating-stars'>
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  className={`star-icon ${
                    star <= rating ? "star-selected" : ""
                  }`}
                  icon={faStar}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
            <button onClick={handleCancelButtonClick}>Cancel</button>
            <button onClick={handleSubmitButtonClick}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
