import React, { useState } from 'react';
import './AddRoomForm.css';

const AddRoomForm = () => {
  const [roomName, setRoomName] = useState('');
  const [roomTitle, setRoomTitle] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomUrl, setRoomUrl] = useState('');

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleRoomTitleChange = (event) => {
    setRoomTitle(event.target.value);
  };

  const handleRoomPriceChange = (event) => {
    setRoomPrice(event.target.value);
  };

  const handleRoomDescriptionChange = (event) => {
    setRoomDescription(event.target.value);
  };

  const handleRoomUrlChange = (event) => {
    setRoomUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log('Room Name:', roomName);
    console.log('Room Title:', roomTitle);
    console.log('Room Price:', roomPrice);
    console.log('Room Description:', roomDescription);
    console.log('Room URL:', roomUrl);
    // Reset form fields
    setRoomName('');
    setRoomTitle('');
    setRoomPrice('');
    setRoomDescription('');
    setRoomUrl('');
  };

  return (
    <div className="add-room-form">
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={handleRoomNameChange}
            required
          />
          <label htmlFor="roomName">Room Name</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="roomTitle"
            value={roomTitle}
            onChange={handleRoomTitleChange}
            required
          />
          <label htmlFor="roomTitle">Room Title</label>
        </div>
        <div className="form-group">
          <input
            type="number"
            id="roomPrice"
            value={roomPrice}
            onChange={handleRoomPriceChange}
            required
          />
          <label htmlFor="roomPrice">Room Price</label>
        </div>
        <div className="form-group">
          <textarea
            id="roomDescription"
            value={roomDescription}
            onChange={handleRoomDescriptionChange}
            required
          ></textarea>
          <label htmlFor="roomDescription">Room Description</label>
        </div>
        <div className="form-group">
          <input
            type="text"
            id="roomUrl"
            value={roomUrl}
            onChange={handleRoomUrlChange}
            required
          />
          <label htmlFor="roomUrl">Room Image URL</label>
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomForm;