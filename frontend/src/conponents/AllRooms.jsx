import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Table, Form } from "react-bootstrap";
import Loader from "./Loader";
import { GetAllRooms } from "../actions/roomActions";
import { useAuthContext } from "../hooks/useAuthContext";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const { user } = useAuthContext();

  const { getRooms, isLoading, error } = GetAllRooms();

  const openEditModal = (room) => {
    setEditingRoom(room);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingRoom(null);
    setShowEditModal(false);
  };

  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleUpdateRoom = async () => {
    console.log(editingRoom);
    const response = await fetch(
      `http://localhost:4000/api/rooms/${editingRoom.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(editingRoom),
      }
    );

    closeEditModal();
    setShowSuccessAlert(true);
    // Update the rooms state to trigger a re-render with updated data
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === editingRoom.id ? editingRoom : room
      )
    );
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:4000/api/rooms/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        }
      }
    );
    closeDeleteConfirmation();
    setShowSuccessAlert(true);
    // Update the rooms state to trigger a re-render with updated data
    setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
  }

  useEffect(() => {
    const fetchdata = async () => {
      const response = await getRooms();
      setRooms(response);
      console.log("response rooms => ", response);
    };

    fetchdata();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      {showSuccessAlert && (
        <Alert
          variant="success"
          onClose={() => setShowSuccessAlert(false)}
          dismissible
        >
          Operation successful!
        </Alert>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Person Count</th>
            <th>Bedroom Count</th>
            <th>AC Count</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms && rooms.length ? (
            rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.title}</td>
                <td>{room.price}</td>
                <td>{room.personCount}</td>
                <td>{room.bedroomCount}</td>
                <td>{room.acCount}</td>
                <td>{room.rating}</td>
                <td>
                  <Button variant="info" onClick={() => openEditModal(room)}>
                    Edit
                  </Button>{" "}
                  <Button variant="danger" onClick={() => handleDelete(room.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No rooms available.</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingRoom && (
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={editingRoom.title}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={editingRoom.price}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, price: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="personCount">
                <Form.Label>Person Count</Form.Label>
                <Form.Control
                  type="number"
                  value={editingRoom.personCount}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      personCount: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="bedroomCount">
                <Form.Label>Bedroom Count</Form.Label>
                <Form.Control
                  type="number"
                  value={editingRoom.bedroomCount}
                  onChange={(e) =>
                    setEditingRoom({
                      ...editingRoom,
                      bedroomCount: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="acCount">
                <Form.Label>AC Count</Form.Label>
                <Form.Control
                  type="number"
                  value={editingRoom.acCount}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, acCount: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="rating">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  step="0.1"
                  value={editingRoom.description}
                  onChange={(e) =>
                    setEditingRoom({ ...editingRoom, description: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateRoom}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDeleteConfirmation} onHide={closeDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this room?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(editingRoom.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllRooms;
