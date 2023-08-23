import { useState } from "react";
import "./PaymentModal.css"; // Your CSS file

function PaymentModal({ show, handleClose, selectedRoom, searchData }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [mobileBankingNumber, setMobileBankingNumber] = useState("");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState(selectedRoom.price);

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
      setCalculatedPrice(selectedRoom.price * numOfDays);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "bank" && (!bankName || !bankAccount)) {
      setErrorMessage("Please provide bank name and bank account number.");
      return;
    }

    if (paymentMethod === "mobile" && !mobileBankingNumber) {
      setErrorMessage("Please provide mobile banking number.");
      return;
    }

    if (!pin) {
      setErrorMessage("Please provide your PIN.");
      return;
    }

    // Here you can handle the form submission, like making a payment request
    // using the entered data
    const bookingData = {
      checkInDate,
      checkOutDate,
      numOfPeople,
      paymentMethod,
      bankName,
      bankAccount,
      mobileBankingNumber,
      pin,
      selectedRoom,
      calculatedPrice,
      searchData,
    };
    console.log(bookingData);
    console.log("PaymentModal - selectedRoom:", selectedRoom);
    console.log("PaymentModal - calculatedPrice:", calculatedPrice);
    console.log("PaymentModal - searchData:", searchData);

    // After handling the payment, you can close the modal
    handleClose();
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setBankName("");
    setBankAccount("");
    setMobileBankingNumber("");
    setErrorMessage("");
  };

  if (!show) {
    return null;
  }

  return (
    <div className='modal-overlay'>
      <div className='payment-modal'>
        <button className='close-button' onClick={handleClose}>
          Close
        </button>
        <h2>Confirm Your Booking</h2>
        <p>Room: {selectedRoom && selectedRoom.description}</p>
        <p>Calculated Price: ${calculatedPrice}</p>
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
            <label htmlFor='numOfPeople'>Number of People:</label>
            <input
              type='number'
              id='numOfPeople'
              value={numOfPeople}
              onChange={(e) => setNumOfPeople(e.target.value)}
              required
            />
          </div>
          <div className='form-row'>
            <label htmlFor='checkOutDate'>Check-out Date:</label>
            <input
              type='date'
              id='checkOutDate'
              value={checkOutDate}
              min={checkInDate}
              onChange={(e) => handleCheckOutDateChange(e.target.value)}
              required
            />
            <label htmlFor='paymentMethod'>Payment Method:</label>
            <select
              id='paymentMethod'
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              required
            >
              <option value=''>Select a payment method</option>
              <option value='credit'>Credit Card</option>
              <option value='paypal'>PayPal</option>
              <option value='bank'>Bank Transfer</option>
              <option value='mobile'>Mobile Banking</option>
            </select>
          </div>
          {paymentMethod === "bank" && (
            <div className='form-row'>
              <label htmlFor='bankName'>Bank Name:</label>
              <input
                type='text'
                id='bankName'
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
              <label htmlFor='bankAccount'>Bank Account:</label>
              <input
                type='text'
                id='bankAccount'
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                required
              />
            </div>
          )}
          {paymentMethod === "mobile" && (
            <div className='form-row'>
              <label htmlFor='mobileBankingNumber'>
                Mobile Banking Number:
              </label>
              <input
                type='text'
                id='mobileBankingNumber'
                value={mobileBankingNumber}
                onChange={(e) => setMobileBankingNumber(e.target.value)}
                required
              />
            </div>
          )}
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
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <div className='form-row buttons'>
            <button
              className='cancel-button'
              type='button'
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className='confirm-button' type='submit'>
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
