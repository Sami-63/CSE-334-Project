import React, { useEffect, useState } from "react";
import "./PaymentModal.css"; // Your CSS file
import { MakeBooking } from "../actions/bookingActions";
import Loader from "./Loader";
import { Alert } from "react-bootstrap";
import { CheckBooking } from "../actions/roomActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const PaymentModal2 = ({ show, handleClose, selectedRoom, setText }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCheckInTime, setSelectedCheckInTime] = useState(null);
  const [selectedCheckOutTime, setSelectedCheckOutTime] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(selectedRoom.price);

  const { checkBooking, isLoading: isBookingLoading, error: BookingError } =
    CheckBooking();
  const { bookNow, isLoading, error } = MakeBooking();

  useEffect(() => {
    calculatePrice();
  }, [selectedCheckInTime, selectedCheckOutTime]);

  const calculatePrice = () => {
    if (selectedCheckInTime && selectedCheckOutTime) {
      const timeDifference =
        selectedCheckOutTime - selectedCheckInTime;
      const numOfMinutes = timeDifference / (1000 * 60);
      setCalculatedPrice((selectedRoom.price * numOfMinutes) / 30);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pin) {
      setErrorMessage("Please provide your PIN.");
      return;
    }

    const id = selectedRoom.id;
    const bookingData = {
      checkInDate: selectedDate,
      checkInTime: selectedCheckInTime,
      checkOutDate: selectedDate,
      checkOutTime: selectedCheckOutTime,
      id,
      calculatedPrice,
    };

    const { success } = await bookNow(
      selectedDate,
      selectedCheckInTime,
      selectedDate,
      selectedCheckOutTime,
      id,
      calculatedPrice
    );

    if (success) {
      handleClose();
      setText("Booking successful");
    } else {
      setErrorMessage("Booking failed");
    }
  };

  if (!show) {
    return null;
  }


  const sixAM = new Date();
  sixAM.setHours(6, 0, 0); // Set minimum time to 6:00 AM

  const tenPM = new Date();
  tenPM.setHours(22, 0, 0); // Set maximum time to 10:00 PM
  
  return (
    <div className='modal-overlay'>
      <div className='payment-modal'>
        <h2>Confirm Your Booking</h2>
        <p>Room: {selectedRoom && selectedRoom.description}</p>
        <p>Calculated Price: ${calculatedPrice.toFixed(2)}</p>
        {isBookingLoading && <Loader />}
        {BookingError && <Alert variant='danger'>{BookingError}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <label htmlFor='checkInDate'>Check-in Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              dateFormat='MM/dd/yyyy'
              placeholderText='Select date'
            />
            <div className="calendar-icon">
              <FiCalendar />
            </div>
          </div>
          <div className='form-row'>
            <label htmlFor='checkInTime' className='time-label'>
              Check-in Time:
            </label>
            <div className='time-picker'>
              <DatePicker
                selected={selectedCheckInTime}
                onChange={(time) => setSelectedCheckInTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                minTime={sixAM} // Minimum time: 6:00 AM
                maxTime={tenPM} // Maximum time: 10:00 PM
                timeCaption='Time'
                dateFormat='h:mm aa'
                placeholderText='Select time'
              />
            </div>
            <label htmlFor='checkOutTime' className='time-label'>
              Check-out Time:
            </label>
            <div className='time-picker'>
              <DatePicker
                selected={selectedCheckOutTime}
                onChange={(time) => setSelectedCheckOutTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                minTime={selectedCheckInTime} // Minimum time is the selected check-in time
                maxTime={tenPM} // Maximum time: 10:00 PM
                timeCaption='Time'
                dateFormat='h:mm aa'
                placeholderText='Select time'
              />
            </div>
          </div>
          <div className='form-row'>
            <label htmlFor='paymentMethod'>Payment Method:</label>
            <select
              id='paymentMethod'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value=''>Select a payment method</option>
              <option value='bank'>Bank Transfer</option>
              <option value='mobile'>Mobile Banking</option>
            </select>
          </div>
          {paymentMethod && (
            <div className='form-row'>
              <label htmlFor='pin'>PIN:</label>
              <input
                type='password'
                id='pin'
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
            </div>
          )}
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <div className='form-row buttons'>
            <button className='cancel-button' type='button' onClick={handleClose}>
              Cancel
            </button>
            {error && <Alert variant='danger'>{error}</Alert>}
            {isLoading && <Loader />}
            <button className='confirm-button' type='submit' disabled={isLoading}>
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal2;
