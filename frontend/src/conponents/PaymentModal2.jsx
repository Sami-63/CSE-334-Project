import { useEffect, useState } from "react";
import "./PaymentModal.css"; // Your CSS file

import Loader from "./Loader";
import { Alert, Col, Form, Row } from "react-bootstrap";

import TimePicker from "react-bootstrap-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CheckFacilityBooking,
  CreateFacilityBooking,
} from "../actions/facilityActions";

const PaymentModal2 = ({ show, handleClose, selectedFacility, setText }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCheckInTime, setSelectedCheckInTime] = useState(null);
  const [selectedCheckOutTime, setSelectedCheckOutTime] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(
    selectedFacility.price
  );

  const handleCheckInTimeChange = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    setSelectedCheckInTime(formattedTime);
  };

  const handleCheckOutTimeChange = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    setSelectedCheckOutTime(formattedTime);
  };

  const {
    checkFacilityBooking: checkBooking,
    isLoading: isBookingLoading,
    error: BookingError,
  } = CheckFacilityBooking();
  const { bookNow, isLoading, error } = CreateFacilityBooking();

  const getSecondsFromTimeString = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  };

  const calculatePrice = () => {
    if (selectedCheckInTime && selectedCheckOutTime) {
      const startTimeInSeconds = getSecondsFromTimeString(selectedCheckInTime);
      const endTimeInSeconds = getSecondsFromTimeString(selectedCheckOutTime);

      const timeDifferenceInSeconds = endTimeInSeconds - startTimeInSeconds;
      const numOfMinutes = timeDifferenceInSeconds / 60;

      const calculatedPrice = (selectedFacility.price * numOfMinutes) / 30;
      setCalculatedPrice(calculatedPrice);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pin) {
      setErrorMessage("Please provide your PIN.");
      return;
    }

    if (!selectedDate || !selectedCheckInTime || !selectedCheckOutTime) {
      setErrorMessage("Please select all required booking details.");
      return;
    }

    const id = selectedFacility.id;

    const { success } = await bookNow(
      selectedDate,
      selectedCheckInTime,
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

  useEffect(() => {
    const asyncFunction = async () => {
      if (selectedDate && selectedCheckInTime && selectedCheckOutTime) {
        // Convert selected times to JavaScript Date objects

        console.log("selectedDate => ", selectedDate);
        console.log("selectedCheckInTime => ", selectedCheckInTime);
        console.log("selectedCheckOutTime => ", selectedCheckOutTime);

        const response = await checkBooking(
          selectedFacility.id,
          selectedDate,
          selectedCheckInTime,
          selectedCheckOutTime
        );

        console.log("booking possible = ", response);

        if (response && selectedCheckInTime < selectedCheckOutTime) {
          setErrorMessage("Booking possible");
          setErrorType("success");
        } else {
          setErrorMessage("Booking not possible");
          setErrorType("danger");
        }
      }
    };
    asyncFunction();
    calculatePrice();
  }, [selectedDate, selectedCheckInTime, selectedCheckOutTime]);

  if (!show) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='payment-modal'>
        <h2>Confirm Your Booking</h2>
        <p>Room: {selectedFacility && selectedFacility.description}</p>
        <p>Calculated Price: ${calculatedPrice.toFixed(2)}</p>
        {isBookingLoading && <Loader />}
        {BookingError && <Alert variant='danger'>{BookingError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='selectedDate'>
            <Form.Label>
              <b>Select Date:</b>
            </Form.Label>
            <Form.Control
              type='date'
              name='selectedDate'
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId='selectedCheckInTime' className='my-4'>
                <Form.Label>
                  <b>Select Check-in Time:</b>
                </Form.Label>
                <TimePicker
                  value={selectedCheckInTime || undefined}
                  onChange={handleCheckInTimeChange}
                  step={30}
                  start='06:00'
                  end='23:00'
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='selectedCheckOutTime' className='my-4'>
                <Form.Label>
                  <b>Select Check-out Time:</b>
                </Form.Label>
                <TimePicker
                  value={selectedCheckOutTime || undefined}
                  onChange={handleCheckOutTimeChange}
                  start={selectedCheckInTime ? selectedCheckInTime : "06:00"}
                  end='23:00'
                />
              </Form.Group>
            </Col>
          </Row>
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
          {errorMessage && <Alert variant={errorType}>{errorMessage}</Alert>}
          <div className='form-row buttons'>
            <button
              className='cancel-button'
              type='button'
              onClick={handleClose}
            >
              Cancel
            </button>
            {error && <Alert variant='danger'>{error}</Alert>}
            {isLoading && <Loader />}
            <button
              className='confirm-button'
              type='submit'
              disabled={isLoading}
            >
              Confirm Payment
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentModal2;
