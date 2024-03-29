import { useEffect, useState } from "react";
import { GetMyBooking } from "../actions/bookingActions";
import { GetMyFacilityBookings } from "../actions/facilityActions";
import { Alert, Button, Container, Table } from "react-bootstrap";
import Loader from "./Loader";
import StarRatingModal from "./StarRatingModal";
import { format } from "date-fns";

function formatTime(time) {
  const date = new Date(`1970-01-01T${time}`);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const MyBookings = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [render, setRender] = useState(0);

  const [facilityInfo, setFacilityInfo] = useState({
    type: null,
    bookingId: null,
    facilityId: null,
    roomId: null,
  });

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
  }, [render]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
                <td>{format(new Date(booking.startDate), "MMM d, yyyy")}</td>
                <td>{format(new Date(booking.endDate), "MMM d, yyyy")}</td>

                <td>{booking.roomId}</td>
                <td>{booking.paymentAmount}</td>

                <td>
                  {booking.givenRating ? (
                    booking.givenRating
                  ) : (
                    <Button
                      onClick={() => {
                        openPopup();
                        setFacilityInfo({
                          type: "room",
                          bookingId: booking.id,
                          roomId: booking.roomId,
                        });
                      }}
                    >
                      Review
                    </Button>
                  )}
                </td>
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
              <th>Booking Date</th>
              <th>Start Time</th>
              <th>End Time</th>

              <th>Facility ID</th>
              <th>Payment Amount</th>
              <th>Given Rating</th>
            </tr>
          </thead>
          <tbody>
            {facilityBookings?.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{format(new Date(booking.bookingDate), "MMM d, yyyy")}</td>
                <td>{formatTime(booking.startTime)}</td>
                <td>{formatTime(booking.endTime)}</td>

                <td>{booking.facilityId}</td>
                <td>{booking.paymentAmount}</td>
                <td>
                  {booking.givenRating ? (
                    booking.givenRating
                  ) : (
                    <Button
                      onClick={() => {
                        openPopup();
                        setFacilityInfo({
                          type: "facility",
                          bookingId: booking.id,
                          facilityId: booking.facilityId,
                        });
                      }}
                    >
                      Review
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* {showPopup && (
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
      )} */}

      <StarRatingModal
        show={showPopup}
        onHide={closePopup}
        facilityinfo={facilityInfo}
        setRender={setRender}
        render={render}
      />
    </div>
  );
};

export default MyBookings;
