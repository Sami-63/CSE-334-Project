import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./FilterBox.css";

function FilterBox({ onBookRoom }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numOfBedrooms, setNumOfBedrooms] = useState("");
  const [acRequired, setAcRequired] = useState(false);
  const [numOfPeople, setNumOfPeople] = useState("");

  const handleSearch = () => {
    // Call the onBookRoom function to pass the search data to the parent component
    onBookRoom(
      checkInDate,
      checkOutDate,
      numOfBedrooms,
      acRequired,
      numOfPeople
    );
  };

  return (
    <div className='search-bar'>
      <h2 className='search-title'>Search for Available Rooms</h2>
      <div className='search-fields'>
        <div className='search-field-group'>
          <div className='search-field'>
            <label className='field-label'>Check-in Date:</label>
            <div className='calendar-icon'>
              <FiCalendar />
            </div>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              dateFormat='MM/dd/yyyy'
              minDate={new Date()}
              placeholderText='Select check-in date'
            />
          </div>
          <div className='search-field'>
            <label className='field-label'>Number of Bedrooms:</label>
            <input
              type='number'
              value={numOfBedrooms}
              onChange={(e) => setNumOfBedrooms(e.target.value)}
              className='input-field'
              placeholder='Enter number of bedrooms'
            />
          </div>
          <div className='search-field'>
            <label className='field-label'>AC Required:</label>
            <input
              type='checkbox'
              checked={acRequired}
              onChange={() => setAcRequired(!acRequired)}
            />
          </div>
        </div>
        <div className='search-field-group'>
          <div className='search-field'>
            <label className='field-label'>Check-out Date:</label>
            <div className='calendar-icon'>
              <FiCalendar />
            </div>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              dateFormat='MM/dd/yyyy'
              minDate={checkInDate || new Date()}
              placeholderText='Select check-out date'
            />
          </div>
          <div className='search-field'>
            <label className='field-label'>Number of People:</label>
            <input
              type='number'
              value={numOfPeople}
              onChange={(e) => setNumOfPeople(e.target.value)}
              className='input-field'
              placeholder='Enter number of people'
            />
          </div>
          <button className='search-button' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
