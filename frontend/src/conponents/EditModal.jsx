import React from 'react'

const EditModal = ({ show, onHide, onUpdate }) => {
    
        const [updatedInfo, setUpdatedInfo] = useState('');
      
        const handleUpdate = () => {
          // Call an update API or update function here with the updatedInfo
          onUpdate(updatedInfo);
      
          // Close the modal
          onHide();
        };
      
        return (
          <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Update Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicInfo">
                  <Form.Label>Updated Info</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter updated information"
                    value={updatedInfo}
                    onChange={(e) => setUpdatedInfo(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }
      
      function App() {
        const [showModal, setShowModal] = useState(false);
      
        const handleShowModal = () => {
          setShowModal(true);
        };
      
        const handleHideModal = () => {
          setShowModal(false);
        };
      
        const handleUpdate = (updatedInfo) => {
          // Handle the updated information here (e.g., update state, send to server, etc.)
          console.log('Updated information:', updatedInfo);
        };
      
        return (
          <div>
            <Button variant="primary" onClick={handleShowModal}>
              Open Update Modal
            </Button>
            <UpdateInfoModal show={showModal} onHide={handleHideModal} onUpdate={handleUpdate} />
          </div>
        );
      }
      
      


export default EditModal