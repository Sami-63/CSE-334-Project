import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./MyBookings.css";

const MyBookings = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);

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
      <h2>My Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Room</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Room A</td>
            <td>2023-08-25</td>
            <td>
              <button onClick={openPopup}>Rate</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Room B</td>
            <td>2023-08-26</td>
            <td>
              <button onClick={openPopup}>Rate</button>
            </td>
          </tr>
        </tbody>
      </table>

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
