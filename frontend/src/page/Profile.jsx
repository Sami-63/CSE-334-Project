import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { Col, Row, Alert, Button, Form, Container } from "react-bootstrap";
import { GetProfile, UpdateProfile } from "../actions/userActions";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");

  const [formMessage, setFormMessage] = useState("");

  const { getProfileInfo, error } = GetProfile();
  const { update, updating, updateError } = UpdateProfile();

  useEffect(() => {
    const fetchData = async () => {
      console.log("profile e asi, user => ", user);
      try {
        const response = await getProfileInfo();

        if (!response) navigate("/");
        else {
          setName(response.name);
          setEmail(response.email);
          setUserType(response.userType);
          setNidNumber(response.nidNumber);
          setPhoneNumber(response.phoneNumber);
          setBankName(response.bankName);
          setAccountNumber(response.accountNumber);
          setBkashNumber(response.bkashNumber);
        }
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
      // }
    };

    fetchData();
  }, [user]);

  const handleUpdate = async () => {
    setFormMessage("");
    const updatedUser = {
      nidNumber,
      phoneNumber,
      bankName,
      accountNumber,
      bkashNumber,
    };

    const success = await update(updatedUser);

    if (success) {
      setFormMessage("Profile updated");
    } else {
      setFormMessage("Failed to update profile");
    }
  };

  return (
    <Row className='justify-content-center'>
      <Col sm={10} md={8} lg={6}>
        <h2 className='my-3 text-center'>User Profile</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        {formMessage && <Alert variant='success'>{formMessage}</Alert>}
        <Container className='my-4'>
          <Form className='profile-form'>
            <Form.Group controlId='name' className='form-group'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' value={name} readOnly />
            </Form.Group>
            <Form.Group controlId='email' className='form-group'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' value={email} readOnly />
            </Form.Group>
            <Form.Group controlId='userType' className='form-group'>
              <Form.Label>User Type</Form.Label>
              <Form.Control type='text' value={userType} readOnly />
            </Form.Group>
            <Form.Group controlId='nidNumber' className='form-group'>
              <Form.Label>NID Number</Form.Label>
              <Form.Control
                type='text'
                value={nidNumber}
                onChange={(e) => setNidNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='phoneNumber' className='form-group'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='text'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='bankName' className='form-group'>
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type='text'
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='accountNumber' className='form-group'>
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type='text'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='bkashNumber' className='form-group'>
              <Form.Label>Bkash Number</Form.Label>
              <Form.Control
                type='text'
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value)}
              />
            </Form.Group>

            <Button
              variant='primary'
              disabled={updating}
              onClick={handleUpdate}
              style={{ fontSize: "15px" }}
            >
              {updating ? "Updating..." : "Update Profile"}
            </Button>
            {updateError && <Alert variant='danger'>{updateError}</Alert>}
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default Profile;
