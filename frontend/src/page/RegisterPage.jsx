import { Alert, Button, Col, Form, Row } from "react-bootstrap";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../conponents/FormContainer";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import useSignup from "../hooks/useSignup";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { signup, isLoading, error } = useSignup();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFormError("password doesn't match");
    } else {
      if (password.length < 8)
        setFormError("password should be at least 8 character long");
      else {
        setFormError("");
        await signup(name, email, password);
      }
    }
  };

  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <FormContainer>
      <h1>Register</h1>
      {error && <Alert variant='danger'>{error}</Alert>}
      {formError && <Alert variant='danger'>{formError}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' disabled={isLoading}>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account? <Link to='/login'>Log in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;
