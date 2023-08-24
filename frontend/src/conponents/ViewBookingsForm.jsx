import { Container } from "react-bootstrap";
import "./ViewBookings.css";
import BookingsTable from "./BookingTable";

const ViewBookingsForm = () => {
  return (
    <Container>
      <h1>Bookings Data</h1>

      <BookingsTable />
    </Container>
  );
};

export default ViewBookingsForm;
