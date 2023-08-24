import { useState } from "react";
import "./AddRoomForm.css";
import { Alert, Button, Form } from "react-bootstrap";
import { CreateFacility } from "../actions/facilityActions";
import Loader from "./Loader";

const AddFacilitiesForm = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [imgUrl, setImgUrl] = useState("");

  const [msg, setmsg] = useState("");
  const { create, isLoading, error } = CreateFacility();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Category:", category);
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price:", price);

    console.log("Image URL:", imgUrl);
    // Reset form fields

    const success = await create(category, title, description, price, imgUrl);

    if (success) {
      setmsg("Facility added");
      setCategory("");
      setTitle("");
      setDescription("");
      setPrice("");
      setImgUrl("");
    }
  };

  return (
    <div style={{ maxWidth: "60vw" }}>
      <h2 className='text-center'>ADD FACILITY</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
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
        <Button variant='primary' type='submit' disabled={isLoading}>
          Add Facility
        </Button>
      </Form>
    </div>
  );
};

export default AddFacilitiesForm;
