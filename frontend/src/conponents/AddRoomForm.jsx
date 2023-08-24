import { useState } from "react";
import "./AddRoomForm.css";
import { CreateRoom } from "../actions/roomActions";

import { Form, Button, Alert, Row } from "react-bootstrap";
import Loader from "./Loader";

const AddRoomForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [personCount, setPersonCount] = useState("");
  const [bedroomCount, setBedroomCount] = useState("");
  const [acCount, setAcCount] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const { create, isLoading, error } = CreateRoom();
  const [msg, setmsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", price);
    console.log("Person Count:", personCount);
    console.log("Bedroom Count:", bedroomCount);
    console.log("AC Count:", acCount);
    console.log("Image URL:", imgUrl);

    const success = await create(
      title,
      description,
      price,
      personCount,
      bedroomCount,
      acCount,
      imgUrl
    );
    if (success) {
      setmsg("Room Created");
      setTitle("");
      setDescription("");
      setPrice("");
      setPersonCount("");
      setBedroomCount("");
      setAcCount("");
      setImgUrl("");
    }
  };

  return (
    <Row className='justify-content-center'>
      <Form onSubmit={handleSubmit}>
        <h2 className='text-center'>ADD ROOM</h2>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as='textarea'
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='personCount'>
          <Form.Label>Person Count</Form.Label>
          <Form.Control
            type='number'
            value={personCount}
            onChange={(e) => setPersonCount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='bedroomCount'>
          <Form.Label>Bedroom Count</Form.Label>
          <Form.Control
            type='number'
            value={bedroomCount}
            onChange={(e) => setBedroomCount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='acCount'>
          <Form.Label>AC Count</Form.Label>
          <Form.Control
            type='number'
            value={acCount}
            onChange={(e) => setAcCount(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='imgUrl'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type='text'
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            required
          />
        </Form.Group>
        {isLoading && <Loader />}
        {error && <Alert variant='danger'>{error}</Alert>}
        {msg && <Alert variant='success'>{msg}</Alert>}
        <Button
          variant='primary'
          type='submit'
          className='my-3'
          disabled={isLoading}
        >
          Add Room
        </Button>
      </Form>
    </Row>
  );
};

export default AddRoomForm;
