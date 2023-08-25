import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RatingStars from "react-rating-stars-component";

const StarRatingModal = ({ show, onHide, facilityinfo }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    // You can submit the rating here
    // console.log("facility info ", facilityinfo);
    // console.log("Submitted rating:", rating);
    onHide(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rate {facilityinfo.type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Rate </p>
        <RatingStars
          count={5}
          value={rating}
          onChange={handleRatingChange}
          size={40}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StarRatingModal;
