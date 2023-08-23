import React from 'react';
import './ViewBookings.css';

const ViewBookingsForm = () => {
  // Dummy data for room bookings
  const bookings = [
    {
      roomId: 1,
      checkInDate: '2023-08-25',
      checkOutDate: '2023-08-27',
      price: 150,
      rating: 4,
    },
    {
      roomId: 2,
      checkInDate: '2023-08-26',
      checkOutDate: '2023-08-28',
      price: 200,
      rating: 5,
    },
    {
      roomId: 3,
      checkInDate: '2023-08-27',
      checkOutDate: '2023-08-29',
      price: 180,
      rating: 3,
    },
  ];

  return (
    <div className="view-bookings">
      <h2>Room Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.roomId}</td>
              <td>{booking.checkInDate}</td>
              <td>{booking.checkOutDate}</td>
              <td>{booking.price}</td>
              <td>{booking.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBookingsForm;