import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import RatingStars from "react-rating-stars-component";
import { GiveRoomRating } from "../actions/bookingActions";
import { Alert } from "react-bootstrap";
import Loader from "./Loader";
import { GiveRatingToFacility } from "../actions/facilityActions";

const StarRatingModal = ({ show, onHide, facilityinfo, setRender, render }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const hidePopup = () => {
    setRating(0);
    onHide();
  };

  const { giveRoomRating, isLoading, error } = GiveRoomRating();
  const {
    giveFacilityRating,
    isLoading: isLoading2,
    error: error2,
  } = GiveRatingToFacility();

  const handleSubmit = () => {
    // console.log("facility info ", facilityinfo);
    // console.log("Submitted rating:", rating);

    const asyncfunction = async () => {
      if (!facilityinfo) {
        // something to be done
      } else if (facilityinfo.type === "room") {
        const response = await giveRoomRating(facilityinfo.bookingId, rating);
        if (!response) setMessage("Some error has occured");

        setRender(!render);
        onHide();
      } else {
        const response = await giveFacilityRating(
          facilityinfo.bookingId,
          rating
        );
        if (!response) setMessage("Some error has occured");

        setRender(!render);
        onHide();
      }
    };

    asyncfunction();
  };

  return (
    <Modal show={show} onHide={hidePopup}>
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
      {message && <Alert>{message}</Alert>}
      {(error || error2) && <Alert>{error || error2}</Alert>}
      {(isLoading || isLoading2) && <Loader />}
      <Modal.Footer>
        <Button variant='secondary' onClick={hidePopup}>
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
