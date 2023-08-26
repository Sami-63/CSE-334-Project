import { Alert, Tab, Table, Tabs } from "react-bootstrap";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { GetAllFacilityBookings } from "../actions/facilityActions";
import { GetAllBookings } from "../actions/bookingActions";
import { format } from "date-fns";

function formatTime(time) {
  const date = new Date(`1970-01-01T${time}`);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

const BookingsTable = () => {
  const {
    getRoomBookings,
    isLoading: roomLoading,
    error: roomError,
  } = GetAllBookings();

  const [roomBookings, setRoomBookings] = useState([]);
  const [facilityBookings, setFacilityBookings] = useState([]);

  const {
    getBookings,
    isLoading: facilityLoading,
    error: facilityError,
  } = GetAllFacilityBookings();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getRoomBookings();
      setRoomBookings(response);
      console.log("response bookings => ", response);

      const response1 = await getBookings();
      setFacilityBookings(response1.otherbookings);
      console.log("response1 facility bookings => ", response1.otherbookings);
    };

    fetchdata();
  }, []);

  return (
    <>
      {(roomLoading || facilityLoading) && <Loader />}
      {roomError && <Alert>{roomError}</Alert>}
      {facilityError && <Alert>{facilityError}</Alert>}
      <Tabs defaultActiveKey='roomBookings' id='bookings-tabs'>
        <Tab eventKey='roomBookings' title='Room Bookings'>
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
              {roomBookings && roomBookings.length ? (
                roomBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>
                      {format(new Date(booking.startDate), "MMM d, yyyy")}
                    </td>
                    <td>{format(new Date(booking.endDate), "MMM d, yyyy")}</td>
                    <td>{booking.customerEmail}</td>
                    <td>{booking.roomId}</td>
                    <td>{booking.paymentAmount}</td>
                    <td>{booking.givenRating}</td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey='facilityBookings' title='Facility Bookings'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Booking Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Customer Email</th>
                <th>Facility ID</th>
                <th>Payment Amount</th>
                <th>Given Rating</th>
              </tr>
            </thead>
            <tbody>
              {facilityBookings && facilityBookings.length ? (
                facilityBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>
                      {format(new Date(booking.bookingDate), "MMM d, yyyy")}
                    </td>
                    <td>{formatTime(booking.startTime)}</td>
                    <td>{formatTime(booking.endTime)}</td>
                    <td>{booking.customerEmail}</td>
                    <td>{booking.facilityId}</td>
                    <td>{booking.paymentAmount}</td>
                    <td>{booking.givenRating}</td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </>
  );
};

export default BookingsTable;
