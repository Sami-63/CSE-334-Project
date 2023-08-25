/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./PaymentModal.css"; // Your CSS file
import { MakeBooking } from "../actions/bookingActions";
import Loader from "./Loader";
import { Alert } from "react-bootstrap";
import { CheckBooking } from "../actions/roomActions";
import {
  CheckFacilityBooking,
  CreateFacilityBooking,
} from "../actions/facilityActions";

// eslint-disable-next-line react/prop-types
const PaymentModal2 = ({ show, handleClose, selectedFacility, setText }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(
    selectedFacility.price
  );

  const [message, setMessage] = useState(null);
  const {
    checkFacilityBooking,
    isLoading: isBookingLoading,
    error: BookingError,
  } = CheckFacilityBooking();

  useEffect(() => {
    const fetchData = async () => {
      if (checkInDate && checkOutDate) {
        const id = selectedFacility.id;

        console.log("id -> ", id);
        console.log("checkInDate -> ", checkInDate);
        console.log("checkOutDate -> ", checkOutDate);

        const success = await checkFacilityBooking(
          id,
          checkInDate,
          checkOutDate
        );

        if (success && checkInDate <= checkOutDate) {
          setMessage({
            type: "success",
            msg: "Booking possible",
          });
        } else {
          setMessage({
            type: "danger",
            msg: "Booking not possible",
          });
        }
      }
    };
    console.log("checkInDate, checkOutDate =>", checkInDate, checkOutDate);
    fetchData();
  }, [checkInDate, checkOutDate, selectedFacility.id]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    calculatePrice(date, checkOutDate);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
    calculatePrice(checkInDate, date);
  };

  const calculatePrice = (startDate, endDate) => {
    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const timeDifference = endDateObj - startDateObj;
      const numOfDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
      setCalculatedPrice(selectedFacility.price * numOfDays);
    }
  };

  const { bookNow, isLoading, error } = CreateFacilityBooking();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pin) {
      setErrorMessage("Please provide your PIN.");
      return;
    }

    // Here you can handle the form submission, like making a payment request
    // using the entered data

    const id = selectedFacility.id;
    // const bookingData = {
    //   checkInDate,
    //   checkOutDate,
    //   id,
    //   calculatedPrice,
    // };
    // console.log(bookingData);
    console.log("PaymentModal - selectedRoom:", selectedFacility);
    console.log("PaymentModal - calculatedPrice:", calculatedPrice);

    // After handling the payment, you can close the modal

    const { success, error } = await bookNow(
      checkInDate,
      checkOutDate,
      id,
      calculatedPrice
    );
    console.log("success , error => ", success, error);
    if (!error && success) {
      handleClose();
      setText("Booking successful");
    } else {
      setErrorMessage("Booking failed");
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);

    setErrorMessage("");
  };

  if (!show) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='payment-modal'>
        <h2>Confirm Your Booking</h2>
        <h3> {selectedFacility && selectedFacility.title}</h3>
        <p>Calculated Price: ${calculatedPrice}</p>
        {isBookingLoading && <Loader />}
        {BookingError && <Alert> {BookingError} </Alert>}
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <label htmlFor='checkInDate'>Check-in Date:</label>
            <input
              type='date'
              id='checkInDate'
              value={checkInDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => handleCheckInDateChange(e.target.value)}
              required
            />

            <label htmlFor='checkOutDate'>Check-out Date:</label>
            <input
              type='date'
              id='checkOutDate'
              value={checkOutDate}
              min={checkInDate}
              onChange={(e) => handleCheckOutDateChange(e.target.value)}
              required
            />
          </div>
          <div className='form-row'>
            <label htmlFor='paymentMethod'>Payment Method:</label>
            <select
              id='paymentMethod'
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
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
          {message && <Alert variant={message.type}> {message.msg} </Alert>}
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <div className='form-row buttons'>
            <button
              className='cancel-button'
              type='button'
              onClick={handleClose}
            >
              Cancel
            </button>
            {error && <Alert>{error}</Alert>}
            {isLoading && <Loader />}
            <button
              className='confirm-button'
              type='submit'
              disabled={isLoading}
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal2;
