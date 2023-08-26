import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { Row, Col, Button } from "react-bootstrap";
import "./FilterBox.css";

const FacilityFilterBox = ({ filter, setFacilities }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setSelectedStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setSelectedEndTime(time);
  };

  const handleSearch = async () => {
    const response = await filter(
      selectedDate,
      selectedStartTime,
      selectedEndTime
    );
    setFacilities(response);
  };

  const sixAM = new Date();
  sixAM.setHours(6, 0, 0); // Set minimum time to 6:00 AM

  const elevenPM = new Date();
  elevenPM.setHours(23, 0, 0); // Set maximum time to 10:00 PM

  return (
    <div className='search-bar'>
      <h3 className='search-title'>Book a Swimming Pool</h3>
      <div className='search-fields'>
        <Row className='mb-3'>
          <Col sm={4}>
            <div className='search-field'>
              <div className='calendar-icon'>
                <FiCalendar size={24} />
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                minDate={new Date()}
                dateFormat='MM/dd/yyyy'
                placeholderText='Select date'
                className='form-control'
              />
            </div>
          </Col>
          <Col sm={4}>
            <div className='search-field'>
              <div className='clock-icon'>
                <BsClock size={24} />
              </div>
              <DatePicker
                // selected={selectedStartTime}
                onChange={handleStartTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Start Time'
                dateFormat='h:mm aa'
                placeholderText='Select start time'
                className='form-control'
              />
            </div>
          </Col>
          <Col sm={4}>
            <div className='search-field'>
              <div className='clock-icon'>
                <BsClock size={24} />
              </div>
              <DatePicker
                // selected={selectedEndTime}
                onChange={handleEndTimeChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='End Time'
                dateFormat='h:mm aa'
                placeholderText='Select end time'
                className='form-control'
              />
            </div>
          </Col>
        </Row>
        <div className='text-center'>
          <Button
            variant='primary'
            className='search-button'
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacilityFilterBox;
